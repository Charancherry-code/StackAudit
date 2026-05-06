import { workflowSteps } from "@/data/landing";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="border-b border-zinc-900/80"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="Three steps from spend chaos to audit clarity"
            description="StackAudit fits your existing workflow and gives every team a single source of cost truth."
          />
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <Reveal key={step.title} delay={0.06 * (index + 1)}>
              <Card className="h-full border-zinc-800 bg-zinc-950/65">
                <CardContent className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
