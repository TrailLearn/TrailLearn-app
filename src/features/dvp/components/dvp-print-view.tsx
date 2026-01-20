"use client";

import { api } from "~/trpc/react";
import { useEffect } from "react";
import { Badge } from "~/components/ui/badge";
import { ViabilityGauge } from "./viability-gauge";
import { FindingsList } from "./findings-list";
import { dvpDataSchema, type ViabilityResult } from "../types";
import { MapPin, School, Calendar, User, ShieldCheck } from "lucide-react";

export function DvpPrintView({ dvpId }: { dvpId: string }) {
  // We fetch by ID specifically to ensure we print the right snapshot
  // But our router currently only has getLatest and getHistory.
  // We need `getById` or similar. 
  // For V1, let's assume `getLatest` is what we want if ID matches, or we add `getById`.
  // Let's add `getById` to router next.
  
  const { data: record, isLoading } = api.dvp.getById.useQuery({ id: dvpId });

  if (isLoading) return <div className="p-10 text-center">Chargement du document...</div>;
  if (!record) return <div className="p-10 text-center text-red-500">Document introuvable ou accès refusé.</div>;

  const parseResult = dvpDataSchema.safeParse(record.data);
  const data = parseResult.success ? parseResult.data : undefined;
  const diagnostic = record.calculationResult as unknown as ViabilityResult | undefined;
  const date = new Date(record.createdAt);

  return (
    <>
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            animation: none !important;
            transition: none !important;
          }
          /* Force Gauge fill if it uses specific classes, but global animation none should help */
        }
      `}</style>
      <div className="max-w-[210mm] mx-auto bg-white min-h-screen p-8 print:p-0 print:mx-0 print:w-full">
        {/* Header */}
        <header className="border-b pb-6 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">TrailLearn</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
            Dossier de Viabilité du Parcours
          </p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-1 border-blue-900 text-blue-900 rounded-none">
            {record.status === "COMPLETED" ? "CERTIFIÉ" : "BROUILLON"}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Réf: {record.id.slice(-8).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Student & Project Info */}
      <section className="grid grid-cols-2 gap-8 mb-10 bg-slate-50 p-6 rounded-lg print:bg-transparent print:border print:p-4">
        <div>
          <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4 flex items-center gap-2">
            <User className="h-4 w-4" /> Étudiant
          </h3>
          <p className="font-semibold text-lg">{record.user.name || "Utilisateur"}</p>
          <p className="text-sm text-muted-foreground">{record.user.email}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Projet
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Destination</div>
              <div className="font-semibold">{data?.city}, {data?.country}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Études</div>
              <div className="font-semibold">{data?.studyType}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic */}
      <section className="mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold mb-6 border-l-4 border-blue-600 pl-4">
          Diagnostic de Viabilité
        </h2>
        
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl mb-8 print:bg-transparent print:border">
           <ViabilityGauge 
             status={diagnostic?.status ?? "INCOMPLETE"} 
             score={diagnostic?.score ?? 0} 
           />
           <p className="mt-4 text-center text-sm text-muted-foreground italic max-w-lg">
             Ce score est calculé sur la base des données fournies et des indicateurs économiques à la date du calcul.
           </p>
        </div>

        {diagnostic && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Analyse Détaillée (White-box)</h3>
            <FindingsList findings={diagnostic.findings} />
          </div>
        )}
      </section>

      {/* Pillars Summary */}
      <section className="mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold mb-6 border-l-4 border-blue-600 pl-4">
          Synthèse des Piliers
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded">
            <span className="font-bold block mb-1">Budget</span>
            Épargne: {data?.budget?.savings} € <br/>
            Garant: {data?.budget?.guarantorHelp} €/mois <br/>
            Revenus: {data?.budget?.otherIncome} €/mois
          </div>
          <div className="p-4 border rounded">
            <span className="font-bold block mb-1">Logement</span>
            Type: {data?.housing?.type} <br/>
            Coût estimé: {data?.housing?.cost} €/mois
          </div>
          <div className="p-4 border rounded">
            <span className="font-bold block mb-1">Langue</span>
            Niveau: {data?.language?.level}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-8 border-t text-xs text-muted-foreground flex justify-between items-end print:fixed print:bottom-0 print:left-0 print:right-0 print:p-8 print:bg-white">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <ShieldCheck className="h-4 w-4" />
             <span className="font-bold">TrailLearn Certified Truth</span>
          </div>
          <p>Standard de Vérité v{record.rulesVersion || "1.0"}</p>
          <p>Calculé le {date.toLocaleDateString()} à {date.toLocaleTimeString()}</p>
        </div>
        <div className="text-right">
          <p>Document généré par TrailLearn.com</p>
          <p>L'unité de vérité pour votre mobilité.</p>
        </div>
      </footer>
      </div>
    </>
  );
}
