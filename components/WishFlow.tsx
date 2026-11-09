"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { EXPO, POP } from "@/lib/motion";

type PillTone = "cobalt" | "brass" | "neutral";

type Tool = {
  wish: string;
  who: string;
  title: string;
  rows: { name: string; meta: string; pill: string; tone: PillTone }[];
  foot: string;
  toast: { title: string; sub: string };
};

// Three wishes and the tool each one turns into. The windows are
// illustrations of the kind of thing we build, not screenshots.
const TOOLS: Tool[] = [
  {
    wish: "I wish our quotes and POs lived in one place.",
    who: "Inside sales",
    title: "QUOTES + POs",
    rows: [
      { name: "Medical center remodel", meta: "Quote 1042 · Spec matched", pill: "PO matched", tone: "cobalt" },
      { name: "High school renovation", meta: "Quote 1043 · 3 bidders", pill: "Awaiting PO", tone: "brass" },
      { name: "Hotel expansion", meta: "Quote 1038 · Shipped", pill: "Commission paid", tone: "neutral" },
    ],
    foot: "Synced with quoting, email, CRM",
    toast: { title: "PO 4471 matched", sub: "to Quote 1042" },
  },
  {
    wish: "I wish our CRM talked to our quoting tool.",
    who: "Sales manager",
    title: "CRM + QUOTING",
    rows: [
      { name: "Quote 1044 sent", meta: "Deal moved to Quoted", pill: "CRM updated", tone: "cobalt" },
      { name: "New contact on a quote", meta: "Added to the account", pill: "No re-keying", tone: "neutral" },
      { name: "Quote 1039 won", meta: "Stage set to Closed won", pill: "Synced", tone: "cobalt" },
    ],
    foot: "Synced with CRM, quoting",
    toast: { title: "Deal updated", sub: "from Quote 1044" },
  },
  {
    wish: "I wish I didn’t rebuild this report every month.",
    who: "Operations",
    title: "MONTHLY REPORT",
    rows: [
      { name: "Bookings by line", meta: "Month to date · every line", pill: "Updated", tone: "cobalt" },
      { name: "Open quotes", meta: "Aging past 30 days", pill: "3 flagged", tone: "brass" },
      { name: "Commissions due", meta: "Checked against statements", pill: "Reconciled", tone: "neutral" },
    ],
    foot: "Built from quoting, accounting",
    toast: { title: "Report sent", sub: "1st of the month" },
  },
];

const PILL: Record<PillTone, string> = {
  cobalt: "bg-[#ececff] text-cobalt-ink",
  brass: "bg-[#f6eadb] text-[#8f5313]",
  neutral: "bg-[#e9e7e1] text-ink",
};

const BUBBLE_BASE =
  "flex w-full items-center rounded-[22px_22px_22px_4px] px-[22px] py-3.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-300";
const BUBBLE_IDLE =
  "border border-line bg-safety shadow-[0_1px_2px_rgba(34,38,43,0.04),0_8px_24px_rgba(34,38,43,0.05)] hover:-translate-y-0.5 hover:border-[#b9b5ff]";
const BUBBLE_ON =
  "border-[1.5px] border-cobalt bg-white shadow-[0_8px_24px_rgba(90,90,255,0.16),0_1px_2px_rgba(90,90,255,0.1)]";

function BubbleText({ wish, who, on }: { wish: string; who: string; on: boolean }) {
  return (
    <span className={`text-pretty text-base italic leading-[23px] ${on ? "text-ink" : "text-[#3d4248]"}`}>
      “{wish}”
      <br />
      <span className={`font-mono text-[11px] not-italic leading-5 tracking-[0.12em] ${on ? "text-cobalt-ink" : "text-mute"}`}>
        — {who.toUpperCase()}
      </span>
    </span>
  );
}

function OpenWish() {
  return (
    <Link
      href="/#assessment"
      className={`${BUBBLE_BASE} border-[1.5px] border-dashed border-cobalt bg-white/60 hover:-translate-y-0.5 hover:bg-white`}
    >
      <span className="text-pretty text-base italic leading-[23px] text-ink">
        “I wish we had a tool for that.
        <span aria-hidden className="caret not-italic text-cobalt">|</span>”
        <br />
        <span className="font-mono text-[11px] not-italic leading-5 tracking-[0.12em] text-cobalt-ink">
          — YOU, PROBABLY →
        </span>
      </span>
    </Link>
  );
}

function Orb() {
  return (
    <div className="relative h-[200px] w-[200px]">
      <span aria-hidden className="absolute -inset-7 rounded-full border border-cobalt/20" />
      <span aria-hidden className="ripple absolute inset-0 rounded-full border-[1.5px] border-cobalt/60" />
      <span aria-hidden className="ripple ripple-2 absolute inset-0 rounded-full border-[1.5px] border-cobalt/60" />
      <span aria-hidden className="ripple ripple-3 absolute inset-0 rounded-full border-[1.5px] border-cobalt/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 rounded-full bg-cobalt p-6 text-center text-white shadow-[0_24px_56px_rgba(90,90,255,0.38),0_4px_12px_rgba(90,90,255,0.28),inset_0_1px_0_rgba(255,255,255,0.22)]">
        <svg width="56" height="56" viewBox="0 0 118.18 118.18" aria-hidden className="-mt-0.5 shrink-0">
          <circle cx="59.09" cy="59.09" r="59.09" fill="#22262b" />
          <circle cx="59.09" cy="59.09" r="39.18" fill="#fff" />
          <circle cx="66.06" cy="52.86" r="23.93" fill="#5a5aff" />
          <circle cx="74.01" cy="43.74" r="13.21" fill="#fff" />
        </svg>
        <b className="font-display text-[28px] font-bold leading-8 tracking-[-0.02em]">
          We build it
        </b>
      </div>
    </div>
  );
}

function ToolWindow({ tool }: { tool: Tool }) {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-[312px] w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_32px_64px_rgba(34,38,43,0.14),0_2px_8px_rgba(34,38,43,0.06)]">
      <div className="flex items-center gap-3.5 border-b border-[#eeece6] px-5 py-4">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={tool.title}
            className="font-mono text-xs tracking-[0.08em] text-mute"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            {tool.title}
          </motion.span>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tool.title}
          className="flex flex-1 flex-col"
          exit={reduced ? undefined : { opacity: 0, y: 6 }}
          transition={{ duration: 0.14 }}
        >
          {tool.rows.map((row, i) => (
            <motion.div
              key={row.name}
              className="flex items-center justify-between gap-3 border-b border-[#f1efea] px-5 py-4"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EXPO, delay: 0.04 + i * 0.07 }}
            >
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="truncate text-[15px] font-semibold leading-tight text-ink">
                  {row.name}
                </div>
                <div className="tabular truncate text-[13px] leading-snug text-mute">
                  {row.meta}
                </div>
              </div>
              <motion.div
                className={`whitespace-nowrap rounded-full px-2.5 pb-[5px] pt-1 text-xs font-semibold ${PILL[row.tone]}`}
                initial={reduced ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...POP, delay: 0.22 + i * 0.07 }}
              >
                {row.pill}
              </motion.div>
            </motion.div>
          ))}
          <div className="mt-auto flex items-center justify-between gap-2 bg-[#f7f6f2] px-5 py-4">
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-cobalt shadow-[0_0_0_3px_rgba(90,90,255,0.18)]" />
              <span className="font-mono text-xs text-body">{tool.foot}</span>
            </div>
            <span className="font-mono text-[11px] text-mute">just now</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Toast({ tool }: { tool: Tool }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={tool.toast.title}
        className="flex h-14 w-[184px] items-center gap-2.5 rounded-[14px] bg-midnight px-4 text-safety shadow-[0_16px_32px_rgba(11,15,18,0.28),0_2px_6px_rgba(11,15,18,0.2)]"
        style={{ rotate: -2 }}
        initial={reduced ? false : { opacity: 0, scale: 0.5, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: 6 }}
        transition={{ ...POP, delay: 0.35 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="shrink-0">
          <circle cx="10" cy="10" r="10" fill="#5a5aff" />
          <path d="M6 10.5 L9 13.5 L14 7.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px] leading-[18px]">
          <b className="font-semibold">{tool.toast.title}</b>
          <br />
          <span className="font-mono text-[11px] text-fog">{tool.toast.sub}</span>
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

// Left offsets and widths of the four bubbles in the desktop figure.
const SLOTS = [
  { left: 0, top: 40, width: 336 },
  { left: 24, top: 148, width: 312 },
  { left: 8, top: 256, width: 328 },
  { left: 48, top: 364, width: 288 },
];

export default function WishFlow() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const visible = useInView(ref, { margin: "-10% 0px" });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // Cycle through the wishes on its own until someone picks one.
  useEffect(() => {
    if (touched || reduced || !visible) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % TOOLS.length), 4200);
    return () => window.clearInterval(id);
  }, [touched, reduced, visible]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };
  const tool = TOOLS[active];
  const show = reduced || inView;

  const step = (delay: number, from: Record<string, number | string>) =>
    reduced
      ? {}
      : {
          initial: from,
          animate: show ? { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 } : from,
          transition: { duration: 1, ease: EXPO, delay },
        };

  return (
    <section id="how" className="grain sec">
      <div className="wrap flex flex-col gap-[72px]">
        <div className="flex flex-col gap-5">
          <Reveal>
            <SectionLabel no="01" fig="FIG. 01">
              How it works
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 4.7vw, 56px)" }}
            >
              Say what you wish you had.
              <br />
              <span className="text-cobalt-deep">We build it.</span>
            </h2>
          </Reveal>
        </div>

        <div ref={ref}>
          {/* Desktop figure: wishes in, tool out. */}
          <div
            className="relative hidden h-[488px] w-[1040px] min-[1160px]:block"
            style={{ perspective: 1400 }}
          >
            <motion.div className="label absolute left-0 top-0 text-mute" {...step(0, { opacity: 0 })}>
              You say
            </motion.div>
            <motion.div className="label absolute left-[416px] top-0 text-mute" {...step(0.1, { opacity: 0 })}>
              We build
            </motion.div>
            <motion.div className="label absolute left-[680px] top-0 text-mute" {...step(0.2, { opacity: 0 })}>
              Your team gets
            </motion.div>

            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0"
              width="1040"
              height="488"
              viewBox="0 0 1040 488"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {SLOTS.map((s, i) => (
                <motion.path
                  key={s.top}
                  d={`M336 ${s.top + 46} H376 V248`}
                  strokeWidth={2}
                  animate={{
                    stroke: i === active ? "#5a5aff" : "#a7aaae",
                    pathLength: show ? 1 : 0,
                    opacity: show ? 1 : 0,
                  }}
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: EXPO, delay: show && !touched ? 0.5 : 0 }}
                />
              ))}
              <motion.path
                d="M376 248 H410 M404 243 L411 248 L404 253"
                stroke="#5a5aff"
                strokeWidth={2}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: show ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              />
              <motion.path
                d="M620 248 H672 M665 242 L673 248 L665 254"
                stroke="#5a5aff"
                strokeWidth={2.5}
                initial={reduced ? false : { opacity: 0, pathLength: 0 }}
                animate={{ opacity: show ? 1 : 0, pathLength: show ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EXPO, delay: 1.25 }}
              />
            </svg>

            {TOOLS.map((t, i) => (
              <motion.div
                key={t.wish}
                className="absolute h-[92px]"
                style={{ left: SLOTS[i].left, top: SLOTS[i].top, width: SLOTS[i].width }}
                {...step(0.12 + i * 0.1, { opacity: 0, x: -56 })}
              >
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={i === active}
                  className={`${BUBBLE_BASE} h-full cursor-pointer ${i === active ? BUBBLE_ON : BUBBLE_IDLE}`}
                >
                  <BubbleText wish={t.wish} who={t.who} on={i === active} />
                </button>
              </motion.div>
            ))}
            <motion.div
              className="absolute h-[92px] [&>a]:h-full"
              style={{ left: SLOTS[3].left, top: SLOTS[3].top, width: SLOTS[3].width }}
              {...step(0.42, { opacity: 0, x: -56 })}
            >
              <OpenWish />
            </motion.div>

            <motion.div
              className="absolute left-[416px] top-[148px]"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.5 },
                    animate: show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 },
                    transition: { ...POP, delay: 0.95 },
                  })}
            >
              <Orb />
            </motion.div>

            <motion.div
              className="absolute left-[680px] top-[92px] w-[360px]"
              style={{ transformOrigin: "50% 100%" }}
              {...step(1.3, { opacity: 0, y: 56, rotateX: 14 })}
            >
              <ToolWindow tool={tool} />
            </motion.div>

            <motion.div
              className="absolute left-[856px] top-[44px]"
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: show ? 1 : 0 },
                    transition: { duration: 0.3, delay: 1.7 },
                  })}
            >
              <Toast tool={tool} />
            </motion.div>

            <motion.p
              className="absolute left-[680px] top-[436px] w-[360px] text-balance text-base leading-6 text-body"
              {...step(1.6, { opacity: 0, y: 16 })}
            >
              <b className="font-display font-bold text-ink">Tools that just work,</b>{" "}
              inside the systems you already run.
            </motion.p>
          </div>

          {/* Stacked version of the same figure. */}
          <div className="mx-auto flex w-full max-w-[440px] flex-col gap-4 min-[1160px]:hidden">
            <div className="label text-mute">You say</div>
            {TOOLS.map((t, i) => (
              <Reveal key={t.wish} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={i === active}
                  className={`${BUBBLE_BASE} ${i === active ? BUBBLE_ON : BUBBLE_IDLE}`}
                >
                  <BubbleText wish={t.wish} who={t.who} on={i === active} />
                </button>
              </Reveal>
            ))}
            <Reveal delay={0.18}>
              <OpenWish />
            </Reveal>
            <svg width="8" height="56" viewBox="0 0 8 56" aria-hidden className="self-center overflow-visible fill-none stroke-[#a7aaae] stroke-2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 0 L4 50" />
              <path d="M0 46 L4 52 L8 46" />
            </svg>
            <Reveal className="my-6 self-center">
              <Orb />
            </Reveal>
            <svg width="8" height="56" viewBox="0 0 8 56" aria-hidden className="self-center overflow-visible fill-none stroke-cobalt stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 0 L4 50" />
              <path d="M0 46 L4 52 L8 46" />
            </svg>
            <div className="label text-mute">Your team gets</div>
            <Reveal from="rise">
              <ToolWindow tool={tool} />
            </Reveal>
            <Reveal>
              <p className="text-balance text-base leading-6 text-body">
                <b className="font-display font-bold text-ink">Tools that just work,</b>{" "}
                inside the systems you already run.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
