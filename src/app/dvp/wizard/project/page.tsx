import { WizardStepper } from "~/features/dvp/components/wizard-stepper";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function ProjectStepPage() {
  return (
    <div className="space-y-6">
      <WizardStepper currentStep={1} />
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Votre Profil & Projet</h1>
        <p className="text-muted-foreground mb-8">
          Dites-nous qui vous êtes (Situation, Nationalité) et où vous souhaitez aller.
          Ces informations cadrent votre dossier.
        </p>
        
        {/* Placeholder for Story 2.3 Form */}
        <div className="border-2 border-dashed border-muted rounded-md p-8 text-center text-muted-foreground mb-8">
          Formulaire Projet (Arrive avec Story 2.3)
        </div>

        <div className="flex justify-end">
          <Link href="/dvp/wizard/budget">
            <Button>Suivant</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
