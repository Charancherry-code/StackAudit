import { AuditResultsSkeleton } from "@/components/audit-results/shared/audit-results-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto container-app py-10 md:py-14 lg:py-16">
        <AuditResultsSkeleton />
      </div>
    </div>
  );
}
