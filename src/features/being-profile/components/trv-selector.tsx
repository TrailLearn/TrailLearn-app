"use client";

import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

const TRV_OPTIONS = [
  { value: 6, label: "6 mois", description: "Besoin de changement fréquent" },
  { value: 12, label: "1 an", description: "Cycles annuels" },
  { value: 36, label: "3 ans", description: "Besoin de stabilité relative" },
  { value: 60, label: "5 ans", description: "Engagement long terme" },
  { value: 120, label: "Stabilité", description: "Besoin d'ancrage durable" },
];

interface TrvSelectorProps {
  currentValue?: number | null;
  onSelect: (option: { trvFrequency: number; trvLabel: string }) => void;
}

export function TrvSelector({ currentValue, onSelect }: TrvSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Votre rythme naturel (TRV)</h3>
        <p className="text-sm text-muted-foreground">
          À quelle fréquence ressentez-vous le besoin de renouveler votre environnement ou vos projets ?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRV_OPTIONS.map((option) => (
          <Card
            key={option.value}
            className={cn(
              "cursor-pointer hover:border-primary transition-colors border-2",
              currentValue === option.value ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"
            )}
            onClick={() => onSelect({ trvFrequency: option.value, trvLabel: option.label })}
          >
            <CardContent className="p-3">
              <div className="font-bold">{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
