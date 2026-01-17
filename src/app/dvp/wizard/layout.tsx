import { auth } from "~/server/auth";
import { AppNavbar } from "~/components/shared/app-navbar";
import { redirect } from "next/navigation";

export default async function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <AppNavbar user={session.user} />
      <main className="flex-1 container max-w-3xl py-8">
        {children}
      </main>
    </div>
  );
}