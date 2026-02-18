"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Loader2, Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";
import { UIBlockRenderer } from "./ui-block-renderer";
import { type UIBlock } from "~/features/ai-engine/types";

interface CoachChatInterfaceProps {
  conversationId: string;
  apiEndpoint: string;
  initialMessages?: any[];
  title: string;
}

export function CoachChatInterface({ 
  conversationId, 
  apiEndpoint, 
  initialMessages = [],
  title 
}: CoachChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: apiEndpoint,
    body: { conversationId },
    initialMessages,
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto w-full border rounded-2xl bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">Assistant TrailLearn Actif</p>
          </div>
        </div>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-grow p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <Bot className="w-12 h-12 text-slate-200 mx-auto" />
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Bonjour ! Je suis prêt à vous accompagner. Par quoi souhaitez-vous commencer ?
              </p>
            </div>
          )}
          
          {messages.map((m) => (
            <div key={m.id} className={cn(
              "flex gap-4 animate-in slide-in-from-bottom-2 duration-300",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <Avatar className={cn("w-8 h-8", m.role === "user" ? "bg-slate-100" : "bg-primary/10")}>
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
              </Avatar>
              
              <div className={cn(
                "flex flex-col max-w-[80%] space-y-2",
                m.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none shadow-md" 
                    : "bg-slate-100 text-slate-800 rounded-tl-none border"
                )}>
                  {m.content}
                </div>
                
                {/* Render structured data if available */}
                {(m as any).structuredData && (
                  <UIBlockRenderer block={(m as any).structuredData as UIBlock} />
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Posez votre question ou répondez au Coach..."
            className="flex-grow h-12 rounded-xl border-slate-200 focus-visible:ring-primary"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="h-12 w-12 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest font-medium">
          L'IA peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
}
