import { api } from "~/trpc/react";
import { PillarStatusCard } from "~/features/dvp/components/pillar-status-card";
import { ViabilityGauge } from "~/features/dvp/components/viability-gauge";
import { InsightCard } from "~/features/dvp/components/insight-card";
import { WhatIfSimulator } from "~/features/dvp/components/what-if-simulator";
import { dvpDataSchema, type ViabilityResult } from "~/features/dvp/types";
import { getDvpCompleteness } from "~/features/dvp/utils/dvp-completeness";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MapPin, School, Calendar, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default function CockpitPage() {
  const { data: dvpRecord, isLoading: isLoadingDvp } = api.dvp.getLatest.useQuery();
  const { data: rules, isLoading: isLoadingRules } = api.admin.getAllRules.useQuery();

  if (isLoadingDvp || isLoadingRules) return <div>Chargement de votre cockpit...</div>;

  const parseResult = dvpDataSchema.safeParse(dvpRecord?.data);
  const data = parseResult.success ? parseResult.data : undefined;
  
  const completeness = getDvpCompleteness(data);
  const diagnostic = dvpRecord?.calculationResult as ViabilityResult | undefined;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mon Cockpit de Viabilité</h1>
          <p className="text-muted-foreground">
            Pilotez votre projet et visualisez vos chances de succès.
          </p>
        </div>
        {!diagnostic && (
           <div className="flex-shrink-0">
              <ViabilityGauge 
                status={completeness.isGlobalComplete ? "RED" : "INCOMPLETE"} 
                score={0} 
              />
           </div>
        )}
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
          <TabsTrigger value="simulator">Simulateur What-If</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8 mt-6">
          {/* Overview Info */}
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-blue-600/70 font-semibold uppercase">Destination</div>
                    <div className="font-semibold">{data?.city || "Non défini"}, {data?.country || "-"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-blue-600/70 font-semibold uppercase">Études</div>
                    <div className="font-semibold">{data?.studyType || "Non défini"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-xs text-blue-600/70 font-semibold uppercase">Dernier calcul</div>
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
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse de votre Dossier Officiel</CardTitle>
                </CardHeader>
                <CardContent>
                  {dvpRecord?.status === "COMPLETED" && diagnostic ? (
                    <div className="space-y-6">
                      <div className="flex justify-center py-4">
                         <ViabilityGauge status={diagnostic.status} score={diagnostic.score} />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {diagnostic.findings.length > 0 ? (
                          diagnostic.findings.map((finding, i) => (
                            <InsightCard key={i} finding={finding} />
                          ))
                        ) : (
                          <div className="md:col-span-2 text-center py-10 bg-green-50 rounded-lg text-green-700">
                            ✨ Aucun point de vigilance détecté. Votre projet est solide !
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-yellow-50 border border-yellow-100 p-6 text-center text-yellow-800">
                      ⚠️ Votre dossier est en cours de saisie. Complétez tous les piliers pour obtenir votre diagnostic.
                    </div>
                  )}
                </CardContent>
              </Card>
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