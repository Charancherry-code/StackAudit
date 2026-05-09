import type { Metadata } from "next";

import { AuditResultsShell } from "@/components/audit-results/audit-results-shell";
import {
  createAuditPreviewResult,
  createAuditPreviewSummary,
} from "@/lib/audit-preview";
import { buildAuditMetadata } from "@/lib/metadata";

interface AuditPublicPageProps {
  params: { id: string };
}

function isValidAuditId(auditId: string): boolean {
  return /^audit_[a-z0-9]{6,}$/i.test(auditId);
}

export async function generateMetadata({
  params,
}: AuditPublicPageProps): Promise<Metadata> {
  const { id } = params;
  const summary = createAuditPreviewSummary(id);
  return buildAuditMetadata(summary);
}

export default async function AuditPublicPage({
  params,
}: AuditPublicPageProps) {
  const { id } = params;
  const invalid = !isValidAuditId(id);
  const initialResult = createAuditPreviewResult(id);

  return (
    <AuditResultsShell
      auditId={id}
      initialResult={initialResult}
      invalid={invalid}
    />
  );
}
