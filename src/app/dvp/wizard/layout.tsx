import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header simplifié "Focus Mode" */}
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary font-mono">TrailLearn</span>
            <span className="text-sm text-muted-foreground ml-2">| Dossier de Viabilité</span>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Quitter
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl py-8">
        {children}
      </main>
    </div>
  );
}
