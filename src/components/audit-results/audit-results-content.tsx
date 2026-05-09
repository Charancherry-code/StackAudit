"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/reveal";
import { SavingsHero } from "@/components/audit-results/savings-hero";
import { AuditScoreCard } from "@/components/audit-results/audit-score-card";
import { RecommendationsSection } from "@/components/audit-results/recommendations-section";
import { BenchmarkInsights } from "@/components/audit-results/benchmark-insights";
import { SpendBreakdown } from "@/components/audit-results/spend-breakdown";
import { CTASection } from "@/components/audit-results/cta-section";
import { runAuditAnalysis } from "@/services/audit-engine";
import { LoadingAnalysis } from "@/components/audit-results/loading-analysis";
import type { AuditFormData } from "@/types/audit";
import type { AuditResult } from "@/types/audit-results";

interface AuditResultsContentProps {
  formData: AuditFormData;
}

export function AuditResultsContent({ formData }: AuditResultsContentProps) {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const auditResult = await runAuditAnalysis(formData);
        setResult(auditResult);
      } catch (error) {
        console.error("Audit analysis failed:", error);
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, [formData]);

  if (loading || !result) {
    return <LoadingAnalysis />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <Reveal>
        <div className="border-b border-border/30 pb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2">
            Audit Report
          </p>
          <h1 className="text-3xl font-bold text-zinc-50 sm:text-4xl">
            {result.companyName}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Analyzed on {result.analyzedAt.toLocaleDateString()}
          </p>
        </div>
      </Reveal>

      {/* Savings Hero */}
      <motion.div variants={itemVariants}>
        <SavingsHero result={result} />
      </motion.div>

      {/* Score Card & Breakdown Grid */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        <div className="md:col-span-1">
          <AuditScoreCard score={result.score} />
        </div>
        <div className="md:col-span-2">
          <SpendBreakdown breakdown={result.currentState.breakdown} />
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={itemVariants}>
        <RecommendationsSection recommendations={result.recommendations} />
      </motion.div>

      {/* Benchmarks */}
      <motion.div variants={itemVariants}>
        <BenchmarkInsights benchmarks={result.benchmarks} />
      </motion.div>

      {/* Current vs Optimized Comparison */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 md:grid-cols-2"
      >
        <div className="rounded-lg border border-border/30 bg-zinc-900/40 p-6">
          <h3 className="text-sm font-semibold text-zinc-400 mb-4">
            Current Setup
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Monthly spend</span>
              <span className="font-semibold text-zinc-50">
                ${result.currentState.monthlySpend.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">AI tools</span>
              <span className="font-semibold text-zinc-50">
                {result.currentState.toolCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Team size</span>
              <span className="font-semibold text-zinc-50">
                {result.currentState.totalSeats} seats
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Cost per seat</span>
              <span className="font-semibold text-zinc-50">
                ${result.currentState.costPerSeat.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}/mo
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-6">
          <h3 className="text-sm font-semibold text-emerald-400 mb-4">
            Optimized Setup
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Monthly spend</span>
              <span className="font-semibold text-emerald-400">
                ${result.optimizedState.monthlySpend.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Monthly savings</span>
              <span className="font-semibold text-emerald-400">
                ${result.savings.monthly.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Annual savings</span>
              <span className="font-semibold text-emerald-400">
                ${result.savings.annual.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-emerald-500/20">
              <span className="text-sm text-zinc-400">Savings rate</span>
              <span className="font-semibold text-emerald-400">
                {Math.round(result.savings.percentage)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants}>
        <CTASection
          savings={result.savings.annual}
          companyName={result.companyName}
        />
      </motion.div>
    </motion.div>
  );
}
