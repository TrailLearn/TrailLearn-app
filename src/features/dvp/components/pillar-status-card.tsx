import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { cn } from "~/lib/utils";

interface PillarStatusCardProps {
  title: string;
  complete: boolean;
  progress: number;
  children?: React.ReactNode;
}

export function PillarStatusCard({ title, complete, progress, children }: PillarStatusCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden",
      complete ? "border-green-200" : "border-yellow-200"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {complete ? (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        ) : (
          <AlertCircle className="h-4 w-4 text-yellow-600" />
        )}
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
}
