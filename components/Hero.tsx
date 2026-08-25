"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPRING_SETTLE } from "@/lib/motion";

// Slow, ambient playback for a decorative loop rather than the source clip's
// native pace.
const VIDEO_PLAYBACK_RATE = 0.5;

function setSlowPlayback(el: HTMLVideoElement | null) {
  if (el) el.playbackRate = VIDEO_PLAYBACK_RATE;
}

function HeroVideoPanel() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden lg:block lg:w-[340px] xl:w-[420px] 2xl:w-[480px]"
    >
      <video
        ref={setSlowPlayback}
        onLoadedMetadata={(e) => setSlowPlayback(e.currentTarget)}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-video.mp4"
        autoPlay={!reduced}
        loop={!reduced}
        muted
        playsInline
        preload="auto"
      />
      {/* Dissolves just the video's left seam into the section's dark base,
          without dimming the clip itself. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(var(--ink-rgb), 0.9) 0%, rgba(var(--ink-rgb), 0) 22%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/12 via-transparent to-ink/18" />
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
    <section id="top" className="grain relative overflow-hidden bg-ink">
      <HeroVideoPanel />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24 lg:pb-28">
        <div className="lg:max-w-xl">
          <motion.h1
            className="text-balance font-display font-bold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 4.5vw + 1rem, 4rem)" }}
            {...settle(0.55)}
          >
            The technology partner built for manufacturers&apos; rep
            agencies.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[52ch] text-lg text-white/70"
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
          <div className="grain relative mx-auto aspect-[464/688] max-w-[320px] overflow-hidden rounded-sm border border-white/10 bg-ink shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <video
              ref={setSlowPlayback}
              onLoadedMetadata={(e) => setSlowPlayback(e.currentTarget)}
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
