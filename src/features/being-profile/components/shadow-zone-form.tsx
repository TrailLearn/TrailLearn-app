"use client";

import React, { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/use-toast";
import { ShieldCheck, Trash2, ArrowRight } from "lucide-react";

interface ShadowZoneFormProps {
  onSkip?: () => void;
  onSuccess?: () => void;
}

export function ShadowZoneForm({ onSkip, onSuccess }: ShadowZoneFormProps) {
  const { toast } = useToast();
  const [hasConsent, setHasConsent] = useState(false);
  const [fears, setFears] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: shadowData, isLoading } = api.beingProfile.getShadow.useQuery();
  const updateMutation = api.beingProfile.updateShadow.useMutation({
    onSuccess: () => {
      toast({
        title: "Zone d'Ombre mise à jour",
        description: "Vos données ont été chiffrées et sauvegardées en toute sécurité.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Erreur lors de la sauvegarde",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = api.beingProfile.deleteShadow.useMutation({
    onSuccess: () => {
      setFears("");
      setVulnerabilities("");
      setHasConsent(false);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Données effacées",
        description: "Vos zones d'ombre ont été définitivement supprimées de nos serveurs.",
      });
    },
  });

  useEffect(() => {
    if (shadowData) {
      setFears(shadowData.fears ?? "");
      setVulnerabilities(shadowData.vulnerabilities ?? "");
      if (shadowData.fears || shadowData.vulnerabilities) {
        setHasConsent(true);
      }
    }
  }, [shadowData]);

  const handleSave = () => {
    updateMutation.mutate({ fears, vulnerabilities });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 italic">Chargement de votre espace sécurisé...</div>;
  }

  return (
    <Card className="w-full max-w-2xl border-slate-200 bg-slate-50/50 shadow-sm transition-all duration-500">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-indigo-600">
          <ShieldCheck className="h-5 w-5" />
          <CardTitle className="text-xl font-semibold tracking-tight">Zone d'Ombre</CardTitle>
        </div>
        <CardDescription className="text-slate-600">
          Un espace pour explorer vos freins sans jugement. Vos réponses sont chiffrées de bout en bout et servent uniquement à affiner votre accompagnement.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {!hasConsent ? (
          <div className="rounded-lg border border-indigo-100 bg-white p-6 shadow-inner">
            <div className="flex items-start gap-3">
              <input
                id="consent-checkbox"
                type="checkbox"
                className="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                checked={hasConsent}
                onChange={(e) => setHasConsent(e.target.checked)}
              />
              <label htmlFor="consent-checkbox" className="text-sm leading-relaxed text-slate-700 cursor-pointer select-none">
                Je comprends que ces données sont sensibles. Je consens à les partager dans cet espace sécurisé 
                pour m'aider à identifier mes points de blocage. Je sais que je peux les effacer à tout moment.
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-2">
              <label htmlFor="fears" className="text-sm font-medium text-slate-700">
                Mes Peurs
              </label>
              <Textarea
                id="fears"
                placeholder="Qu'est-ce qui vous inquiète le plus dans votre projet ?"
                className="min-h-[100px] border-slate-200 bg-white focus-visible:ring-indigo-500"
                value={fears}
                onChange={(e) => setFears(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="vulnerabilities" className="text-sm font-medium text-slate-700">
                Mes Vulnérabilités
              </label>
              <Textarea
                id="vulnerabilities"
                placeholder="Sur quels aspects vous sentez-vous le plus fragile ?"
                className="min-h-[100px] border-slate-200 bg-white focus-visible:ring-indigo-500"
                value={vulnerabilities}
                onChange={(e) => setVulnerabilities(e.target.value)}
              />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between border-t border-slate-100 pt-6">
        <div className="flex gap-2 w-full sm:w-auto">
          {onSkip && (
            <Button variant="ghost" onClick={onSkip} className="text-slate-500 hover:text-slate-700">
              Passer cette étape
            </Button>
          )}
          {hasConsent && (
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Effacer mes ombres
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Effacer définitivement ?</DialogTitle>
                  <DialogDescription>
                    Cette action est irréversible. Vos peurs et vulnérabilités seront immédiatement supprimées de nos bases de données.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button variant="ghost">Annuler</Button>
                  </DialogClose>
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                  >
                    Oui, tout effacer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        {hasConsent && (
          <Button 
            onClick={handleSave} 
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={updateMutation.isPending}
          >
            Sauvegarder
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
