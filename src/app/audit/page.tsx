import { AuditPage } from "@/components/audit/audit-page";
import { SiteFooter } from "@/components/landing/site-footer";

export default function AuditRoute() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main>
        <AuditPage />
      </main>
      <SiteFooter />
    </div>
  );
}
