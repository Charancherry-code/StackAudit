"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareActions } from "@/components/audit-results/shared/share-actions";
import { AnimatedCounter } from "@/components/audit-results/shared/animated-counter";
import { formatCurrency, formatPercent } from "@/lib/formatting";
import type { AuditResult } from "@/types/audit-results";

interface StickyActionSidebarProps {
  auditId: string;
  result: AuditResult;
}

export function StickyActionSidebar({
  auditId,
  result,
}: StickyActionSidebarProps) {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <Card className="border-border/60 bg-card">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-sm font-semibold">
            Optimization snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/50 bg-zinc-950/40 p-3">
              <p className="text-xs text-zinc-500">Annual savings</p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                <AnimatedCounter value={result.savings.annual} prefix="$" />
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-zinc-950/40 p-3">
              <p className="text-xs text-zinc-500">Score</p>
              <p className="mt-1 text-lg font-semibold text-zinc-50">
                {result.score.overall}/100
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-zinc-950/40 p-3">
            <p className="text-xs text-zinc-500">Reduction</p>
            <p className="mt-1 text-sm font-medium text-zinc-50">
              {formatPercent(result.savings.percentage)} potential spend
              reduction
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="info">
              {result.recommendations.length} recommendations
            </Badge>
            <Badge variant="outline">
              {result.currentState.toolCount} tools
            </Badge>
          </div>
        </CardContent>
      </Card>

      <ShareActions auditId={auditId} result={result} />

      <Card className="border-border/60 bg-card">
        <CardContent className="space-y-3 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Public preview
          </p>
          <p className="text-sm text-zinc-300">
            {formatCurrency(result.savings.annual)} saved annually, based on a
            confidential AI stack audit.
          </p>
          <p className="text-xs text-zinc-500">
            Accessible via a public share link.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
