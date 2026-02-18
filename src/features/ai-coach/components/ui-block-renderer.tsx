"use client";

import { type UIBlock } from "~/features/ai-engine/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Briefcase, MapPin, Target, Calendar, CheckCircle2, GraduationCap, Trophy, Info } from "lucide-react";
import { cn } from "~/lib/utils";

interface UIBlockRendererProps {
  block: UIBlock;
}

export function UIBlockRenderer({ block }: UIBlockRendererProps) {
  const { type, data } = block;

  switch (type) {
    case "JOB_RECOMMENDATION":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
          {data.map((job: any, i: number) => (
            <Card key={i} className="border-primary/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-md font-bold">{job.title}</CardTitle>
                  <Badge variant={job.marketDemand === "high" ? "default" : "secondary"} className="text-[10px]">
                    {job.marketDemand}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">{job.relevance}</p>
                <div className="text-sm font-bold text-primary">{job.estimatedSalary}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      );

    case "SKILLS_GAP":
      return (
        <Card className="w-full mt-4 bg-slate-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-orange-500" />
              Compétences à acquérir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.map((gap: any, i: number) => (
                <Badge key={i} variant="outline" className={cn(
                  "bg-white",
                  gap.priority === "critical" && "border-red-200 text-red-700 bg-red-50"
                )}>
                  {gap.skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      );

    case "OPPORTUNITY_LIST":
      return (
        <div className="grid grid-cols-1 gap-4 w-full mt-4">
          {data.map((opp: any, i: number) => (
            <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-primary/10 shadow-sm">
              <div className="p-3 bg-primary/5 rounded-lg h-fit">
                {opp.type === "scholarship" ? <Trophy className="w-5 h-5 text-yellow-600" /> : <GraduationCap className="w-5 h-5 text-primary" />}
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm">{opp.name}</h4>
                  <Badge variant="outline" className="text-[9px]">{opp.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{opp.provider}</p>
                <p className="text-xs italic pt-1">{opp.whyMe}</p>
                {opp.deadline && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 pt-2">
                    <Calendar className="w-3 h-3" /> Fin : {opp.deadline}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case "ACTION_PLAN":
      return (
        <Card className="w-full mt-4 border-emerald-100 bg-emerald-50/30">
          <CardHeader>
            <CardTitle className="text-sm">Votre Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(data).map(([period, tasks]: [string, any], i) => (
              <div key={i} className="space-y-2">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{period}</h5>
                <ul className="space-y-1">
                  {tasks.map((task: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      );

    default:
      return (
        <div className="p-3 bg-slate-100 rounded-lg text-xs flex items-center gap-2 mt-4 text-muted-foreground">
          <Info className="w-4 h-4" /> Bloc de données reçu: {type}
        </div>
      );
  }
}
