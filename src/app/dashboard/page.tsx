import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bonjour, {session.user?.name || "Étudiant"}</h1>
        <p className="text-muted-foreground">Bienvenue sur votre espace TrailLearn.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Coach IA - Miroir Lucide</CardTitle>
            <CardDescription>Discutez avec votre coach pour clarifier votre projet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/chat">
              <Button className="w-full">Démarrer une session</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mon DVP</CardTitle>
            <CardDescription>Accédez à votre Dossier de Viabilité de Parcours.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dvp/cockpit">
              <Button variant="outline" className="w-full">Ouvrir le Cockpit</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}