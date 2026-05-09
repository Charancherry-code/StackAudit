"use client";

import {
  ChevronDown,
  AlertCircle,
  Zap,
  Combine,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AuditRecommendation } from "@/types/audit-results";
import { formatCurrency, formatPercent } from "@/lib/formatting";

const ICONS = {
  downgrade: Zap,
  consolidate: Combine,
  switch: ArrowRight,
  cancel: AlertCircle,
};

const COLORS = {
  high: "border-emerald-500/30 bg-emerald-500/5",
  medium: "border-blue-500/30 bg-blue-500/5",
  low: "border-zinc-500/30 bg-zinc-500/5",
};

const CONFIDENCE = {
  high: 94,
  medium: 82,
  low: 68,
};

interface RecommendationCardProps {
  recommendation: AuditRecommendation;
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const Icon = ICONS[recommendation.type] || AlertCircle;
  const colorClass = COLORS[recommendation.impact];
  const confidence = CONFIDENCE[recommendation.impact];

  return (
    <details
      className={`group rounded-2xl border ${colorClass} bg-card/95 shadow-elev-1`}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 rounded-xl border border-border/60 bg-background/80 p-2.5">
            <Icon className="size-4 text-primary" />
          </div>
          <div className="min-w-0 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-zinc-50">
                {recommendation.provider}
              </h3>
              <Badge variant="info" className="h-5">
                Priority {recommendation.impact}
              </Badge>
              <Badge variant="outline" className="h-5">
                Confidence {confidence}%
              </Badge>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              {recommendation.reasoning}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-zinc-500">Annual savings</p>
            <p className="text-sm font-semibold text-emerald-400">
              {formatCurrency(recommendation.annualSavings)}
            </p>
          </div>
          <ChevronDown className="size-4 text-zinc-500 transition-transform duration-200 group-open:rotate-180" />
        </div>
      </summary>

      <CardContent className="border-t border-border/50 p-5 pt-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-zinc-950/45 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
              Current setup
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-50">
              {recommendation.currentSetup.plan}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {formatCurrency(recommendation.currentSetup.monthlySpend)}/mo
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {recommendation.currentSetup.seats} seats
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-emerald-400">
              Recommended setup
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-50">
              {recommendation.recommendedSetup.plan}
            </p>
            <p className="mt-1 text-sm text-emerald-400">
              {formatCurrency(recommendation.recommendedSetup.monthlySpend)}/mo
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {recommendation.recommendedSetup.seats
                ? `${recommendation.recommendedSetup.seats} seats`
                : "Same seat coverage"}
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-background/50 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
              Expected impact
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-zinc-50">
              <ShieldCheck className="size-4 text-emerald-400" />
              {formatPercent(
                (recommendation.monthlySavings /
                  Math.max(recommendation.currentSetup.monthlySpend, 1)) *
                  100,
              )}{" "}
              reduction
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {formatCurrency(recommendation.monthlySavings)}/mo saved, or{" "}
              {formatCurrency(recommendation.annualSavings)}/yr.
            </p>
          </div>
        </div>
      </CardContent>
    </details>
  );
}
