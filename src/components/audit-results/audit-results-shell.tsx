"use client";

import { useEffect, useState } from "react";

import { AuditResultsDashboard } from "@/components/audit-results/audit-results-dashboard";
import { AuditDashboardEmptyState } from "@/components/audit-results/shared/audit-dashboard-empty-state";
import type { AuditResult } from "@/types/audit-results";
import type { AuditShareRecord } from "@/types/audit-share";
import { loadAuditRecord } from "@/lib/share";
import { createAuditPreviewResult } from "@/lib/audit-preview";

interface AuditResultsShellProps {
  auditId: string;
  initialResult: AuditResult;
  invalid?: boolean;
}

export function AuditResultsShell({
  auditId,
  initialResult,
  invalid = false,
}: AuditResultsShellProps) {
  const [record, setRecord] = useState<AuditShareRecord>({
    id: auditId,
    createdAt: new Date().toISOString(),
    result: initialResult,
    source: "generated",
  });

  useEffect(() => {
    if (invalid) return;

    const stored = loadAuditRecord(auditId);
    if (stored) {
      setRecord(stored);
      return;
    }

    setRecord({
      id: auditId,
      createdAt: new Date().toISOString(),
      result: createAuditPreviewResult(auditId),
      source: "generated",
    });
  }, [auditId, invalid]);

  if (invalid) {
    return (
      <AuditDashboardEmptyState
        title="Invalid audit link"
        description="This link does not look like a valid StackAudit audit URL. Return to the audit form to create a fresh share link."
      />
    );
  }

  return (
    <AuditResultsDashboard
      auditId={auditId}
      result={record.result}
      source={record.source}
    />
  );
}
