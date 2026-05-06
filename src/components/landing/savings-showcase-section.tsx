import { TrendingDown } from "lucide-react";

import { spendCards } from "@/data/landing";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function SavingsShowcaseSection() {
  return (
    <section
      aria-labelledby="savings-title"
      className="border-b border-zinc-900/80 bg-zinc-950/40"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Savings Showcase"
            title="See the before and after in plain numbers"
            description="Teams typically uncover six figures in annual AI waste within their first audit cycle."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {spendCards.map((card, index) => (
            <Reveal key={card.title} delay={0.08 * (index + 1)}>
              <Card className="h-full border-zinc-800 bg-zinc-950/70">
                <CardContent className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                    {card.title}
                  </p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50">
                    {card.amount}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    {card.note}
                  </p>
                  {card.delta ? (
                    <Badge className="mt-6 gap-1 rounded-full border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-emerald-200 hover:bg-emerald-500/20">
                      <TrendingDown className="size-3.5" />
                      {card.delta}
                    </Badge>
                  ) : null}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
