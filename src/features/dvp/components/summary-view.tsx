"use client";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { type DvpData, dvpDataSchema } from "~/features/dvp/types";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getDvpCompleteness } from "../utils/dvp-completeness";
import { cn } from "~/lib/utils";

export function SummaryView() {
  const router = useRouter();
  const { data: existingDvp, isLoading } = api.dvp.getLatest.useQuery();
  const submitMutation = api.dvp.submit.useMutation();
  const utils = api.useUtils();

  useEffect(() => {
    if (existingDvp?.status === "COMPLETED") {
      router.push("/dvp/cockpit");
    }
  }, [existingDvp, router]);

  const parseResult = dvpDataSchema.safeParse(existingDvp?.data);
  const data = parseResult.success ? parseResult.data : undefined;

  // Validation logic
  const {
    isCityComplete: isProjectComplete,
    isBudgetComplete,
    isHousingComplete,
    isLanguageComplete,
    isGlobalComplete: isComplete,
  } = getDvpCompleteness(data);

  const handleValidate = async () => {
    if (!existingDvp || !isComplete) return;
    
    try {
      await submitMutation.mutateAsync({
        id: existingDvp.id,
      });
      await utils.dvp.getLastSnapshot.invalidate();
      await utils.dvp.getLatest.invalidate();
      router.push("/dvp/cockpit");
    } catch (error) {
      console.error("Failed to submit", error);
    }
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <SummaryCard title="Projet" complete={isProjectComplete} href="/dvp/wizard/project">
          {data?.city ? `${data.city}, ${data.country}` : "Non défini"}
          <br />
          {data?.studyType}
        </SummaryCard>

        <SummaryCard title="Budget" complete={isBudgetComplete} href="/dvp/wizard/budget">
          Épargne: {data?.budget?.savings ?? "-"} €
          <br />
          Garants: {data?.budget?.guarantorHelp ?? "-"} €/mois
        </SummaryCard>

        <SummaryCard title="Logement" complete={isHousingComplete} href="/dvp/wizard/housing">
          Type: {data?.housing?.type || "-"}
          <br />
          Coût: {data?.housing?.cost ?? "-"} €
        </SummaryCard>

        <SummaryCard title="Langue" complete={isLanguageComplete} href="/dvp/wizard/language">
          Niveau: {data?.language?.level ?? "-"}
        </SummaryCard>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <Link href="/dvp/wizard/language">
          <Button variant="outline">Retour</Button>
        </Link>
        <div className="flex items-center gap-4">
          {!isComplete && (
            <span className="text-sm text-yellow-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Dossier incomplet
            </span>
          )}
          <Button onClick={handleValidate} disabled={!isComplete || submitMutation.isPending}>
            {submitMutation.isPending ? "Validation..." : "Valider mon dossier"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, complete, href, children }: { title: string, complete: boolean, href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="block transition-all hover:scale-[1.01]">
      <Card className={cn(
        "cursor-pointer hover:border-primary/50 transition-colors h-full",
        complete ? "border-green-200 bg-green-50/50" : "border-yellow-200 bg-yellow-50/50"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {complete ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-yellow-600" />}
            <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-0 group-hover:opacity-100">Éditer</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {children}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
