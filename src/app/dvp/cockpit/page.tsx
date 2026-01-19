"use client";

import { api } from "~/trpc/react";
import { PillarStatusCard } from "~/features/dvp/components/pillar-status-card";
import { ViabilityGauge } from "~/features/dvp/components/viability-gauge";
import { WhatIfSimulator } from "~/features/dvp/components/what-if-simulator";
import { dvpDataSchema, type ViabilityResult } from "~/features/dvp/types";
import { getDvpCompleteness } from "~/features/dvp/utils/dvp-completeness";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MapPin, School, Calendar, Info, CheckCircle2, ShieldCheck, Printer, ArrowRight, AlertCircle, Wallet } from "lucide-react";
import { AnalysisHistoryList } from "~/features/dvp/components/analysis-history-list";
import { FindingsList } from "~/features/dvp/components/findings-list";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CockpitSkeleton } from "~/features/dvp/components/cockpit-skeleton";

export const dynamic = "force-dynamic";

export default function CockpitPage() {
  const router = useRouter();
  
  // Official Data (Last Snapshot)
  const { data: lastSnapshot, isLoading: isLoadingSnapshot } = api.dvp.getLastSnapshot.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  // Working Data (Current Draft for Wizard)
  const { data: dvpRecord, isLoading: isLoadingDvp } = api.dvp.getLatest.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  const { data: rules, isLoading: isLoadingRules } = api.admin.getAllRules.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
  });

  if (isLoadingSnapshot || isLoadingDvp || isLoadingRules) {
    return <CockpitSkeleton />;
  }

  const parseResult = dvpDataSchema.safeParse(dvpRecord?.data);
  const data = parseResult.success ? parseResult.data : undefined;
  
  const completeness = getDvpCompleteness(data);
  const officialDiagnostic = lastSnapshot?.calculationResult as unknown as ViabilityResult | undefined;

  const isDraftAndComplete = dvpRecord?.status === "DRAFT" && completeness.isGlobalComplete;
  const hasNewerDraft = dvpRecord && lastSnapshot && dvpRecord.id !== lastSnapshot.id && dvpRecord.status === "DRAFT";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Mon Cockpit de Viabilité</h1>
            {lastSnapshot && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Certifié v{lastSnapshot.rulesVersion}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Pilotez votre projet et visualisez vos chances de succès.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastSnapshot && (
            <Link href={`/dvp/print/${lastSnapshot.id}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="h-4 w-4" />
                Export PDF
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
          <TabsTrigger value="simulator">Simulateur What-If</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8 mt-6">
          {/* Status Message / Validate CTA */}
          {isDraftAndComplete ? (
            <Card className="border-blue-200 bg-blue-50/50 shadow-sm">
              <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">
                      {hasNewerDraft ? "Modifications en attente de validation" : "Votre dossier est prêt pour l'analyse"}
                    </p>
                    <p className="text-sm text-blue-700">
                      {hasNewerDraft 
                        ? "Vous avez mis à jour vos données. Relancez le calcul pour certifier votre nouveau diagnostic."
                        : "Tous les piliers sont complétés. Validez votre DVP pour générer votre diagnostic officiel."}
                    </p>
                  </div>
                </div>
                <Button onClick={() => router.push("/dvp/wizard/summary")} className="bg-blue-600 hover:bg-blue-700">
                  {hasNewerDraft ? "Mettre à jour le Diagnostic" : "Valider mon Dossier"}
                </Button>
              </CardContent>
            </Card>
          ) : dvpRecord?.status === "DRAFT" && (
            <Card className="bg-yellow-50 border-yellow-100 border-dashed">
              <CardContent className="pt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    Dossier en cours de saisie. <strong>{completeness.isGlobalComplete ? "Prêt à valider" : "Complétez les piliers manquants."}</strong>
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => router.push("/dvp/wizard/project")} className="text-yellow-800 hover:bg-yellow-100 gap-2">
                  Continuer <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <PillarStatusCard 
              title="1. Projet" 
              complete={completeness.isCityComplete} 
              progress={completeness.isCityComplete ? 100 : 50} 
              href="/dvp/wizard/project"
            />
            <PillarStatusCard 
              title="2. Budget" 
              complete={completeness.isBudgetComplete} 
              progress={completeness.isBudgetComplete ? 100 : 33} 
              href="/dvp/wizard/budget"
            />
            <PillarStatusCard 
              title="3. Logement" 
              complete={completeness.isHousingComplete} 
              progress={completeness.isHousingComplete ? 100 : 0} 
              href="/dvp/wizard/housing"
            />
            <PillarStatusCard 
              title="4. Langue" 
              complete={completeness.isLanguageComplete} 
              progress={completeness.isLanguageComplete ? 100 : 0} 
              href="/dvp/wizard/language"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Main Diagnostic Section */}
              <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                <CardHeader className="bg-muted/30 border-b">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">Diagnostic de Viabilité Certifié</CardTitle>
                      {lastSnapshot && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Calculé le {new Date(lastSnapshot.createdAt).toLocaleDateString()} à {new Date(lastSnapshot.createdAt).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    {lastSnapshot && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 px-3">
                        <ShieldCheck className="h-3 w-3 mr-1" /> Officiel
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-10 pb-10">
                  {officialDiagnostic ? (
                    <div className="space-y-12">
                      <div className="flex justify-center">
                         <ViabilityGauge status={officialDiagnostic.status} score={officialDiagnostic.score} />
                      </div>
                      
                      <FindingsList findings={officialDiagnostic.findings} />
                    </div>
                  ) : (
                    <div className="py-16 text-center space-y-6">
                      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <ShieldCheck className="h-8 w-8 text-muted-foreground opacity-20" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold">Aucun diagnostic certifié</p>
                        <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                          Votre historique est vide. Complétez et validez votre premier dossier pour obtenir une analyse White-box complète.
                        </p>
                      </div>
                      <Button onClick={() => router.push("/dvp/wizard/project")} className="gap-2">
                        Démarrer la saisie <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* History Section */}
              <AnalysisHistoryList />
            </div>

            <div className="lg:col-span-1 space-y-6">
               {/* Summary Info Card */}
               {data && (
                 <Card className="bg-muted/20">
                   <CardHeader>
                     <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Paramètres Actuels</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{data.city}, {data.country}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <School className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{data.studyType}</span>
                      </div>
                      {data.budget && (
                        <div className="flex items-center gap-3">
                          <Wallet className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Budget: {data.budget.savings?.toLocaleString()} €</span>
                        </div>
                      )}
                   </CardContent>
                 </Card>
               )}

               <Card className="border-dashed border-2">
                 <CardHeader>
                   <CardTitle className="text-sm flex items-center gap-2">
                     <Info className="h-4 w-4" />
                     À propos du DVP
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="text-xs text-muted-foreground space-y-4">
                   <p>
                     Le Dossier de Viabilité du Parcours (DVP) est un diagnostic algorithmique transparent.
                   </p>
                   <p>
                     Il confronte vos ressources à la réalité économique de votre destination (loyers moyens, coût de la vie).
                   </p>
                   <p className="font-semibold text-blue-600">
                     Utilisez le simulateur What-If pour explorer des alternatives sans modifier votre dossier officiel.
                   </p>
                 </CardContent>
               </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="simulator" className="mt-6">
          <WhatIfSimulator 
            initialData={data || {}} 
            rules={rules || []} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}