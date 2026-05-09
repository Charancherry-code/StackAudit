"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const LOADING_MESSAGES = [
  "Analyzing AI stack…",
  "Comparing pricing models…",
  "Detecting redundant tools…",
  "Benchmarking usage patterns…",
  "Calculating optimization opportunities…",
  "Generating recommendations…",
  "Finalizing audit report…",
];

export function LoadingAnalysis() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 bg-card p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6 flex justify-center"
        >
          <Loader2 className="size-12 text-primary" />
        </motion.div>

        <h2 className="text-xl font-semibold text-zinc-50 mb-6">
          Running your audit
        </h2>

        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-zinc-400 mb-8"
        >
          {LOADING_MESSAGES[messageIndex]}
        </motion.div>

        <div className="space-y-2">
          {LOADING_MESSAGES.map((_, idx) => (
            <motion.div
              key={idx}
              className="h-1 bg-zinc-800 rounded-full overflow-hidden"
              animate={{
                backgroundColor:
                  idx <= messageIndex ? "rgb(59, 130, 246)" : "rgb(39, 39, 42)",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <p className="text-xs text-zinc-500 mt-6">
          This typically takes 1-2 minutes
        </p>
      </Card>
    </div>
  );
}
