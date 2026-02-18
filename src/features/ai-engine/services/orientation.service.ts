import { streamText, CoreMessage, tool } from "ai";
import { getLLMModel } from "~/lib/llm-config";
import { OrientationOutputSchema } from "../types";
import { z } from "zod";

export class OrientationService {
  /**
   * Main conversational interface for orientation with tool support.
   */
  static async chat(messages: CoreMessage[]) {
    const model = getLLMModel();

    const systemPrompt = `
      Tu es l'IA d'Orientation Académique & Carrière de TrailLearn.
      Ton rôle est d'aider l'utilisateur à définir sa trajectoire professionnelle.

      CONSIGNES :
      1. EXPLORE : Pose des questions sur le domaine, le niveau, les langues, le budget et la mobilité.
      2. PROPOSE : Dès que tu as assez d'infos, utilise l'outil 'showJobRecommendations' pour afficher les métiers suggérés.
      3. PLANIFIE : Utilise 'showActionPlan' pour donner une roadmap concrète.
      4. ANALYSE : Utilise 'showSkillsGap' pour identifier ce qu'il faut apprendre.

      IMPORTANT : Ne te contente pas de lister les métiers en texte, utilise TOUJOURS les outils dédiés pour un affichage visuel optimal.
    `;

    return streamText({
      model,
      system: systemPrompt,
      messages,
      tools: {
        showJobRecommendations: tool({
          description: "Affiche une liste de métiers recommandés sous forme de cartes.",
          parameters: z.object({
            jobs: z.array(z.object({
              title: z.string(),
              relevance: z.string(),
              estimatedSalary: z.string(),
              marketDemand: z.enum(["high", "medium", "low"]),
            })),
          }),
          execute: async ({ jobs }) => ({ type: "JOB_RECOMMENDATION", data: jobs }),
        }),
        showSkillsGap: tool({
          description: "Affiche les compétences manquantes sous forme de badges.",
          parameters: z.object({
            gaps: z.array(z.object({
              skill: z.string(),
              priority: z.enum(["critical", "important", "optional"]),
            })),
          }),
          execute: async ({ gaps }) => ({ type: "SKILLS_GAP", data: gaps }),
        }),
        showActionPlan: tool({
          description: "Affiche un plan d'action par étapes (court, moyen, long terme).",
          parameters: z.object({
            shortTerm: z.array(z.string()),
            mediumTerm: z.array(z.string()),
            longTerm: z.array(z.string()),
          }),
          execute: async (plan) => ({ type: "ACTION_PLAN", data: plan }),
        }),
      },
    });
  }
}
