"use client";

import { motion, useReducedMotion } from "framer-motion";

type Tone = "paper" | "dark" | "cobalt";

const TONES: Record<Tone, { text: string; no: string; rule: string }> = {
  paper: { text: "text-mute", no: "text-cobalt-deep", rule: "bg-[#cfcbc0]" },
  dark: { text: "text-steel", no: "text-lilac", rule: "bg-white/15" },
  cobalt: { text: "text-white", no: "text-white", rule: "bg-white/40" },
};

// "01  HOW IT WORKS ———————— FIG. 02": the numbered eyebrow with a rule that
// draws itself in from the left.
export default function SectionLabel({
  no,
  children,
  fig,
  tone = "paper",
}: {
  no?: string;
  children: React.ReactNode;
  fig?: string;
  tone?: Tone;
}) {
  const reduced = useReducedMotion();
  const t = TONES[tone];
  return (
    <div className={`label flex items-center gap-4 ${t.text}`}>
      {no && <span className={`tabular ${t.no}`}>{no}</span>}
      <span className="shrink-0">{children}</span>
      <motion.span
        aria-hidden
        className={`h-px flex-1 origin-left ${t.rule}`}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
      {fig && <span className="hidden shrink-0 sm:inline">{fig}</span>}
    </div>
  );
}
