import { generateObject } from "ai";
import { getLLMModel } from "~/lib/llm-config";
import { OpportunityOutputSchema } from "../types";
import type { OpportunityInputs, OpportunityOutput } from "../types";

export class OpportunityService {
  /**
   * Transforms an orientation target into concrete opportunities and a weekly action plan.
   */
  static async generateOpportunities(inputs: OpportunityInputs): Promise<OpportunityOutput> {
    const model = getLLMModel();

    const systemPrompt = `
      Tu es l'IA d'Opportunités & Profil Builder de TrailLearn.
      Ton rôle est de transformer une cible professionnelle en un parcours d'exécution concret.

      CONSIGNES :
      1. Propose des opportunités réelles ou très probables (Écoles, Masters, Bootcamps, Bourses).
      2. Priorise les actions selon les contraintes financières de l'utilisateur : ${inputs.financialConstraints}.
      3. Recommande des certifications reconnues par l'industrie pour le métier : ${inputs.targetJob}.
      4. Suggère 2-3 projets de portfolio spécifiques qui feront la différence pour un recruteur dans l'environnement : ${inputs.targetEnvironment}.
      5. Crée un "Plan Hebdomadaire" (Weekly Plan) détaillé pour les premiers mois afin de lancer la dynamique.
      6. Sois précis sur le "Pourquoi moi" (justification de l'opportunité par rapport au profil).

      IMPORTANT : Tu dois impérativement répondre au format JSON structuré.
    `;

    const userPrompt = `
      Cible de l'utilisateur :
      - Métier visé : ${inputs.targetJob}
      - Environnement visé : ${inputs.targetEnvironment}
      - Horizon temporel : ${inputs.horizonMonths} mois
      - Contraintes financières : ${inputs.financialConstraints}
    `;

    try {
      const { object } = await generateObject({
        model,
        schema: OpportunityOutputSchema,
        system: systemPrompt,
        prompt: userPrompt,
      });

      return object;
    } catch (error) {
      console.error("OpportunityService.generateOpportunities failed:", error);
      throw new Error("Échec de la génération des opportunités. Veuillez réessayer.");
    }
  }
}
