import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Lock, CheckCircle2 } from "lucide-react";
import { cn } from "~/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  status: "active" | "preview";
  icon?: React.ReactNode;
}

export function FeatureCard({ title, description, href, status, icon }: FeatureCardProps) {
  const isActive = status === "active";

  return (
    <Card className={cn("relative overflow-hidden flex flex-col h-full", !isActive && "bg-muted/50 opacity-80")}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {title}
              {isActive ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <Lock className="w-4 h-4 text-muted-foreground" />
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {isActive ? (
            <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Actif</Badge>
          ) : (
            <Badge variant="secondary" className="bg-gray-100 text-gray-500">Bientôt</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-auto pt-0">
        {isActive ? (
          <Link href={href}>
            <Button className="w-full bg-primary hover:bg-primary/90">Accéder</Button>
          </Link>
        ) : (
          <Button variant="ghost" className="w-full cursor-not-allowed text-muted-foreground" disabled>
            En attente
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
