"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Building2, ClipboardList, Headset, Route } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { INDUSTRIES } from "@/lib/industries";
import { EXPO, POP } from "@/lib/motion";

// One team, four seats. What each one deals with today and what changes.
const SEATS = [
  {
    icon: Building2,
    seat: "Owners",
    today: "The back office runs through you.",
    after: "The firm runs on systems, not on you.",
  },
  {
    icon: Headset,
    seat: "Inside sales",
    today: "Re-keying quotes and matching POs by hand.",
    after: "Quotes, POs and price books in one place.",
  },
  {
    icon: Route,
    seat: "Outside reps",
    today: "Follow-up that depends on memory.",
    after: "Follow-up that goes out on schedule.",
  },
  {
    icon: ClipboardList,
    seat: "Operations",
    today: "Rebuilding the same report every month.",
    after: "Reports that build themselves, from data you can trust.",
  },
];

export default function WhoFor() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const show = reduced || inView;

  return (
    <section id="who" className="grain sec pt-0">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <Reveal>
            <SectionLabel no="08" fig="FIG. 04">
              Who it’s for
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 4.7vw, 56px)" }}
            >
              One team.
              <br />
              <span className="text-cobalt-deep">Every seat gets something back.</span>
            </h2>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="grid gap-px overflow-clip rounded-[28px] border border-line bg-line shadow-[0_1px_2px_rgba(34,38,43,0.04),0_24px_48px_rgba(34,38,43,0.08)] sm:grid-cols-2"
        >
          {SEATS.map((s, i) => (
            <motion.article
              key={s.seat}
              className="group relative flex flex-col bg-safety transition-colors duration-300 hover:bg-white"
              initial={reduced ? false : { opacity: 0, y: 32 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 1, ease: EXPO, delay: 0.1 + i * 0.1 }}
            >
              {/* A cobalt edge that draws across the top on hover. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-cobalt transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <div className="flex items-center gap-3.5 px-7 pt-8">
                <motion.span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ececff] text-cobalt-ink transition-[background-color,color,box-shadow] duration-300 group-hover:bg-cobalt group-hover:text-white group-hover:shadow-[0_0_0_6px_rgba(90,90,255,0.14),0_10px_24px_rgba(90,90,255,0.35)]"
                  initial={reduced ? false : { scale: 0.4, opacity: 0 }}
                  animate={show ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
                  transition={{ ...POP, delay: 0.4 + i * 0.1 }}
                >
                  <s.icon aria-hidden className="h-5 w-5" strokeWidth={1.9} />
                </motion.span>
                <h3 className="font-display text-[26px] font-bold tracking-[-0.02em]">{s.seat}</h3>
              </div>

              <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
                <div className="label text-[11px] text-mute">Today</div>
                <p className="mt-2 text-[16px] leading-snug text-mute">{s.today}</p>
                <ArrowDown
                  aria-hidden
                  className="my-5 h-4 w-4 text-cobalt transition-transform duration-300 group-hover:translate-y-1"
                  strokeWidth={2.5}
                />
                <div className="label text-[11px] text-cobalt-deep">With a builder</div>
                <p className="mt-2 font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-ink">
                  {s.after}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid gap-x-16 gap-y-8 border-t border-[#d9d5ca] pt-10 min-[900px]:grid-cols-[5fr_6fr]">
          <Reveal>
            <p className="text-pretty text-[19px] leading-relaxed text-body">
              Built for rep agencies that are growing: adding lines, adding
              territory, and ready to hand the technology to{" "}
              <b className="font-semibold text-ink">someone whose job it is.</b>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              <div className="label text-mute">Trades we build for</div>
              <ul className="flex flex-wrap gap-2.5">
                {INDUSTRIES.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={`/industries#${ind.slug}`}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-safety py-2.5 pl-3 pr-4 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgba(34,38,43,0.04)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-cobalt hover:shadow-[0_8px_20px_rgba(90,90,255,0.16)] active:scale-[0.97]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ececff] text-cobalt-ink transition-colors duration-200 group-hover:bg-cobalt group-hover:text-white">
                        <ind.icon aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      {ind.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="group inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.14em] text-cobalt-ink"
              >
                See everything we build
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
