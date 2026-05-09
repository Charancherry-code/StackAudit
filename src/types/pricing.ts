export type PlanTier = "free" | "pro" | "team" | "enterprise" | "api";

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  costPerSeat?: number;
  included: string[];
  ideal: string;
  mtu?: string; // message/token/unit limit
}

export interface ProviderPricing {
  [provider: string]: {
    [plan: string]: PricingPlan;
  };
}

export interface PricingRecommendation {
  from: { plan: string; monthlyPrice: number; seats: number };
  to: { plan: string; monthlyPrice: number; seats: number };
  monthlySavings: number;
  annualSavings: number;
  reason: string;
}
