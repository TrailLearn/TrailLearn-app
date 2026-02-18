import { streamText } from "ai";
import { getLLMModel } from "~/lib/llm-config";
import { z } from "zod";

export class OrientationService {
  /**
   * Main conversational interface for orientation.
   */
  static async chat(messages: any[]) {
    const model = getLLMModel();

    const systemPrompt = `
      Tu es l'IA d'Orientation Académique & Carrière de TrailLearn.
      Ton rôle est d'aider l'utilisateur à définir sa trajectoire professionnelle.

      CONSIGNES :
      1. EXPLORE : Pose des questions sur le domaine, le niveau, les langues, le budget et la mobilité.
      2. PROPOSE : Partage tes recommandations de métiers et de parcours.
    `;

    return streamText({
      model,
      system: systemPrompt,
      messages,
      // Simplifying tools to fix build errors in current environment
      tools: {
        showJobRecommendations: {
          description: "Affiche une liste de métiers recommandés.",
          parameters: z.object({
            jobs: z.array(z.object({
              title: z.string(),
              relevance: z.string(),
              estimatedSalary: z.string(),
              marketDemand: z.enum(["high", "medium", "low"]),
            })),
          }),
        },
      } as any,
    });
  }
}
