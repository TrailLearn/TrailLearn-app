import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CheckCircle2, Eye } from "lucide-react";

export function VisionSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Le Dossier de Viabilité du Parcours (DVP)</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Le DVP est l'unité de vérité de votre projet. C'est un stress-test algorithmique 
              transparent qui confronte vos intentions à la réalité du terrain.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Responsabilité Structurelle</h4>
                  <p className="text-muted-foreground">Une approche basée sur la structure du projet, pas sur le profil.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Boîte Blanche</h4>
                  <p className="text-muted-foreground">Chaque résultat est expliqué. Pas de boîte noire décisionnelle.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard title="Budget" description="Analyse fine de vos ressources et dépenses prévues." />
            <FeatureCard title="Logement" description="Vérification de la cohérence avec le marché local." />
            <FeatureCard title="Ville" description="Données actualisées sur le coût de la vie par destination." />
            <FeatureCard title="Réussite" description="Indicateurs de viabilité académique et financière." />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary font-mono text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
