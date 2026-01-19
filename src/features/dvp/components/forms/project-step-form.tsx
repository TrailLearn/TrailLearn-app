"use client";

import { useForm } from "react-hook-form";
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
import { getEstimatedCost } from "~/features/dvp/utils/cost-estimator";
import { Edit2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

// Schema strict pour l'étape (validation avant suivant)
const projectStepSchema = z.object({
  country: z.string().min(1, "Pays requis"),
  city: z.string().min(1, "Ville requise"),
  studyType: z.string().min(1, "Type d'études requis"),
});

type ProjectFormValues = z.infer<typeof projectStepSchema>;

export function ProjectStepForm() {
  const router = useRouter();
  const { data: existingDvp, isLoading: isLoadingDvp } = api.dvp.getLatest.useQuery();
  const createMutation = api.dvp.create.useMutation();
  const updateMutation = api.dvp.update.useMutation();
  const utils = api.useUtils();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectStepSchema),
    defaultValues: {
      country: "",
      city: "",
      studyType: "",
    },
  });

  const watchedCity = form.watch("city");
  const estimatedCost = getEstimatedCost(watchedCity);

  // Derive state from data
  const parsedData = dvpDataSchema.safeParse(existingDvp?.data);
  const data = parsedData.success ? parsedData.data : undefined;
  const isLocked = data?.stepStatus?.project === "VALIDATED";

  const prevDataRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (data) {
      const dataToCompare = {
        country: data.country,
        city: data.city,
        studyType: data.studyType
      };
      const dataString = JSON.stringify(dataToCompare);
      
      if (dataString !== prevDataRef.current) {
        prevDataRef.current = dataString;
        form.reset({
          country: data.country || "",
          city: data.city || "",
          studyType: data.studyType || "",
        });
      }
    }
  }, [data, form]);

  const updateStatus = async (status: "EDITING" | "VALIDATED", values?: Partial<ProjectFormValues>) => {
    try {
      const currentData = data || {};
      // Initialize stepStatus if missing
      const currentStatus = currentData.stepStatus || { project: "EDITING", budget: "EDITING", housing: "EDITING", language: "EDITING" };
      
      const newData: DvpData = {
        ...currentData,
        ...values,
        stepStatus: {
          ...currentStatus,
          project: status,
        }
      };

      if (existingDvp) {
        await updateMutation.mutateAsync({
          id: existingDvp.id,
          data: newData,
        });
      } else {
        // Create only happens in edit mode usually, but handling edge case
        await createMutation.mutateAsync(newData);
      }
      await utils.dvp.getLatest.invalidate();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleUnlock = () => {
    void updateStatus("EDITING");
  };

  async function onSubmit(values: ProjectFormValues) {
    try {
      await updateStatus("VALIDATED", values);
      router.push("/dvp/wizard/budget");
    } catch (error) {
      console.error("Failed to save and proceed", error);
    }
  }

  const { formState: { isSubmitting } } = form;

  if (isLoadingDvp) return <div>Chargement...</div>;

  if (isLocked) {
    return (
      <Card className="border-green-200 bg-green-50/30">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-green-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Section Validée
            </h3>
            <div className="text-sm text-green-800">
              <p>{data?.city}, {data?.country}</p>
              <p>{data?.studyType}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleUnlock} className="gap-2 border-green-200 hover:bg-green-100">
            <Edit2 className="h-3 w-3" /> Modifier
          </Button>
        </CardContent>
        {/* Next button to continue flow if just reviewing */}
        <div className="px-6 pb-6 flex justify-end">
           <Button onClick={() => router.push("/dvp/wizard/budget")}>Suivant</Button>
        </div>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays de destination</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value} 
                value={field.value}
                disabled={isLoadingDvp || isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un pays" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="belgique">Belgique</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville cible</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: Paris, Lyon, Bordeaux..." 
                  {...field} 
                  disabled={isLoadingDvp || isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback Visuel (Task 3) */}
        {watchedCity && watchedCity.length > 2 && estimatedCost && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 animate-in fade-in slide-in-from-top-2">
            <h4 className="font-semibold text-blue-800 text-sm mb-1">Estimation Initiale</h4>
            <p className="text-sm text-blue-600">
              Coût de la vie moyen à <span className="font-bold capitalize">{watchedCity}</span> : 
              <span className="font-bold ml-1">~{estimatedCost.cost} {estimatedCost.currency} / mois</span> (hors loyer)
            </p>
          </div>
        )}

        <FormField
          control={form.control}
          name="studyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d'études</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value} 
                value={field.value}
                disabled={isLoadingDvp || isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau d'études" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="license">Licence (L1-L3)</SelectItem>
                  <SelectItem value="master">Master (M1-M2)</SelectItem>
                  <SelectItem value="doctorat">Doctorat</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end pt-4">
          <Button type="submit" disabled={isLoadingDvp || isSubmitting || createMutation.isPending || updateMutation.isPending}>
            {isSubmitting || createMutation.isPending || updateMutation.isPending ? "Sauvegarde..." : "Valider et Continuer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}