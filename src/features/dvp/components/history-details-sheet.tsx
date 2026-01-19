"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/sheet";
import { ViabilityGauge } from "./viability-gauge";
import { FindingsList } from "./findings-list";
import { Badge } from "~/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import type { ViabilityResult } from "../types";

interface HistoryDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  record: {
    createdAt: Date;
    status: string;
    rulesVersion: string | null;
    calculationResult: any;
  } | null;
}

export function HistoryDetailsSheet({
  isOpen,
  onOpenChange,
  record
}: HistoryDetailsSheetProps) {
  if (!record) return null;

  const result = record.calculationResult as ViabilityResult | null;
  const date = new Date(record.createdAt);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Détails de l'analyse</SheetTitle>
          <SheetDescription>
            Consultation du snapshot historique du {date.toLocaleDateString()}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Metadata */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {date.toLocaleDateString()} à {date.toLocaleTimeString()}
            </div>
            {record.rulesVersion && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                Règles v{record.rulesVersion}
              </div>
            )}
            <Badge variant={record.status === "COMPLETED" ? "default" : "outline"}>
              {record.status === "COMPLETED" ? "Officiel" : "Brouillon"}
            </Badge>
          </div>

          {/* Gauge */}
          <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl">
             <ViabilityGauge 
               status={result?.status ?? "INCOMPLETE"} 
               score={result?.score ?? 0} 
             />
             <p className="mt-4 text-sm font-semibold text-muted-foreground uppercase tracking-widest">
               Score de Viabilité
             </p>
          </div>

          {/* Results List */}
          {result && (
            <div className="space-y-6">
              <FindingsList findings={result.findings} />
            </div>
          )}

          {!result && (
            <div className="p-8 text-center bg-muted/20 rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                Aucun résultat de calcul disponible pour ce snapshot.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
