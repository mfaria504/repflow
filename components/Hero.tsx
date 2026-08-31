"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPRING_SETTLE } from "@/lib/motion";

// Slow, ambient playback for a decorative loop rather than the source clip's
// native pace.
const VIDEO_PLAYBACK_RATE = 0.3;

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
      {/* Dissolves the video's left seam into the section's dark base with a
          longer, softer taper so the boundary doesn't read as a hard edge. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(var(--midnight-rgb), 1) 0%, rgba(var(--midnight-rgb), 0.6) 24%, rgba(var(--midnight-rgb), 0) 48%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/12 via-transparent to-midnight/18" />
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
    <section id="top" className="grain relative overflow-hidden bg-midnight">
      <HeroVideoPanel />

      {/* Subtle warm flare anchored to the hero's bottom-left corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 z-0 h-[560px] w-[560px]"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--flare-rgb), 0.22) 0%, rgba(var(--flare-rgb), 0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-24 lg:pb-28">
        <div className="lg:max-w-xl">
          <motion.h1
            className="text-balance font-display font-bold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 4.5vw + 1rem, 4rem)" }}
            {...settle(0.55)}
          >
            The revenue technology partner for manufacturers&apos; rep
            agencies.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[52ch] text-lg text-white/70"
            {...settle(0.65)}
          >
            We work inside your agency to build, run, and optimize the
            technology behind your sales: the tools, the data, the digital
            infrastructure. Your reps stay in the field. The systems are our
            problem.
          </motion.p>
          <motion.div className="mt-10" {...settle(0.73)}>
            <a
              href="#assessment"
              className="inline-block rounded-sm bg-cta px-6 py-3.5 font-display text-base font-bold text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(251,91,14,0.4)] active:translate-y-0 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(251,91,14,0.25)]"
            >
              Request an Assessment
            </a>
          </motion.div>
        </div>
      </div>

      {/* Below desktop the full-bleed right panel is hidden, so the same
          clip runs here instead: full width, docked to the section's
          bottom edge, dissolving in from the top. */}
      <motion.div
        aria-hidden
        className="relative aspect-[464/688] w-full lg:hidden"
        {...settle(0.8)}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(var(--midnight-rgb), 1) 0%, rgba(var(--midnight-rgb), 0.6) 24%, rgba(var(--midnight-rgb), 0) 48%)",
          }}
        />
      </motion.div>
    </section>
  );
}
