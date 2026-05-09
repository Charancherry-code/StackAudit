import type { ProviderPricing } from "@/types/pricing";

export const PRICING_DATA: ProviderPricing = {
  ChatGPT: {
    Free: {
      name: "Free",
      monthlyPrice: 0,
      included: ["Limited requests", "3.5 model"],
      ideal: "Experimentation only",
    },
    Plus: {
      name: "ChatGPT Plus",
      monthlyPrice: 20,
      included: ["Unlimited GPT-4", "Advanced features"],
      ideal: "Individual professional",
    },
    Team: {
      name: "ChatGPT Team",
      monthlyPrice: 30,
      costPerSeat: 30,
      included: ["Team workspace", "GPT-4 priority"],
      ideal: "Small teams 2-5",
    },
    Enterprise: {
      name: "ChatGPT Enterprise",
      monthlyPrice: 3000,
      costPerSeat: 30,
      included: ["Unlimited usage", "Admin controls", "SSO"],
      ideal: "Large enterprises 100+",
    },
  },

  Claude: {
    Free: {
      name: "Free",
      monthlyPrice: 0,
      included: ["Limited requests", "Claude 3 Haiku"],
      ideal: "Experimentation only",
    },
    Pro: {
      name: "Claude Pro",
      monthlyPrice: 20,
      included: ["Unlimited Claude 3 Opus", "100k context"],
      ideal: "Individual professional",
    },
    Team: {
      name: "Claude Team",
      monthlyPrice: 300,
      costPerSeat: 30,
      included: ["Team workspace", "Opus priority", "Usage analytics"],
      ideal: "Small teams 5-10",
    },
    Enterprise: {
      name: "Claude Enterprise",
      monthlyPrice: 5000,
      costPerSeat: 50,
      included: ["Custom deployment", "Priority support", "Compliance"],
      ideal: "Enterprises 100+",
    },
  },

  Cursor: {
    Free: {
      name: "Free",
      monthlyPrice: 0,
      included: ["2k completions/month", "GPT-3.5"],
      ideal: "Light usage",
    },
    Pro: {
      name: "Cursor Pro",
      monthlyPrice: 20,
      included: ["Unlimited", "GPT-4 & Claude", "Premium models"],
      ideal: "Individual developers",
    },
    Team: {
      name: "Cursor Team",
      monthlyPrice: 500,
      costPerSeat: 50,
      included: ["Team management", "Shared credits", "Analytics"],
      ideal: "Dev teams 5-10",
    },
  },

  "GitHub Copilot": {
    Individual: {
      name: "Copilot Individual",
      monthlyPrice: 10,
      included: ["IDE plugins", "CLI", "Suggestions"],
      ideal: "Individual developers",
    },
    Team: {
      name: "Copilot Team",
      monthlyPrice: 23,
      costPerSeat: 23,
      included: ["Team management", "Organization settings"],
      ideal: "Teams 3-50",
    },
    Enterprise: {
      name: "Copilot Enterprise",
      monthlyPrice: 39,
      costPerSeat: 39,
      included: ["Admin controls", "Security", "Support"],
      ideal: "Enterprises 50+",
    },
  },

  Gemini: {
    Free: {
      name: "Free",
      monthlyPrice: 0,
      included: ["Limited requests", "Gemini 1.5 Flash"],
      ideal: "Testing",
    },
    Pro: {
      name: "Gemini Pro",
      monthlyPrice: 20,
      included: ["Gemini 1.5 Pro", "Advanced analysis"],
      ideal: "Individual professional",
    },
  },

  "OpenAI API": {
    "Pay-as-you-go": {
      name: "Pay-as-you-go",
      monthlyPrice: 0,
      included: ["GPT-4", "GPT-3.5", "Embeddings"],
      ideal: "Variable usage (billed per token)",
      mtu: "Variable",
    },
    "Plan $5": {
      name: "Usage Plan $5/day",
      monthlyPrice: 150,
      included: ["Credits", "Discounted rates"],
      ideal: "Predictable low usage ~$5/day",
    },
    "Plan $50": {
      name: "Usage Plan $50/day",
      monthlyPrice: 1500,
      included: ["Credits", "Discounted rates", "Priority support"],
      ideal: "Medium usage ~$50/day",
    },
  },

  "Anthropic API": {
    "Pay-as-you-go": {
      name: "Pay-as-you-go",
      monthlyPrice: 0,
      included: ["Claude API access", "All models"],
      ideal: "Variable usage (billed per token)",
      mtu: "Variable",
    },
  },

  Windsurf: {
    Free: {
      name: "Free",
      monthlyPrice: 0,
      included: ["Limited requests", "Cascade AI"],
      ideal: "Testing",
    },
    Pro: {
      name: "Windsurf Pro",
      monthlyPrice: 15,
      included: ["Unlimited Cascade", "Advanced models"],
      ideal: "Individual developers",
    },
  },
};

export function getPlanPrice(provider: string, plan: string): number {
  return PRICING_DATA[provider]?.[plan]?.monthlyPrice ?? 0;
}

export function getBestPlan(
  provider: string,
  currentSpend: number,
  seats: number,
): string {
  const plans = PRICING_DATA[provider] || {};

  // Find plans within 20% of current spend
  const candidates = Object.entries(plans).filter(([_, plan]) => {
    const totalCost = plan.costPerSeat
      ? plan.costPerSeat * seats
      : plan.monthlyPrice;
    return totalCost <= currentSpend * 1.2 && totalCost > 0;
  });

  if (candidates.length === 0) return "Free";

  // Return cheapest viable plan
  let bestCandidate = candidates[0];

  for (const candidate of candidates.slice(1)) {
    const [, plan] = candidate;
    const [, bestPlan] = bestCandidate;

    const bestCost = bestPlan.costPerSeat
      ? bestPlan.costPerSeat * seats
      : bestPlan.monthlyPrice;

    const thisCost = plan.costPerSeat
      ? plan.costPerSeat * seats
      : plan.monthlyPrice;

    if (thisCost < bestCost) {
      bestCandidate = candidate;
    }
  }

  return bestCandidate[0];
}
