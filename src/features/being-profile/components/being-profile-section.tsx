"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { TrvSelector } from "./trv-selector";
import { ComplexitySlider } from "./complexity-slider";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

export function BeingProfileSection() {
  const { toast } = useToast();
  const { data: profile, refetch } = api.beingProfile.get.useQuery();
  
  const [localTrv, setLocalTrv] = useState<number | null>(null);
  const [localTrvLabel, setLocalTrvLabel] = useState<string>("");
  const [localComplexity, setLocalComplexity] = useState<number | null>(null);

  // Sync initial state
  useEffect(() => {
    if (profile) {
      if (localTrv === null) {
        setLocalTrv(profile.trvFrequency ?? null);
        setLocalTrvLabel(profile.trvLabel ?? "");
      }
      if (localComplexity === null) {
        setLocalComplexity(profile.complexityLevel ?? 50); // Default to balanced
      }
    }
  }, [profile, localTrv, localComplexity]);

  const updateProfile = api.beingProfile.updateProfile.useMutation({
    onSuccess: () => {
      void refetch();
      toast({
        title: "Profil sauvegardé",
        description: "Vos préférences ont été mises à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur de sauvegarde",
        description: error.message || "Impossible de mettre à jour le profil.",
        variant: "destructive",
      });
    },
  });

  const handleTrvSelect = (option: { trvFrequency: number; trvLabel: string }) => {
    setLocalTrv(option.trvFrequency);
    setLocalTrvLabel(option.trvLabel);
  };

  const handleComplexityChange = (val: number) => {
    setLocalComplexity(val);
  };

  const handleSave = () => {
    if (localTrv && localTrvLabel && localComplexity !== null) {
      updateProfile.mutate({
        trvFrequency: localTrv,
        trvLabel: localTrvLabel,
        complexityLevel: localComplexity,
      });
    }
  };

  const isDirty = 
    (localTrv !== (profile?.trvFrequency ?? null)) || 
    (localComplexity !== (profile?.complexityLevel ?? 50));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Étendu (Être)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <TrvSelector
          currentValue={localTrv ?? profile?.trvFrequency}
          onSelect={handleTrvSelect}
        />
        
        <div className="border-t pt-6">
          <ComplexitySlider 
            value={localComplexity ?? profile?.complexityLevel ?? 50}
            onChange={handleComplexityChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button 
          onClick={handleSave} 
          disabled={!isDirty || updateProfile.isPending}
        >
          {updateProfile.isPending ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </CardFooter>
    </Card>
  );
}
