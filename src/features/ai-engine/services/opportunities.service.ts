import { streamText, CoreMessage, tool } from "ai";
import { getLLMModel } from "~/lib/llm-config";
import { z } from "zod";

export class OpportunityService {
  /**
   * Main conversational interface for opportunities with tool support.
   */
  static async chat(messages: CoreMessage[]) {
    const model = getLLMModel();

    const systemPrompt = `
      Tu es l'IA d'Opportunités & Profil Builder de TrailLearn.
      Ton rôle est de transformer une cible professionnelle en parcours d'exécution concret.

      CONSIGNES :
      1. Identifie le métier et l'environnement visé.
      2. Pose des questions sur l'horizon temporel et les finances si nécessaire.
      3. Utilise l'outil 'showOpportunities' pour lister les écoles, bourses et concours.
      4. Utilise 'showWeeklyPlan' pour donner un planning de démarrage.

      IMPORTANT : Priorise toujours l'utilisation des outils pour présenter les opportunités.
    `;

    return streamText({
      model,
      system: systemPrompt,
      messages,
      tools: {
        showOpportunities: tool({
          description: "Affiche une liste d'opportunités (écoles, bourses, certifications).",
          parameters: z.object({
            opportunities: z.array(z.object({
              type: z.enum(["school", "master", "bootcamp", "scholarship", "contest", "event"]),
              name: z.string(),
              provider: z.string(),
              deadline: z.string().optional(),
              whyMe: z.string(),
            })),
          }),
          execute: async ({ opportunities }) => ({ type: "OPPORTUNITY_LIST", data: opportunities }),
        }),
        showWeeklyPlan: tool({
          description: "Affiche un planning hebdomadaire détaillé.",
          parameters: z.object({
            weeks: z.array(z.object({
              week: z.number(),
              focus: z.string(),
              tasks: z.array(z.string()),
            })),
          }),
          execute: async ({ weeks }) => ({ type: "WEEKLY_PLAN", data: weeks }),
        }),
      },
    });
  }
}
