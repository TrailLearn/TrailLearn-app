import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { FeatureCard } from "./_components/feature-card";
import { Progress } from "~/components/ui/progress";
import { MessageSquare, FileText, LayoutDashboard, Target } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container py-8 space-y-12">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Bonjour, {session.user?.name || "Aubin"}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Votre espace de pilotage académique et professionnel.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-sm font-medium text-muted-foreground">Progression globale</span>
            <div className="flex items-center gap-3 mt-1">
              <Progress value={15} className="w-48 h-2" />
              <span className="text-sm font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Écosystème TrailLearn</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="Coach IA – Miroir Lucide"
            description="Clarifiez vos intentions et affinez votre projet avec notre IA maïeutique."
            href="/dashboard/chat"
            status="active"
            icon={<MessageSquare className="w-5 h-5" />}
          />
          <FeatureCard
            title="DVP – Dossier de Viabilité"
            description="Structurez votre parcours et évaluez la solidité de votre trajectoire."
            href="/dvp/cockpit"
            status="preview"
            icon={<FileText className="w-5 h-5" />}
          />
          <FeatureCard
            title="Cockpit"
            description="Pilotez vos indicateurs de réussite et ajustez votre stratégie en temps réel."
            href="/dvp/cockpit"
            status="preview"
            icon={<LayoutDashboard className="w-5 h-5" />}
          />
          <FeatureCard
            title="Plan / Focus"
            description="Planifiez vos prochaines étapes et restez concentré sur vos objectifs prioritaires."
            href="/dashboard/focus"
            status="preview"
            icon={<Target className="w-5 h-5" />}
          />
        </div>
      </div>
    </div>
  );
}
