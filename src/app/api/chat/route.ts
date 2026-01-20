import { AiCoachService } from '~/features/ai-coach/services/ai-service';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Future: Extract user tier from session to choose model
  const result = await AiCoachService.getChatStream(messages);

  return result.toUIMessageStreamResponse();
}
