import { describe, it, expect, vi } from 'vitest';
import { extractPreferences } from './extract-preferences';
import { generateObject } from 'ai';

vi.mock('ai', () => ({
  generateObject: vi.fn(),
}));

vi.mock('~/lib/llm-config', () => ({
  getLLMModel: vi.fn().mockReturnValue({}), // Mock model object
}));

describe('extractPreferences', () => {
  it('should extract preferences from messages', async () => {
    // Mock successful extraction
    vi.mocked(generateObject).mockResolvedValueOnce({
      object: {
        city: 'Berlin',
        budget: 1000,
        keyConcerns: ['Cost of living']
      },
    } as any);

    const messages = [
      { role: 'user', content: 'Je veux aller à Berlin' },
      { role: 'assistant', content: 'Quel est ton budget ?' },
      { role: 'user', content: 'Environ 1000 euros' }
    ];

    const result = await extractPreferences(messages, {});

    expect(result.city).toBe('Berlin');
    expect(result.budget).toBe(1000);
    expect(generateObject).toHaveBeenCalled();
  });
});
