import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-primary font-mono">
              TrailLearn
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link href="/dashboard/dvp" className="text-muted-foreground transition-colors hover:text-primary">
                Mon DVP
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {session.user?.email}
            </span>
            <Link href="/api/auth/signout">
              <Button variant="ghost" size="sm">Déconnexion</Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
