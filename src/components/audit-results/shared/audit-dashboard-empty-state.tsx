import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AuditDashboardEmptyStateProps {
  title: string;
  description: string;
}

export function AuditDashboardEmptyState({
  title,
  description,
}: AuditDashboardEmptyStateProps) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-16">
      <Card className="w-full border-border/60 bg-card">
        <CardContent className="space-y-5 p-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-muted/50">
            <ShieldAlert className="size-6 text-zinc-300" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50">{title}</h1>
            <p className="mt-2 text-sm text-zinc-400">{description}</p>
          </div>
          <Link href="/audit">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Return to audit form
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
