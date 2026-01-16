import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Tableau de Bord Cockpit</h1>
      <p className="text-lg text-muted-foreground">
        Bienvenue, {session.user?.name}. Votre Dossier de Viabilité du Parcours (DVP) commence ici.
      </p>
      <div className="mt-8 p-12 border-2 border-dashed rounded-lg text-center">
        <p className="text-muted-foreground">L'implémentation du Cockpit est prévue pour les prochaines étapes.</p>
      </div>
    </div>
  );
}
