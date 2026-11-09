"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { SPRING_SETTLE } from "@/lib/motion";

// The explainer loops silently on load (browsers block autoplay with sound).
// The button restarts it from the top with the soundtrack on; pressing it
// again mutes it and lets the loop carry on.
function HeroExplainer() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  function toggleSound() {
    const el = videoRef.current;
    if (!el) return;
    if (soundOn) {
      el.muted = true;
      setSoundOn(false);
      return;
    }
    el.muted = false;
    el.currentTime = 0;
    void el.play();
    setSoundOn(true);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-paper shadow-[0_24px_64px_rgba(0,0,0,0.45)] ring-1 ring-white/15">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/repflow-explainer.mp4"
        poster="/repflow-explainer-poster.jpg"
        aria-label="How RepFlow works: a one-minute explainer"
        autoPlay={!reduced}
        controls={!!reduced}
        loop
        muted
        playsInline
        preload="metadata"
      />
      {!reduced && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute" : "Play with sound"}
          className="absolute bottom-2 right-2 inline-flex items-center gap-2 rounded-full bg-ink/85 p-2.5 sm:bottom-3 sm:right-3 sm:px-3.5 sm:py-2 font-display text-sm font-bold text-white backdrop-blur transition-colors duration-150 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {soundOn ? (
            <VolumeX aria-hidden className="h-4 w-4" />
          ) : (
            <Volume2 aria-hidden className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {soundOn ? "Mute" : "Play with sound"}
          </span>
        </button>
      )}
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
      {/* Subtle warm flare anchored to the hero's bottom-left corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 z-0 h-[560px] w-[560px]"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--flare-rgb), 0.22) 0%, rgba(var(--flare-rgb), 0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 lg:pb-28">
        <div>
          <motion.h1
            className="text-balance font-display font-bold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 2.6vw + 1rem, 3.25rem)" }}
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

        <motion.div {...settle(0.8)}>
          <HeroExplainer />
        </motion.div>
      </div>
    </section>
  );
}
