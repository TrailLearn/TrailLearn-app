import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Sparkles, Target, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function CoachHubPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const aiTools = [
    {
      title: "IA Orientation Académique",
      description: "Déterminez quels métiers viser selon vos études et où les exercer (pays, villes, salaires).",
      href: "/dashboard/coach/orientation",
      icon: <Compass className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "IA Opportunités & Profil Builder",
      description: "Transformez votre cible en actions : écoles, bourses, certifications et projets portfolio.",
      href: "/dashboard/coach/opportunities",
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" /> Hub Intelligence Artificielle
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Votre Coach Digital</h1>
        <p className="text-xl text-muted-foreground">
          Deux assistants spécialisés pour vous accompagner de la réflexion à l'action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {aiTools.map((tool, i) => (
          <Card key={i} className={`flex flex-col h-full border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${tool.color}`}>
            <CardHeader className="space-y-4">
              <div className="p-3 bg-white w-fit rounded-2xl shadow-sm">
                {tool.icon}
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">{tool.title}</CardTitle>
                <CardDescription className="text-md leading-relaxed">
                  {tool.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* On peut ajouter des statistiques ou des infos ici plus tard */}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full h-12 text-lg font-bold shadow-md">
                <Link href={tool.href}>
                  Démarrer la discussion
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-slate-50 border rounded-2xl p-8 mt-12">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5" /> Pourquoi deux IA ?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div className="space-y-2">
            <p className="font-bold text-foreground">1. Spécialisation</p>
            <p>Chaque IA possède un contexte métier précis pour des conseils plus pertinents et moins de "hallucinations".</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">2. Progression</p>
            <p>L'IA Orientation définit la cible (Le Quoi), l'IA Opportunités construit le chemin (Le Comment).</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">3. Persistance</p>
            <p>Vos discussions sont sauvegardées. Vous pouvez affiner votre projet au fil des jours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
