'use client';

import { api } from '~/trpc/react';
import { TaskCard } from '~/features/execution/components/task-card';
import { Skeleton } from '~/components/ui/skeleton';
import { Button } from '~/components/ui/button';
import { Target, ListTodo, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FocusDashboard() {
  const router = useRouter();
  const { data: tasks, isLoading, refetch } = api.execution.getFocusTasks.useQuery();
  const generatePlan = api.execution.generatePlan.useMutation({
    onSuccess: () => refetch(),
  });

  const handleGenerate = () => {
    generatePlan.mutate();
  };

  const hasTasks = tasks && tasks.length > 0;

  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Mode Focus Actif</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Prochaines Étapes</h1>
          <p className="text-muted-foreground">
            Ne te laisse pas déborder. Concentre-toi uniquement sur ces 3 actions prioritaires.
          </p>
        </div>
        
        {hasTasks && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
            <span>Plan validé par le Coach</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))
        ) : hasTasks ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={refetch} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl border-gray-200 bg-gray-50/50">
            <ListTodo className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">Aucune tâche prioritaire</h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-2 mb-6">
              Votre plan d'action est vide. Générez un plan basé sur votre DVP ou discutez avec le coach.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button onClick={handleGenerate} disabled={generatePlan.isPending} className="gap-2">
                <Sparkles className="w-4 h-4" />
                {generatePlan.isPending ? "Génération..." : "Générer mon Plan d'Action"}
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <Link href="/dashboard/chat">
                  <MessageSquare className="w-4 h-4" />
                  Demander au Coach
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold">Reste du plan d'action</h4>
          <p className="text-xs text-gray-500 mt-1">Vous avez d'autres tâches en attente dans votre backlog complet.</p>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:underline">
          Voir tout le backlog
        </button>
      </div>
    </div>
  );
}
