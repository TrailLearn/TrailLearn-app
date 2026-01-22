import { streamText, tool } from 'ai';
import { getLLMModel } from '~/lib/llm-config';
import { getMaieuticSystemPrompt } from '~/features/ai-coach/prompts/maieutic-coach';
import { LLMGuardrails } from '~/server/lib/llm-guardrails';
import { extractPreferences } from '../logic/synthesis/extract-preferences';
import { db } from '~/server/db'; // Direct DB access for background task
import { z } from 'zod';

/**
 * Service to handle AI Coach interactions.
 * Encapsulates LLM logic and prompts.
 */
export const AiCoachService = {
  /**
   * Generates a streaming response for the maieutic chat.
   * Uses the configured LLM provider from llm-config.
   */
  async getChatStream(
    messages: any[],
    context?: { 
      userName?: string; 
      projectContext?: string; 
      userId?: string; 
      preferences?: any;
      isReturningFromInactivity?: boolean;
      overdueTaskCount?: number;
    }
  ) {
    try {
      const model = getLLMModel(); // Récupère le modèle configuré dynamiquement
      const systemPrompt = getMaieuticSystemPrompt(context);

      // Conversion manuelle des messages UI vers CoreMessage
      // Supporte le format classique 'content' et le format moderne 'parts'
      const coreMessages = messages.map((m) => {
        let textContent = m.content || '';
        
        // Si content est vide, on cherche dans 'parts' (nouveau standard SDK)
        if (!textContent && Array.isArray(m.parts)) {
          textContent = m.parts
            .filter((p: any) => p.type === 'text')
            .map((p: any) => p.text)
            .join('\n');
        }

        return {
          role: m.role as 'user' | 'assistant' | 'system',
          content: textContent,
        };
      });

      // --- DEBUG LOGS (Temporary) ---
      console.log("--- AI COACH DEBUG ---");
      console.log("Context Data:", JSON.stringify(context, null, 2));
      console.log("System Prompt Preview:", systemPrompt.substring(0, 500) + "...");
      console.log("Message History Length:", coreMessages.length);
      console.log("Full History Dump:", JSON.stringify(coreMessages, null, 2)); // Dump full history to be sure
      // -----------------------------

      // 1. Persistence: Save User Message (Last one in the array)
      if (context?.userId && coreMessages.length > 0) {
        const lastMsg = coreMessages[coreMessages.length - 1];
        if (lastMsg?.role === 'user') {
          await db.chatMessage.create({
            data: {
              userId: context.userId,
              role: 'user',
              content: lastMsg.content as string,
            },
          });
        }
      }

      return streamText({
        model: model,
        messages: coreMessages,
        system: systemPrompt,
        tools: {
          createActionPlan: tool({
            description: 'Creates a structured Action Plan with tasks in the user dashboard. Use this ONLY after the user has explicitly agreed to the proposed plan.',
            parameters: z.object({
              tasks: z.array(z.object({
                title: z.string(),
                description: z.string(),
                priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
              })),
            }),
            execute: async ({ tasks }: { tasks: { title: string; description: string; priority: 'HIGH' | 'MEDIUM' | 'LOW' }[] }) => {
              if (!context?.userId) {
                return "Error: User not identified. Cannot create plan.";
              }

              try {
                // Find or create Action Plan
                let plan = await db.actionPlan.findUnique({
                  where: { userId: context.userId },
                });

                if (!plan) {
                  plan = await db.actionPlan.create({
                    data: { userId: context.userId, status: "DRAFT" },
                  });
                }

                // Create tasks
                await db.task.createMany({
                  data: tasks.map(t => ({
                    actionPlanId: plan!.id,
                    title: t.title,
                    description: t.description,
                    priority: t.priority,
                    status: "PENDING"
                  }))
                });

                return `Success. ${tasks.length} tasks created in the Action Plan. Tell the user to check their Focus Dashboard to validate them.`;
              } catch (e) {
                console.error("Tool Execution Error:", e);
                return "Error creating tasks in database.";
              }
            },
          } as any),
        },
        onFinish: async ({ text }) => {
          // 2. Persistence: Save Assistant Response
          if (context?.userId) {
            // Note: If tool was called, 'text' might be empty or contain the tool result summary
            // We should ideally capture the tool calls too, but for now we just save the text response.
            if (text) {
                await db.chatMessage.create({
                data: {
                    userId: context.userId,
                    role: 'assistant',
                    content: text,
                },
                });
            }
          }

          // 3. Async Ethical Check (Monitoring)
          if (text) {
            const check = LLMGuardrails.validateNonClosure(text);
            if (!check.isValid) {
                console.warn(`[ETHICAL VIOLATION] AI generated forbidden terms: ${check.violations.join(', ')}`);
            }
          }

          // 4. Async Preference Extraction (Background persistence)
          if (context?.userId) {
            try {
              // We use the full message history + the new response (text)
              const allMessages = [...coreMessages, { role: 'assistant', content: text || "Tool Execution" }];
              const newPrefs = await extractPreferences(allMessages, context.preferences || {});
              
              await db.user.update({
                where: { id: context.userId },
                data: { preferences: newPrefs as any },
              });
              console.log(`[Preferences] Updated for user ${context.userId}`);
            } catch (err) {
              console.error("[Preferences] Extraction failed:", err);
            }
          }
        }
      });
    } catch (error) {
      console.error("LLM Service Error:", error);
      throw new Error("Le Coach IA est indisponible pour le moment. Veuillez vérifier la configuration.");
    }
  },
};