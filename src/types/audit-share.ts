import type { AuditResult } from "@/types/audit-results";

export interface AuditShareRecord {
  id: string;
  createdAt: string;
  result: AuditResult;
  source: "local" | "generated";
}

export interface AuditPreviewSummary {
  auditId: string;
  annualSavings: number;
  monthlySavings: number;
  description: string;
  title: string;
}
