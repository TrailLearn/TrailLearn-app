"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { CoachChatInterface } from "~/features/ai-coach/components/coach-chat-interface";
import { Button } from "~/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function OpportunitiesChatPage() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const createConv = api.aiCoach.createConversation.useMutation({
    onSuccess: (data) => setConversationId(data.id)
  });

  const getConvs = api.aiCoach.getConversations.useQuery({ type: "OPPORTUNITY" });

  useEffect(() => {
    if (getConvs.isSuccess && !conversationId) {
      if (getConvs.data && getConvs.data.length > 0) {
        setConversationId(getConvs.data[0]?.id ?? null);
      } else {
        createConv.mutate({ type: "OPPORTUNITY" });
      }
    }
  }, [getConvs.isSuccess, getConvs.data, conversationId]);

  const messagesQuery = api.aiCoach.getMessages.useQuery(
    { conversationId: conversationId! },
    { enabled: !!conversationId }
  );

  if (getConvs.isLoading || createConv.isPending || (conversationId && messagesQuery.isLoading)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 flex flex-col h-full max-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/coach">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Opportunités & Profil Builder</h1>
          <p className="text-sm text-muted-foreground">Construisez votre chemin vers le succès</p>
        </div>
      </div>
      
      {conversationId && (
        <CoachChatInterface 
          conversationId={conversationId} 
          apiEndpoint="/api/coach/opportunities"
          title="Assistant Opportunités"
          initialMessages={messagesQuery.data?.map(m => ({
            id: m.id,
            role: m.role,
            content: m.content,
            structuredData: m.structuredData
          }))}
        />
      )}
    </div>
  );
}
