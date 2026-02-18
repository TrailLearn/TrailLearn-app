"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrientationInputsSchema, type OrientationInputs } from "~/features/ai-engine/types";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { Progress } from "~/components/ui/progress";
import { Loader2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";

const STEPS = [
  { id: 1, title: "Académique", description: "Votre domaine et niveau d'études" },
  { id: 2, title: "Compétences", description: "Ce que vous savez faire" },
  { id: 3, title: "Finances", description: "Budget et attentes salariales" },
  { id: 4, title: "Objectifs", description: "Mobilité et cibles" },
];

export function OrientationWizard({ onSuccess }: { onSuccess: (result: any) => void }) {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<OrientationInputs>({
    resolver: zodResolver(OrientationInputsSchema),
    defaultValues: {
      studyDomain: "",
      academicLevel: "",
      currentSkills: [],
      languages: [],
      approximateBudget: "",
      targetSalary: "",
      mobility: "local",
      targetEnvironment: "",
      targetJob: "",
    },
  });

  const mutation = api.aiOrientation.generate.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Analyse terminée !",
        description: "Votre plan d'orientation personnalisé a été généré.",
      });
      onSuccess(data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la génération.",
      });
    },
  });

  const nextStep = async () => {
    // Basic validation for current step fields could be added here
    if (step < STEPS.length) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = (values: OrientationInputs) => {
    mutation.mutate(values);
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Étape {step} sur {STEPS.length} : {STEPS[step - 1]?.title}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 && <Sparkles className="w-5 h-5 text-primary" />}
                {STEPS[step - 1]?.title}
              </CardTitle>
              <CardDescription>{STEPS[step - 1]?.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 min-h-[300px]">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <FormField
                    control={form.control}
                    name="studyDomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domaine d'études</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Informatique, Marketing, Droit..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="academicLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau académique actuel</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Licence 3, Master 2, Bac..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <FormField
                    control={form.control}
                    name="currentSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compétences (séparées par des virgules)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: React, Gestion de projet, Excel..." 
                            onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
                            value={field.value?.join(", ")}
                          />
                        </FormControl>
                        <FormDescription>Listez vos compétences techniques ou transversales.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Langues parlées</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Français, Anglais (B2)..." 
                            onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
                            value={field.value?.join(", ")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <FormField
                    control={form.control}
                    name="approximateBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget approximatif pour vos projets</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2000€, Budget limité..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetSalary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salaire visé (annuel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 40k€ - 50k€" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <FormField
                    control={form.control}
                    name="mobility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobilité</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre mobilité" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="local">Local (Ville actuelle)</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="international">International</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetEnvironment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Environnement cible (Optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Berlin, Montréal, Remote..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetJob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Métier visé spécifique (Optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Data Scientist, Chef de produit..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1 || mutation.isPending}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              
              {step < STEPS.length ? (
                <Button type="button" onClick={nextStep}>
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="bg-primary hover:bg-primary/90"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      Générer mon plan
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
