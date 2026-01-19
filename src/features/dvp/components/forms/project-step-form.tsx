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
import { useEffect, useState } from "react";
import { type DvpData } from "~/features/dvp/types";
import { getEstimatedCost } from "~/features/dvp/utils/cost-estimator";

// Schema strict pour l'étape (validation avant suivant)
const projectStepSchema = z.object({
  country: z.string().min(1, "Pays requis"),
  city: z.string().min(1, "Ville requise"),
  studyType: z.string().min(1, "Type d'études requis"),
});

type ProjectFormValues = z.infer<typeof projectStepSchema>;

export function ProjectStepForm() {
  const router = useRouter();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const { data: existingDvp, isLoading: isLoadingDvp } = api.dvp.getLatest.useQuery();
  const createMutation = api.dvp.create.useMutation();
  const updateMutation = api.dvp.update.useMutation();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectStepSchema),
    defaultValues: {
      country: "",
      city: "",
      studyType: "",
    },
  });

  // Watch city for estimation
  const watchedCity = form.watch("city");
  const estimatedCost = getEstimatedCost(watchedCity);

  // Charger les données existantes
  useEffect(() => {
    if (existingDvp?.data) {
      // Safe cast: we trust our DB data conforms to our schema or is compatible partial
      const data = existingDvp.data as unknown as DvpData;
      form.reset({
        country: data.country || "",
        city: data.city || "",
        studyType: data.studyType || "",
      });
    }
  }, [existingDvp, form]);

  const saveDraft = async (values: Partial<ProjectFormValues>) => {
    setSaveStatus("saving");
    try {
      // Merge current form values with existing data
      const currentData = (existingDvp?.data as unknown as DvpData) || {};
      const newData = { ...currentData, ...values };

      if (existingDvp) {
        await updateMutation.mutateAsync({
          id: existingDvp.id,
          data: newData,
        });
      } else {
        await createMutation.mutateAsync(newData);
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to autosave DVP", error);
      setSaveStatus("error");
    }
  };

  const handleBlur = () => {
    // Autosave on blur
    // Note: Removed isDirty check temporarily as it causes issues in tests and strict mode
    // Ideally we should check dirtyFields but for now simple blur save is safer for data loss prevention
    const values = form.getValues();
    void saveDraft(values);
  };

  async function onSubmit(values: ProjectFormValues) {
    try {
      await saveDraft(values);
      router.push("/dvp/wizard/budget");
    } catch (error) {
      console.error("Failed to save and proceed", error);
    }
  }

  const { formState: { isSubmitting } } = form;

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
                onValueChange={(val) => {
                  field.onChange(val);
                  // Autosave on select change requires manual trigger as blur is tricky on Select
                  void saveDraft({ ...form.getValues(), country: val });
                }} 
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
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlur();
                  }}
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
                onValueChange={(val) => {
                  field.onChange(val);
                  void saveDraft({ ...form.getValues(), studyType: val });
                }} 
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

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {saveStatus === "saving" && <span className="text-blue-500">Sauvegarde...</span>}
            {saveStatus === "saved" && <span className="text-green-600">Brouillon sauvegardé</span>}
            {saveStatus === "error" && <span className="text-red-500">Erreur de sauvegarde</span>}
          </div>
          <Button type="submit" disabled={isLoadingDvp || isSubmitting || createMutation.isPending || updateMutation.isPending}>
            {isSubmitting || createMutation.isPending || updateMutation.isPending ? "Sauvegarde..." : "Suivant"}
          </Button>
        </div>
      </form>
    </Form>
  );
}