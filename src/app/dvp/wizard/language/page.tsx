import { WizardStepper } from "~/features/dvp/components/wizard-stepper";
import { LanguageStepForm } from "~/features/dvp/components/forms/language-step-form";

export default function LanguageStepPage() {
  return (
    <div className="space-y-6">
      <WizardStepper currentStep={4} />
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Votre Niveau de Langue</h1>
        <p className="text-muted-foreground mb-8">
          Estimez votre niveau pour vérifier l'adéquation académique.
        </p>
        
        <LanguageStepForm />
      </div>
    </div>
  );
}
