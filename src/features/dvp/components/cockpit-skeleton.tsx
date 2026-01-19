import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function CockpitSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
        <Skeleton className="h-12 w-[150px]" />
      </div>

      <Skeleton className="h-10 w-[400px]" />

      <div className="space-y-8">
        <Skeleton className="h-24 w-full" />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
