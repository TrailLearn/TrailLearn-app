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
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type DvpData, dvpDataSchema } from "~/features/dvp/types";
import { HOUSING_TYPES, getHousingPriceRange } from "~/features/dvp/utils/housing-prices";
import Link from "next/link";

const housingStepSchema = z.object({
  type: z.string().min(1, "Type requis"),
  cost: z.coerce.number().min(0, "Montant positif requis"),
});

type HousingFormValues = z.infer<typeof housingStepSchema>;

export function HousingStepForm() {
  const router = useRouter();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const { data: existingDvp, isLoading } = api.dvp.getLatest.useQuery();
  const updateMutation = api.dvp.update.useMutation();

  const form = useForm<HousingFormValues>({
    resolver: zodResolver(housingStepSchema),
    defaultValues: {
      type: "",
      cost: 0,
    },
  });

  const { control, reset, getValues } = form;
  const watchedType = useWatch({ control, name: "type" });

  // Get city from loaded DVP data safely
  const parsedData = dvpDataSchema.safeParse(existingDvp?.data);
  const currentCity = parsedData.success ? parsedData.data.city : undefined;

  const priceRange = getHousingPriceRange(currentCity, watchedType);

  useEffect(() => {
    if (existingDvp?.data) {
      const result = dvpDataSchema.safeParse(existingDvp.data);
      if (result.success && result.data.housing) {
        reset({
          type: result.data.housing.type || "",
          cost: result.data.housing.cost || 0,
        });
      }
    }
  }, [existingDvp, reset]);

  const saveDraft = async (values: HousingFormValues) => {
    if (!existingDvp) return; // Prevent creating duplicates or saving to void

    setSaveStatus("saving");
    try {
      const result = dvpDataSchema.safeParse(existingDvp.data);
      const currentData = result.success ? result.data : {};
      
      const newData: DvpData = {
        ...currentData,
        housing: {
          type: values.type,
          cost: Number(values.cost),
        },
      };

      await updateMutation.mutateAsync({
        id: existingDvp.id,
        data: newData,
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to autosave housing", error);
      setSaveStatus("error");
    }
  };

  const handleBlur = () => {
    void saveDraft(getValues());
  };

  async function onSubmit(values: HousingFormValues) {
    try {
      await saveDraft(values);
      router.push("/dvp/wizard/language"); // Next step
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de logement</FormLabel>
              <Select 
                onValueChange={(val) => {
                  field.onChange(val);
                  void saveDraft({ ...getValues(), type: val });
                }} 
                defaultValue={field.value} 
                value={field.value}
                disabled={isFormDisabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {HOUSING_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchedType && priceRange && (
          <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md border border-blue-100">
            ℹ️ Prix moyen à <span className="capitalize">{currentCity || "défaut"}</span> : {priceRange.min} - {priceRange.max} €
          </div>
        )}

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loyer estimé (€)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onBlur={() => { field.onBlur(); handleBlur(); }} disabled={isFormDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {saveStatus === "saving" && <span className="text-blue-500">Sauvegarde...</span>}
            {saveStatus === "saved" && <span className="text-green-600">Brouillon sauvegardé</span>}
            {saveStatus === "error" && <span className="text-red-500">Erreur de sauvegarde</span>}
          </div>
          <div className="flex gap-4">
            <Link href="/dvp/wizard/budget">
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