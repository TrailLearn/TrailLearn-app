import { describe, it, expect, vi } from 'vitest';
import { generateDvpBSynthesis } from './generate-dvp-b';
import { generateObject } from 'ai';

vi.mock('ai', () => ({
  generateObject: vi.fn(),
}));

vi.mock('~/lib/llm-config', () => ({
  getLLMModel: vi.fn().mockReturnValue({}), // Mock model object
}));

describe('generateDvpBSynthesis', () => {
  it('should synthesize DVP-B from chat history', async () => {
    // Mock successful synthesis
    vi.mocked(generateObject).mockResolvedValueOnce({
      object: {
        summary: 'Student wants to study CS in USA.',
        hypotheses: [
          {
            title: 'Master CS at MIT',
            description: 'Top tier ambition',
            feasibilityScore: 40,
            isPreferred: true,
            details: { country: 'USA' }
          }
        ],
        globalClarityScore: 80
      },
    } as any);

    const messages = [
      { role: 'user', content: 'Je vise le MIT' }
    ];

    const result = await generateDvpBSynthesis(messages);

    expect(result.hypotheses).toHaveLength(1);
    expect(result.hypotheses[0]!.title).toBe('Master CS at MIT');
    expect(result.globalClarityScore).toBe(80);
  });
});
