"use client";

import { useEffect, useState } from "react";
import { LoadingAnalysis } from "@/components/audit-results/loading-analysis";
import { AuditResultsContent } from "@/components/audit-results/audit-results-content";
import { SiteFooter } from "@/components/landing/site-footer";
import type { AuditFormData } from "@/types/audit";

export default function AuditResultsRoute() {
  const [formData, setFormData] = useState<AuditFormData | null>(null);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem("auditFormData");
    if (data) {
      setFormData(JSON.parse(data));
      // Simulate analysis delay
      const timer = setTimeout(() => {
        setAnalyzing(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!formData) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-zinc-400">Loading audit data...</p>
        </div>
      </div>
    );
  }

  if (analyzing) {
    return <LoadingAnalysis />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main>
        <AuditResultsContent formData={formData} />
      </main>
      <SiteFooter />
    </div>
  );
}
