import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CheckCircle2, Circle, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";
import Link from "next/link";

interface PillarStatusCardProps {
  title: string;
  complete: boolean;
  progress: number;
  href?: string;
  children?: React.ReactNode;
}

export function PillarStatusCard({ title, complete, progress, href, children }: PillarStatusCardProps) {
  const content = (
    <Card className={cn(
      "overflow-hidden transition-all h-full",
      complete ? "border-green-200" : "border-yellow-200",
      href && "hover:border-primary/50 hover:shadow-md cursor-pointer group"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {complete ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          )}
          {href && <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 h-1 w-full rounded-full bg-secondary">
          <div 
            className={cn(
              "h-full rounded-full transition-all",
              complete ? "bg-green-600" : "bg-yellow-500"
            )} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          {complete ? "Complet" : `${progress}% rempli`}
        </div>
        {children && <div className="mt-4">{children}</div>}
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}

