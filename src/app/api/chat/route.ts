import { AiCoachService } from '~/features/ai-coach/services/ai-service';
import { auth } from '~/server/auth';
import { db } from '~/server/db';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth();

  let userPreferences: any = {};
  let projectContext = "";

  if (session?.user?.id) {
    // 1. Fetch User Preferences (Chat Memory)
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { preferences: true },
    });
    if (user?.preferences) {
      userPreferences = user.preferences;
    }

    // 2. Fetch Formal DVP Data (Wizard Memory)
    const dvp = await db.dvpRecord.findFirst({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: { data: true },
    });

    // 3. Build Unified Context string
    // This helps the AI understand what it knows about the user
    const pref = userPreferences;
    const dvpData = (dvp?.data as any) || {};
    
    // Merge: DVP data takes precedence, fallback to Chat Preferences
    const city = dvpData.city || pref.city || "Non défini";
    const country = dvpData.country || pref.country || "Non défini";
    const budget = dvpData.budget?.savings || pref.budget || "Non défini";
    const field = dvpData.studyType || pref.studyField || "Non défini";

    projectContext = `Projet: ${field} à ${city}, ${country}. Budget: ${budget}.`;
  } else {
    projectContext = "Utilisateur non connecté (Mode Démo)";
  }

  const context = {
    userName: session?.user?.name || 'Explorateur',
    projectContext,
    userId: session?.user?.id,
    preferences: userPreferences,
  };

  const result = await AiCoachService.getChatStream(messages, context);

  return result.toUIMessageStreamResponse();
}