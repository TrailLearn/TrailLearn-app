import { streamText, convertToCoreMessages } from 'ai';
import { getLLMModel } from '~/lib/llm-config';
import { getMaieuticSystemPrompt } from '~/features/ai-coach/prompts/maieutic-coach';
import { LLMGuardrails } from '~/server/lib/llm-guardrails';

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
    context?: { userName?: string; projectContext?: string }
  ) {
    try {
      const model = getLLMModel(); // Récupère le modèle configuré dynamiquement
      const systemPrompt = getMaieuticSystemPrompt(context);

      // Conversion des messages UI (useChat) vers CoreMessage (AI SDK)
      const coreMessages = convertToCoreMessages(messages);

      return streamText({
        model: model,
        messages: coreMessages,
        system: systemPrompt,
        onFinish: ({ text }) => {
          // Async Ethical Check (Monitoring)
          const check = LLMGuardrails.validateNonClosure(text);
          if (!check.isValid) {
            console.warn(`[ETHICAL VIOLATION] AI generated forbidden terms: ${check.violations.join(', ')}`);
          }
        }
      });
    } catch (error) {
      console.error("LLM Service Error:", error);
      throw new Error("Le Coach IA est indisponible pour le moment. Veuillez vérifier la configuration.");
    }
  },
};