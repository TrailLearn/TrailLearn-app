"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { CheckCircle2, Circle, Clock, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";

export default function PlanPage() {
  const { data: tasks, isLoading, refetch } = api.execution.getBacklog.useQuery();
  const createTask = api.execution.createTask.useMutation({
    onSuccess: () => {
      refetch();
      setOpen(false);
      setNewTaskTitle("");
    },
  });
  const updateStatus = api.execution.updateTaskStatus.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteTask = api.execution.deleteTask.useMutation({
    onSuccess: () => refetch(),
  });

  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");

  const handleCreate = () => {
    if (!newTaskTitle.trim()) return;
    createTask.mutate({ title: newTaskTitle, priority: newTaskPriority });
  };

  const priorityBadge = (priority: string) => {
    const colors = {
      HIGH: "bg-red-100 text-red-700 hover:bg-red-100",
      MEDIUM: "bg-amber-100 text-amber-700 hover:bg-amber-100",
      LOW: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    };
    return (
      <Badge variant="outline" className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  if (isLoading) return <div className="p-8 text-center">Chargement du plan...</div>;

  return (
    <div className="container py-8 max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plan d'Action Complet</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de toutes vos tâches et de votre backlog.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Nouvelle Tâche
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une tâche</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input 
                  placeholder="Ex: Contacter l'université..." 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select value={newTaskPriority} onValueChange={(v: any) => setNewTaskPriority(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">Haute</SelectItem>
                    <SelectItem value="MEDIUM">Moyenne</SelectItem>
                    <SelectItem value="LOW">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} disabled={createTask.isPending} className="w-full">
                {createTask.isPending ? "Création..." : "Ajouter au Plan"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Tâche</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Date Création</TableHead>
              <TableHead className="text-right">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id} className={task.status === "DONE" ? "bg-gray-50/50" : ""}>
                  <TableCell>
                    <button
                      onClick={() => updateStatus.mutate({ 
                        id: task.id, 
                        status: task.status === "DONE" ? "PENDING" : "DONE" 
                      })}
                      className="text-gray-400 hover:text-emerald-600 transition-colors"
                      disabled={updateStatus.isPending}
                    >
                      {task.status === "DONE" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <span className={task.status === "DONE" ? "line-through text-gray-500" : ""}>
                      {task.title}
                    </span>
                    {task.description && (
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{task.description}</p>
                    )}
                  </TableCell>
                  <TableCell>{priorityBadge(task.priority)}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Badge variant={task.status === "DONE" ? "secondary" : "default"}>
                        {task.status === "DONE" ? "Terminé" : "En cours"}
                    </Badge>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-600"
                        onClick={() => {
                            if (confirm("Supprimer cette tâche ?")) {
                                deleteTask.mutate({ id: task.id });
                            }
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Aucune tâche. Commencez par en créer une ou utilisez le Coach IA.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
