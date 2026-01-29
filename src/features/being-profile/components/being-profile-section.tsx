"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { TrvSelector } from "./trv-selector";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

export function BeingProfileSection() {
  const { toast } = useToast();
  const { data: profile, refetch } = api.beingProfile.get.useQuery();
  
  const [localTrv, setLocalTrv] = useState<number | null>(null);
  const [localTrvLabel, setLocalTrvLabel] = useState<string>("");

  // Sync initial state
  useEffect(() => {
    if (profile?.trvFrequency && localTrv === null) {
      setLocalTrv(profile.trvFrequency);
      setLocalTrvLabel(profile.trvLabel || "");
    }
  }, [profile, localTrv]);

  const updateTrv = api.beingProfile.updateTrv.useMutation({
    onSuccess: () => {
      void refetch();
      toast({
        title: "Profil sauvegardé",
        description: "Vos préférences de rythme ont été mises à jour.",
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

  const handleSelect = (option: { trvFrequency: number; trvLabel: string }) => {
    setLocalTrv(option.trvFrequency);
    setLocalTrvLabel(option.trvLabel);
  };

  const handleSave = () => {
    if (localTrv && localTrvLabel) {
      updateTrv.mutate({
        trvFrequency: localTrv,
        trvLabel: localTrvLabel,
      });
    }
  };

  const isDirty = localTrv !== (profile?.trvFrequency ?? null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Étendu (Être)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TrvSelector
          currentValue={localTrv ?? profile?.trvFrequency}
          onSelect={handleSelect}
        />
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button 
          onClick={handleSave} 
          disabled={!isDirty || updateTrv.isPending}
        >
          {updateTrv.isPending ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </CardFooter>
    </Card>
  );
}
