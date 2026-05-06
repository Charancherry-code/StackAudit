import { ChevronDown } from "lucide-react";

import { faqs } from "@/data/landing";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function FAQSection() {
  return (
    <section
      aria-labelledby="faq-title"
      className="border-b border-zinc-900/80"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions teams ask before switching"
            description="If you need a custom security review or procurement packet, our team can help."
          />
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={0.04 * (index + 1)}>
              <details className="group rounded-xl border border-zinc-800 bg-zinc-950/65 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-base font-medium text-zinc-100">
                  {faq.question}
                  <ChevronDown
                    className="size-4 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
