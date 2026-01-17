import { WizardStepper } from "~/features/dvp/components/wizard-stepper";
import { HousingStepForm } from "~/features/dvp/components/forms/housing-step-form";

export default function HousingStepPage() {
  return (
    <div className="space-y-6">
      <WizardStepper currentStep={3} />
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Votre Logement</h1>
        <p className="text-muted-foreground mb-8">
          Définissez votre mode de logement pour estimer le coût réel.
        </p>
        
        <HousingStepForm />
      </div>
    </div>
  );
}
