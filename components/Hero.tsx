"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPRING_SETTLE } from "@/lib/motion";

// Fades the panel's left edge into the page background and lets the video
// dissolve out of the dark base beneath it, rather than sitting on top of
// a hard rectangle.
const PANEL_MASK =
  "linear-gradient(to right, transparent 0%, black 24%, black 100%)";

function HeroVideoPanel() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[340px] lg:block xl:w-[420px] 2xl:w-[480px]"
      style={{ maskImage: PANEL_MASK, WebkitMaskImage: PANEL_MASK }}
    >
      <div className="grain relative h-full w-full bg-ink">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video.mp4"
          autoPlay={!reduced}
          loop={!reduced}
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/10 to-transparent" />
      </div>
    </div>
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
      <HeroVideoPanel />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24 lg:pb-28">
        <div className="lg:max-w-xl">
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
            One retainer runs your software, pipeline, data, and outreach as
            a single system — built by someone who&apos;s actually run a rep
            agency, not learning on yours.
          </motion.p>
          <motion.div className="mt-10" {...settle(0.73)}>
            <a
              href="#assessment"
              className="inline-block rounded-sm bg-brass px-6 py-3.5 font-display text-base font-bold text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(199,123,39,0.4)] active:translate-y-0 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(199,123,39,0.25)]"
            >
              Request a RevOps Assessment
            </a>
          </motion.div>
        </div>

        {/* Below desktop the full-bleed panel is hidden, so the same clip runs here instead. */}
        <motion.div className="mt-12 lg:hidden" {...settle(0.8)}>
          <div className="grain relative mx-auto aspect-[464/688] max-w-[320px] overflow-hidden rounded-sm bg-ink shadow-[0_12px_40px_rgba(34,38,43,0.25)]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/hero-video.mp4"
              autoPlay={!reduced}
              loop={!reduced}
              muted
              playsInline
              preload="auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
