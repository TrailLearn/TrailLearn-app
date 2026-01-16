import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { auth } from "~/server/auth";

export async function HeroSection() {
  const session = await auth();

  return (
    <section className="container px-4 py-24 md:py-32">
      <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
          Tiers de confiance préventif
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Lucidité vs <span className="text-primary">Sélection</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Ne laissez pas votre projet de mobilité internationale au hasard. 
          TrailLearn vous aide à transformer l'incertitude en un plan d'action sécurisé et viable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href={session ? "/dashboard" : "/auth/signup"}>
            <Button size="lg" className="px-8 text-lg font-semibold h-12">
              Commencer mon DVP
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 text-lg font-semibold h-12">
            En savoir plus
          </Button>
        </div>
      </div>
    </section>
  );
}
