"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type DvpData, dvpDataSchema } from "~/features/dvp/types";
import Link from "next/link";
import { STUDY_DURATION_MONTHS } from "~/features/dvp/utils/cost-estimator";

const budgetStepSchema = z.object({
  savings: z.coerce.number().min(0, "Montant positif requis"),
  guarantorHelp: z.coerce.number().min(0, "Montant positif requis"),
  otherIncome: z.coerce.number().min(0, "Montant positif requis"),
});

type BudgetFormValues = z.infer<typeof budgetStepSchema>;

export function BudgetStepForm() {
  const router = useRouter();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const { data: existingDvp, isLoading } = api.dvp.getLatest.useQuery();
  const updateMutation = api.dvp.update.useMutation();

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetStepSchema),
    defaultValues: {
      savings: 0,
      guarantorHelp: 0,
      otherIncome: 0,
    },
  });

  const { control, reset, getValues } = form;
  // Opti: Watch only needed fields
  const watchedValues = useWatch({ 
    control,
    name: ["savings", "guarantorHelp", "otherIncome"]
  });

  const [savings, guarantorHelp, otherIncome] = watchedValues;

  // Calcul du budget mensuel estimé : (Epargne / DUREE) + Garants + Autres
  const estimatedMonthly = 
    (Number(savings || 0) / STUDY_DURATION_MONTHS) + 
    Number(guarantorHelp || 0) + 
    Number(otherIncome || 0);

  useEffect(() => {
    if (existingDvp?.data) {
      const result = dvpDataSchema.safeParse(existingDvp.data);
      if (result.success && result.data.budget) {
        const { budget } = result.data;
        reset({
          savings: budget.savings || 0,
          guarantorHelp: budget.guarantorHelp || 0,
          otherIncome: budget.otherIncome || 0,
        });
      }
    }
  }, [existingDvp, reset]);

  const saveDraft = async (values: BudgetFormValues) => {
    if (!existingDvp) return;

    setSaveStatus("saving");
    try {
      const result = dvpDataSchema.safeParse(existingDvp.data);
      const currentData = result.success ? result.data : {};
      
      const newData: DvpData = {
        ...currentData,
        budget: {
          savings: Number(values.savings),
          guarantorHelp: Number(values.guarantorHelp),
          otherIncome: Number(values.otherIncome),
        },
      };

      await updateMutation.mutateAsync({
        id: existingDvp.id,
        data: newData,
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to autosave budget", error);
      setSaveStatus("error");
    }
  };

  const handleBlur = () => {
    void saveDraft(getValues());
  };

  async function onSubmit(values: BudgetFormValues) {
    try {
      await saveDraft(values);
      router.push("/dvp/wizard/housing"); // Next step (placeholder for now)
    } catch (error) {
      console.error("Failed to save and proceed", error);
    }
  }

  const isFormDisabled = isLoading || !existingDvp;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="savings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Épargne totale (€)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onBlur={() => { field.onBlur(); handleBlur(); }} disabled={isFormDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guarantorHelp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aide mensuelle garants (€)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onBlur={() => { field.onBlur(); handleBlur(); }} disabled={isFormDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autres revenus (€)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onBlur={() => { field.onBlur(); handleBlur(); }} disabled={isFormDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h4 className="font-semibold text-green-800 text-sm mb-1">Ressources Mensuelles Estimées</h4>
          <p className="text-2xl font-bold text-green-700">
            {estimatedMonthly.toLocaleString()} € <span className="text-sm font-normal">/ mois</span>
          </p>
          <p className="text-xs text-green-600 mt-2">
            Basé sur 10 mois d'études + aides mensuelles.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {saveStatus === "saving" && <span className="text-blue-500">Sauvegarde...</span>}
            {saveStatus === "saved" && <span className="text-green-600">Brouillon sauvegardé</span>}
            {saveStatus === "error" && <span className="text-red-500">Erreur de sauvegarde</span>}
          </div>
          <div className="flex gap-4">
            <Link href="/dvp/wizard/project">
              <Button type="button" variant="outline">Précédent</Button>
            </Link>
            <Button type="submit" disabled={updateMutation.isPending || isFormDisabled}>
              {updateMutation.isPending ? "Chargement..." : "Suivant"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}