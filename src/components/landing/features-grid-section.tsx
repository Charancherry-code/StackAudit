import {
  ScanSearch,
  Share2,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { featureItems } from "@/data/landing";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const iconByName: Record<string, LucideIcon> = {
  scan: ScanSearch,
  sparkles: Sparkles,
  share: Share2,
  "shield-check": ShieldCheck,
};

export function FeaturesGridSection() {
  return (
    <section
      aria-labelledby="features-title"
      className="border-b border-zinc-900/80"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything needed to audit AI infrastructure spend"
            description="Purpose-built workflows for engineering, finance, and procurement teams."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {featureItems.map((item, index) => {
            const Icon = iconByName[item.icon];

            return (
              <Reveal key={item.title} delay={0.05 * (index + 1)}>
                <Card className="h-full border-zinc-800 bg-zinc-950/65">
                  <CardContent className="p-6">
                    <div className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-200">
                      <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-zinc-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
