import { cn } from "~/lib/utils";

interface WizardStepperProps {
  currentStep: number;
  totalSteps?: number;
}

export function WizardStepper({ currentStep }: WizardStepperProps) {
  const steps = [
    { number: 1, label: "Projet" },
    { number: 2, label: "Budget" },
    { number: 3, label: "Logement" },
    { number: 4, label: "Synthèse" },
  ];

  return (
    <div className="mb-8 w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Ligne de fond */}
        <div className="absolute left-0 top-4 -translate-y-1/2 w-full h-0.5 bg-muted -z-10" />
        
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          
          return (
            <div key={step.number} className="flex flex-col items-center gap-2 bg-slate-50 px-2 z-10">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors",
                  isCompleted ? "bg-primary text-primary-foreground border-primary" :
                  isCurrent ? "bg-white text-primary border-primary" :
                  "bg-white text-muted-foreground border-muted"
                )}
              >
                {step.number}
              </div>
              <span className={cn(
                "text-xs font-medium",
                isCurrent ? "text-primary" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
