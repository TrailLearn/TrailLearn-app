import { WizardStepper } from "~/features/dvp/components/wizard-stepper";
import { BudgetStepForm } from "~/features/dvp/components/forms/budget-step-form";

export default function BudgetStepPage() {
  return (
    <div className="space-y-6">
      <WizardStepper currentStep={2} />
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Votre Budget</h1>
        <p className="text-muted-foreground mb-8">
          Estimez vos ressources pour calculer votre reste à vivre.
        </p>
        
        <BudgetStepForm />
      </div>
    </div>
  );
}
