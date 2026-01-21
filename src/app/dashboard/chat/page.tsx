'use client';

import { ChatInterface } from '~/features/ai-coach/components/chat-interface';
import { ViabilityGauge } from '~/features/ai-coach/components/viability-gauge';
import { InsightCard } from '~/features/ai-coach/components/insight-card';
import { api } from '~/trpc/react';
import { Skeleton } from '~/components/ui/skeleton';

export default function ChatPage() {
  const { data: clarity, isLoading } = api.ai.getLatestClarity.useQuery();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-600">Coach IA - Miroir Lucide</h1>
        <p className="text-muted-foreground">
          Discutez avec votre coach pour clarifier votre projet et identifier vos priorités.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Diagnostics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 border rounded-xl bg-white shadow-sm space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Diagnostic en direct</h2>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ) : (
                <ViabilityGauge 
                  score={clarity?.score ?? 0} 
                  label="Indice de Clarté" 
                />
              )}
            </div>

            {clarity?.details && (
              <InsightCard details={clarity.details as any} />
            )}
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed">
            <strong>Note :</strong> L'indice est mis à jour à chaque fois que vous envoyez un message au coach.
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
