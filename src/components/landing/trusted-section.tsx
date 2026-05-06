import { teams } from "@/data/landing";

import { Reveal } from "@/components/shared/reveal";

export function TrustedSection() {
  return (
    <section
      aria-labelledby="trusted-title"
      className="border-b border-zinc-900/80"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 lg:px-10">
        <Reveal>
          <h2
            id="trusted-title"
            className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400"
          >
            Trusted by AI-native teams shipping fast at scale
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {teams.map((team) => (
              <li
                key={team.name}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3 text-center text-sm font-medium tracking-wide text-zinc-200"
              >
                {team.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
