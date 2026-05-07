"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { AuditFormContent } from "@/components/audit/audit-form";
import { AuditFormSchema, type AuditFormData } from "@/types/audit";

export function AuditPage() {
  const methods = useForm<AuditFormData>({
    resolver: zodResolver(AuditFormSchema),
    defaultValues: {
      companyName: "",
      tools: [],
    },
    mode: "onBlur",
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: AuditFormData) => {
    console.log("Form submitted:", data);
    // TODO: Send to audit engine / backend
  };

  return (
    <section
      aria-labelledby="audit-title"
      className="border-b border-zinc-900/80 bg-transparent"
    >
      <div className="mx-auto container-app py-16 md:py-20">
        <Reveal>
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Start your audit
            </p>
            <h1
              id="audit-title"
              className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl"
            >
              Tell us about your AI tool spend
            </h1>
            <p className="mt-3 max-w-2xl text-base text-zinc-300">
              Add each AI tool your team uses. We'll analyze your subscription
              costs, identify redundancies, and recommend optimizations.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <AuditFormContent />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  type="submit"
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting ? "Analyzing..." : "Get audit report"}
                </Button>
                <p className="text-sm text-zinc-400">
                  Takes ~2 minutes. No credit card required.
                </p>
              </div>
            </form>
          </FormProvider>
        </Reveal>
      </div>
    </section>
  );
}
