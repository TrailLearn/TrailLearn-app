import { WizardStepper } from "~/features/dvp/components/wizard-stepper";
import { SummaryView } from "~/features/dvp/components/summary-view";

export default function SummaryStepPage() {
  return (
    <div className="space-y-6">
      <WizardStepper currentStep={5} />
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Synthèse de votre dossier</h1>
        <p className="text-muted-foreground mb-8">
          Vérifiez vos informations avant de lancer l'analyse de viabilité.
        </p>
        
        <SummaryView />
      </div>
    </div>
  );
}
