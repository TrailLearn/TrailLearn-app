"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { AlertCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "~/lib/utils";
import { type ViabilityFinding } from "../types";

interface InsightCardProps {
  finding: ViabilityFinding;
}

export function InsightCard({ finding }: InsightCardProps) {
  const isRed = finding.severity === "RED";
  const Icon = isRed ? AlertCircle : AlertTriangle;

  const pillarLabels = {
    project: "Projet",
    budget: "Budget",
    housing: "Logement",
    language: "Langue",
  };

  return (
    <Card className={cn(
      "border-l-4",
      isRed ? "border-l-red-500 bg-red-50/30" : "border-l-amber-500 bg-amber-50/30"
    )}>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
        <Icon className={cn("h-5 w-5", isRed ? "text-red-600" : "text-amber-600")} />
        <CardTitle className="text-sm font-bold uppercase tracking-wide opacity-70">
          {pillarLabels[finding.pillar]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium mb-3">{finding.message}</p>
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-white/50 p-2 rounded border border-dashed">
          <Lightbulb className="h-4 w-4 text-blue-500 shrink-0" />
          <div>
            <span className="font-semibold text-blue-700">Conseil :</span> Explorez le simulateur "What-If" pour tester un autre type de logement ou une autre ville.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
