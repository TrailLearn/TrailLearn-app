import { OpportunityService } from "~/features/ai-engine/services/opportunities.service";
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

    // Save latest User Message
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

    const result = await OpportunityService.chat(messages);

    return result.toDataStreamResponse({
      onFinish: async (completion) => {
        let structuredData = null;
        if ((completion as any).toolResults && (completion as any).toolResults.length > 0) {
          structuredData = (completion as any).toolResults[0].result;
        }

        await db.aiMessage.create({
          data: {
            conversationId,
            role: "assistant",
            content: completion.text || (structuredData ? "Analyse terminée." : ""),
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
    console.error("[OpportunitiesRoute] Critical error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
