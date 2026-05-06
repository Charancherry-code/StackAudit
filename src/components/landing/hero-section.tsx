import { ArrowRight, BarChart3, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-zinc-900/80"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_88%_12%,rgba(16,185,129,0.16),transparent_28%)]" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:px-8 lg:px-10 lg:py-24">
        <Reveal className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
            AI Cost Governance, Reimagined
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl"
          >
            Stop overpaying for AI infrastructure before it hits the board deck.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-zinc-300 md:text-lg">
            StackAudit continuously inspects cloud and model-provider spend,
            catches billing leakage, and turns waste into measurable savings.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="group h-11 rounded-full bg-zinc-100 px-6 text-zinc-950 hover:bg-zinc-200"
            >
              Start Free Audit
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <p className="text-sm text-zinc-400">
              No credit card required · Setup in under 15 minutes
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-zinc-300">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-300" />
              SOC 2 aligned controls
            </span>
            <span className="inline-flex items-center gap-2">
              <BarChart3 className="size-4 text-sky-300" />
              Real-time variance alerts
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative">
          <Card className="overflow-hidden border-zinc-800/90 bg-zinc-950/70 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.85)] backdrop-blur-xl">
            <CardHeader className="border-b border-zinc-800/90 pb-4">
              <CardTitle className="text-sm font-medium text-zinc-200">
                Live Audit Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-5">
              <div className="grid grid-cols-3 gap-3">
                <MetricChip
                  label="Monthly Spend"
                  value="$278k"
                  tone="text-zinc-100"
                />
                <MetricChip
                  label="Detected Waste"
                  value="$91k"
                  tone="text-amber-300"
                />
                <MetricChip
                  label="Recovered"
                  value="32.5%"
                  tone="text-emerald-300"
                />
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-zinc-800">
                  <div className="h-2 w-[72%] rounded-full bg-linear-to-r from-emerald-300 to-cyan-300" />
                </div>
                <div className="h-2 rounded-full bg-zinc-800">
                  <div className="h-2 w-[48%] rounded-full bg-linear-to-r from-sky-300 to-indigo-300" />
                </div>
                <div className="h-2 rounded-full bg-zinc-800">
                  <div className="h-2 w-[61%] rounded-full bg-linear-to-r from-amber-300 to-orange-300" />
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Recommendation
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  Shift nightly embedding batch to reserved GPU slots and
                  reclaim approximately $27,400 this month.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

type MetricChipProps = {
  label: string;
  value: string;
  tone: string;
};

function MetricChip({ label, value, tone }: MetricChipProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/90 p-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </p>
      <p className={`mt-2 text-base font-semibold ${tone}`}>{value}</p>
    </div>
  );
}
