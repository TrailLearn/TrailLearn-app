import { AiCoachService } from '~/features/ai-coach/services/ai-service';
import { auth } from '~/server/auth';
import { db } from '~/server/db';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth();

  // Load User Preferences if authenticated
  let userPreferences = {};
  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { preferences: true },
    });
    if (user?.preferences) {
      userPreferences = user.preferences as any;
    }
  }

  // Mock DVP Context (will be fetched from DB later)
  const mockContext = {
    userName: session?.user?.name || 'Explorateur',
    projectContext: 'Souhaite étudier aux USA, Budget: 5000€',
    userId: session?.user?.id,
    preferences: userPreferences,
  };

  const result = await AiCoachService.getChatStream(messages, mockContext);

  return result.toUIMessageStreamResponse();
}