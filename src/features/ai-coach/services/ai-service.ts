import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { LLM_MODELS, DEFAULT_MODEL } from '~/lib/llm-config';

/**
 * Service to handle AI Coach interactions.
 * Encapsulates LLM logic and prompts.
 */
export const AiCoachService = {
  /**
   * Generates a streaming response for the maieutic chat.
   * @param messages - The conversation history
   * @param modelTier - 'PREMIUM' | 'FREE' (Optional, defaults to PREMIUM/DEFAULT)
   */
  async getChatStream(messages: any[], modelTier: keyof typeof LLM_MODELS = 'PREMIUM') {
    const modelName = LLM_MODELS[modelTier] || DEFAULT_MODEL;
    
    return streamText({
      model: openai(modelName),
      messages,
      // System prompts will be injected here in Story 7.2
    });
  },
};
