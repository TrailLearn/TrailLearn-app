"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import { type ViabilityStatus } from "../types";

interface ViabilityGaugeProps {
  status: ViabilityStatus;
  score: number;
}

export function ViabilityGauge({ status, score }: ViabilityGaugeProps) {
  const configs = {
    GREEN: {
      color: "text-green-600",
      bgColor: "bg-green-100",
      icon: CheckCircle2,
      label: "Projet Viable",
      description: "Félicitations ! Votre dossier présente une solidité structurelle rassurante.",
    },
    AMBER: {
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      icon: AlertTriangle,
      label: "Projet Fragile",
      description: "Attention, certains points de votre dossier nécessitent une vigilance ou des ajustements.",
    },
    RED: {
      color: "text-red-600",
      bgColor: "bg-red-100",
      icon: XCircle,
      label: "Non Viable",
      description: "En l'état, votre projet présente des risques critiques d'échec financier ou administratif.",
    },
    INCOMPLETE: {
      color: "text-slate-400",
      bgColor: "bg-slate-100",
      icon: CirclePlaceholder,
      label: "Dossier Incomplet",
      description: "Veuillez terminer la saisie de tous les piliers pour obtenir votre diagnostic.",
    },
  };

  const current = configs[status] || configs.INCOMPLETE;
  const Icon = current.icon;

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border shadow-sm">
      <div className="relative flex items-center justify-center mb-4">
        {/* Simple Gauge SVG */}
        <svg className="h-32 w-48" viewBox="0 0 100 60">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={current.color}
            strokeDasharray="126"
            strokeDashoffset={126 - (126 * (status === "INCOMPLETE" ? 0 : score)) / 100}
          />
        </svg>
        <div className="absolute bottom-2 flex flex-col items-center">
           <Icon className={cn("h-8 w-8", current.color)} />
           <span className="text-2xl font-bold mt-1">{status === "INCOMPLETE" ? "-" : `${score}%`}</span>
        </div>
      </div>
      
      <h3 className={cn("text-xl font-bold", current.color)}>{current.label}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-xs italic">
        "{current.description}"
      </p>
    </div>
  );
}

function CirclePlaceholder({ className }: { className?: string }) {
    return <div className={cn("rounded-full border-2 border-dashed h-8 w-8", className)} />;
}
