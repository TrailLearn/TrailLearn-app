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
import { useEffect, useRef } from "react";
import { type DvpData, dvpDataSchema } from "~/features/dvp/types";
import { HOUSING_TYPES, getHousingPriceRange } from "~/features/dvp/utils/housing-prices";
import { Edit2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const housingStepSchema = z.object({
  type: z.string().min(1, "Type requis"),
  cost: z.coerce.number().min(0, "Montant positif requis"),
});

type HousingFormValues = z.infer<typeof housingStepSchema>;

export function HousingStepForm() {
  const router = useRouter();

  const { data: existingDvp, isLoading } = api.dvp.getLatest.useQuery();
  const createMutation = api.dvp.create.useMutation();
  const updateMutation = api.dvp.update.useMutation();
  const utils = api.useUtils();

  const form = useForm<HousingFormValues>({
    resolver: zodResolver(housingStepSchema),
    defaultValues: {
      type: "",
      cost: 0,
    },
  });

  const { control, reset, formState: { isSubmitting } } = form;
  const watchedType = useWatch({ control, name: "type" });

  const parsedData = dvpDataSchema.safeParse(existingDvp?.data);
  const data = parsedData.success ? parsedData.data : undefined;
  const currentCity = data?.city;
  const priceRange = getHousingPriceRange(currentCity, watchedType);
  const isLocked = data?.stepStatus?.housing === "VALIDATED";

  const prevDataRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!isLoading && !existingDvp) {
      router.push("/dvp/wizard/project");
    }
  }, [isLoading, existingDvp, router]);

  useEffect(() => {
    if (data && data.housing) {
      const dataToCompare = data.housing;
      const dataString = JSON.stringify(dataToCompare);

      if (dataString !== prevDataRef.current) {
        prevDataRef.current = dataString;
        reset({
          type: data.housing.type || "",
          cost: data.housing.cost || 0,
        });
      }
    }
  }, [data, reset]);

  const updateStatus = async (status: "EDITING" | "VALIDATED", values?: HousingFormValues) => {
    if (!existingDvp) return;

    try {
      const currentData = data || {};
      const currentStatus = currentData.stepStatus || { project: "EDITING", budget: "EDITING", housing: "EDITING", language: "EDITING" };
      
      const newData: DvpData = {
        ...currentData,
        stepStatus: {
          ...currentStatus,
          housing: status,
        },
      };

      if (values) {
        newData.housing = {
          type: values.type,
          cost: Number(values.cost),
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

  async function onSubmit(values: HousingFormValues) {
    try {
      await updateStatus("VALIDATED", values);
      router.push("/dvp/wizard/language"); 
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
              <p>Type: {HOUSING_TYPES.find(t => t.value === data?.housing?.type)?.label || data?.housing?.type}</p>
              <p>Loyer: {data?.housing?.cost} €/mois</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleUnlock} className="gap-2 border-green-200 hover:bg-green-100">
            <Edit2 className="h-3 w-3" /> Modifier
          </Button>
        </CardContent>
        <div className="px-6 pb-6 flex justify-end">
           <Button onClick={() => router.push("/dvp/wizard/language")}>Suivant</Button>
        </div>
      </Card>
    );
  }

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
                onValueChange={field.onChange} 
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
                <Input type="number" {...field} disabled={isFormDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end pt-4 gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dvp/wizard/budget")}>Précédent</Button>
          <Button type="submit" disabled={isSubmitting || updateMutation.isPending || isFormDisabled}>
            {isSubmitting || updateMutation.isPending ? "Sauvegarde..." : "Valider et Continuer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}