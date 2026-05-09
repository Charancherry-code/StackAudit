"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CTASectionProps {
  savings: number;
  companyName: string;
}

export function CTASection({ savings, companyName }: CTASectionProps) {
  const hasSignificantSavings = savings >= 500;

  return (
    <Card className="border-border/50 bg-zinc-900/50 p-8 text-center">
      {hasSignificantSavings ? (
        <>
          <h3 className="text-xl font-semibold text-zinc-50 mb-2">
            Ready to capture these savings?
          </h3>
          <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">
            Our team can help you implement these recommendations and ensure
            smooth transitions. Let's talk about your optimization strategy.
          </p>
          <Link
            href={`mailto:hello@stackaudit.com?subject=Schedule Optimization Call for ${companyName}`}
          >
            <Button size="lg">Schedule consultation</Button>
          </Link>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-zinc-50 mb-2">
            Stay optimized
          </h3>
          <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">
            Your AI spend is already efficient. Get notified when new
            optimization opportunities emerge as you scale.
          </p>
          <Button variant="outline" size="lg">
            Enable monthly alerts
          </Button>
        </>
      )}
    </Card>
  );
}
