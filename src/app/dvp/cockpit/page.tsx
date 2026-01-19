"use client";

import { api } from "~/trpc/react";
import { PillarStatusCard } from "~/features/dvp/components/pillar-status-card";
import { ViabilityGauge } from "~/features/dvp/components/viability-gauge";
import { WhatIfSimulator } from "~/features/dvp/components/what-if-simulator";
import { dvpDataSchema, type ViabilityResult } from "~/features/dvp/types";
import { getDvpCompleteness } from "~/features/dvp/utils/dvp-completeness";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MapPin, School, Calendar, Info, CheckCircle2, ShieldCheck, Printer } from "lucide-react";
import { AnalysisHistoryList } from "~/features/dvp/components/analysis-history-list";
import { FindingsList } from "~/features/dvp/components/findings-list";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CockpitPage() {
  const router = useRouter();
  const { data: dvpRecord, isLoading: isLoadingDvp } = api.dvp.getLatest.useQuery();
  const { data: rules, isLoading: isLoadingRules } = api.admin.getAllRules.useQuery();

  if (isLoadingDvp || isLoadingRules) return <div>Chargement de votre cockpit...</div>;

  const parseResult = dvpDataSchema.safeParse(dvpRecord?.data);
  const data = parseResult.success ? parseResult.data : undefined;
  
  const completeness = getDvpCompleteness(data);
  const diagnostic = dvpRecord?.calculationResult as ViabilityResult | undefined;

  const isDraftAndComplete = dvpRecord?.status === "DRAFT" && completeness.isGlobalComplete;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Mon Cockpit de Viabilité</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Données Officielles
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Pilotez votre projet et visualisez vos chances de succès.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {dvpRecord?.status === "COMPLETED" && (
            <Link href={`/dvp/print/${dvpRecord.id}`} target="_blank">
              <Button variant="outline" className="gap-2">
                <Printer className="h-4 w-4" />
                Télécharger PDF
              </Button>
            </Link>
          )}
          {!diagnostic && (
             <div className="flex-shrink-0">
                <ViabilityGauge 
                  status={completeness.isGlobalComplete ? "AMBER" : "INCOMPLETE"} 
                  score={0} 
                />
             </div>
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
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Votre dossier est prêt pour l'analyse</p>
                    <p className="text-sm text-blue-700">Tous les piliers sont complétés. Validez votre DVP pour générer votre diagnostic officiel.</p>
                  </div>
                </div>
                <Button onClick={() => router.push("/dvp/wizard/summary")} className="bg-blue-600 hover:bg-blue-700">
                  Valider mon Dossier
                </Button>
              </CardContent>
            </Card>
          ) : dvpRecord?.status === "DRAFT" && (
            <div className="rounded-lg bg-yellow-50 border border-yellow-100 p-6 text-center text-yellow-800">
              ⚠️ Votre dossier est en cours de saisie. Complétez tous les piliers pour obtenir votre diagnostic.
            </div>
          )}

          {/* Overview Info */}
          <Card className="bg-muted/30 border-muted">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase">Destination</div>
                    <div className="font-semibold">{data?.city || "Non défini"}, {data?.country || "-"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase">Études</div>
                    <div className="font-semibold">{data?.studyType || "Non défini"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase">Dernière mise à jour</div>
                    <div className="font-semibold">
                      {dvpRecord?.updatedAt ? new Date(dvpRecord.updatedAt).toLocaleDateString() : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <PillarStatusCard 
              title="1. Projet" 
              complete={completeness.isCityComplete} 
              progress={completeness.isCityComplete ? 100 : 50} 
            />
            <PillarStatusCard 
              title="2. Budget" 
              complete={completeness.isBudgetComplete} 
              progress={completeness.isBudgetComplete ? 100 : 33} 
            />
            <PillarStatusCard 
              title="3. Logement" 
              complete={completeness.isHousingComplete} 
              progress={completeness.isHousingComplete ? 100 : 0} 
            />
            <PillarStatusCard 
              title="4. Langue" 
              complete={completeness.isLanguageComplete} 
              progress={completeness.isLanguageComplete ? 100 : 0} 
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Main Diagnostic Section */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/20 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Diagnostic de Viabilité Officiel</CardTitle>
                    {dvpRecord?.status === "COMPLETED" && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                        <ShieldCheck className="h-3 w-3 mr-1" /> Certifié
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  {dvpRecord?.status === "COMPLETED" && diagnostic ? (
                    <div className="space-y-10">
                      <div className="flex justify-center">
                         <ViabilityGauge status={diagnostic.status} score={diagnostic.score} />
                      </div>
                      
                      <FindingsList findings={diagnostic.findings} />
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-4">
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Votre diagnostic officiel n'est pas encore généré. 
                        Complétez et validez votre dossier pour débloquer l'analyse White-box.
                      </p>
                      <Button variant="outline" onClick={() => router.push("/dvp/wizard/project")}>
                        Continuer la saisie
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* History Section */}
              <AnalysisHistoryList />
            </div>

            <div className="lg:col-span-1 space-y-6">
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
