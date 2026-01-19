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
import { Calendar, Tag, MapPin, Wallet, School, Home } from "lucide-react";
import type { ViabilityResult } from "../types";
import { dvpDataSchema } from "../types";

interface HistoryDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  record: {
    createdAt: Date;
    status: string;
    rulesVersion: string | null;
    calculationResult: any;
    data: any;
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
  
  const parsedData = dvpDataSchema.safeParse(record.data);
  const data = parsedData.success ? parsedData.data : undefined;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(undefined, { // Use browser default locale/timezone
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Détails de l'analyse</SheetTitle>
          <SheetDescription>
            Snapshot du {formatDate(date)}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Metadata */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(date)}
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

          {/* Parameters Snapshot */}
          {data && (
            <div className="rounded-lg bg-muted/20 p-4 border space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Paramètres de simulation</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" /> Destination
                  </div>
                  <div className="font-medium">{data.city}, {data.country}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <School className="h-3 w-3" /> Études
                  </div>
                  <div className="font-medium">{data.studyType}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wallet className="h-3 w-3" /> Budget
                  </div>
                  <div className="font-medium">{data.budget?.savings?.toLocaleString()} €</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Home className="h-3 w-3" /> Logement
                  </div>
                  <div className="font-medium capitalize">{data.housing?.type} ({data.housing?.cost}€)</div>
                </div>
              </div>
            </div>
          )}

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