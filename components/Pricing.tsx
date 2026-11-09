"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { EXPO, POP } from "@/lib/motion";

const ROWS = [
  { when: "One-time", what: "A build fee for each tool" },
  { when: "Monthly", what: "One small fee to run and manage all of it" },
  { when: "Always", what: "No long-term contract. Your data stays yours." },
];

export default function Pricing() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const show = reduced || inView;

  return (
    <section id="pricing" className="grain sec pt-0">
      <div className="wrap flex flex-col gap-12">
        <Reveal>
          <SectionLabel no="07">How it’s priced</SectionLabel>
        </Reveal>

        <Reveal from="rise">
          <div
            ref={ref}
            className="grain grid items-center gap-x-16 gap-y-10 overflow-clip rounded-[32px] bg-cobalt px-7 py-10 text-white shadow-[0_32px_72px_rgba(90,90,255,0.32),0_4px_12px_rgba(90,90,255,0.2),inset_0_1px_0_rgba(255,255,255,0.24)] sm:px-16 sm:py-14 min-[900px]:grid-cols-[5fr_6fr]"
          >
            <div className="flex flex-col gap-10">
              <h2
                className="font-display font-bold leading-none tracking-[-0.04em]"
                style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
              >
                Pay per build.
                <br />
                Not per year.
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  {["1", "2", "3", "+"].map((t, i) => (
                    <motion.div
                      key={t}
                      className={`flex h-11 w-11 items-center justify-center rounded-[10px] font-mono font-medium ${
                        t === "+"
                          ? "border-[1.5px] border-dashed border-white text-base text-white"
                          : "bg-white text-[13px] text-cobalt-ink"
                      }`}
                      initial={reduced ? false : { scale: 0.4, opacity: 0, y: 12 }}
                      animate={show ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.4, opacity: 0, y: 12 }}
                      transition={{ ...POP, delay: 0.4 + i * 0.12 }}
                    >
                      {t}
                    </motion.div>
                  ))}
                </div>
                <div className="font-mono text-xs tracking-[0.14em]">BUILD ONE OR BUILD TWENTY</div>
              </div>
            </div>

            <dl>
              {ROWS.map((r, i) => (
                <motion.div
                  key={r.when}
                  className={`grid gap-1 py-5 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-4 ${
                    i > 0 ? "border-t border-white/30" : ""
                  }`}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.5 + i * 0.12 }}
                >
                  <dt className="font-mono text-[13px] uppercase tracking-[0.12em] sm:pt-1">{r.when}</dt>
                  <dd className="text-[19px] leading-snug">{r.what}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
