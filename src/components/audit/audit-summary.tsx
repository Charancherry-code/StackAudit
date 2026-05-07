"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuditFormData } from "@/types/audit";

export function AuditSummary() {
  const { control } = useFormContext<AuditFormData>();
  const tools = useWatch({ control, name: "tools" });
  const companyName = useWatch({ control, name: "companyName" });

  const monthlyTotal =
    tools?.reduce((sum, tool) => sum + (tool.monthlySpend || 0), 0) || 0;

  const totalSeats =
    tools?.reduce((sum, tool) => sum + (tool.seats || 0), 0) || 0;
  const costPerSeat = totalSeats > 0 ? monthlyTotal / totalSeats : 0;

  return (
    <aside className="sticky top-24 space-y-4">
      <Card className="border-border/80 bg-card">
        <CardHeader className="border-b px-5 py-4">
          <CardTitle className="text-sm font-semibold">Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          {companyName && (
            <div>
              <p className="text-xs text-zinc-400">Company</p>
              <p className="mt-1 font-medium text-zinc-50">{companyName}</p>
            </div>
          )}

          <div>
            <p className="text-xs text-zinc-400">AI Tools</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-50">
              {tools?.length || 0}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-400">Monthly spend</p>
            <p className="mt-1 text-2xl font-semibold text-primary">
              ${monthlyTotal.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              ${(monthlyTotal * 12).toFixed(2)}/year
            </p>
          </div>

          <div className="border-t border-border/60 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-400">Total seats</p>
                <p className="mt-1 font-semibold text-zinc-50">{totalSeats}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Cost per seat</p>
                <p className="mt-1 font-semibold text-zinc-50">
                  ${costPerSeat.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
            <p className="text-xs text-primary">
              💡 Tip: Review your usage patterns to identify opportunities for
              team plan consolidation.
            </p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
