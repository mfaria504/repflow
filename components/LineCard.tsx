"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/motion";

const ITEMS = [
  {
    no: "01",
    name: "Platform",
    desc: "Quoting, price books, deal pipeline, document hub. The system your team actually works in.",
  },
  {
    no: "02",
    name: "Pipeline & Commission Ops",
    desc: "Reconciliation, tracking, payout accuracy. Every dollar accounted for.",
  },
  {
    no: "03",
    name: "Prospect & Distributor Data",
    desc: "The contacts and accounts you need to grow into new territory or new lines.",
  },
  {
    no: "04",
    name: "Revenue Communications",
    desc: "The newsletter and outbound cadence that keeps principals and distributors engaged. Run as a system, not a side project.",
  },
];

export default function LineCard() {
  const reduced = useReducedMotion();

  return (
    <section id="approach" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            Here&apos;s what&apos;s on your line card with RepFlow.
          </h2>
        </div>

        <div className="overflow-hidden rounded-sm border border-ink/20 bg-safety">
          <div className="flex items-baseline justify-between border-b border-ink/20 bg-paper px-6 py-3 sm:px-8">
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-steel">
              Line Card · RepFlow Retainer
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-widest text-steel sm:block tabular">
              Rev. 2026-A
            </span>
          </div>

          {ITEMS.map((item, i) => (
            <motion.div
              key={item.no}
              className="group grid cursor-default grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-ink/10 px-6 py-6 transition-shadow duration-200 last:border-b-0 hover:bg-safety hover:shadow-[0_6px_20px_rgba(199,123,39,0.16)] sm:grid-cols-[4rem_minmax(0,18rem)_1fr] sm:px-8"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              whileHover={reduced ? {} : { y: -2 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...SPRING, delay: i * 0.09 }}
            >
              <span className="font-mono text-sm text-brass tabular">
                {item.no}
              </span>
              <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">
                {item.name}
              </h3>
              <p className="col-start-2 text-base text-ink/65 sm:col-start-3">
                {item.desc}
              </p>
            </motion.div>
          ))}

          <div className="border-t border-ink/20 bg-paper px-6 py-3 sm:px-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-steel">
              All four lines. One retainer. Run for you.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
