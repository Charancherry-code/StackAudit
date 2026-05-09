import { NextResponse } from "next/server";
import { createAuditPreviewSummary } from "@/lib/audit-preview";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const summary = createAuditPreviewSummary(id);
  const annualSavings = Math.round(summary.annualSavings).toLocaleString(
    "en-US",
  );
  const monthlySavings = Math.round(summary.monthlySavings).toLocaleString(
    "en-US",
  );

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" rx="28" fill="#0A0A0B"/>
      <rect x="40" y="40" width="1120" height="550" rx="24" fill="#111114" stroke="#26262C"/>
      <text x="84" y="128" fill="#8B8D98" font-size="18" font-family="Inter, Arial, sans-serif" letter-spacing="1.4">STACKAUDIT</text>
      <text x="84" y="202" fill="#F4F4F5" font-size="54" font-family="Inter, Arial, sans-serif" font-weight="700">${summary.title}</text>
      <text x="84" y="262" fill="#A1A1AA" font-size="24" font-family="Inter, Arial, sans-serif">${summary.description}</text>
      <rect x="84" y="332" width="320" height="150" rx="20" fill="#121826" stroke="#243244"/>
      <text x="112" y="384" fill="#94A3B8" font-size="18" font-family="Inter, Arial, sans-serif">Annual savings</text>
      <text x="112" y="438" fill="#4ADE80" font-size="52" font-family="Inter, Arial, sans-serif" font-weight="700">$${annualSavings}</text>
      <rect x="432" y="332" width="260" height="150" rx="20" fill="#121826" stroke="#243244"/>
      <text x="460" y="384" fill="#94A3B8" font-size="18" font-family="Inter, Arial, sans-serif">Monthly savings</text>
      <text x="460" y="438" fill="#F4F4F5" font-size="42" font-family="Inter, Arial, sans-serif" font-weight="700">$${monthlySavings}</text>
      <rect x="724" y="332" width="392" height="150" rx="20" fill="#121826" stroke="#243244"/>
      <text x="752" y="384" fill="#94A3B8" font-size="18" font-family="Inter, Arial, sans-serif">Optimization score</text>
      <text x="752" y="438" fill="#60A5FA" font-size="42" font-family="Inter, Arial, sans-serif" font-weight="700">${summary.auditId}</text>
    </svg>
  `;

  return new NextResponse(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
