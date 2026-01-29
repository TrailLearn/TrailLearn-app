"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { TrvSelector } from "~/features/being-profile/components/trv-selector";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

const ONBOARDING_VERSION = 1;

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState(1);
  
  const { data: profile, refetch: refetchProfile } = api.beingProfile.get.useQuery();
  
  // Local state to track user selection immediately
  const [localTrv, setLocalTrv] = useState<number | null>(null);

  // Derived state: Use local selection if active, otherwise fallback to server data
  const effectiveTrv = localTrv ?? profile?.trvFrequency;

  const updateTrv = api.beingProfile.updateTrv.useMutation({
    onSuccess: () => {
      void refetchProfile();
    },
  });

  const handleTrvSelect = (option: { trvFrequency: number; trvLabel: string }) => {
    setLocalTrv(option.trvFrequency);
    updateTrv.mutate(option);
  };

  const completeOnboarding = api.user.completeOnboarding.useMutation({
    onSuccess: async () => {
      // Force session refresh to update middleware state
      await update({ 
        onboardingStatus: "COMPLETED", 
        onboardingVersion: ONBOARDING_VERSION 
      });
      router.push("/dashboard");
    },
  });

  const handleFinish = () => {
    completeOnboarding.mutate({ version: ONBOARDING_VERSION });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Bienvenue sur TrailLearn
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Configurons votre compte pour une expérience personnalisée.
          </p>
        </CardHeader>
        <CardContent className="py-6">
          {step === 1 && (
            <div className="space-y-6">
              <TrvSelector
                currentValue={effectiveTrv}
                onSelect={handleTrvSelect}
                isSaving={updateTrv.isPending}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!effectiveTrv}
                >
                  Continuer
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">C'est prêt !</h3>
              <p>
                Vous avez configuré vos bases. Vous pouvez maintenant accéder à votre cockpit et commencer à discuter avec votre Coach.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Retour
                </Button>
                <Button 
                  onClick={handleFinish}
                  disabled={completeOnboarding.isPending}
                >
                  {completeOnboarding.isPending ? "Finalisation..." : "Accéder au Dashboard"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 rounded-full ${
                  step === s ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
