"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPRING_SETTLE, STAMP } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { ACCENT_CLASSES } from "@/lib/accents";
import IconPattern from "@/components/IconPattern";

function Screw({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2.5 w-2.5 rounded-full border border-steel/60 bg-paper ${className}`}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-steel/70" />
    </span>
  );
}

// Two distinct hero treatments sharing one brand vocabulary (brass eyebrow,
// safety-white text, the same accent-tinted shadow recipe used across the
// site) so the pages read as siblings, not a mismatched pair. Services runs
// cool and technical (blueprint navy, circuit/dot patterns); Industries runs
// warm and industrial (brass-ember, hatch/gauge patterns), each ending dark
// so it flows straight into the dark sub-nav bar beneath it.
const HERO_THEMES = {
  services: {
    background: "linear-gradient(135deg, #142338 0%, #2b4c6f 55%, #1c3450 100%)",
    rotate: "lg:rotate-1",
    cardShadow:
      "shadow-[0_20px_56px_rgba(43,76,111,0.45),0_2px_10px_rgba(0,0,0,0.3)]",
    patterns: (
      <>
        <IconPattern
          pattern="circuit-trace"
          className="pointer-events-none absolute -right-20 -top-20 h-[28rem] w-[28rem] text-safety opacity-[0.06]"
        />
        <IconPattern
          pattern="dot-grid"
          className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 text-brass opacity-[0.14]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-[-6rem] h-72 w-72 rounded-full bg-brass/25 blur-[100px]"
        />
      </>
    ),
  },
  industries: {
    background: "linear-gradient(135deg, #221a12 0%, #4a3018 55%, #2c2013 100%)",
    rotate: "lg:-rotate-1",
    cardShadow:
      "shadow-[0_20px_56px_rgba(199,123,39,0.4),0_2px_10px_rgba(0,0,0,0.3)]",
    patterns: (
      <>
        <IconPattern
          pattern="diagonal-hatch"
          className="pointer-events-none absolute -right-16 -top-16 h-[26rem] w-[26rem] rotate-6 text-brass opacity-[0.09]"
        />
        <IconPattern
          pattern="radial-rings"
          className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 text-safety opacity-[0.07]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-[-4rem] h-64 w-64 rounded-full bg-blueprint/35 blur-[100px]"
        />
      </>
    ),
  },
} as const;

export default function DirectoryHero({
  eyebrow,
  headline,
  subhead,
  ctaLabel,
  plateTitle,
  kind,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  plateTitle: string;
  kind: "services" | "industries";
}) {
  // Resolved here rather than passed as a prop: these arrays carry live
  // icon components, which a Server Component parent can't pass across
  // the client boundary as serializable props.
  const items = kind === "services" ? SERVICES : INDUSTRIES;
  const theme = HERO_THEMES[kind];
  const reduced = useReducedMotion();

  const settle = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { ...SPRING_SETTLE, delay },
        };

  return (
    <section
      className="grain relative overflow-hidden border-b border-white/10"
      style={{ background: theme.background }}
    >
      {theme.patterns}
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1fr_400px] lg:gap-16 lg:pb-24">
        <div>
          <motion.span
            {...settle(0)}
            className="font-mono text-xs uppercase tracking-widest text-brass"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            {...settle(0.06)}
            className="mt-4 max-w-[18ch] text-balance font-display font-bold tracking-[-0.03em] text-safety"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}
          >
            {headline}
          </motion.h1>
          <motion.p {...settle(0.14)} className="mt-6 max-w-[54ch] text-lg text-safety/70">
            {subhead}
          </motion.p>
          <motion.div {...settle(0.2)} className="mt-10">
            <a
              href="#assessment"
              className="inline-block rounded-sm bg-cta px-6 py-3.5 font-display text-base font-bold text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(46,29,14,0.4)] active:translate-y-0 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(46,29,14,0.25)]"
            >
              {ctaLabel}
            </a>
          </motion.div>
        </div>

        <motion.div
          className={`relative ${theme.rotate}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`relative rounded-sm bg-safety p-5 sm:p-6 ${theme.cardShadow}`}>
            <Screw className="left-1.5 top-1.5" />
            <Screw className="right-1.5 top-1.5" />
            <Screw className="bottom-1.5 left-1.5" />
            <Screw className="bottom-1.5 right-1.5" />

            <div className="relative px-1.5 py-1">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: -4, scale: 1.04 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={reduced ? { duration: 0 } : { ...STAMP, delay: 0.22 }}
                className="mb-2 flex items-baseline justify-between border-b border-ink/20 px-2 pb-3"
              >
                <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-ink">
                  {plateTitle}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-steel tabular">
                  {String(items.length).padStart(2, "0")} Total
                </span>
              </motion.div>

              <div className="grid grid-cols-2 gap-1">
                {items.map((item, i) => {
                  const Icon = item.icon;
                  const accent = ACCENT_CLASSES[item.accent];
                  return (
                    <motion.a
                      key={item.slug}
                      href={`#${item.slug}`}
                      initial={reduced ? false : { opacity: 0, y: -4, scale: 1.04 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={
                        reduced ? { duration: 0 } : { ...STAMP, delay: 0.28 + i * 0.04 }
                      }
                      className="group flex flex-col gap-2 rounded-sm border border-transparent p-2.5 transition-colors duration-150 hover:border-ink/10 hover:bg-paper"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-sm border bg-paper transition-transform duration-200 group-hover:-translate-y-0.5 ${accent.text} ${accent.border}`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span className="text-xs font-medium leading-tight text-ink">
                        {item.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
