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
  
  // Use any to bypass version-specific type mismatches in this project environment
  const chatHelpers = useChat({
    api: apiEndpoint,
    initialMessages,
    body: { conversationId },
  } as any) as any;

  const { messages, append, status } = chatHelpers;
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const text = inputValue;
    setInputValue("");
    
    await append({
      role: "user",
      content: text,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto w-full border rounded-2xl bg-white shadow-2xl overflow-hidden">
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">Assistant TrailLearn Actif</p>
          </div>
        </div>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
      </div>

      <ScrollArea className="flex-grow p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((m: any) => (
            <div key={m.id} className={cn(
              "flex gap-4",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <Avatar className="w-8 h-8">
                {m.role === "user" ? (
                  <AvatarFallback className="bg-slate-100"><User className="w-4 h-4 text-slate-600" /></AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary font-bold"><Bot className="w-4 h-4" /></AvatarFallback>
                )}
              </Avatar>
              
              <div className={cn(
                "flex flex-col max-w-[80%] space-y-2",
                m.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed prose prose-sm max-w-none break-words",
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none shadow-md prose-invert" 
                    : "bg-slate-100 text-slate-800 rounded-tl-none border prose-neutral"
                )}>
                  <ReactMarkdown>
                    {m.content}
                  </ReactMarkdown>
                </div>
                
                {m.structuredData && (
                  <UIBlockRenderer block={m.structuredData as UIBlock} />
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <form onSubmit={onFormSubmit} className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-grow h-12 rounded-xl"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} className="h-12 w-12 rounded-xl">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
