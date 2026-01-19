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
import { useEffect, useRef } from "react";
import { type DvpData, dvpDataSchema } from "~/features/dvp/types";
import { STUDY_DURATION_MONTHS } from "~/features/dvp/utils/cost-estimator";
import { Edit2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const budgetStepSchema = z.object({
  savings: z.coerce.number().min(0, "Montant positif requis"),
  guarantorHelp: z.coerce.number().min(0, "Montant positif requis"),
  otherIncome: z.coerce.number().min(0, "Montant positif requis"),
});

type BudgetFormValues = z.infer<typeof budgetStepSchema>;

export function BudgetStepForm() {
  const router = useRouter();

  const { data: existingDvp, isLoading } = api.dvp.getLatest.useQuery();
  const updateMutation = api.dvp.update.useMutation();
  const utils = api.useUtils();

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetStepSchema),
    defaultValues: {
      savings: 0,
      guarantorHelp: 0,
      otherIncome: 0,
    },
  });

  const { control, reset, formState: { isSubmitting } } = form;
  const watchedValues = useWatch({ 
    control,
    name: ["savings", "guarantorHelp", "otherIncome"]
  });

  const [savings, guarantorHelp, otherIncome] = watchedValues;

  const estimatedMonthly = 
    (Number(savings || 0) / STUDY_DURATION_MONTHS) + 
    Number(guarantorHelp || 0) + 
    Number(otherIncome || 0);

  const parsedData = dvpDataSchema.safeParse(existingDvp?.data);
  const data = parsedData.success ? parsedData.data : undefined;
  const isLocked = data?.stepStatus?.budget === "VALIDATED";

  const prevDataRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!isLoading && !existingDvp) {
      router.push("/dvp/wizard/project");
    }
  }, [isLoading, existingDvp, router]);

  useEffect(() => {
    if (data && data.budget) {
      const dataToCompare = data.budget;
      const dataString = JSON.stringify(dataToCompare);

      if (dataString !== prevDataRef.current) {
        prevDataRef.current = dataString;
        reset({
          savings: data.budget.savings || 0,
          guarantorHelp: data.budget.guarantorHelp || 0,
          otherIncome: data.budget.otherIncome || 0,
        });
      }
    }
  }, [data, reset]);

  const updateStatus = async (status: "EDITING" | "VALIDATED", values?: BudgetFormValues) => {
    if (!existingDvp) return;

    try {
      const currentData = data || {};
      const currentStatus = currentData.stepStatus || { project: "EDITING", budget: "EDITING", housing: "EDITING", language: "EDITING" };
      
      const newData: DvpData = {
        ...currentData,
        stepStatus: {
          ...currentStatus,
          budget: status,
        },
      };

      if (values) {
        newData.budget = {
          savings: Number(values.savings),
          guarantorHelp: Number(values.guarantorHelp),
          otherIncome: Number(values.otherIncome),
        };
      }

      await updateMutation.mutateAsync({
        id: existingDvp.id,
        data: newData,
      });
      await utils.dvp.getLatest.invalidate();
    } catch (error) {
      console.error("Failed to update status", error);
      throw error;
    }
  };

  const handleUnlock = () => {
    void updateStatus("EDITING");
  };

  async function onSubmit(values: BudgetFormValues) {
    try {
      await updateStatus("VALIDATED", values);
      router.push("/dvp/wizard/housing"); 
    } catch (error) {
      console.error("Failed to save and proceed", error);
    }
  }

  const isFormDisabled = isLoading;

  if (isLoading) return <div>Chargement...</div>;

  if (isLocked) {
    return (
      <Card className="border-green-200 bg-green-50/30">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-green-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Section Validée
            </h3>
            <div className="text-sm text-green-800">
              <p>Épargne: {data?.budget?.savings} €</p>
              <p>Revenus mensuels: {((data?.budget?.guarantorHelp || 0) + (data?.budget?.otherIncome || 0))} €/mois</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleUnlock} className="gap-2 border-green-200 hover:bg-green-100">
            <Edit2 className="h-3 w-3" /> Modifier
          </Button>
        </CardContent>
        <div className="px-6 pb-6 flex justify-end">
           <Button onClick={() => router.push("/dvp/wizard/housing")}>Suivant</Button>
        </div>
      </Card>
    );
  }

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
                <Input type="number" {...field} disabled={isFormDisabled} />
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
                <Input type="number" {...field} disabled={isFormDisabled} />
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
                <Input type="number" {...field} disabled={isFormDisabled} />
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

        <div className="flex items-center justify-end pt-4 gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dvp/wizard/project")}>Précédent</Button>
          <Button type="submit" disabled={isSubmitting || updateMutation.isPending || isFormDisabled}>
            {isSubmitting || updateMutation.isPending ? "Sauvegarde..." : "Valider et Continuer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}