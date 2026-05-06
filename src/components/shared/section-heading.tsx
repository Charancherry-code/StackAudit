type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <header className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-zinc-300 md:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
