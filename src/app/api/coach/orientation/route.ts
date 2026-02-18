import { OrientationService } from "~/features/ai-engine/services/orientation.service";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

    const { messages, conversationId } = await req.json();

    if (!conversationId) return new Response("Missing conversationId", { status: 400 });

    const conversation = await db.aiConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.userId !== session.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    // Save User Message
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && lastUserMessage.role === "user") {
      await db.aiMessage.create({
        data: {
          conversationId,
          role: "user",
          content: typeof lastUserMessage.content === 'string' ? lastUserMessage.content : "Message",
        },
      });
    }

    const result = await OrientationService.chat(messages);

    return (result as any).toDataStreamResponse({
      onFinish: async (completion: any) => {
        let structuredData = null;
        if (completion.toolResults && completion.toolResults.length > 0) {
          structuredData = completion.toolResults[0].result;
        }

        await db.aiMessage.create({
          data: {
            conversationId,
            role: "assistant",
            content: completion.text || (structuredData ? "Résultats de l'analyse." : ""),
            structuredData: structuredData as any,
          },
        });
        
        await db.aiConversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        });
      }
    });
  } catch (error) {
    console.error("[OrientationRoute] Critical error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
