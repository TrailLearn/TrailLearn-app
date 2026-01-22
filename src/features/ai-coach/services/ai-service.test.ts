import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiCoachService } from './ai-service';
import { db } from '~/server/db';
import { streamText } from 'ai';

// Mock dependencies
vi.mock('~/server/db', () => ({
  db: {
    user: {
      update: vi.fn(),
    },
    chatMessage: {
      create: vi.fn(),
    },
  },
}));

vi.mock('~/lib/llm-config', () => ({
  getLLMModel: vi.fn().mockReturnValue('mock-model'),
}));

vi.mock('~/features/ai-coach/prompts/maieutic-coach', () => ({
  getMaieuticSystemPrompt: vi.fn().mockReturnValue('mock-system-prompt'),
}));

vi.mock('~/server/lib/llm-guardrails', () => ({
  LLMGuardrails: {
    validateNonClosure: vi.fn().mockReturnValue({ isValid: true }),
  },
}));

vi.mock('../logic/synthesis/extract-preferences', () => ({
  extractPreferences: vi.fn().mockResolvedValue({}),
}));

vi.mock('ai', () => ({
  streamText: vi.fn().mockReturnValue({
    toUIMessageStreamResponse: vi.fn(),
  }),
}));

describe('AiCoachService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should save user message to database', async () => {
    const messages = [
      { role: 'user', content: 'Hello' }
    ];
    const context = {
      userId: 'user-123',
    };

    await AiCoachService.getChatStream(messages, context);

    expect(db.chatMessage.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-123',
        role: 'user',
        content: 'Hello',
      },
    });
  });

  it('should NOT save user message if userId is missing', async () => {
    const messages = [
      { role: 'user', content: 'Hello' }
    ];
    const context = {}; // No userId

    await AiCoachService.getChatStream(messages, context);

    expect(db.chatMessage.create).not.toHaveBeenCalled();
  });
});
