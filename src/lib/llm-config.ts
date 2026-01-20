export const LLM_MODELS = {
  PREMIUM: 'gpt-4o',
  FREE: 'gpt-3.5-turbo', // Fallback en attendant DeepSeek integration
  // DEEPSEEK: 'deepseek-chat',
} as const;

export const DEFAULT_MODEL = LLM_MODELS.PREMIUM; // Configurable via env var later
