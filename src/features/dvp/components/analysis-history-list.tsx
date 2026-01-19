"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { History, Calendar, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { HistoryDetailsSheet } from "./history-details-sheet";
import { cn } from "~/lib/utils";
import type { ViabilityResult } from "../types";

export function AnalysisHistoryList() {
  const { data: history, isLoading } = api.dvp.getHistory.useQuery();
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <History className="h-4 w-4" />
            Historique des Analyses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Aucune analyse précédente.</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Safe type guard
  const isViabilityResult = (data: unknown): data is ViabilityResult => {
    return (
      typeof data === "object" &&
      data !== null &&
      "score" in data &&
      "status" in data
    );
  };

  const handleRecordClick = (record: any) => {
    setSelectedRecord(record);
    setIsSheetOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <History className="h-4 w-4" />
            Historique des Analyses
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-1">
            {history.slice(0, 10).map((record) => {
              const result = record.calculationResult;
              const hasResult = isViabilityResult(result);
              const date = new Date(record.createdAt);
              
              return (
                <button 
                  key={record.id} 
                  onClick={() => handleRecordClick(record)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left",
                    "hover:bg-accent hover:text-accent-foreground group"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium capitalize">
                        {formatDate(date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTime(date)}
                      {record.rulesVersion && ` • Règles v${record.rulesVersion}`}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={record.status === "COMPLETED" ? "default" : "outline"} className="text-[10px] px-1.5 h-4">
                        {record.status === "COMPLETED" ? "Validé" : "Brouillon"}
                      </Badge>
                      {hasResult ? (
                        <span className={`text-xs font-bold ${
                            result.status === "GREEN" ? "text-green-600" : 
                            result.status === "AMBER" ? "text-orange-600" : "text-red-600"
                        }`}>
                          {result.score}/100
                        </span>
                      ) : record.status === "COMPLETED" ? (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Erreur
                        </span>
                      ) : null}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <HistoryDetailsSheet 
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        record={selectedRecord}
      />
    </>
  );
}
