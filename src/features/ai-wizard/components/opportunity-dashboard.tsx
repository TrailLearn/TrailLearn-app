"use client";

import { useState } from "react";
import { type OrientationOutput, type OpportunityOutput } from "~/features/ai-engine/types";
import { api } from "~/trpc/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { useToast } from "~/components/ui/use-toast";
import { Loader2, Briefcase, MapPin, Target, Calendar, CheckCircle2, GraduationCap, Trophy, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

interface OpportunityDashboardProps {
  orientation: OrientationOutput;
  orientationId: string;
}

export function OpportunityDashboard({ orientation, orientationId }: OpportunityDashboardProps) {
  const [opportunities, setOpportunities] = useState<OpportunityOutput | null>(null);
  const { toast } = useToast();

  const mutation = api.aiOpportunities.generate.useMutation({
    onSuccess: (data) => {
      setOpportunities(data.output as OpportunityOutput);
      toast({
        title: "Opportunités trouvées !",
        description: "Nous avons identifié des parcours concrets pour vous.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de générer les opportunités.",
      });
    },
  });

  const handleGenerateOpportunities = () => {
    mutation.mutate({
      targetJob: orientation.recommendedJobs[0]?.title || "Spécialiste",
      targetEnvironment: orientation.environmentComparison[0]?.location || "Europe",
      horizonMonths: 6,
      financialConstraints: orientation.environmentComparison[0]?.costOfLiving || "Budget standard",
      orientationId: orientationId,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Résumé Orientation */}
        <Card className="md:col-span-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Votre Plan d'Orientation
            </CardTitle>
            <CardDescription>Basé sur votre profil académique et vos aspirations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {orientation.recommendedJobs.map((job, i) => (
                <div key={i} className="p-4 bg-white rounded-lg border shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{job.title}</h4>
                    <Badge variant={job.marketDemand === "high" ? "default" : "secondary"}>
                      Demande {job.marketDemand}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{job.relevance}</p>
                  <div className="text-sm font-semibold text-primary">Salaire est. : {job.estimatedSalary}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environnement & Gaps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Environnements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orientation.environmentComparison.map((env, i) => (
              <div key={i} className="text-sm border-l-2 border-primary pl-3">
                <div className="font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {env.location}
                </div>
                <div className="text-xs text-muted-foreground">Coût : {env.costOfLiving}</div>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-sm mb-2">Gaps de compétences</h4>
              <div className="flex flex-wrap gap-2">
                {orientation.skillsGaps.map((gap, i) => (
                  <Badge key={i} variant="outline" className={cn(
                    gap.priority === "critical" && "border-red-200 bg-red-50 text-red-700"
                  )}>
                    {gap.skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!opportunities ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-xl border-2 border-dashed">
          <GraduationCap className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2">Prêt pour l'action ?</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            L'IA peut maintenant rechercher des écoles, bourses et projets concrets pour atteindre votre Top 1 : 
            <span className="font-semibold text-foreground"> {orientation.recommendedJobs[0]?.title}</span>.
          </p>
          <Button 
            size="lg" 
            onClick={handleGenerateOpportunities}
            disabled={mutation.isPending}
            className="shadow-lg hover:shadow-xl transition-all"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Recherche d'opportunités...
              </>
            ) : (
              <>
                Découvrir les Opportunités
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <Tabs defaultValue="path" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="path">Parcours</TabsTrigger>
              <TabsTrigger value="opportunities">Écoles & Bourses</TabsTrigger>
              <TabsTrigger value="portfolio">Projets & Certifs</TabsTrigger>
              <TabsTrigger value="weekly">Planning Hebdo</TabsTrigger>
            </TabsList>

            <TabsContent value="path" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {opportunities.concretePaths.map((path, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-lg">{path.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {path.steps.map((step, j) => (
                          <li key={j} className="flex gap-3 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">
                              {j + 1}
                            </div>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {opportunities.priorityOpportunities.map((opp, i) => (
                  <Card key={i} className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                      {opp.type === "scholarship" && <Trophy className="w-5 h-5 text-yellow-500" />}
                    </div>
                    <CardHeader>
                      <Badge className="w-fit mb-2">{opp.type}</Badge>
                      <CardTitle className="text-md">{opp.name}</CardTitle>
                      <CardDescription>{opp.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="font-medium text-primary mb-2">Pourquoi pour vous ?</p>
                      <p className="text-muted-foreground">{opp.whyMe}</p>
                      {opp.deadline && (
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-red-600">
                          <Calendar className="w-3 h-3" /> Deadline : {opp.deadline}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Certifications recommandées
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {opportunities.recommendedCertifications.map((cert, i) => (
                      <div key={i} className="p-3 border rounded-md">
                        <div className="font-bold text-sm">{cert.name}</div>
                        <p className="text-xs text-muted-foreground">{cert.justification}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-500" />
                      Projets Portfolio suggérés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {opportunities.portfolioProjects.map((proj, i) => (
                      <div key={i} className="p-3 border rounded-md">
                        <div className="font-bold text-sm">{proj.title}</div>
                        <p className="text-xs text-muted-foreground mb-1">{proj.description}</p>
                        <p className="text-xs italic text-primary">Objectif : {proj.relevanceToTarget}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="pt-6">
              <div className="space-y-4">
                {opportunities.weeklyPlan.map((week, i) => (
                  <Card key={i}>
                    <CardHeader className="py-4">
                      <CardTitle className="text-md flex items-center justify-between">
                        Semaine {week.week} : {week.focus}
                        <Badge variant="outline">Planifié</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {week.tasks.map((task, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {task}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
