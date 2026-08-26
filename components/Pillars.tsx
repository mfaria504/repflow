"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Hammer, LifeBuoy, RefreshCw } from "lucide-react";
import { SPRING } from "@/lib/motion";

const RECENT_REQUESTS = [
  {
    tag: "REQ-041",
    text: "Streamline quoting for a multi-line agency, an afternoon's work down to minutes",
  },
  {
    tag: "REQ-042",
    text: "Build a verified contact list for a new territory",
  },
  {
    tag: "REQ-043",
    text: "Turn a principal's commission statement into a dashboard",
  },
  {
    tag: "REQ-044",
    text: "Put open quotes on automatic follow-up so they stop going quiet",
  },
];

const ITEMS = [
  {
    name: "Build",
    icon: Hammer,
    desc: "The tools and automations your team actually needs. Built around how your agency sells, then maintained so they keep working.",
    bullets: [
      "Quoting and commission tools built to your lines",
      "Automations that remove the recurring manual work",
      "AI built in from the start, not bolted on",
    ],
  },
  {
    name: "Run",
    icon: RefreshCw,
    desc: "The stack behind your sales, managed month after month. The website, the marketing infrastructure, the data, the tracking.",
    bullets: [
      "Website managed and kept current",
      "Digital marketing infrastructure and tracking that holds up",
      "Contact and account data kept clean, not stale",
      "Maintenance and optimization as standing work",
    ],
  },
  {
    name: "Solve",
    icon: LifeBuoy,
    desc: "When a rep needs something, they lean on us. A contact list for new territory. A quoting process that's too slow. Whatever surfaces, we handle it so your reps keep selling.",
    bullets: [],
  },
];

export default function Pillars() {
  const reduced = useReducedMotion();

  return (
    <section id="approach" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
              Everything we do is one of three jobs.
            </h2>
            <p className="mt-3 max-w-[60ch] text-base text-ink/65">
              Build the tools. Run the stack. Solve what comes up. One
              partner covers a lot of ground because every project fits one
              of these three.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-ink/20 bg-safety">
          <div className="flex items-baseline justify-between border-b border-ink/20 bg-paper px-6 py-3 sm:px-8">
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-steel">
              Work Order · RepFlow
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-widest text-steel sm:block tabular">
              Rev. 2026-B
            </span>
          </div>

          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              className="group cursor-default border-b border-ink/10 px-6 py-6 transition-shadow duration-200 last:border-b-0 hover:bg-safety hover:shadow-[0_6px_20px_rgba(199,123,39,0.16)] sm:px-8"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              whileHover={reduced ? {} : { y: -2 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...SPRING, delay: i * 0.09 }}
            >
              <div className="grid gap-4 sm:grid-cols-[minmax(0,16rem)_1fr]">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-ink/15 bg-paper text-brass"
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">
                    {item.name}
                  </h3>
                </div>
                <p className="text-base text-ink/65">{item.desc}</p>
              </div>
              {item.bullets.length > 0 && (
                <ul className="mt-4 grid gap-2 pl-[2.65rem]">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-ink/55"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {item.name === "Solve" && (
                <div className="mt-4 pl-[2.65rem]">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-steel">
                    Recent requests: the pattern, not the menu
                  </span>
                  <ul className="mt-3 grid gap-2">
                    {RECENT_REQUESTS.map((req) => (
                      <li
                        key={req.tag}
                        className="flex items-baseline gap-3 text-sm text-ink/55"
                      >
                        <span className="shrink-0 font-mono text-xs text-brass tabular">
                          {req.tag}
                        </span>
                        {req.text}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-ink/55">
                    If it&apos;s slowing your reps down, it qualifies.
                  </p>
                </div>
              )}
            </motion.div>
          ))}

          <div className="border-t border-ink/20 bg-paper px-6 py-3 sm:px-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-steel">
              Three jobs. One partner. Run for you.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
