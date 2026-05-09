"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BenchmarkInsight } from "@/types/audit-results";

interface BenchmarkInsightsProps {
  benchmarks: BenchmarkInsight[];
}

export function BenchmarkInsights({ benchmarks }: BenchmarkInsightsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-zinc-50">
          Industry Benchmarks
        </h3>
        <p className="text-sm text-zinc-400">
          How you compare to similar teams
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {benchmarks.map((insight) => {
          const isAbove = insight.percentileDifference > 0;
          const Icon = isAbove ? TrendingUp : TrendingDown;
          const color = isAbove
            ? "text-red-500"
            : insight.percentileDifference < -10
              ? "text-emerald-500"
              : "text-zinc-400";

          return (
            <Card
              key={insight.metric}
              className="border-border/30 bg-zinc-900/40"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-400">
                      {insight.metric}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Comparable team benchmark
                    </p>
                  </div>
                  <Icon className={`size-4 ${color}`} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-zinc-500">Your spend</p>
                    <p className="text-lg font-semibold text-zinc-50">
                      ${insight.yourValue}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Benchmark</p>
                    <p className="text-lg font-semibold text-zinc-400">
                      ${insight.benchmarkValue}
                    </p>
                  </div>
                </div>

                <div className="mb-3 h-1.5 rounded-full bg-zinc-800">
                  <div
                    className={`h-1.5 rounded-full ${isAbove ? "bg-red-500" : "bg-emerald-500"}`}
                    style={{
                      width: `${Math.min(Math.abs(insight.percentileDifference), 100)}%`,
                    }}
                  />
                </div>

                <Badge
                  variant={isAbove ? "warning" : "success"}
                  className="mb-3"
                >
                  {isAbove
                    ? `${Math.abs(insight.percentileDifference)}% above benchmark`
                    : `${Math.abs(insight.percentileDifference)}% below benchmark`}
                </Badge>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {insight.insight}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
