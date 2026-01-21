import { generateObject } from 'ai';
import { getLLMModel } from '~/lib/llm-config';
import { z } from 'zod';

const synthesisSchema = z.object({
  summary: z.string().describe("A 3-4 sentence summary of the student's project and current maturity."),
  hypotheses: z.array(z.object({
    title: z.string().describe("Concise title of the hypothesis (e.g., 'Master in Berlin')"),
    description: z.string().describe("Quick summary of why this is considered."),
    feasibilityScore: z.number().min(0).max(100).describe("AI estimated feasibility based on the chat."),
    isPreferred: z.boolean().describe("True if the student showed a clear preference for this one."),
    details: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
      budget: z.number().optional(),
      studyType: z.string().optional(),
    }),
  })).min(1),
  globalClarityScore: z.number().min(0).max(100),
});

export type DvpBSynthesis = z.infer<typeof synthesisSchema>;

/**
 * Uses LLM to extract structured project hypotheses from chat history.
 */
export async function generateDvpBSynthesis(messages: any[]): Promise<DvpBSynthesis> {
  const model = getLLMModel();
  
  const { object } = await generateObject({
    model,
    schema: synthesisSchema,
    system: `Tu es un expert en synthèse de données. Analyse l'historique de chat d'un étudiant et extrais les différentes hypothèses de projet discutées.
    Identifie les villes, pays et budgets évoqués. Évalue la faisabilité de chaque hypothèse sur 100.
    Identifie si l'étudiant a une préférence marquée pour l'un des scénarios.`,
    messages: messages.map(m => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content || '',
    })),
  });

  return object;
}
