"use client";

import * as React from "react";
import { Slider } from "~/components/ui/slider";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

const THRESHOLD_STRUCTURE = 30;
const THRESHOLD_CHAOS = 70;

interface ComplexitySliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function ComplexitySlider({ value, onChange, className }: ComplexitySliderProps) {
  const getFeedback = (val: number) => {
    if (val < THRESHOLD_STRUCTURE) return "Vous aimez les règles claires et les environnements prévisibles.";
    if (val > THRESHOLD_CHAOS) return "Vous avez besoin d'improvisation, de chaos créatif et de liberté.";
    return "Vous cherchez un équilibre entre structure et autonomie.";
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center">
        <Label>Complexité Cognitive</Label>
        <span className="text-sm font-medium text-muted-foreground">{value}%</span>
      </div>
      
      <div className="pt-2 pb-6">
        <Slider
          defaultValue={[value]}
          max={100}
          step={1}
          value={[value]}
          onValueChange={(vals) => onChange(vals[0] ?? 50)}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Besoin de structure</span>
        <span>Besoin d'improvisation</span>
      </div>

      <div className="p-3 bg-muted/50 rounded-md text-sm text-center italic">
        {getFeedback(value)}
      </div>
    </div>
  );
}
