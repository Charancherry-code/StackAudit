"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-4 z-40">
      <nav
        aria-label="Primary"
        className="mx-auto container-app flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-zinc-950/60 px-4 py-3 shadow-elev-2 backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-50"
          >
            StackAudit
          </Link>
          <span className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <Link href="#features" className="hover:text-zinc-100">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-zinc-100">
              How it works
            </Link>
            <Link href="#pricing" className="hover:text-zinc-100">
              Pricing
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Sign in
          </Button>
          <Button size="sm" className="hidden md:inline-flex">
            Start free audit
          </Button>
          <button
            aria-label="Open menu"
            className="inline-flex items-center rounded-md border border-transparent bg-transparent p-2 text-zinc-300 hover:bg-muted/60 md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
