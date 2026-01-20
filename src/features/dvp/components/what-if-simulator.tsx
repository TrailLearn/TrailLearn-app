"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { calculateViability } from "~/features/dvp/engine/calculate-viability";
import { type DvpData, type BusinessRuleSummary } from "~/features/dvp/types";
import { ViabilityGauge } from "./viability-gauge";
import { InsightCard } from "./insight-card";
import { HOUSING_TYPES } from "../utils/housing-prices";

interface WhatIfSimulatorProps {
  initialData: DvpData;
  rules: BusinessRuleSummary[];
}

export function WhatIfSimulator({ initialData, rules }: WhatIfSimulatorProps) {
  const [simData, setSimData] = useState<DvpData>(initialData);

  // Update simulation result whenever simData changes
  const diagnostic = useMemo(() => {
    return calculateViability(simData, rules);
  }, [simData, rules]);

  const handleCityChange = (val: string) => {
    setSimData(prev => ({ ...prev, city: val }));
  };

  const handleSavingsChange = (val: number[]) => {
    setSimData(prev => ({ 
      ...prev, 
      budget: { ...prev.budget, savings: val[0] ?? 0 } 
    }));
  };

  const handleGuarantorChange = (val: number[]) => {
    setSimData(prev => ({ 
      ...prev, 
      budget: { ...prev.budget, guarantorHelp: val[0] ?? 0 } 
    }));
  };

  const handleHousingCostChange = (val: number[]) => {
    setSimData(prev => ({ 
      ...prev, 
      housing: { ...prev.housing, cost: val[0] ?? 0 } 
    }));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Controls */}
      <Card className="lg:col-span-1 border-blue-200 bg-blue-50/20">
        <CardHeader>
          <CardTitle className="text-lg">Paramètres de Simulation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Ville de destination</Label>
            <Select onValueChange={handleCityChange} defaultValue={simData.city}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paris">Paris</SelectItem>
                <SelectItem value="Lyon">Lyon</SelectItem>
                <SelectItem value="Autre">Autre (Province)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Épargne totale (€)</Label>
              <span className="text-sm font-mono font-bold text-blue-600">{simData.budget?.savings}€</span>
            </div>
            <Slider 
              min={0} 
              max={20000} 
              step={500} 
              value={[simData.budget?.savings || 0]} 
              onValueChange={handleSavingsChange} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Aide Mensuelle Garants (€)</Label>
              <span className="text-sm font-mono font-bold text-blue-600">{simData.budget?.guarantorHelp}€</span>
            </div>
            <Slider 
              min={0} 
              max={2000} 
              step={50} 
              value={[simData.budget?.guarantorHelp || 0]} 
              onValueChange={handleGuarantorChange} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Loyer estimé (€)</Label>
              <span className="text-sm font-mono font-bold text-blue-600">{simData.housing?.cost}€</span>
            </div>
            <Slider 
              min={0} 
              max={1500} 
              step={50} 
              value={[simData.housing?.cost || 0]} 
              onValueChange={handleHousingCostChange} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Real-time Results */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-center">
          <ViabilityGauge status={diagnostic.status} score={diagnostic.score} />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {diagnostic.findings.length > 0 ? (
            diagnostic.findings.map((finding, i) => (
              <InsightCard key={i} finding={finding} />
            ))
          ) : (
            <div className="md:col-span-2 text-center py-10 bg-green-50 rounded-lg text-green-700 border border-green-100">
              ✨ Dans ce scénario, votre projet est parfaitement viable.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
