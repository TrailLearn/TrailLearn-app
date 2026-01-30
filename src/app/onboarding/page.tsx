"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { TrvSelector } from "~/features/being-profile/components/trv-selector";
import { ShadowZoneForm } from "~/features/being-profile/components/shadow-zone-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";

const ONBOARDING_VERSION = 1;

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const { data: profile, refetch: refetchProfile } = api.beingProfile.get.useQuery();
  
  // Local state to track user selection immediately
  const [localTrv, setLocalTrv] = useState<number | null>(null);

  // Derived state: Use local selection if active, otherwise fallback to server data
  const effectiveTrv = localTrv ?? profile?.trvFrequency;

  const updateTrv = api.beingProfile.updateTrv.useMutation({
    onSuccess: () => {
      void refetchProfile();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre choix : " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleTrvSelect = (option: { trvFrequency: number; trvLabel: string }) => {
    setLocalTrv(option.trvFrequency);
    updateTrv.mutate(option);
  };

  const completeOnboarding = api.user.completeOnboarding.useMutation({
    onSuccess: async () => {
      console.log("Onboarding marked complete in DB. Refreshing session...");
      try {
        // Force session refresh to update middleware state
        await update({ 
          onboardingStatus: "COMPLETED", 
          onboardingVersion: ONBOARDING_VERSION 
        });
        console.log("Session refreshed. Redirecting...");
        // Force hard redirect to ensure middleware sees the new session cookie immediately
        window.location.href = "/dashboard";
      } catch (e) {
        console.error("Session update failed:", e);
        // Fallback: Try redirect anyway, maybe the cookie was updated by the mutation side-effect?
        // Or show error
        toast({
          title: "Session Error",
          description: "La session n'a pas pu être mise à jour. Redirection...",
          variant: "default",
        });
        setTimeout(() => {
           window.location.href = "/dashboard";
        }, 1000);
      }
    },
    onError: (error) => {
      console.error("Onboarding mutation error:", error);
      
      if (error.message.includes("Utilisateur introuvable") || error.data?.code === "UNAUTHORIZED") {
        toast({
          title: "Session expirée",
          description: "Votre session n'est plus valide. Redirection vers la connexion...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/auth/signout";
        }, 2000);
        return;
      }

      toast({
        title: "Erreur critique",
        description: "Impossible de finaliser l'onboarding : " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleFinish = () => {
    completeOnboarding.mutate({ version: ONBOARDING_VERSION });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl">
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
              <h3 className="text-lg font-medium text-center">Rythme de Renouvellement Vital</h3>
              <TrvSelector
                currentValue={effectiveTrv}
                onSelect={handleTrvSelect}
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
            <div className="space-y-6">
               {/* Wrapper pour limiter la largeur du formulaire dans le contexte large de l'onboarding */}
               <div className="flex justify-center">
                  <ShadowZoneForm 
                    onSkip={() => setStep(3)}
                    onSuccess={() => setStep(3)}
                  />
               </div>
               <div className="flex justify-start">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Retour
                  </Button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">C'est prêt !</h3>
              <p>
                Vous avez configuré vos bases. Vous pouvez maintenant accéder à votre cockpit et commencer à discuter avec votre Coach.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
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
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i + 1}
                className={`h-2 w-8 rounded-full ${
                  step === i + 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
