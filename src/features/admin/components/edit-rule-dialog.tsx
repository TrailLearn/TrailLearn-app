"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

const editRuleSchema = z.object({
  value: z.string().min(1, "Valeur requise"),
  reason: z.string().min(5, "La justification doit être explicite").max(500, "Justification trop longue"),
});

interface EditRuleDialogProps {
  rule: {
    id: string;
    key: string;
    value: any;
    category: string;
  };
}

export function EditRuleDialog({ rule }: EditRuleDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const updateMutation = api.admin.updateRule.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      // Simple feedback for V1
      alert("Règle mise à jour avec succès");
    },
  });

  const form = useForm<z.infer<typeof editRuleSchema>>({
    resolver: zodResolver(editRuleSchema),
    defaultValues: {
      value: typeof rule.value === 'object' ? JSON.stringify(rule.value) : String(rule.value),
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof editRuleSchema>) {
    try {
      let parsedValue: any = values.value;
      
      // Safer parsing logic
      const trimmed = values.value.trim();
      if (/^[\d.]+$/.test(trimmed) && !isNaN(Number(trimmed))) {
        parsedValue = Number(trimmed);
      } else if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
        try {
          parsedValue = JSON.parse(trimmed);
        } catch {
          // If JSON parse fails, keep as string but warn? For now assume string intent.
        }
      } else if (trimmed === "true" || trimmed === "false") {
        parsedValue = trimmed === "true";
      }

      await updateMutation.mutateAsync({
        id: rule.id,
        value: parsedValue,
        reason: values.reason,
      });
    } catch (error) {
      console.error("Failed to update rule", error);
      alert("Erreur lors de la mise à jour");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier la règle : {rule.key}</DialogTitle>
          <DialogDescription>
             Modifiez la valeur de référence. Cette action sera auditée.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valeur (Auto-détecté: Nombre, JSON, Texte)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justification (Audit)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ex: Indexation annuelle INSEE 2026..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Sauvegarde..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
