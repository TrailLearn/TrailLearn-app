import { streamText } from 'ai';
import { getLLMModel } from '~/lib/llm-config';
import { getMaieuticSystemPrompt } from '~/features/ai-coach/prompts/maieutic-coach';
import { LLMGuardrails } from '~/server/lib/llm-guardrails';
import { extractPreferences } from './logic/synthesis/extract-preferences';
import { db } from '~/server/db'; // Direct DB access for background task

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
    context?: { userName?: string; projectContext?: string; userId?: string; preferences?: any }
  ) {
    try {
      const model = getLLMModel(); // Récupère le modèle configuré dynamiquement
      const systemPrompt = getMaieuticSystemPrompt(context);

      // Conversion manuelle des messages UI vers CoreMessage pour éviter les erreurs de type
      // et les champs superflus (id, createdAt...) qui cassent la validation strict du SDK.
      const coreMessages = messages.map((m) => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content || '', // Ensure content is never undefined
      }));

      return streamText({
        model: model,
        messages: coreMessages,
        system: systemPrompt,
        onFinish: async ({ text }) => {
          // 1. Async Ethical Check (Monitoring)
          const check = LLMGuardrails.validateNonClosure(text);
          if (!check.isValid) {
            console.warn(`[ETHICAL VIOLATION] AI generated forbidden terms: ${check.violations.join(', ')}`);
          }

          // 2. Async Preference Extraction (Background persistence)
          if (context?.userId) {
            try {
              // We use the full message history + the new response (text)
              const allMessages = [...coreMessages, { role: 'assistant', content: text }];
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