import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
      <p>
        © {new Date().getFullYear()} StackAudit. Built for AI-native finance and
        platform teams.
      </p>
      <nav aria-label="Footer" className="flex flex-wrap items-center gap-5">
        <Link href="#" className="transition-colors hover:text-zinc-200">
          Security
        </Link>
        <Link href="#" className="transition-colors hover:text-zinc-200">
          Privacy
        </Link>
        <Link href="#" className="transition-colors hover:text-zinc-200">
          Contact
        </Link>
      </nav>
    </footer>
  );
}
