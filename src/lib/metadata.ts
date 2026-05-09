import type { Metadata } from "next";
import { buildAuditUrl } from "@/lib/share";
import type { AuditPreviewSummary } from "@/types/audit-share";

function getMetadataBase(): URL {
  const rawUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  return new URL(rawUrl);
}

export function buildAuditMetadata(summary: AuditPreviewSummary): Metadata {
  const title = summary.title;
  const description = summary.description;
  const url = buildAuditUrl(summary.auditId);
  const imageUrl = `${url}/api/og/audit/${summary.auditId}`;

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
