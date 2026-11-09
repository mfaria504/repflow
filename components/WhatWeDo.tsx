"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Activity, GraduationCap, Hammer } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { EXPO, POP } from "@/lib/motion";

const CARDS = [
  {
    icon: Hammer,
    kicker: "Ideas into tools",
    title: "Build",
    body: "We turn your team’s ideas into working tools: quote trackers, reports, integrations and custom apps. Each one is scoped and priced before we start, and built around the systems you already run.",
    tags: ["Tools", "Integrations", "Apps"],
  },
  {
    icon: GraduationCap,
    kicker: "Tools into habits",
    title: "Train",
    body: "A tool only matters if your team uses it. We walk every person through what we build, leave short how-to guides behind, and stay on call until it’s simply how they work.",
    tags: ["Onboarding", "Guides", "Support"],
  },
  {
    icon: Activity,
    kicker: "Always on",
    title: "Manage",
    body: "We keep everything running after launch. When your systems change, we update what we built. We keep the data clean, watch for problems, and send a monthly report on what’s working.",
    tags: ["Updates", "Data", "Reporting"],
  },
];

export default function WhatWeDo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const show = reduced || inView;

  return (
    <section id="what" className="grain sec">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <Reveal>
            <SectionLabel no="03" fig="FIG. 02">
              What we do
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 4.7vw, 56px)" }}
            >
              We build it, teach it,
              <br />
              <span className="text-cobalt-deep">and keep it running.</span>
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="flex flex-col gap-6">
          {/* A track that draws across the three stages, one dot per card. */}
          <div aria-hidden className="relative hidden h-4 min-[1160px]:block">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#cfcbc0]" />
            <motion.div
              className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 bg-cobalt"
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: show ? 1 : 0 }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
            />
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute top-1/2 -ml-2 -mt-2 h-4 w-4 rounded-full bg-cobalt shadow-[0_0_0_5px_rgba(90,90,255,0.16)]"
                style={{ left: `${(i * 2 + 1) * (100 / 6)}%` }}
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ ...POP, delay: 0.35 + i * 0.3 }}
              />
            ))}
          </div>

          <div
            className="grid max-w-[640px] gap-6 min-[1160px]:max-w-none min-[1160px]:grid-cols-3"
            style={{ perspective: 1400 }}
          >
            {CARDS.map((c, i) => (
              <motion.article
                key={c.title}
                className="lift flex flex-col overflow-clip rounded-[28px] border border-line bg-safety shadow-[0_1px_2px_rgba(34,38,43,0.04),0_24px_48px_rgba(34,38,43,0.08)]"
                style={{ transformOrigin: "50% 100%" }}
                initial={reduced ? false : { opacity: 0, y: 56, rotateX: 14 }}
                animate={show ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 56, rotateX: 14 }}
                transition={{ duration: 1.1, ease: EXPO, delay: 0.3 + i * 0.16 }}
              >
                <div className="blueprint flex h-[216px] items-end px-7 pb-8 sm:px-9">
                  <div className="relative flex flex-col gap-6">
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-cobalt shadow-[0_0_0_8px_rgba(90,90,255,0.14),0_12px_28px_rgba(90,90,255,0.35)]"
                      initial={reduced ? false : { scale: 0.4, opacity: 0 }}
                      animate={show ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
                      transition={{ ...POP, delay: 0.75 + i * 0.16 }}
                    >
                      <c.icon aria-hidden className="h-6 w-6 text-white" strokeWidth={2} />
                    </motion.div>
                    <div className="flex flex-col gap-2.5">
                      <div className="label text-[12px] text-lilac">{c.kicker}</div>
                      <h3 className="font-display text-[36px] font-bold tracking-[-0.03em] sm:text-[44px]">
                        {c.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 p-7 sm:p-9">
                  <p className="text-[17px] leading-relaxed text-body">{c.body}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-body">
                    {c.tags.map((t, j) => (
                      <span key={t} className="flex items-center gap-2">
                        {j > 0 && <span aria-hidden className="text-cobalt">·</span>}
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
