import { streamText } from "ai";
import { getLLMModel } from "~/lib/llm-config";
import { z } from "zod";

export class OpportunityService {
  /**
   * Main conversational interface for opportunities.
   */
  static async chat(messages: any[]) {
    const model = getLLMModel();

    const systemPrompt = `
      Tu es l'IA d'Opportunités & Profil Builder de TrailLearn.
      Ton rôle est de transformer une cible professionnelle en parcours d'exécution concret.
    `;

    return streamText({
      model,
      system: systemPrompt,
      messages,
      tools: {
        showOpportunities: {
          description: "Affiche une liste d'opportunités.",
          parameters: z.object({
            opportunities: z.array(z.object({
              type: z.enum(["school", "master", "bootcamp", "scholarship", "contest", "event"]),
              name: z.string(),
              provider: z.string(),
              deadline: z.string().optional(),
              whyMe: z.string(),
            })),
          }),
        },
      } as any,
    });
  }
}
