import { generateObject } from "ai";
import { getLLMModel } from "~/lib/llm-config";
import { OrientationOutputSchema } from "../types";
import type { OrientationInputs, OrientationOutput } from "../types";

export class OrientationService {
  /**
   * Generates a structured career and academic orientation plan.
   * Handles bidirectional reasoning: Job -> Environment OR Profile -> Best Fit.
   */
  static async generatePlan(inputs: OrientationInputs): Promise<OrientationOutput> {
    const model = getLLMModel();

    const systemPrompt = `
      Tu es l'IA d'Orientation Académique & Carrière de TrailLearn, une institution digitale d'orientation responsable.
      Ton objectif est de produire des recommandations structurées, actionnables et basées sur des données réelles du marché.

      CONSIGNES DE RAISONNEMENT :
      1. Analyse le profil académique et les compétences actuelles.
      2. Si l'utilisateur vise un métier spécifique (targetJob), évalue sa pertinence par rapport à son profil et suggère les meilleurs environnements (villes/pays).
      3. Si l'utilisateur vise un environnement (targetEnvironment), suggère les métiers les plus adaptés à son profil dans cette zone.
      4. Si l'utilisateur est indécis, propose le Top 3 à 5 des métiers les plus cohérents avec son domaine d'étude et ses compétences.
      5. Sois réaliste sur les salaires et la demande du marché.
      6. Identifie clairement les "Skills Gaps" (ce qui manque pour atteindre la cible).
      7. Construis un plan d'action concret sur 12 mois.

      IMPORTANT : Tu dois impérativement répondre au format JSON structuré correspondant au schéma demandé.
    `;

    const userPrompt = `
      Voici les données de l'utilisateur :
      - Domaine d'étude : ${inputs.studyDomain}
      - Niveau académique : ${inputs.academicLevel}
      - Compétences actuelles : ${inputs.currentSkills.join(", ")}
      - Langues parlées : ${inputs.languages.join(", ")}
      - Budget approximatif : ${inputs.approximateBudget}
      - Salaire visé : ${inputs.targetSalary}
      - Mobilité souhaitée : ${inputs.mobility}
      ${inputs.targetEnvironment ? `- Environnement cible : ${inputs.targetEnvironment}` : ""}
      ${inputs.targetJob ? `- Métier visé : ${inputs.targetJob}` : ""}
    `;

    try {
      const { object } = await generateObject({
        model,
        schema: OrientationOutputSchema,
        system: systemPrompt,
        prompt: userPrompt,
      });

      return object;
    } catch (error) {
      console.error("OrientationService.generatePlan failed:", error);
      throw new Error("Échec de la génération du plan d'orientation. Veuillez réessayer.");
    }
  }
}
