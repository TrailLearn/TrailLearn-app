"use client";

import { useState } from "react";
import { OrientationWizard } from "./orientation-wizard";
import { OpportunityDashboard } from "./opportunity-dashboard";
import { type OrientationOutput } from "~/features/ai-engine/types";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export function AiNavigator() {
  const [view, setView] = useState<"wizard" | "dashboard">("wizard");
  const [orientationData, setOrientationData] = useState<{
    output: OrientationOutput;
    id: string;
  } | null>(null);

  const handleOrientationSuccess = (data: any) => {
    setOrientationData({
      output: data.output as OrientationOutput,
      id: data.id,
    });
    setView("dashboard");
  };

  const handleReset = () => {
    setView("wizard");
    setOrientationData(null);
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            AI Navigator
          </h1>
          <p className="text-muted-foreground">
            L'intelligence artificielle au service de votre trajectoire académique et professionnelle.
          </p>
        </div>
        
        {view === "dashboard" && (
          <Button variant="ghost" onClick={handleReset} className="w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Recommencer l'analyse
          </Button>
        )}
      </div>

      <div className="mt-8">
        {view === "wizard" ? (
          <OrientationWizard onSuccess={handleOrientationSuccess} />
        ) : (
          orientationData && (
            <OpportunityDashboard 
              orientation={orientationData.output} 
              orientationId={orientationData.id} 
            />
          )
        )}
      </div>
    </div>
  );
}
