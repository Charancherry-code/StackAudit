"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export function HeroInteractive() {
  return (
    <Reveal delay={0.06} className="relative">
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden border-border/70 bg-card">
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Audit Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-400">Monthly AI spend</p>
                <p className="mt-1 text-2xl font-semibold text-zinc-50">
                  $278,000
                </p>
                <p className="mt-1 text-sm text-zinc-300">Last 30 days</p>
              </div>

              <div>
                <p className="text-xs text-zinc-400">Estimated savings</p>
                <p className="mt-1 text-2xl font-semibold text-emerald-300">
                  $91,000
                </p>
                <p className="mt-1 text-sm text-zinc-300">Projected monthly</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400">Audit score</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-lg font-semibold text-emerald-300">
                    73
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-50">Good</p>
                    <p className="text-xs text-zinc-400">
                      Some quick wins available
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-36 text-right">
                <p className="text-xs text-zinc-400">Recommended tools</p>
                <div className="mt-2 flex flex-col items-end gap-2">
                  <Badge variant="info">Reserved GPU</Badge>
                  <Badge variant="secondary">Token cache</Badge>
                  <Badge variant="secondary">Batch windowing</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Reveal>
  );
}
