"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Loader2, Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";
import { UIBlockRenderer } from "./ui-block-renderer";
import { type UIBlock } from "~/features/ai-engine/types";
import ReactMarkdown from "react-markdown";

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
  const [inputValue, setInputValue] = useState("");
  
  // Debug log to trace initialization
  useEffect(() => {
    console.log(`[CoachChat] Initializing with convId: ${conversationId}, endpoint: ${apiEndpoint}, messages count: ${initialMessages?.length}`);
  }, [conversationId, apiEndpoint, initialMessages]);

  const chatHelpers = useChat({
    api: apiEndpoint,
    initialMessages,
    body: { conversationId },
  } as any) as any;

  // Extract helpers with fallbacks
  const messages = chatHelpers.messages ?? [];
  const append = chatHelpers.append;
  const status = chatHelpers.status;
  const error = chatHelpers.error;

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const text = inputValue;
    setInputValue("");
    
    try {
      await append({
        role: "user",
        content: text,
      });
    } catch (err) {
      console.error("[CoachChat] Failed to send message:", err);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-4xl mx-auto w-full border rounded-2xl bg-white shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">{title}</h3>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">Assistant TrailLearn Actif</p>
          </div>
        </div>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-grow p-4 md:p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-12 space-y-4">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto border-2 border-dashed">
                <Bot className="w-8 h-8 text-slate-300" />
              </div>
              <div className="space-y-2">
                <p className="font-bold text-slate-800">Discussion vide</p>
                <p className="text-muted-foreground text-xs max-w-[200px] mx-auto">
                  Posez votre première question pour lancer l'analyse de votre projet.
                </p>
              </div>
            </div>
          )}
          
          {messages.map((m: any) => (
            <div key={m.id} className={cn(
              "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <Avatar className="w-8 h-8 flex-shrink-0 border">
                {m.role === "user" ? (
                  <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">MOI</AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">IA</AvatarFallback>
                )}
              </Avatar>
              
              <div className={cn(
                "flex flex-col max-w-[85%] md:max-w-[75%] space-y-2",
                m.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
                )}>
                  <div className="prose prose-sm max-w-none break-words dark:prose-invert">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
                
                {/* Structured Data rendering */}
                {m.structuredData && (
                  <div className="w-full max-w-full overflow-hidden">
                    <UIBlockRenderer block={m.structuredData as UIBlock} />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Thinking indicator */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 animate-pulse">
              <Avatar className="w-8 h-8 flex-shrink-0 border">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">IA</AvatarFallback>
              </Avatar>
              <div className="bg-slate-50 text-slate-500 rounded-2xl rounded-tl-none border px-4 py-2 text-sm flex items-center gap-2 italic">
                <Loader2 className="w-3 h-3 animate-spin" />
                Analyse en cours...
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20 text-center">
              Désolé, une erreur est survenue. Veuillez réessayer d'envoyer votre message.
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-white shadow-inner">
        <form onSubmit={onFormSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Échangez avec votre coach..."
            className="flex-grow h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-primary shadow-none"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !inputValue.trim()}
            className="h-11 w-11 rounded-xl shadow-md transition-all active:scale-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
