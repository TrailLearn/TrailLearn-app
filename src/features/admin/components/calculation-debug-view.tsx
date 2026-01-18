"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type ViabilityResult } from "~/features/dvp/types";

interface CalculationDebugViewProps {
  result: ViabilityResult;
}

export function CalculationDebugView({ result }: CalculationDebugViewProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-mono">Trace du Calcul (Boîte Blanche)</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-slate-950 text-slate-50 font-mono text-sm">
          {result.calculationTrace.map((step, i) => (
            <div key={i} className="mb-1">
              <span className="text-slate-500 mr-2">[{i + 1}]</span>
              {step}
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Version Règles:</span> {result.rulesVersion}
          </div>
          <div>
            <span className="font-semibold">Statut:</span> {result.status}
          </div>
          <div>
            <span className="font-semibold">Score:</span> {result.score}/100
          </div>
          <div>
            <span className="font-semibold">Calculé le:</span> {new Date(result.calculatedAt).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
