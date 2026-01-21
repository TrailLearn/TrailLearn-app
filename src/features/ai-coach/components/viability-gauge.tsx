'use client';

import { Progress } from '~/components/ui/progress';
import { cn } from '~/lib/utils';

interface ViabilityGaugeProps {
  score: number;
  label?: string;
  className?: string;
}

/**
 * A gauge component to visualize the Clarity/Viability index.
 * Colors:
 * - 0-39:  Red (Critical/Vague)
 * - 40-69: Amber (Draft/Incomplete)
 * - 70-100: Green (Clear/Solid)
 */
export function ViabilityGauge({ score, label, className }: ViabilityGaugeProps) {
  // Normalize score between 0 and 100
  const normalizedScore = Math.min(Math.max(score, 0), 100);

  const getColorClass = (val: number) => {
    if (val < 40) return 'bg-red-500';
    if (val < 70) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getStatusText = (val: number) => {
    if (val < 40) return 'Vague';
    if (val < 70) return 'En cours';
    return 'Clair';
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          {label && <p className="text-sm font-medium text-gray-500">{label}</p>}
          <p className="text-2xl font-bold tracking-tight">
            {normalizedScore}%
            <span className={cn(
              "ml-2 text-xs font-semibold px-2 py-0.5 rounded-full uppercase",
              normalizedScore < 40 ? "bg-red-100 text-red-700" :
              normalizedScore < 70 ? "bg-amber-100 text-amber-700" :
              "bg-emerald-100 text-emerald-700"
            )}>
              {getStatusText(normalizedScore)}
            </span>
          </p>
        </div>
      </div>
      
      <Progress 
        value={normalizedScore} 
        className="h-2 w-full" 
        indicatorClassName={getColorClass(normalizedScore)}
        aria-label={`Indice de clarté: ${normalizedScore}%`}
      />
      
      <p className="text-[10px] text-gray-400 italic">
        Cet indice mesure la complétion administrative et la cohérence de vos données.
      </p>
    </div>
  );
}
