import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { BeingProfileSection } from "~/features/being-profile/components/being-profile-section";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return <div>Utilisateur introuvable.</div>;

  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations Personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Nom</label>
              <p className="font-medium">{user.name || "Non renseigné"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Rôle</label>
              <div className="mt-1">
                <Badge variant={user.role === "ADMIN" ? "destructive" : "secondary"}>
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <BeingProfileSection />

        <Card>
          <CardHeader>
            <CardTitle>Préférences (Détectées par le Coach)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-4 rounded-md text-xs overflow-auto max-h-60">
              {JSON.stringify(user.preferences, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
