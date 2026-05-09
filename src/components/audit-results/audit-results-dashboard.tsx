"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";
import { SavingsHero } from "@/components/audit-results/savings-hero";
import { AuditScoreCard } from "@/components/audit-results/audit-score-card";
import { RecommendationsSection } from "@/components/audit-results/recommendations-section";
import { BenchmarkInsights } from "@/components/audit-results/benchmark-insights";
import { ShareActions } from "@/components/audit-results/shared/share-actions";
import { StickyActionSidebar } from "@/components/audit-results/shared/sticky-action-sidebar";
import { AuditResultsSkeleton } from "@/components/audit-results/shared/audit-results-skeleton";
import { formatCurrency, formatDate, formatPercent } from "@/lib/formatting";
import type { AuditResult } from "@/types/audit-results";

const AuditPerformanceCharts = dynamic(
  () =>
    import("@/components/audit-results/charts/audit-performance-charts").then(
      (mod) => mod.AuditPerformanceCharts,
    ),
  {
    ssr: false,
    loading: () => <AuditResultsSkeleton />,
  },
);

interface AuditResultsDashboardProps {
  auditId: string;
  result: AuditResult;
  source: "generated" | "local";
}

export function AuditResultsDashboard({
  auditId,
  result,
  source,
}: AuditResultsDashboardProps) {
  const priorityLabel =
    result.score.category === "optimized"
      ? "Optimized"
      : result.score.category === "acceptable"
        ? "Acceptable"
        : result.score.category === "inefficient"
          ? "Needs attention"
          : "Overspending";

  return (
    <section className="border-b border-border/30 bg-transparent">
      <div className="mx-auto container-app py-10 md:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <main className="min-w-0 space-y-8">
            <Reveal>
              <header className="space-y-4 border-b border-border/40 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info">Public audit</Badge>
                  <Badge
                    variant={
                      result.score.category === "optimized"
                        ? "success"
                        : result.score.category === "acceptable"
                          ? "secondary"
                          : "warning"
                    }
                  >
                    Score {result.score.overall}/100
                  </Badge>
                  <Badge variant="outline">
                    {source === "local" ? "Saved analysis" : "Preview analysis"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                    Audit report
                  </h1>
                  <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
                    Private company details are hidden. This public view
                    surfaces only the optimization score, savings, benchmark
                    comparisons, and recommended actions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                  <span>Audit ID: {auditId}</span>
                  <span aria-hidden="true">•</span>
                  <span>Updated {formatDate(result.analyzedAt)}</span>
                  <span aria-hidden="true">•</span>
                  <span>{priorityLabel}</span>
                </div>
              </header>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <SavingsHero result={result} />
            </motion.div>

            <div className="lg:hidden sticky top-20 z-20">
              <ShareActions auditId={auditId} result={result} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-border/60 bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Annual savings
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-emerald-400">
                        {formatCurrency(result.savings.annual)}
                      </p>
                    </div>
                    <BarChart3 className="size-5 text-emerald-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Savings rate
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-50">
                        {formatPercent(result.savings.percentage)}
                      </p>
                    </div>
                    <ShieldCheck className="size-5 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                        Recommendations
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-50">
                        {result.recommendations.length}
                      </p>
                    </div>
                    <BrainCircuit className="size-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <AuditScoreCard score={result.score} />
              </div>
              <div className="md:col-span-2">
                <AuditPerformanceCharts result={result} />
              </div>
            </div>

            <RecommendationsSection recommendations={result.recommendations} />
            <BenchmarkInsights benchmarks={result.benchmarks} />
          </main>

          <aside className="hidden min-w-0 lg:block">
            <StickyActionSidebar auditId={auditId} result={result} />
          </aside>
        </div>
      </div>
    </section>
  );
}
