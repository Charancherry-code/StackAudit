import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AuditResultsSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card">
        <CardHeader>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card className="border-border/60 bg-card">
            <CardContent className="space-y-4 p-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
              <div className="grid gap-4 sm:grid-cols-3">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card">
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
