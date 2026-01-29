"use client";

import { api } from "~/trpc/react";
import { TrvSelector } from "./trv-selector";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";

export function BeingProfileSection() {
  const { toast } = useToast();
  const { data: profile, refetch } = api.beingProfile.get.useQuery();
  const updateTrv = api.beingProfile.updateTrv.useMutation({
    onSuccess: () => {
      void refetch();
    },
    onError: (error) => {
      toast({
        title: "Erreur de sauvegarde",
        description: error.message || "Impossible de mettre à jour le profil.",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Étendu (Être)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TrvSelector
          currentValue={profile?.trvFrequency}
          onSelect={(option) => updateTrv.mutate(option)}
          isSaving={updateTrv.isPending}
        />
      </CardContent>
    </Card>
  );
}
