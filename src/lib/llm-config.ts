import { createOpenAI } from '@ai-sdk/openai';
import { createAzure } from '@ai-sdk/azure';
// import { createMistral } from '@ai-sdk/mistral'; // À installer si besoin
import type { LanguageModel } from 'ai';

// --- CONFIGURATION TYPES ---

export const LLM_PROVIDERS = {
  OPENAI: 'openai',
  AZURE_OPENAI: 'azure_openai',
  DEEPSEEK: 'deepseek', // Compatible OpenAI
  MISTRAL: 'mistral',
} as const;

export type LLMProvider = typeof LLM_PROVIDERS[keyof typeof LLM_PROVIDERS];

// --- ENVIRONMENT VARIABLES ---

const provider = (process.env.LLM_PROVIDER || 'openai') as LLMProvider;

// --- PROVIDER FACTORY ---

export function getLLMModel(): LanguageModel {
  switch (provider) {
    case LLM_PROVIDERS.OPENAI:
      if (!process.env.OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY');
      const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
      return openai(process.env.OPENAI_MODEL || 'gpt-4o');

    case LLM_PROVIDERS.AZURE_OPENAI:
      if (!process.env.AZURE_RESOURCE_NAME || !process.env.AZURE_API_KEY) 
        throw new Error('Missing AZURE_RESOURCE_NAME or AZURE_API_KEY');
      const azure = createAzure({
        resourceName: process.env.AZURE_RESOURCE_NAME,
        apiKey: process.env.AZURE_API_KEY,
      });
      return azure(process.env.AZURE_DEPLOYMENT_NAME || 'gpt-4o');

    case LLM_PROVIDERS.DEEPSEEK:
      // DeepSeek est compatible OpenAI
      if (!process.env.DEEPSEEK_API_KEY) throw new Error('Missing DEEPSEEK_API_KEY');
      const deepseek = createOpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com',
      });
      return deepseek(process.env.DEEPSEEK_MODEL || 'deepseek-chat');

    default:
      throw new Error(`Unsupported LLM_PROVIDER: ${provider}`);
  }
}

// --- LEGACY COMPATIBILITY (Pour ne pas casser l'existant immédiatement) ---
export const LLM_MODELS = {
  PREMIUM: 'gpt-4o',
  FREE: 'gpt-3.5-turbo',
} as const;