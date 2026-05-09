"use client";

import { TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/audit-results/shared/animated-counter";
import { formatPercent } from "@/lib/formatting";
import type { AuditResult } from "@/types/audit-results";

interface SavingsHeroProps {
  result: AuditResult;
}

export function SavingsHero({ result }: SavingsHeroProps) {
  const { savings } = result;

  return (
    <Card className="relative overflow-hidden border-border/50 bg-linear-to-br from-emerald-950/30 to-zinc-900 p-6 sm:p-8">
      <div className="absolute -right-20 -top-20 size-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
              Total annual savings
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-emerald-400 sm:text-5xl">
              <AnimatedCounter value={savings.annual} prefix="$" />
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              $
              {savings.monthly.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}{" "}
              per month in recoverable spend.
            </p>
          </div>
          <TrendingDown className="size-10 shrink-0 text-emerald-500" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs text-zinc-400">Monthly Savings</p>
            <p className="mt-1 text-lg font-semibold text-zinc-50">
              <AnimatedCounter value={savings.monthly} prefix="$" />
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">Reduction</p>
            <p className="mt-1 text-lg font-semibold text-emerald-400">
              {formatPercent(savings.percentage)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">Optimization</p>
            <Badge className="mt-1 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/20">
              Finance-ready
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
