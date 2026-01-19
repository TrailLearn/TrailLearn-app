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
import { useEffect, useState } from "react";
import { type DvpData, dvpDataSchema } from "~/features/dvp/types";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const languageStepSchema = z.object({
  level: z.enum(CEFR_LEVELS, { required_error: "Niveau requis" }),
});

type LanguageFormValues = z.infer<typeof languageStepSchema>;

export function LanguageStepForm() {
  const router = useRouter();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const { data: existingDvp, isLoading } = api.dvp.getLatest.useQuery();
  const updateMutation = api.dvp.update.useMutation();

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageStepSchema),
    defaultValues: {
      level: undefined,
    },
  });

  const { control, reset, getValues } = form;
  const watchedLevel = useWatch({ control, name: "level" });

  const isLowLevel = watchedLevel && ["A1", "A2", "B1"].includes(watchedLevel);

  useEffect(() => {
    if (existingDvp?.data) {
      const result = dvpDataSchema.safeParse(existingDvp.data);
      if (result.success && result.data.language?.level) {
        // Safe cast because Zod schema might be looser than CEFR enum
        const level = result.data.language.level as any;
        if (CEFR_LEVELS.includes(level)) {
           reset({ level });
        }
      }
    }
  }, [existingDvp, reset]);

  const saveDraft = async (values: LanguageFormValues) => {
    if (!existingDvp) return;

    try {
      const result = dvpDataSchema.safeParse(existingDvp.data);
      const currentData = result.success ? result.data : {};
      
      const newData: DvpData = {
        ...currentData,
        language: {
          level: values.level,
        },
      };

      await updateMutation.mutateAsync({
        id: existingDvp.id,
        data: newData,
      });
    } catch (error) {
      console.error("Failed to save language", error);
      throw error;
    }
  };

  async function onSubmit(values: LanguageFormValues) {
    try {
      await saveDraft(values);
      router.push("/dvp/wizard/summary"); 
    } catch (error) {
      console.error("Failed to save and proceed", error);
    }
  }

  const { formState: { isSubmitting } } = form;
  const isFormDisabled = isLoading || !existingDvp;

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
                onValueChange={field.onChange} 
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
          <Link href="/dvp/wizard/housing">
            <Button type="button" variant="outline">Précédent</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || updateMutation.isPending || isFormDisabled}>
            {isSubmitting || updateMutation.isPending ? "Sauvegarde..." : "Valider et Continuer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}