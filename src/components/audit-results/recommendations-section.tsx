"use client";

import { RecommendationCard } from "@/components/audit-results/recommendation-card";
import type { AuditRecommendation } from "@/types/audit-results";

interface RecommendationsSectionProps {
  recommendations: AuditRecommendation[];
}

export function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-lg border border-border/30 bg-zinc-900/40 p-6 text-center">
        <p className="text-sm text-zinc-400">
          Your AI spend is already optimized. Check back monthly for new
          recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-zinc-50 mb-2">
          Optimization Opportunities
        </h3>
        <p className="text-sm text-zinc-400">
          {recommendations.length} recommendation
          {recommendations.length > 1 ? "s" : ""} to save money
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}
