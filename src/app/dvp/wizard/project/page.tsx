import { WizardStepper } from "~/features/dvp/components/wizard-stepper";
import { ProjectStepForm } from "~/features/dvp/components/forms/project-step-form";

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
        
        <ProjectStepForm />
      </div>
    </div>
  );
}