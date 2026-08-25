"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPRING_SETTLE, STAMP } from "@/lib/motion";

const PLATE_ROWS = [
  { label: "SERVICE", value: "Fractional RevOps" },
  { label: "SCOPE", value: "Software / Pipeline / Data / Comms" },
  { label: "OPERATOR", value: "One person. One retainer." },
  { label: "BUILT FOR", value: "Manufacturers' rep agencies" },
  { label: "STATUS", value: "Taking a limited number of agencies" },
];

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

function DataPlate() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative rounded-sm bg-safety p-6 shadow-[0_12px_40px_rgba(43,76,111,0.14),0_2px_8px_rgba(34,38,43,0.08)] sm:p-8">
        {/* Frame that draws itself in on load */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)]"
          fill="none"
        >
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            stroke="#22262B"
            strokeWidth="1.5"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        <Screw className="left-1.5 top-1.5" />
        <Screw className="right-1.5 top-1.5" />
        <Screw className="bottom-1.5 left-1.5" />
        <Screw className="bottom-1.5 right-1.5" />

        <div className="relative px-2 py-1">
          <motion.div
            className="flex items-baseline justify-between border-b border-ink/20 pb-3"
            initial={reduced ? false : { opacity: 0, y: -4, scale: 1.04 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={reduced ? { duration: 0 } : { ...STAMP, delay: 0.25 }}
          >
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-ink">
              RepFlow · Revenue Operations
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-steel tabular">
              No. RF-001
            </span>
          </motion.div>

          <dl>
            {PLATE_ROWS.map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3 last:border-b-0"
                initial={reduced ? false : { opacity: 0, y: -4, scale: 1.04 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  reduced ? { duration: 0 } : { ...STAMP, delay: 0.31 + i * 0.04 }
                }
              >
                <dt className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-steel">
                  {row.label}
                </dt>
                <dd className="text-right text-sm font-medium text-ink">
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  const settle = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { ...SPRING_SETTLE, delay },
        };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1fr_400px] lg:gap-16 lg:pb-28">
        <div>
          <motion.h1
            className="text-balance font-display font-bold tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(2.25rem, 4.5vw + 1rem, 4rem)" }}
            {...settle(0.55)}
          >
            The technology partner built for manufacturers&apos; rep
            agencies.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[52ch] text-lg text-ink/65"
            {...settle(0.65)}
          >
            Run by someone who&apos;s actually run one. One retainer covers
            the software, the pipeline, the data, and the communications.
          </motion.p>
          <motion.div className="mt-10" {...settle(0.73)}>
            <a
              href="#assessment"
              className="inline-block rounded-sm bg-brass px-6 py-3.5 font-display text-base font-bold text-ink transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(199,123,39,0.4)] active:translate-y-0 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(199,123,39,0.25)]"
            >
              Request a RevOps Assessment
            </a>
          </motion.div>
        </div>

        <div className="lg:-rotate-1">
          <DataPlate />
        </div>
      </div>
    </section>
  );
}
