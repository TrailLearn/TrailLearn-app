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
  let isReturningFromInactivity = false;
  let overdueTaskCount = 0;

  if (session?.user?.id) {
    const userId = session.user.id;

    // 1. Fetch User Data (Chat Memory + Inactivity tracking)
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { preferences: true, lastActiveAt: true },
    });
    
    if (user) {
      userPreferences = user.preferences;
      
      // Check inactivity (> 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (user.lastActiveAt < sevenDaysAgo) {
        isReturningFromInactivity = true;
      }

      // Update activity timestamp
      await db.user.update({
        where: { id: userId },
        data: { lastActiveAt: new Date() },
      });
    }

    // 2. Check for Overdue Tasks
    const overdueTasks = await db.task.count({
      where: {
        actionPlan: { userId },
        status: "PENDING",
        dueDate: { lt: new Date() },
      }
    });
    overdueTaskCount = overdueTasks;

    // 3. Fetch Formal DVP Data (Wizard Memory)
    const dvp = await db.dvpRecord.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: { data: true },
    });

    // 4. Build Unified Context string
    const dvpData = (dvp?.data as any) || {};
    const city = dvpData.city || userPreferences.city || "Non défini";
    const country = dvpData.country || userPreferences.country || "Non défini";
    const budget = dvpData.budget?.savings || userPreferences.budget || "Non défini";
    const field = dvpData.studyType || userPreferences.studyField || "Non défini";

    projectContext = `Projet: ${field} à ${city}, ${country}. Budget: ${budget}.`;
  } else {
    projectContext = "Utilisateur non connecté (Mode Démo)";
  }

  const context = {
    userName: session?.user?.name || 'Explorateur',
    projectContext,
    userId: session?.user?.id,
    preferences: userPreferences,
    isReturningFromInactivity,
    overdueTaskCount,
  };

  const result = await AiCoachService.getChatStream(messages, context);

  return result.toUIMessageStreamResponse();
}