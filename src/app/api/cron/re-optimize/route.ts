import { NextResponse } from "next/server";
import { db } from "~/server/db";

/**
 * Daily Cron Job to detect inactive users and trigger re-optimization.
 * Triggered by: External cron service (Vercel, GitHub Actions, etc.)
 */
export async function GET(req: Request) {
  // Security Check: Optional secret header
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 1. Find "Ghost" users: inactive for 7+ days with pending tasks
    const ghostUsers = await db.user.findMany({
      where: {
        lastActiveAt: { lt: sevenDaysAgo },
        actionPlan: {
          tasks: {
            some: { status: "PENDING" }
          }
        }
      },
      select: { id: true, name: true }
    });

    console.log(`[CRON] Found ${ghostUsers.length} inactive users with pending tasks.`);

    // 2. Fetch Notification Template
    const templateRule = await db.businessRule.findUnique({
      where: { key: "notification_templates" }
    });
    const templates = (templateRule?.value as any) || {};
    const messageTemplate = templates.re_optimize || "Bonjour {{name}}, votre coach est prêt à vous aider à réorganiser votre plan !";

    // 3. Trigger Notifications (Sequential to prevent DB saturation)
    let notificationsSent = 0;
    for (const user of ghostUsers) {
      // Avoid duplicate notification for same reason if one exists recently
      const recentNotif = await db.notification.findFirst({
        where: {
          userId: user.id,
          type: "RE_OPTIMIZE",
          createdAt: { gt: sevenDaysAgo }
        }
      });

      if (!recentNotif) {
        const message = messageTemplate.replace("{{name}}", user.name || 'Explorateur');
        
        await db.notification.create({
          data: {
            userId: user.id,
            message,
            type: "RE_OPTIMIZE",
          }
        });
        notificationsSent++;
      }
    }

    return NextResponse.json({
      processed: ghostUsers.length,
      notificationsSent
    });

  } catch (error) {
    console.error("[CRON ERROR]", error);
    return NextResponse.json({ error: "Failed to process re-optimization cron" }, { status: 500 });
  }
}
