'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, User, Bot, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useToast } from '~/components/ui/use-toast';

interface ChatInterfaceProps {
  initialMessages?: any[];
}

export function ChatInterface({ initialMessages = [] }: ChatInterfaceProps) {
  const router = useRouter();
  const { toast } = useToast();
  // Retour aux helpers qui semblaient fonctionner au niveau compilation
  const { messages, sendMessage, status, error } = useChat({
    initialMessages: initialMessages,
    onError: (err: any) => {
      toast({
        title: "Connexion instable",
        description: "Le Mentor a du mal à répondre. Vérifiez votre connexion et réessayez.",
        variant: "destructive",
      });
    }
  } as any) as any;
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef<number>(0);
  
  const utils = api.useUtils();
  const updateClarity = api.ai.updateClarityIndex.useMutation({
    onSuccess: () => {
      void utils.ai.getLatestClarity.invalidate();
    }
  });

  const finalize = api.ai.finalizeSession.useMutation({
    onSuccess: () => {
      router.push('/dashboard');
    }
  });

  const isLoading = status === 'submitted' || status === 'streaming' || finalize.isPending;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const text = inputValue;
    setInputValue('');
    
    // Utilisation du format 'parts' détecté dans les logs de debug
    // Cela garantit la transmission du texte pour cette version spécifique du SDK.
    await sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: text }]
    } as any);
    
    // Update de l'indice (Throttle)
    const now = Date.now();
    if (now - lastUpdateRef.current > 30000) {
      updateClarity.mutate({ source: "USER_INPUT" });
      lastUpdateRef.current = now;
    }
  };

  const handleFinalize = () => {
    if (messages.length < 2) return;
    
    // Extraction sécurisée du texte pour la finalisation
    const mappedMessages = messages.map(m => {
      let text = (m as any).content || '';
      if (!text && Array.isArray((m as any).parts)) {
        text = (m as any).parts
          .filter((p: any) => p.type === 'text')
          .map((p: any) => p.text)
          .join('\n');
      }
      return { role: m.role, content: text };
    });

    finalize.mutate({ messages: mappedMessages });
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
      {/* Header avec action de finalisation */}
      <div className="px-4 py-2 bg-gray-50 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Session Active</span>
        </div>
        
        {messages.length >= 4 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs gap-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            onClick={handleFinalize}
            disabled={isLoading}
          >
            {finalize.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
            Finaliser le projet
          </Button>
        )}
      </div>
      
      {finalize.isError && (
        <div className="bg-red-50 text-red-600 text-xs text-center py-1 border-b border-red-100">
          Impossible de finaliser le projet. Veuillez réessayer.
        </div>
      )}

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
            {messages.map((m) => {
              const content = Array.isArray((m as any).parts) 
                ? (m as any).parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')
                : (m as any).content;

              return (
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
                  "rounded-lg px-4 py-2 max-w-[80%] text-sm overflow-hidden prose prose-sm max-w-none break-words",
                  m.role === 'user' 
                    ? "bg-blue-600 text-white prose-invert" 
                    : "bg-gray-100 text-gray-900 prose-neutral"
                )}>
                  <ReactMarkdown>
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            )})}
            
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

            {/* Gestion d'erreur (Fallback sobre) */}
            {error && (
              <div className="flex justify-center p-4 animate-in fade-in slide-in-from-bottom-2">
                <div 
                  role="alert"
                  className="bg-amber-50 text-amber-800 px-4 py-2 rounded-full text-xs font-medium border border-amber-200 shadow-sm flex items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  Le Mentor a rencontré un obstacle. Veuillez reformuler ou réessayer.
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