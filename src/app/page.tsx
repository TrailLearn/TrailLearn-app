import Link from "next/link";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { HeroSection } from "~/features/landing/components/hero-section";
import { VisionSection } from "~/features/landing/components/vision-section";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary font-mono">TrailLearn</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href={session ? "/dashboard" : "/auth/signin"}>
              <Button variant={session ? "outline" : "default"}>
                {session ? "Tableau de Bord" : "Se connecter"}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <VisionSection />
      </main>

      <footer className="border-t py-12">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TrailLearn. Responsabilité Structurelle & Lucidité.
          </p>
        </div>
      </footer>
    </div>
  );
}
