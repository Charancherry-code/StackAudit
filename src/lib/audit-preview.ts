import type { AuditFormData } from "@/types/audit";
import type { AuditResult } from "@/types/audit-results";
import { AIProviders } from "@/types/audit";
import { generateRecommendations } from "@/utils/recommendation-engine";
import { calculateAuditScore } from "@/utils/audit-score";
import {
  generateBenchmarkComparison,
  estimateCompanyStage,
} from "@/data/audit-benchmarks";
import { formatCurrency } from "@/lib/formatting";

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(items: readonly T[], seed: number, offset: number): T {
  return items[(seed + offset) % items.length];
}

function createMockTools(seed: number): AuditFormData["tools"] {
  const seatsBase = 2 + (seed % 6);
  const providerA = pick(AIProviders, seed, 0);
  const providerB = pick(AIProviders, seed, 2);
  const providerC = pick(AIProviders, seed, 4);

  const toolSet = [
    {
      id: `tool-${seed}-a`,
      provider: providerA,
      plan:
        providerA === "GitHub Copilot"
          ? seatsBase > 3
            ? "Team"
            : "Individual"
          : providerA === "OpenAI API" || providerA === "Anthropic API"
            ? "Pay-as-you-go"
            : seatsBase > 2
              ? "Team"
              : "Pro",
      monthlySpend:
        providerA === "OpenAI API" || providerA === "Anthropic API"
          ? 220 + (seed % 7) * 45
          : providerA === "Cursor"
            ? 20 + seatsBase * 18
            : providerA === "GitHub Copilot"
              ? 10 + seatsBase * 23
              : providerA === "Windsurf"
                ? 15 + seatsBase * 18
                : 20 + seatsBase * 28,
      seats: seatsBase,
      useCase:
        providerA === "GitHub Copilot" ||
        providerA === "Cursor" ||
        providerA === "Windsurf"
          ? "Code generation and developer workflow acceleration"
          : "Cross-functional AI assistance and knowledge work",
    },
    {
      id: `tool-${seed}-b`,
      provider: providerB,
      plan:
        providerB === "GitHub Copilot"
          ? "Team"
          : providerB === "OpenAI API" || providerB === "Anthropic API"
            ? "Pay-as-you-go"
            : seatsBase > 4
              ? "Enterprise"
              : "Team",
      monthlySpend:
        providerB === "OpenAI API" || providerB === "Anthropic API"
          ? 180 + (seed % 5) * 60
          : providerB === "Cursor"
            ? 120 + seatsBase * 22
            : providerB === "GitHub Copilot"
              ? 23 * Math.max(2, seatsBase - 1)
              : providerB === "Windsurf"
                ? 85 + seatsBase * 17
                : 45 + seatsBase * 34,
      seats: Math.max(1, seatsBase - 1),
      useCase:
        providerB === "ChatGPT" ||
        providerB === "Claude" ||
        providerB === "Gemini"
          ? "Analyst workflows, strategy drafts, and team knowledge search"
          : "Productivity support and collaboration across teams",
    },
    {
      id: `tool-${seed}-c`,
      provider: providerC,
      plan:
        providerC === "OpenAI API" || providerC === "Anthropic API"
          ? "Pay-as-you-go"
          : providerC === "GitHub Copilot"
            ? "Enterprise"
            : seatsBase > 5
              ? "Enterprise"
              : "Team",
      monthlySpend:
        providerC === "OpenAI API" || providerC === "Anthropic API"
          ? 90 + (seed % 4) * 55
          : providerC === "Cursor"
            ? 88 + seatsBase * 19
            : providerC === "GitHub Copilot"
              ? 39 * Math.max(2, seatsBase - 2)
              : providerC === "Windsurf"
                ? 65 + seatsBase * 16
                : 60 + seatsBase * 27,
      seats: Math.max(1, seatsBase - 2),
      useCase:
        providerC === "OpenAI API" || providerC === "Anthropic API"
          ? "Product experiments, retrieval workflows, and internal apps"
          : "General productivity and operational support",
    },
  ];

  return toolSet;
}

export function createMockAuditFormData(auditId: string): AuditFormData {
  const seed = hashString(auditId);
  const tools = createMockTools(seed).filter(
    (tool, index) => index < 2 + (seed % 2),
  );

  return {
    companyName: "Confidential",
    tools,
  };
}

export function createAuditPreviewResult(auditId: string): AuditResult {
  const formData = createMockAuditFormData(auditId);
  const tools = formData.tools;
  const monthlySpend = tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
  const totalSeats = tools.reduce((sum, tool) => sum + tool.seats, 0);
  const recommendations = generateRecommendations(tools, totalSeats);
  const optimizedMonthlySpend = Math.max(
    monthlySpend * 0.6,
    monthlySpend -
      recommendations.reduce(
        (sum, recommendation) => sum + recommendation.monthlySavings,
        0,
      ),
  );
  const benchmarkComparison = generateBenchmarkComparison(
    monthlySpend,
    tools.length,
    totalSeats,
  );
  const stage = estimateCompanyStage(monthlySpend, tools.length, totalSeats);

  const breakdown = tools.map((tool) => ({
    provider: tool.provider,
    spend: tool.monthlySpend,
    percentage:
      monthlySpend === 0 ? 0 : (tool.monthlySpend / monthlySpend) * 100,
  }));

  const redundancy = tools.length > 2 ? (tools.length - 2) * 14 : 4;
  const score = calculateAuditScore({
    monthlySpend,
    totalSeats,
    toolCount: tools.length,
    toolRedundancy: redundancy,
    hasDowngradePath:
      monthlySpend === 0
        ? 0
        : ((monthlySpend - optimizedMonthlySpend) / monthlySpend) * 100,
  });

  return {
    companyName: "Confidential audit",
    analyzedAt: new Date(
      Date.now() - (benchmarkComparison.percentileDiff > 0 ? 1 : 0) * 1000,
    ),
    currentState: {
      monthlySpend,
      annualSpend: monthlySpend * 12,
      toolCount: tools.length,
      totalSeats,
      costPerSeat: totalSeats === 0 ? 0 : monthlySpend / totalSeats,
      breakdown,
    },
    optimizedState: {
      monthlySpend: optimizedMonthlySpend,
      annualSpend: optimizedMonthlySpend * 12,
    },
    savings: {
      monthly: monthlySpend - optimizedMonthlySpend,
      annual: (monthlySpend - optimizedMonthlySpend) * 12,
      percentage:
        monthlySpend === 0
          ? 0
          : ((monthlySpend - optimizedMonthlySpend) / monthlySpend) * 100,
    },
    score,
    recommendations,
    benchmarks: [
      {
        metric: "AI spend per developer",
        yourValue: Math.round(benchmarkComparison.spendPerDev),
        benchmarkValue: Math.round(
          benchmarkComparison.spendPerDev /
            (1 + benchmarkComparison.percentileDiff / 100 || 1),
        ),
        percentileDifference: Math.round(benchmarkComparison.percentileDiff),
        insight:
          benchmarkComparison.percentileDiff > 0
            ? `Your AI spend per developer is ${Math.round(benchmarkComparison.percentileDiff)}% above comparable ${stage} teams.`
            : `Your AI spend per developer is ${Math.round(Math.abs(benchmarkComparison.percentileDiff))}% below comparable ${stage} teams.`,
      },
      {
        metric: "Tools in use",
        yourValue: tools.length,
        benchmarkValue:
          stage === "seed-startup"
            ? 2
            : stage === "series-a"
              ? 3
              : stage === "series-b"
                ? 4
                : 6,
        percentileDifference:
          stage === "seed-startup"
            ? Math.round(((tools.length - 2) / 2) * 100)
            : stage === "series-a"
              ? Math.round(((tools.length - 3) / 3) * 100)
              : stage === "series-b"
                ? Math.round(((tools.length - 4) / 4) * 100)
                : Math.round(((tools.length - 6) / 6) * 100),
        insight:
          tools.length > 4
            ? "Your stack is broader than most comparable teams. Consolidation could improve leverage."
            : "Your stack is in line with benchmarked teams of similar size.",
      },
    ],
  };
}

export function createAuditPreviewSummary(auditId: string) {
  const result = createAuditPreviewResult(auditId);
  return {
    auditId,
    annualSavings: result.savings.annual,
    monthlySavings: result.savings.monthly,
    title: `StackAudit found ${formatCurrency(result.savings.annual)}/year in AI savings.`,
    description: `Optimization score ${result.score.overall}/100 with ${result.recommendations.length} prioritized opportunities.`,
  };
}
