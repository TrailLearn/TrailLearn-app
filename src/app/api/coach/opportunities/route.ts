import { streamText } from "ai";
import { OpportunityService } from "~/features/ai-engine/services/opportunities.service";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const { messages, conversationId } = await req.json();

  const conversation = await db.aiConversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation || conversation.userId !== session.user.id) {
    return new Response("Forbidden", { status: 403 });
  }

  // Save latest User Message
  const lastUserMessage = messages[messages.length - 1];
  if (lastUserMessage && lastUserMessage.role === "user") {
    await db.aiMessage.create({
      data: {
        conversationId,
        role: "user",
        content: lastUserMessage.content,
      },
    });
  }

  const result = await OpportunityService.chat(messages);

  return result.toDataStreamResponse({
    getFinishReason: () => "stop",
    onFinish: async (completion) => {
      let structuredData = null;
      if (completion.toolResults && completion.toolResults.length > 0) {
        structuredData = completion.toolResults[0].result;
      }

      await db.aiMessage.create({
        data: {
          conversationId,
          role: "assistant",
          content: completion.text || (structuredData ? "Voici les opportunités identifiées :" : ""),
          structuredData: structuredData as any,
        },
      });
      
      await db.aiConversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });
    }
  });
}
