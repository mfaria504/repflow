"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import Eye from "@/components/Eye";
import { EXPO } from "@/lib/motion";

const SYSTEMS = [
  "Quoting",
  "CRM",
  "Email",
  "Spreadsheets",
  "Factory portals",
  "ERP",
  "Accounting",
  "Price books",
  "Commissions",
  "Spec platforms",
];

// The explainer loops silently on load (browsers block autoplay with sound).
// The button restarts it from the top with the soundtrack on.
function Film() {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  // The film tips up off the page and settles flat as it scrolls into view.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "start 0.3"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);

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
    <div ref={frameRef} style={{ perspective: 1600 }}>
      <motion.div
        style={
          reduced ? undefined : { scale, rotateX, transformOrigin: "50% 100%" }
        }
        className="overflow-hidden rounded-[20px] bg-white shadow-[0_48px_120px_rgba(90,90,255,0.3),0_12px_32px_rgba(11,15,18,0.45)] ring-1 ring-white/20"
      >
        <div className="flex items-center gap-3.5 border-b border-[#eeece6] bg-white px-5 py-3.5">
          <div aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
          </div>
          <span className="font-mono text-xs tracking-[0.08em] text-mute">
            REPFLOW IN 60 SECONDS
          </span>
        </div>
        <div className="relative aspect-video bg-paper">
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
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-midnight/85 p-2.5 font-display text-sm font-bold text-white backdrop-blur backdrop-saturate-150 transition-[transform,background-color] duration-150 hover:scale-[1.03] hover:bg-midnight active:scale-[0.97] sm:bottom-4 sm:right-4 sm:px-4 sm:py-2.5"
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
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const markY = useTransform(scrollY, [0, 1000], [0, 220]);
  const copyOpacity = useTransform(scrollY, [120, 620], [1, 0.15]);
  const copyY = useTransform(scrollY, [120, 620], [0, -60]);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 40, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 1.2, ease: EXPO, delay },
        };

  return (
    <>
      <section id="top" className="blueprint">
        {/* Decoration lives in its own clipped layer so the film below can
            hang out of the section's bottom edge. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
          <motion.div
            className="absolute -right-24 -top-24 w-[280px] sm:-right-[130px] sm:-top-[120px] sm:w-[420px] lg:-right-40 lg:-top-[140px] lg:w-[560px] min-[1160px]:left-[calc(50%+20px)] min-[1160px]:right-auto min-[1160px]:-top-[150px] min-[1160px]:w-[760px]"
            style={reduced ? undefined : { y: markY }}
            initial={reduced ? false : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: EXPO, delay: 0.1 }}
          >
            <Eye className="h-auto w-full" ringOpacity={0.82} reach={90} />
          </motion.div>
        </div>

        <div className="wrap relative pt-[clamp(136px,14vw,184px)]">
          <motion.div
            className="flex max-w-[940px] flex-col gap-8"
            style={reduced ? undefined : { opacity: copyOpacity, y: copyY }}
          >
            <motion.div
              className="label flex items-center gap-3 text-steel"
              {...enter(0.2)}
            >
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-cobalt shadow-[0_0_0_4px_rgba(90,90,255,0.2)]"
              />
              For sales and operations teams at rep agencies
            </motion.div>
            <motion.h1
              className="font-display font-bold leading-[0.96] tracking-[-0.045em] text-safety"
              style={{ fontSize: "clamp(48px, 7.4vw, 100px)" }}
              {...enter(0.34)}
            >
              The builder
              <br />
              <span className="text-cobalt">behind the scenes.</span>
            </motion.h1>
            <motion.p
              className="max-w-[560px] text-pretty text-[clamp(18px,1.9vw,22px)] leading-[1.55] text-fog"
              {...enter(0.56)}
            >
              Have an idea that would make your team’s work easier? We build
              it, connect it to the systems you already run, and keep it
              working.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
              {...enter(0.7)}
            >
              <Link href="/#assessment" className="cta px-7 py-4 text-lg">
                Tell us your first “I wish”
                <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/#how"
                className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.14em] text-fog transition-colors duration-150 hover:text-white"
              >
                See how it works
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 mt-[clamp(56px,6vw,80px)] -mb-[clamp(72px,17vw,248px)]"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 80 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.4, ease: EXPO, delay: 0.8 },
                })}
          >
            <Film />
          </motion.div>
        </div>
      </section>

      {/* The systems we connect to, on a slow ticker under the film. */}
      <section
        aria-label="Systems we connect to"
        className="grain pb-2 pt-[calc(clamp(72px,17vw,248px)+clamp(48px,6vw,72px))]"
      >
        <p className="label wrap text-center text-mute">
          Built into the systems you already run
        </p>
        <div className="marquee-mask mt-8 overflow-hidden border-y border-[#d9d5ca] py-6">
          <div className="label flex w-max animate-marquee gap-12 whitespace-nowrap text-mute">
            {[0, 1].map((dup) =>
              SYSTEMS.map((s) => (
                <span
                  key={`${dup}-${s}`}
                  aria-hidden={dup === 1}
                  className="flex items-center gap-12"
                >
                  {s}
                  <span aria-hidden className="text-cobalt">
                    ●
                  </span>
                </span>
              )),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
