'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { CheckCircle2, Circle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '~/lib/utils';

interface InsightCardProps {
  details: {
    completion: number;
    coherence: number;
    breakdown: {
      project: boolean;
      budget: boolean;
      housing: boolean;
      language: boolean;
    };
  };
  className?: string;
}

export function InsightCard({ details, className }: InsightCardProps) {
  const pillars = [
    { key: 'project', label: 'Projet & Ville', active: details.breakdown.project },
    { key: 'budget', label: 'Budget & Financement', active: details.breakdown.budget },
    { key: 'housing', label: 'Logement & Coûts', active: details.breakdown.housing },
    { key: 'language', label: 'Niveau de Langue', active: details.breakdown.language },
  ];

  return (
    <Card className={cn("shadow-none border-gray-200", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600" />
          Analyse de l'Indice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Complétion</p>
            <p className="text-lg font-bold">{details.completion}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Cohérence</p>
            <p className="text-lg font-bold">{details.coherence}%</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Piliers du projet</p>
          <div className="grid gap-2">
            {pillars.map((p) => (
              <div key={p.key} className="flex items-center justify-between text-xs p-2 rounded bg-gray-50">
                <span className="font-medium text-gray-700">{p.label}</span>
                {p.active ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Données présentes
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-400 border-gray-200 gap-1 text-[10px]">
                    <Circle className="w-3 h-3" /> Manquant
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed">
          {details.completion < 100 
            ? "💡 Validez vos sections dans le DVP pour augmenter significativement votre score."
            : "✅ Votre projet est administrativement complet. Concentrez-vous sur la cohérence financière."}
        </p>
      </CardContent>
    </Card>
  );
}
