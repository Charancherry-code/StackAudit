import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroInteractive } from "@/components/landing/hero-interactive";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="border-b border-zinc-900/80 bg-transparent"
    >
      <div className="mx-auto container-app grid gap-8 py-20 md:grid-cols-2 md:items-center">
        <div>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              AI Cost Savings for Platform Teams
            </p>
            <h1
              id="hero-title"
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl md:text-5xl"
            >
              Reduce AI infrastructure spend without slowing product velocity.
            </h1>
            <p className="mt-4 max-w-xl text-base text-zinc-300">
              StackAudit continuously audits model and cloud usage, surfaces
              hidden leakage, and ships prioritized recommendations that save
              engineering and finance teams real money.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/audit">
                <Button size="lg" className="h-11 rounded-full px-5">
                  Start free audit
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="h-11 rounded-full px-4"
              >
                Contact sales
              </Button>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-zinc-400">
              <span>Trusted by AI native teams • SOC 2 aligned</span>
            </div>
          </Reveal>
        </div>

        <HeroInteractive />
      </div>
    </section>
  );
}
