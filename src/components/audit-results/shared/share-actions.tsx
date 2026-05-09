"use client";

import { useState } from "react";
import { Copy, Share2, Download, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  buildAuditUrl,
  canUseNativeShare,
  copyAuditLink,
  shareAudit,
} from "@/lib/share";
import { formatCurrency } from "@/lib/formatting";
import type { AuditResult } from "@/types/audit-results";

interface ShareActionsProps {
  auditId: string;
  result: AuditResult;
}

export function ShareActions({ auditId, result }: ShareActionsProps) {
  const [isSharing, setIsSharing] = useState(false);

  const shareText = `StackAudit found ${formatCurrency(result.savings.annual)}/year in AI savings.`;
  const shareUrl = buildAuditUrl(auditId);

  const handleCopy = async () => {
    try {
      await copyAuditLink(auditId);
      toast.success("Share link copied to clipboard");
    } catch {
      toast.error("Unable to copy link right now");
    }
  };

  const handleNativeShare = async () => {
    try {
      setIsSharing(true);
      await shareAudit(auditId, "StackAudit audit report", shareText);
      if (canUseNativeShare()) {
        toast.success("Share sheet opened");
      } else {
        toast.success("Link copied to clipboard");
      }
    } catch {
      toast.error("Unable to share this audit");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = () => {
    const payload = {
      auditId,
      savings: result.savings,
      score: result.score,
      recommendations: result.recommendations.slice(0, 3).map((rec) => ({
        provider: rec.provider,
        monthlySavings: rec.monthlySavings,
        annualSavings: rec.annualSavings,
        reasoning: rec.reasoning,
      })),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `stackaudit-${auditId}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Summary downloaded");
  };

  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-card p-4 shadow-elev-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
            Share audit
          </p>
          <p className="mt-1 text-sm text-zinc-200">
            Copy or share this public report
          </p>
        </div>
        <Badge variant="info">Public URL</Badge>
      </div>

      <div className="rounded-xl border border-border/60 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-400 break-all">
        {shareUrl}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <Button
          type="button"
          variant="premium"
          className="justify-start"
          onClick={handleCopy}
          aria-label="Copy audit link"
        >
          <Copy className="mr-2 size-4" />
          Copy link
        </Button>
        <Button
          type="button"
          variant="outline"
          className="justify-start"
          onClick={handleNativeShare}
          disabled={isSharing}
          aria-label="Share audit"
        >
          <Share2 className="mr-2 size-4" />
          {isSharing ? "Sharing…" : "Share audit"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="justify-start"
          onClick={handleDownload}
          aria-label="Download audit summary"
        >
          <Download className="mr-2 size-4" />
          Download summary
        </Button>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <LinkIcon className="size-3.5" />
        Preview text: {shareText}
      </div>
    </div>
  );
}
