"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scoreCategory } from "@/utils/audit-score";
import type { AuditScore } from "@/types/audit-results";
import { AnimatedCounter } from "@/components/audit-results/shared/animated-counter";

interface AuditScoreCardProps {
  score: AuditScore;
}

export function AuditScoreCard({ score }: AuditScoreCardProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score.overall / 100) * circumference;

  const categoryColors: Record<AuditScore["category"], string> = {
    optimized: "text-emerald-500",
    acceptable: "text-blue-500",
    inefficient: "text-amber-500",
    overspending: "text-red-500",
  };

  const categoryBgs: Record<AuditScore["category"], string> = {
    optimized: "bg-emerald-500/10",
    acceptable: "bg-blue-500/10",
    inefficient: "bg-amber-500/10",
    overspending: "bg-red-500/10",
  };

  return (
    <Card className="border-border/60 bg-card">
      <CardHeader className="border-b border-border/30">
        <CardTitle className="text-sm font-semibold">
          Optimization Score
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative size-40 mb-4">
            <svg
              className="size-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="rgb(39, 39, 42)"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={categoryColors[score.category]}
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p
                className={`text-4xl font-bold ${categoryColors[score.category]}`}
              >
                <AnimatedCounter value={score.overall} />
              </p>
              <p className="text-xs text-zinc-400">out of 100</p>
            </div>
          </div>

          <Badge
            className={`${categoryBgs[score.category]} ${categoryColors[score.category]} border-0 mb-4`}
          >
            {scoreCategory(score.overall)}
          </Badge>

          <p className="max-w-xs text-xs text-zinc-400">
            Internal optimization score based on spend efficiency, redundancy,
            and benchmark alignment.
          </p>
        </div>

        <div className="space-y-3 border-t border-border/30 pt-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Spend Efficiency</span>
              <span className="font-medium text-zinc-50">
                {score.factors.spendPerSeat}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
              <div
                className="h-1.5 rounded-full bg-emerald-400"
                style={{ width: `${score.factors.spendPerSeat}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Tool Redundancy</span>
              <span className="font-medium text-zinc-50">
                {score.factors.toolRedundancy}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
              <div
                className="h-1.5 rounded-full bg-blue-400"
                style={{ width: `${score.factors.toolRedundancy}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Plan Optimization</span>
              <span className="font-medium text-zinc-50">
                {score.factors.planOptimization}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
              <div
                className="h-1.5 rounded-full bg-amber-400"
                style={{ width: `${score.factors.planOptimization}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Use Case Alignment</span>
              <span className="font-medium text-zinc-50">
                {score.factors.useCaseAlignment}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-zinc-800">
              <div
                className="h-1.5 rounded-full bg-purple-400"
                style={{ width: `${score.factors.useCaseAlignment}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
