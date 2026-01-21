'use client';

import { api } from '~/trpc/react';
import { TaskCard } from '~/features/execution/components/task-card';
import { Skeleton } from '~/components/ui/skeleton';
import { Target, ListTodo, ShieldCheck } from 'lucide-react';

export default function FocusDashboard() {
  const { data: tasks, isLoading, refetch } = api.execution.getFocusTasks.useQuery();

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
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
          <ShieldCheck className="w-4 h-4" />
          <span>Plan validé par le Coach</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))
        ) : tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl border-gray-200">
            <ListTodo className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">Aucune tâche prioritaire</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              Toutes vos actions critiques sont terminées ou vous n'avez pas encore généré de plan.
            </p>
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
