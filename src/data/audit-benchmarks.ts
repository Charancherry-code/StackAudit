export const BENCHMARK_DATA = {
  // Industry benchmarks for AI spend
  avgSpendPerDeveloper: {
    "seed-startup": 45,
    "series-a": 65,
    "series-b": 85,
    enterprise: 120,
  },

  avgToolsPerTeam: {
    "seed-startup": 2.5,
    "series-a": 3.2,
    "series-b": 4.1,
    enterprise: 5.8,
  },

  costPerSeatBenchmark: {
    "seed-startup": 8,
    "series-a": 12,
    "series-b": 16,
    enterprise: 22,
  },

  // Typical spend breakdown by function
  spendByRole: {
    engineering: 0.65, // 65% of spend
    product: 0.15, // 15% of spend
    operations: 0.12, // 12% of spend
    other: 0.08, // 8% of spend
  },

  // Platform adoption rates
  toolAdoption: {
    ChatGPT: 0.92,
    Claude: 0.65,
    Cursor: 0.45,
    "GitHub Copilot": 0.78,
    Gemini: 0.32,
    "OpenAI API": 0.38,
    "Anthropic API": 0.28,
    Windsurf: 0.12,
  },
};

export function estimateCompanyStage(
  monthlySpend: number,
  toolCount: number,
  seats: number,
): "seed-startup" | "series-a" | "series-b" | "enterprise" {
  const spendPerSeat = monthlySpend / Math.max(seats, 1);

  if (spendPerSeat < 30) return "seed-startup";
  if (spendPerSeat < 60) return "series-a";
  if (spendPerSeat < 100) return "series-b";
  return "enterprise";
}

export function generateBenchmarkComparison(
  monthlySpend: number,
  toolCount: number,
  seats: number,
): { stage: string; spendPerDev: number; percentileDiff: number } {
  const stage = estimateCompanyStage(monthlySpend, toolCount, seats);
  const yourSpendPerDev = monthlySpend / Math.max(seats, 1);
  const benchmarkSpend = BENCHMARK_DATA.avgSpendPerDeveloper[stage];
  const percentileDiff =
    ((yourSpendPerDev - benchmarkSpend) / benchmarkSpend) * 100;

  return {
    stage,
    spendPerDev: yourSpendPerDev,
    percentileDiff,
  };
}
