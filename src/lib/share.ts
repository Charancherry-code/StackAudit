import type { AuditShareRecord } from "@/types/audit-share";

export const AUDIT_STORAGE_PREFIX = "stackaudit:audit:";

export function createAuditId(): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);

  return `audit_${random}`;
}

export function getAuditStorageKey(auditId: string): string {
  return `${AUDIT_STORAGE_PREFIX}${auditId}`;
}

export function buildAuditUrl(auditId: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  return `${baseUrl.replace(/\/$/, "")}/audit/${auditId}`;
}

export function canUseNativeShare(): boolean {
  return (
    typeof navigator !== "undefined" && typeof navigator.share === "function"
  );
}

export async function copyAuditLink(auditId: string): Promise<string> {
  const url = buildAuditUrl(auditId);
  await navigator.clipboard.writeText(url);
  return url;
}

export async function shareAudit(auditId: string, title: string, text: string) {
  const url = buildAuditUrl(auditId);
  if (canUseNativeShare()) {
    await navigator.share({ title, text, url });
    return url;
  }

  await copyAuditLink(auditId);
  return url;
}

export function saveAuditRecord(record: AuditShareRecord): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    getAuditStorageKey(record.id),
    JSON.stringify(record),
  );
}

export function loadAuditRecord(auditId: string): AuditShareRecord | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(getAuditStorageKey(auditId));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuditShareRecord;
    return parsed;
  } catch {
    return null;
  }
}

export function removeAuditRecord(auditId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getAuditStorageKey(auditId));
}
