'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { CheckCircle2, Clock, Link as LinkIcon, MessageSquareQuote, Trash2 } from 'lucide-react';
import { type Task } from '@prisma/client';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';
import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface TaskCardProps {
  task: Task;
  onUpdate?: () => void;
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');

  const utils = api.useUtils();
  const updateStatus = api.execution.updateTaskStatus.useMutation({
    onSuccess: () => {
      void utils.execution.getFocusTasks.invalidate();
      onUpdate?.();
    }
  });

  const addEvidence = api.execution.addEvidence.useMutation({
    onSuccess: () => {
      void utils.execution.getFocusTasks.invalidate();
    }
  });

  const deleteTask = api.execution.deleteTask.useMutation({
    onSuccess: () => {
      void utils.execution.getFocusTasks.invalidate();
      onUpdate?.();
    }
  });

  const handleComplete = () => {
    updateStatus.mutate({ 
      id: task.id, 
      status: "DONE",
      feedback: feedback || undefined 
    });
  };

  const handleDelete = () => {
    if (confirm("Supprimer cette tâche ?")) {
        deleteTask.mutate({ id: task.id });
    }
  };

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceUrl) return;
    addEvidence.mutate({ id: task.id, evidenceUrl });
    setEvidenceUrl('');
  };

  const priorityColors = {
    HIGH: "bg-red-100 text-red-700 border-red-200",
    MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
    LOW: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <Card className={cn("overflow-hidden border-l-4", 
      task.priority === "HIGH" ? "border-l-red-500" : 
      task.priority === "MEDIUM" ? "border-l-amber-500" : "border-l-emerald-500"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
              <Clock className="w-3 h-3" />
              {task.dueDate.toLocaleDateString()}
            </div>
          )}
        </div>
        <CardTitle className="text-base mt-2">{task.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-4">
        {task.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
        )}

        {/* Evidence Link Section (Story 9.3) */}
        <div className="space-y-2">
          {task.evidenceUrl ? (
            <a 
              href={task.evidenceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-blue-600 hover:underline"
            >
              <LinkIcon className="w-3 h-3" /> Preuve : {new URL(task.evidenceUrl).hostname}
            </a>
          ) : (
            <form onSubmit={handleAddEvidence} className="flex gap-2">
              <Input 
                placeholder="Lien vers preuve (ex: Google Drive)" 
                className="h-7 text-xs" 
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
              />
              <Button size="sm" variant="secondary" className="h-7 px-2 text-xs" type="submit">Ajouter</Button>
            </form>
          )}
        </div>

        {/* Feedback Section (Story 9.4) */}
        {showFeedback && (
          <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <Label className="text-[10px] font-bold uppercase text-gray-400">Journal de bord</Label>
            <textarea 
              className="w-full text-xs p-2 border rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Comment ça s'est passé ?"
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 border-t bg-gray-50/50 flex justify-between px-4 py-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs gap-2 text-gray-500 hover:text-red-600 px-2"
          onClick={handleDelete}
          disabled={deleteTask.isPending}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>

        <div className="flex gap-2">
            <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs gap-2 text-gray-500 hover:text-gray-900"
            onClick={() => setShowFeedback(!showFeedback)}
            >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            {showFeedback ? "Annuler" : "Note"}
            </Button>
            <Button 
            size="sm" 
            className="text-xs gap-2 bg-emerald-600 hover:bg-emerald-700"
            onClick={handleComplete}
            disabled={updateStatus.isPending}
            >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Fait
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
