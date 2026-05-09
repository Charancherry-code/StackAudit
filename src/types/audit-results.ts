export interface AuditRecommendation {
  id: string;
  type: "downgrade" | "consolidate" | "switch" | "cancel";
  provider: string;
  currentSetup: {
    plan: string;
    monthlySpend: number;
    seats: number;
  };
  recommendedSetup: {
    plan: string;
    monthlySpend: number;
    seats?: number;
  };
  monthlySavings: number;
  annualSavings: number;
  reasoning: string;
  impact: "high" | "medium" | "low";
}

export interface AuditScore {
  overall: number; // 0-100
  category: "optimized" | "acceptable" | "inefficient" | "overspending";
  factors: {
    spendPerSeat: number;
    toolRedundancy: number;
    planOptimization: number;
    useCaseAlignment: number;
  };
}

export interface BenchmarkInsight {
  metric: string;
  yourValue: number;
  benchmarkValue: number;
  percentileDifference: number; // % above or below benchmark
  insight: string;
}

export interface AuditResult {
  companyName: string;
  analyzedAt: Date;

  currentState: {
    monthlySpend: number;
    annualSpend: number;
    toolCount: number;
    totalSeats: number;
    costPerSeat: number;
    breakdown: { provider: string; spend: number; percentage: number }[];
  };

  optimizedState: {
    monthlySpend: number;
    annualSpend: number;
  };

  savings: {
    monthly: number;
    annual: number;
    percentage: number;
  };

  score: AuditScore;
  recommendations: AuditRecommendation[];
  benchmarks: BenchmarkInsight[];
}
