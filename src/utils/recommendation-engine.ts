import { PRICING_DATA, getBestPlan } from "@/data/pricing-plans";
import type { Tool } from "@/types/audit";
import type { AuditRecommendation } from "@/types/audit-results";

interface RecommendationInput {
  tool: Tool;
  currentMonthlySpend: number;
  teamSize: number;
  allTools: Tool[];
}

export function generateRecommendations(
  tools: Tool[],
  totalSeats: number,
): AuditRecommendation[] {
  const recommendations: AuditRecommendation[] = [];
  const toolsByProvider: { [key: string]: Tool[] } = {};

  // Group tools by provider
  tools.forEach((tool) => {
    if (!toolsByProvider[tool.provider]) {
      toolsByProvider[tool.provider] = [];
    }
    toolsByProvider[tool.provider].push(tool);
  });

  // 1. Detect duplicates/overlaps
  const providersInUse = Object.keys(toolsByProvider);

  // Check for coding assistant overlap (Cursor, Copilot, Windsurf)
  const codingTools = ["Cursor", "GitHub Copilot", "Windsurf"].filter((p) =>
    providersInUse.includes(p),
  );
  if (codingTools.length > 1) {
    const cheapest = codingTools[0]; // Simplified
    const mostExpensive = codingTools[codingTools.length - 1];
    const expensiveTools = toolsByProvider[mostExpensive] || [];

    if (expensiveTools.length > 0) {
      const tool = expensiveTools[0];
      const savings = tool.monthlySpend * 0.5;
      recommendations.push({
        id: `consolidate-${mostExpensive}`,
        type: "consolidate",
        provider: mostExpensive,
        currentSetup: {
          plan: tool.plan,
          monthlySpend: tool.monthlySpend,
          seats: tool.seats,
        },
        recommendedSetup: {
          plan: "Consider consolidating to " + cheapest,
          monthlySpend: 0,
        },
        monthlySavings: savings,
        annualSavings: savings * 12,
        reasoning: `Your team uses both ${mostExpensive} and ${cheapest}. Consider consolidating to reduce redundancy.`,
        impact: "medium",
      });
    }
  }

  // 2. Check for plan downgrades
  tools.forEach((tool) => {
    const canDowngrade = checkDowngradeOpportunity(tool, totalSeats);
    if (canDowngrade) {
      recommendations.push(canDowngrade);
    }
  });

  // 3. Check for low-usage tools
  tools.forEach((tool) => {
    if (tool.seats === 1 && tool.monthlySpend > 50) {
      recommendations.push({
        id: `downgrade-${tool.provider}`,
        type: "downgrade",
        provider: tool.provider,
        currentSetup: {
          plan: tool.plan,
          monthlySpend: tool.monthlySpend,
          seats: tool.seats,
        },
        recommendedSetup: {
          plan: "Free or Pro",
          monthlySpend: tool.monthlySpend > 50 ? 20 : 0,
        },
        monthlySavings: Math.max(0, tool.monthlySpend - 20),
        annualSavings: Math.max(0, (tool.monthlySpend - 20) * 12),
        reasoning: `Single-seat enterprise plans are inefficient. Downgrade to Pro tier for similar features.`,
        impact: "high",
      });
    }
  });

  // Sort by annual savings descending
  return recommendations.sort((a, b) => b.annualSavings - a.annualSavings);
}

function checkDowngradeOpportunity(
  tool: Tool,
  totalSeats: number,
): AuditRecommendation | null {
  const { provider, plan, monthlySpend, seats } = tool;
  const plans = PRICING_DATA[provider];

  if (!plans) return null;

  // Check if on overpowered plan
  const isTeamPlan = plan.toLowerCase().includes("team");
  const isEnterprise =
    plan.toLowerCase().includes("enterprise") ||
    plan.toLowerCase().includes("business");

  if (isEnterprise && seats < 20) {
    const bestPlan = getBestPlan(provider, monthlySpend, seats);
    const bestPlanData = plans[bestPlan];
    const bestCost = bestPlanData.costPerSeat
      ? bestPlanData.costPerSeat * seats
      : bestPlanData.monthlyPrice;

    const savings = monthlySpend - bestCost;
    if (savings > 10) {
      return {
        id: `downgrade-${provider}`,
        type: "downgrade",
        provider,
        currentSetup: {
          plan,
          monthlySpend,
          seats,
        },
        recommendedSetup: {
          plan: bestPlan,
          monthlySpend: bestCost,
          seats,
        },
        monthlySavings: savings,
        annualSavings: savings * 12,
        reasoning: `Enterprise plan is oversized for ${seats} seat${seats > 1 ? "s" : ""}. ${bestPlan} plan offers same features at ${((savings / monthlySpend) * 100).toFixed(0)}% lower cost.`,
        impact: "high",
      };
    }
  }

  if (isTeamPlan && seats < 3) {
    const proPlan = "Pro";
    const proData = plans[proPlan];
    if (proData) {
      const savings = monthlySpend - proData.monthlyPrice;
      if (savings > 5) {
        return {
          id: `downgrade-${provider}`,
          type: "downgrade",
          provider,
          currentSetup: {
            plan,
            monthlySpend,
            seats,
          },
          recommendedSetup: {
            plan: proPlan,
            monthlySpend: proData.monthlyPrice,
            seats: 1,
          },
          monthlySavings: savings,
          annualSavings: savings * 12,
          reasoning: `Team plan is underutilized at ${seats} seat${seats > 1 ? "s" : ""}. Pro plan is more cost-effective for small teams.`,
          impact: "medium",
        };
      }
    }
  }

  return null;
}
