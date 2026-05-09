import type { Tool, AuditFormData } from "@/types/audit";
import type { AuditResult, BenchmarkInsight } from "@/types/audit-results";
import { generateRecommendations } from "@/utils/recommendation-engine";
import { calculateAuditScore } from "@/utils/audit-score";
import {
  generateBenchmarkComparison,
  estimateCompanyStage,
} from "@/data/audit-benchmarks";

export async function runAuditAnalysis(
  formData: AuditFormData,
): Promise<AuditResult> {
  // Simulate API delay for realistic loading
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const tools = formData.tools as Tool[];
  const totalSeats = tools.reduce((sum, t) => sum + t.seats, 0);
  const monthlySpend = tools.reduce((sum, t) => sum + t.monthlySpend, 0);

  // Calculate current state
  const breakdown = tools.map((tool) => ({
    provider: tool.provider,
    spend: tool.monthlySpend,
    percentage: (tool.monthlySpend / monthlySpend) * 100,
  }));

  // Generate recommendations
  const recommendations = generateRecommendations(tools, totalSeats);

  // Calculate optimized spend
  const optimizedMonthlySpend = Math.max(
    monthlySpend * 0.6, // At least 60% of current spend
    monthlySpend -
      recommendations.reduce((sum, rec) => sum + rec.monthlySavings, 0),
  );

  // Calculate audit score
  const redundancy = calculateRedundancy(tools);
  const downgradePath = recommendations.reduce(
    (sum, rec) => sum + rec.monthlySavings,
    0,
  );

  const score = calculateAuditScore({
    monthlySpend,
    totalSeats,
    toolCount: tools.length,
    toolRedundancy: redundancy,
    hasDowngradePath: (downgradePath / monthlySpend) * 100,
  });

  // Generate benchmarks
  const benchmarkComp = generateBenchmarkComparison(
    monthlySpend,
    tools.length,
    totalSeats,
  );
  const stage = estimateCompanyStage(monthlySpend, tools.length, totalSeats);

  const benchmarks: BenchmarkInsight[] = [];

  // Add spend per dev benchmark
  if (benchmarkComp.percentileDiff > 0) {
    benchmarks.push({
      metric: "AI Spend per Developer",
      yourValue: Math.round(benchmarkComp.spendPerDev),
      benchmarkValue: Math.round(
        benchmarkComp.percentileDiff === 0
          ? benchmarkComp.spendPerDev
          : benchmarkComp.spendPerDev /
              (1 + benchmarkComp.percentileDiff / 100),
      ),
      percentileDifference: Math.round(benchmarkComp.percentileDiff),
      insight:
        benchmarkComp.percentileDiff > 20
          ? `Your spend is ${Math.round(benchmarkComp.percentileDiff)}% above comparable ${stage} teams.`
          : benchmarkComp.percentileDiff > 0
            ? `Your spend is ${Math.round(benchmarkComp.percentileDiff)}% above comparable teams.`
            : `Your spend is ${Math.round(Math.abs(benchmarkComp.percentileDiff))}% below comparable teams.`,
    });
  }

  // Add tool count benchmark
  const avgTools =
    stage === "seed-startup"
      ? 2.5
      : stage === "series-a"
        ? 3.2
        : stage === "series-b"
          ? 4.1
          : 5.8;

  benchmarks.push({
    metric: "AI Tools in Use",
    yourValue: tools.length,
    benchmarkValue: Math.round(avgTools),
    percentileDifference: Math.round(
      ((tools.length - avgTools) / avgTools) * 100,
    ),
    insight:
      tools.length > avgTools
        ? `Teams at your stage typically use ${Math.round(avgTools)} tools. Consider consolidating.`
        : `Your tool count aligns with ${stage} benchmarks.`,
  });

  const savings = {
    monthly: monthlySpend - optimizedMonthlySpend,
    annual: (monthlySpend - optimizedMonthlySpend) * 12,
    percentage: ((monthlySpend - optimizedMonthlySpend) / monthlySpend) * 100,
  };

  return {
    companyName: formData.companyName,
    analyzedAt: new Date(),

    currentState: {
      monthlySpend,
      annualSpend: monthlySpend * 12,
      toolCount: tools.length,
      totalSeats,
      costPerSeat: monthlySpend / totalSeats,
      breakdown,
    },

    optimizedState: {
      monthlySpend: optimizedMonthlySpend,
      annualSpend: optimizedMonthlySpend * 12,
    },

    savings,
    score,
    recommendations,
    benchmarks,
  };
}

function calculateRedundancy(tools: Tool[]): number {
  const providers = new Set(tools.map((t) => t.provider));

  // Check for specific overlaps
  const codingTools = ["Cursor", "GitHub Copilot", "Windsurf"].filter((p) =>
    providers.has(p as Tool["provider"]),
  );

  let redundancyScore = 0;

  // Each duplicate coding tool adds 20 points
  if (codingTools.length > 1) {
    redundancyScore += (codingTools.length - 1) * 20;
  }

  // General chat tools overlap
  const chatTools = ["ChatGPT", "Claude", "Gemini"].filter((p) =>
    providers.has(p as Tool["provider"]),
  );
  if (chatTools.length > 2) {
    redundancyScore += (chatTools.length - 2) * 15;
  }

  return Math.min(100, redundancyScore);
}
