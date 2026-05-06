import type {
  FAQItem,
  FeatureItem,
  SpendCard,
  Team,
  WorkflowStep,
} from "@/types/landing";

export const teams: Team[] = [
  { name: "NovaCompute" },
  { name: "TensorLoop" },
  { name: "PulseAI" },
  { name: "KernelCloud" },
  { name: "SynthOps" },
  { name: "EmbedWorks" },
];

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Connect cloud and model providers",
    description:
      "Securely link AWS, GCP, Azure, and model APIs. StackAudit starts ingesting invoices and usage telemetry in minutes.",
  },
  {
    title: "Audit every line item",
    description:
      "Our engine flags anomalous spend, token waste, idle GPUs, and contract mismatch risks with traceable evidence.",
  },
  {
    title: "Ship fixes with confidence",
    description:
      "Generate shareable executive summaries and engineer-ready recommendations to lower spend without slowing product velocity.",
  },
];

export const spendCards: SpendCard[] = [
  {
    title: "Before",
    amount: "$412,000/mo",
    note: "Idle GPU pools, duplicated LLM calls, unverified enterprise discounts",
  },
  {
    title: "After",
    amount: "$278,000/mo",
    note: "Optimized orchestration, caching policy, and corrected billing tiers",
    delta: "32.5% saved",
  },
];

export const featureItems: FeatureItem[] = [
  {
    title: "Continuous audit engine",
    description:
      "Monitors infrastructure and AI usage streams to detect hidden cost regressions in real time.",
    icon: "scan",
  },
  {
    title: "AI-generated summaries",
    description:
      "Turns dense billing logs into clear narratives that finance and engineering can act on immediately.",
    icon: "sparkles",
  },
  {
    title: "Shareable reports",
    description:
      "Create secure links for quarterly reviews, budget planning, and stakeholder alignment.",
    icon: "share",
  },
  {
    title: "Pricing verification",
    description:
      "Validates negotiated rates and discount programs to ensure your invoices match contract terms.",
    icon: "shield-check",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "How long does onboarding take?",
    answer:
      "Most teams connect providers and start seeing actionable findings in less than one day.",
  },
  {
    question: "Do you support multi-cloud AI stacks?",
    answer:
      "Yes. StackAudit is built for mixed cloud and model-provider environments, including hybrid deployments.",
  },
  {
    question: "Can reports be shared with non-technical stakeholders?",
    answer:
      "Absolutely. Reports include an executive view plus technical detail, so each audience gets the right level of context.",
  },
  {
    question: "How is access secured?",
    answer:
      "We use least-privilege read access, encryption in transit and at rest, and role-scoped report sharing.",
  },
];
