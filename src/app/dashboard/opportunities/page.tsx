import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search, Filter, Lock } from "lucide-react";

export default async function OpportunitiesPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunités</h1>
          <p className="text-muted-foreground">Découvrez les parcours et débouchés adaptés à votre profil.</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1 text-sm flex gap-2">
          <Lock className="w-3 h-3" />
          Bientôt disponible
        </Badge>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher une opportunité..." className="pl-10" disabled />
        </div>
        <Button variant="outline" className="flex gap-2" disabled>
          <Filter className="w-4 h-4" />
          Filtres
        </Button>
      </div>

      <div className="grid gap-6 opacity-60">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-muted/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">Opportunité #00{i} (Simulation)</CardTitle>
                <Badge variant="outline">Deadline: --/--/----</Badge>
              </div>
              <CardDescription>Description détaillée de l'opportunité à venir.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
