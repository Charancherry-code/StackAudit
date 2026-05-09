import type { AuditScore } from "@/types/audit-results";
import { BENCHMARK_DATA } from "@/data/audit-benchmarks";

interface ScoreFactors {
  monthlySpend: number;
  totalSeats: number;
  toolCount: number;
  toolRedundancy: number; // 0-100
  hasDowngradePath: number; // 0-100, higher = more savings available
}

export function calculateAuditScore(factors: ScoreFactors): AuditScore {
  const {
    monthlySpend,
    totalSeats,
    toolCount,
    toolRedundancy,
    hasDowngradePath,
  } = factors;

  const spendPerSeat = monthlySpend / Math.max(totalSeats, 1);
  const benchmark = BENCHMARK_DATA.costPerSeatBenchmark["series-a"];

  // Factor 1: Spend per seat efficiency (0-25)
  const spendPerSeatScore = Math.max(0, 25 - (spendPerSeat / benchmark) * 25);

  // Factor 2: Tool redundancy penalty (0-20)
  const redundancyScore = 20 - toolRedundancy * 0.2;

  // Factor 3: Plan optimization (0-25)
  const planScore = Math.max(0, 25 - (hasDowngradePath / 100) * 25);

  // Factor 4: Tool count reasonableness (0-15)
  const expectedTools =
    toolCount <= 3 ? 15 : Math.max(0, 15 - (toolCount - 3) * 2);

  // Factor 5: Use case alignment (0-15)
  // Assume some alignment; reduce if lots of tool sprawl
  const useCaseScore = toolCount > 5 ? 10 : 15;

  const overall = Math.round(
    spendPerSeatScore +
      redundancyScore +
      planScore +
      expectedTools +
      useCaseScore,
  );

  const category =
    overall >= 90
      ? "optimized"
      : overall >= 70
        ? "acceptable"
        : overall >= 40
          ? "inefficient"
          : "overspending";

  return {
    overall: Math.max(0, Math.min(100, overall)),
    category,
    factors: {
      spendPerSeat: Math.round(spendPerSeatScore),
      toolRedundancy: Math.round(redundancyScore),
      planOptimization: Math.round(planScore),
      useCaseAlignment: Math.round(useCaseScore),
    },
  };
}

export function scoreCategory(score: number): string {
  if (score >= 90) return "Highly Optimized";
  if (score >= 70) return "Acceptable";
  if (score >= 40) return "Needs Optimization";
  return "Significant Opportunity";
}

export function scoreColor(score: number): string {
  if (score >= 90) return "text-emerald-500";
  if (score >= 70) return "text-blue-500";
  if (score >= 40) return "text-amber-500";
  return "text-red-500";
}
