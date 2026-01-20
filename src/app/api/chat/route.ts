import { AiCoachService } from '~/features/ai-coach/services/ai-service';
import { auth } from '~/server/auth';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth();

  // Mock DVP Context (will be fetched from DB later)
  const mockContext = {
    userName: session?.user?.name || 'Explorateur',
    projectContext: 'Souhaite étudier aux USA, Budget: 5000€',
  };

  const result = await AiCoachService.getChatStream(messages, mockContext);

  return result.toUIMessageStreamResponse();
}