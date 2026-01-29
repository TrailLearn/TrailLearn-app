"use client";

import { api } from "~/trpc/react";
import { TrvSelector } from "./trv-selector";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function BeingProfileSection() {
  const { data: profile, refetch } = api.beingProfile.get.useQuery();
  const updateTrv = api.beingProfile.updateTrv.useMutation({
    onSuccess: () => {
      void refetch();
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
        />
      </CardContent>
    </Card>
  );
}
