import Reveal from "@/components/Reveal";
import IconPattern, { PatternMarker } from "@/components/IconPattern";
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
                {item.pillar && (
                  <span className="text-brass"> · {item.pillar}</span>
                )}
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
            <div
              className={`relative overflow-hidden rounded-sm border bg-safety ${accent.border}`}
            >
              <IconPattern
                pattern={item.pattern}
                className={`pointer-events-none absolute -bottom-5 -right-5 h-32 w-32 opacity-[0.06] ${accent.text}`}
              />
              <span
                aria-hidden
                className={`absolute inset-y-0 left-0 w-[3px] ${accent.dot}`}
              />

              <div className={`relative border-b pl-6 pr-5 py-2.5 ${accent.border} ${accent.wash}`}>
                <span className={`font-mono text-[11px] uppercase tracking-widest ${accent.text}`}>
                  {cardLabel}
                </span>
              </div>
              <ul className="relative">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 border-b border-ink/10 py-3.5 pl-6 pr-5 text-sm text-ink last:border-b-0"
                  >
                    <PatternMarker
                      pattern={item.pattern}
                      className={`mt-0.5 h-3 w-3 shrink-0 ${accent.text}`}
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
