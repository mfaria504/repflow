import Reveal from "@/components/Reveal";
import IconPattern from "@/components/IconPattern";
import { ACCENT_CLASSES } from "@/lib/accents";
import type { DirectoryEntry } from "@/lib/types";

export default function DirectorySection({
  item,
  index,
  cardLabel,
}: {
  item: DirectoryEntry;
  index: number;
  cardLabel: string;
}) {
  const Icon = item.icon;
  const tinted = index % 2 === 1;
  const accent = ACCENT_CLASSES[item.accent];

  return (
    <section
      id={item.slug}
      className={`scroll-mt-[120px] border-b border-ink/10 ${tinted ? "bg-safety" : "bg-paper"}`}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-sm border bg-safety ${accent.text} ${accent.border}`}
              >
                <IconPattern
                  pattern={item.pattern}
                  className="absolute inset-0 h-full w-full opacity-[0.16]"
                />
                <span className={`absolute inset-0 ${accent.wash}`} aria-hidden />
                <Icon className="relative h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-steel">
                {String(index + 1).padStart(2, "0")} · {item.label}
              </span>
            </div>
            <h2 className="max-w-[22ch] font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
              {item.headline}
            </h2>
            <p className="mt-4 max-w-[60ch] text-base text-ink/65 sm:text-lg">
              {item.body}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-sm border border-ink/20 bg-safety">
              <div className="border-b border-ink/15 bg-paper px-5 py-2.5">
                <span className="font-mono text-[11px] uppercase tracking-widest text-steel">
                  {cardLabel}
                </span>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 border-b border-ink/10 px-5 py-3.5 text-sm text-ink last:border-b-0"
                  >
                    <span
                      aria-hidden
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[1px] ${accent.dot}`}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
