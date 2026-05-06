export type Team = {
  name: string;
};

export type WorkflowStep = {
  title: string;
  description: string;
};

export type SpendCard = {
  title: string;
  amount: string;
  note: string;
  delta?: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: "scan" | "sparkles" | "share" | "shield-check";
};

export type FAQItem = {
  question: string;
  answer: string;
};
