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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { type DvpData, dvpDataSchema } from "~/features/dvp/types";
import { CEFR_LEVELS } from "~/features/dvp/utils/language-levels";
import { Edit2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const languageStepSchema = z.object({
  level: z.string().min(1, "Niveau requis"),
});

type LanguageFormValues = z.infer<typeof languageStepSchema>;

export function LanguageStepForm() {
  const router = useRouter();

  const { data: existingDvp, isLoading } = api.dvp.getLatest.useQuery();
  const createMutation = api.dvp.create.useMutation();
  const updateMutation = api.dvp.update.useMutation();
  const utils = api.useUtils();

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageStepSchema),
    defaultValues: {
      level: "", // Initialize with empty string to match Select value type
    },
  });

  const { control, reset, formState: { isSubmitting } } = form;
  const watchedLevel = useWatch({ control, name: "level" });

  const isLowLevel = watchedLevel && ["A1", "A2", "B1"].includes(watchedLevel);

  const parsedData = dvpDataSchema.safeParse(existingDvp?.data);
  const data = parsedData.success ? parsedData.data : undefined;
  const isLocked = data?.stepStatus?.language === "VALIDATED";

  const prevDataRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!isLoading && !existingDvp) {
      router.push("/dvp/wizard/project");
    }
  }, [isLoading, existingDvp, router]);

  useEffect(() => {
    if (data && data.language?.level) {
      const level = data.language.level;
      if (CEFR_LEVELS.includes(level as any)) {
         const dataToCompare = { level };
         const dataString = JSON.stringify(dataToCompare);
         
         if (dataString !== prevDataRef.current) {
            prevDataRef.current = dataString;
            reset({ level });
         }
      }
    }
  }, [data, reset]);

  const updateStatus = async (status: "EDITING" | "VALIDATED", values?: LanguageFormValues) => {
    if (!existingDvp) return;

    try {
      const currentData = data || {};
      const currentStatus = currentData.stepStatus || { project: "EDITING", budget: "EDITING", housing: "EDITING", language: "EDITING" };
      
      const newData: DvpData = {
        ...currentData,
        stepStatus: {
          ...currentStatus,
          language: status,
        },
      };

      if (values) {
        newData.language = {
          level: values.level,
        };
      }

      if (existingDvp.status === "DRAFT") {
        await updateMutation.mutateAsync({
          id: existingDvp.id,
          data: newData,
        });
      } else {
        await createMutation.mutateAsync(newData);
      }
      await utils.dvp.getLatest.invalidate();
    } catch (error) {
      console.error("Failed to update status", error);
      throw error;
    }
  };

  const handleUnlock = () => {
    void updateStatus("EDITING");
  };

  async function onSubmit(values: LanguageFormValues) {
    try {
      await updateStatus("VALIDATED", values);
      router.push("/dvp/wizard/summary"); 
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
              <p>Niveau CECRL: {data?.language?.level}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleUnlock} className="gap-2 border-green-200 hover:bg-green-100">
            <Edit2 className="h-3 w-3" /> Modifier
          </Button>
        </CardContent>
        <div className="px-6 pb-6 flex justify-end">
           <Button onClick={() => router.push("/dvp/wizard/summary")}>Suivant</Button>
        </div>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau de langue (CECRL)</FormLabel>
              <Select 
                onValueChange={(val) => field.onChange(val)} 
                defaultValue={field.value} 
                value={field.value || ""}
                disabled={isFormDisabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CEFR_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLowLevel && (
          <div className="flex items-start gap-3 p-4 border border-yellow-200 bg-yellow-50 rounded-md text-yellow-800 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="font-semibold block mb-1">Attention</strong>
              La plupart des universités demandent un niveau <strong>B2 minimum</strong> pour suivre les cours. Assurez-vous d'avoir un plan de mise à niveau.
            </div>
          </div>
        )}

        <div className="flex items-center justify-end pt-4 gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dvp/wizard/housing")}>Précédent</Button>
          <Button type="submit" disabled={isSubmitting || updateMutation.isPending || isFormDisabled}>
            {isSubmitting || updateMutation.isPending ? "Sauvegarde..." : "Valider et Continuer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}