"use client";

import { useEffect, useState, useRef } from "react";
import { api } from "~/trpc/react";
import { CoachChatInterface } from "~/features/ai-coach/components/coach-chat-interface";
import { Button } from "~/components/ui/button";
import { ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function OrientationChatPage() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const creatingRef = useRef(false);
  
  const createConv = api.aiCoach.createConversation.useMutation({
    onSuccess: (data) => {
      setConversationId(data.id);
      creatingRef.current = false;
    },
    onError: () => {
      creatingRef.current = false;
    }
  });

  const getConvs = api.aiCoach.getConversations.useQuery(
    { type: "ORIENTATION" },
    { 
      refetchOnWindowFocus: false,
      retry: 1 
    }
  );

  useEffect(() => {
    if (getConvs.isSuccess && !conversationId && !creatingRef.current) {
      if (getConvs.data && getConvs.data.length > 0) {
        const firstId = getConvs.data[0]?.id;
        if (firstId) setConversationId(firstId);
      } else {
        creatingRef.current = true;
        createConv.mutate({ type: "ORIENTATION" });
      }
    }
  }, [getConvs.isSuccess, getConvs.data, conversationId]);

  const messagesQuery = api.aiCoach.getMessages.useQuery(
    { conversationId: conversationId! },
    { 
      enabled: !!conversationId,
      refetchOnWindowFocus: false
    }
  );

  // Loading state handling
  const isLoading = getConvs.isLoading || (creatingRef.current && createConv.isPending) || (!!conversationId && messagesQuery.isLoading);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse text-sm">Initialisation de votre Coach d'Orientation...</p>
      </div>
    );
  }

  if (getConvs.isError || createConv.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4 text-center px-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-bold">Erreur de connexion</h2>
        <p className="text-muted-foreground max-w-md">Nous n'avons pas pu initialiser la discussion. Veuillez vérifier votre connexion et rafraîchir la page.</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
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
          <h1 className="text-2xl font-bold tracking-tight">Orientation Académique</h1>
          <p className="text-sm text-muted-foreground italic">Powered by TrailLearn Intelligence</p>
        </div>
      </div>
      
      <div className="flex-grow">
        {conversationId ? (
          <CoachChatInterface 
            conversationId={conversationId} 
            apiEndpoint="/api/coach/orientation"
            title="Assistant Orientation"
            onReset={() => {
              setConversationId(null);
              void getConvs.refetch();
            }}
            initialMessages={messagesQuery.data?.map(m => ({
              id: m.id,
              role: m.role,
              content: m.content,
              structuredData: m.structuredData
            }))}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Préparation de la session...
          </div>
        )}
      </div>
    </div>
  );
}
