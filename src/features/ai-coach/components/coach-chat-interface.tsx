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
  
  const { messages, append, status, error } = useChat({
    api: apiEndpoint,
    initialMessages,
    body: { conversationId },
  }) as any;

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, status]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const text = inputValue;
    setInputValue("");
    
    try {
      console.log("[CoachChat] Appending message:", text);
      await append({
        role: "user",
        content: text,
      });
    } catch (err) {
      console.error("[CoachChat] Append failed:", err);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-4xl mx-auto w-full border rounded-2xl bg-white shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">{title}</h3>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">TrailLearn Coach v2</p>
          </div>
        </div>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-grow p-4 md:p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-12 space-y-4">
              <Bot className="w-12 h-12 text-slate-200 mx-auto" />
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Posez votre première question pour lancer l'analyse.
              </p>
            </div>
          )}
          
          {messages.map((m: any) => (
            <div key={m.id} className={cn(
              "flex gap-3",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <Avatar className="w-8 h-8 flex-shrink-0 border">
                {m.role === "user" ? (
                  <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-bold">MOI</AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">IA</AvatarFallback>
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
                
                {m.structuredData && (
                  <div className="w-full">
                    <UIBlockRenderer block={m.structuredData as UIBlock} />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0 border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">...</AvatarFallback>
              </Avatar>
              <div className="bg-slate-50 text-slate-500 rounded-2xl rounded-tl-none border px-4 py-2 text-sm flex items-center gap-2 italic">
                <Loader2 className="w-3 h-3 animate-spin" />
                Réflexion en cours...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={onFormSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Échangez avec votre coach..."
            className="flex-grow h-11 rounded-xl"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !inputValue.trim()}
            className="h-11 w-11 rounded-xl shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
