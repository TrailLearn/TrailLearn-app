import { WizardStepper } from "~/features/dvp/components/wizard-stepper";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function BudgetStepPage() {
  return (
    <div className="space-y-6">
      <WizardStepper currentStep={2} />
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Votre Budget</h1>
        <p className="text-muted-foreground mb-8">
          Estimez vos ressources pour calculer votre reste à vivre.
        </p>
        
        {/* Placeholder for Story 2.4 Form */}
        <div className="border-2 border-dashed border-muted rounded-md p-8 text-center text-muted-foreground mb-8">
          Formulaire Budget (Arrive avec Story 2.4)
        </div>

        <div className="flex justify-between">
          <Link href="/dvp/wizard/project">
            <Button variant="outline">Précédent</Button>
          </Link>
          <Button disabled>Suivant (WIP)</Button>
        </div>
      </div>
    </div>
  );
}
