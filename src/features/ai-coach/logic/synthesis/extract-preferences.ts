import { generateObject } from 'ai';
import { getLLMModel } from '~/lib/llm-config';
import { z } from 'zod';

const preferencesSchema = z.object({
  city: z.string().nullable().describe("Cible de ville (ex: Paris)"),
  country: z.string().nullable().describe("Pays cible"),
  budget: z.number().nullable().describe("Budget annuel en euros"),
  studyField: z.string().nullable().describe("Domaine d'études"),
  degreeLevel: z.string().nullable().describe("Niveau (Licence, Master...)"),
  keyConcerns: z.array(z.string()).describe("Liste des craintes ou points d'attention"),
});

export type UserPreferences = z.infer<typeof preferencesSchema>;

/**
 * Extracts key preferences from the latest chat messages to update the user profile context.
 * This runs asynchronously to avoid blocking the main chat.
 */
export async function extractPreferences(messages: any[], currentPrefs: any): Promise<UserPreferences> {
  const model = getLLMModel();

  // Optimization: Only analyze the last 4 messages to save tokens + current prefs
  const recentMessages = messages.slice(-4);
  
  const { object } = await generateObject({
    model,
    schema: preferencesSchema,
    system: `Tu es un assistant silencieux qui met à jour le profil de l'étudiant.
    Analyse les derniers messages pour extraire ou mettre à jour les préférences clés (Ville, Budget, Domaine).
    Fusionne intelligemment avec les préférences existantes fournies: ${JSON.stringify(currentPrefs)}.
    Ne supprime pas une info existante sauf si l'utilisateur l'a explicitement contredite.`,
    messages: recentMessages.map(m => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content || '',
    })),
  });

  return object;
}
