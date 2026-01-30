import { AiCoachService } from '~/features/ai-coach/services/ai-service';
import { ContextService } from '~/features/being-profile/services/context-service';
import { ShadowBoundaryService } from '~/features/being-profile/services/shadow-boundary-service';
import { auth } from '~/server/auth';
import { db } from '~/server/db';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth();

  let userPreferences: any = {};
  let projectContext = "";
  let isReturningFromInactivity = false;
  let overdueTaskCount = 0;
  let beingProfile = null;
  let shadowContext = null;

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

    // 4. Fetch Being Profile Context
    beingProfile = await ContextService.getUserContext(userId);

    // 5. Shadow Context Injection (Opt-in based on intent)
    // Minimization: Only fetch/inject if conversation likely requires it.
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    // Unique list of triggers
    const shadowTriggers = ["peur", "crainte", "angoisse", "bloqué", "frein", "honte", "doute", "confiance", "échec", "panique"];
    
    // Use regex for word boundary matching to avoid false positives (e.g. "vapeur" matching "peur")
    const shouldInjectShadow = shadowTriggers.some(t => new RegExp(`\\b${t}\\b`, 'i').test(lastMessage));
    
    if (shouldInjectShadow) {
       shadowContext = await ShadowBoundaryService.getShadowContextSummary(userId);
    }

    // 6. Build Unified Context string
    const dvpData = (dvp?.data as any) || {};
    
    // Safely access nested DVP data or fallback to preferences
    const city = dvpData.project?.city || userPreferences.city || "Non défini";
    const country = dvpData.project?.country || userPreferences.country || "Non défini";
    const field = dvpData.project?.studyType || userPreferences.studyField || "Non défini";
    
    // Calculate estimated monthly budget if available
    let budgetDisplay = userPreferences.budget || "Non défini";
    if (dvpData.budget) {
        const savings = Number(dvpData.budget.savings || 0);
        const guarantor = Number(dvpData.budget.guarantorHelp || 0);
        const other = Number(dvpData.budget.otherIncome || 0);
        // Estimate for 10 months
        const monthly = Math.round((savings / 10) + guarantor + other);
        budgetDisplay = `${monthly}€/mois (estimé)`;
    }

    projectContext = `Projet: ${field} à ${city}, ${country}. Budget: ${budgetDisplay}.`;
  } else {
    projectContext = "Utilisateur non connecté (Mode Démo)";
  }

  const context = {
    userName: session?.user?.name || 'Explorateur',
    projectContext,
    userId: session?.user?.id,
    beingProfile,
    shadowContext, // Injected conditionally
    preferences: userPreferences,
    isReturningFromInactivity,
    overdueTaskCount,
  };

  const result = await AiCoachService.getChatStream(messages, context);

  return result.toUIMessageStreamResponse();
}