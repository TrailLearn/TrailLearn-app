"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { AlertCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "~/lib/utils";
import type { ViabilityFinding } from "../types";

interface FindingsListProps {
  findings: ViabilityFinding[];
}

export function FindingsList({ findings }: FindingsListProps) {
  if (findings.length === 0) {
    return (
      <Card className="bg-green-50 border-green-100">
        <CardContent className="pt-6 flex items-center gap-4 text-green-700">
          <ShieldCheck className="h-8 w-8 text-green-600" />
          <div>
            <p className="font-semibold">Diagnostic Favorable</p>
            <p className="text-sm">Aucun facteur de risque majeur détecté. Votre projet semble robuste par rapport aux indicateurs économiques actuels.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const pillarLabels = {
    project: "Projet",
    budget: "Budget",
    housing: "Logement",
    language: "Langue",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        Facteurs de Risque & Justifications (White-box)
      </h3>
      <div className="grid gap-4">
        {findings.map((finding, index) => {
          const isRed = finding.severity === "RED";
          const Icon = isRed ? AlertCircle : AlertTriangle;
          
          return (
            <div 
              key={index} 
              className={cn(
                "p-4 rounded-lg border flex gap-4 items-start",
                isRed ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"
              )}
            >
              <div className={cn(
                "p-2 rounded-full",
                isRed ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {pillarLabels[finding.pillar]}
                  </span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase",
                    isRed ? "bg-red-200 text-red-800" : "bg-amber-200 text-amber-800"
                  )}>
                    {isRed ? "Critique" : "Vigilance"}
                  </span>
                </div>
                <p className="text-sm font-medium">{finding.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
