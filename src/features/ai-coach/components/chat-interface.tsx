'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';

export function ChatInterface() {
  const { messages, sendMessage, status, error } = useChat();
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLoading = status === 'submitted' || status === 'streaming';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    await sendMessage({ text: inputValue });
    setInputValue('');
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-3xl mx-auto border rounded-xl shadow-sm bg-white overflow-hidden">
      {/* Zone de messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
            <Bot className="w-12 h-12 mb-4 text-blue-600/50" />
            <h3 className="text-lg font-semibold text-gray-900">Coach Miroir Lucide</h3>
            <p className="max-w-sm mt-2">
              Je suis là pour t'aider à clarifier ton projet. Parle-moi de tes ambitions, de ton budget ou de tes doutes.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-3",
                  m.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="w-8 h-8">
                  {m.role === 'user' ? (
                    <AvatarFallback className="bg-blue-600 text-white"><User className="w-4 h-4" /></AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-emerald-500 text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                  )}
                </Avatar>
                
                <div className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%] text-sm whitespace-pre-wrap",
                  m.role === 'user' 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-900"
                )}>
                  {m.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return <span key={i}>{part.text}</span>;
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
            
            {/* Indicateur de pensée (Streaming) */}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-emerald-500 text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-gray-50 text-gray-500 rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Le coach réfléchit...
                </div>
              </div>
            )}

            {/* Gestion d'erreur */}
            {error && (
              <div className="flex justify-center p-4">
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm border border-red-100">
                  Une erreur est survenue. Merci de réessayer.
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Zone de saisie */}
      <div className="p-4 border-t bg-gray-50">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Posez votre question..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="sr-only">Envoyer</span>
          </Button>
        </form>
      </div>
    </div>
  );
}