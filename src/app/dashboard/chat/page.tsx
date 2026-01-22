import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { ChatDashboardClient } from "./chat-dashboard-client";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  // Fetch chat history
  const history = await db.chatMessage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    take: 50, // Limit history to last 50 messages for performance
  });

  // Map to format expected by useChat
  const initialMessages = history.map((msg) => ({
    id: msg.id,
    role: msg.role,
    content: msg.content,
  }));

  return <ChatDashboardClient initialMessages={initialMessages} />;
}