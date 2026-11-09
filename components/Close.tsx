"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Eye from "@/components/Eye";
import Reveal from "@/components/Reveal";
import { EXPO, SPRING } from "@/lib/motion";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-[14px] border border-white/15 bg-white/[0.05] px-4 py-3.5 text-base text-safety placeholder:text-white/35 transition-[border-color,background-color,box-shadow] duration-150 hover:border-white/25 focus:border-cobalt focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(90,90,255,0.22)] focus:outline-none";

const NEXT = [
  "You tell us the wish. One sentence is enough.",
  "We tell you what it takes and what it costs, before we start.",
  "We build it, teach it, and keep it running.",
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="label text-[12px] text-steel">{label}</span>
      {children}
    </label>
  );
}

export default function Close() {
  const [status, setStatus] = useState<Status>("idle");
  const reduced = useReducedMotion();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="assessment" className="blueprint overflow-clip pt-[clamp(96px,12vw,144px)]">
      <div aria-hidden className="pointer-events-none absolute -bottom-[220px] -left-[180px] w-[620px] opacity-[0.1] max-sm:w-[380px]">
        <Eye className="h-auto w-full" ringOpacity={0.82} reach={140} />
      </div>

      <div className="wrap relative flex flex-col gap-14">
        <Reveal>
          <div className="label flex items-center gap-4 text-steel">
            <span className="text-lilac">09</span>
            <span>The promise</span>
          </div>
        </Reveal>

        <motion.h2
          className="font-display font-bold leading-[0.98] tracking-[-0.045em]"
          style={{ fontSize: "clamp(46px, 8vw, 96px)" }}
          initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", y: 32 }}
          whileInView={{ clipPath: "inset(0 0 -10% 0)", y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.3, ease: EXPO }}
        >
          <span className="text-steel">We help you make</span>
          <br />
          your systems
          <br />
          work better.
        </motion.h2>

        <div className="grid gap-x-16 gap-y-12 pb-[clamp(72px,9vw,112px)] min-[900px]:grid-cols-[5fr_6fr]">
          <Reveal>
            <div className="flex flex-col gap-8">
              <p className="max-w-[420px] font-display text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.15] tracking-[-0.02em]">
                Tell us your first <span className="text-cobalt">“I wish.”</span>
              </p>
              <ol className="flex flex-col">
                {NEXT.map((n, i) => (
                  <li key={n} className={`flex items-start gap-4 py-4 ${i > 0 ? "border-t border-white/10" : ""}`}>
                    <span className="tabular mt-0.5 font-mono text-[13px] tracking-[0.1em] text-lilac">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] leading-snug text-[#c9ccd1]">{n}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal from="rise" delay={0.1}>
            <div className="relative min-h-[26rem] rounded-[28px] border border-white/[0.12] bg-white/[0.04] p-6 shadow-[0_32px_72px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md backdrop-saturate-150 sm:p-9">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    className="flex h-full min-h-[22rem] flex-col items-start justify-center gap-5"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: 6 }}
                    transition={SPRING}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cobalt shadow-[0_0_0_8px_rgba(90,90,255,0.18),0_12px_28px_rgba(90,90,255,0.35)]">
                      <Check aria-hidden className="h-6 w-6" strokeWidth={3} />
                    </span>
                    <div className="label text-lilac">Received</div>
                    <p className="font-display text-[28px] font-bold leading-tight tracking-[-0.02em]">
                      Got it. Expect a direct reply, not a sequence.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="grid gap-5"
                    exit={reduced ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.14 }}
                  >
                    <Field label="What do you wish you had?">
                      <textarea
                        name="message"
                        required
                        rows={3}
                        className={`${inputClass} resize-none`}
                        placeholder="I wish our quotes and POs lived in one place."
                      />
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name">
                        <input name="name" required autoComplete="name" className={inputClass} placeholder="Your name" />
                      </Field>
                      <Field label="Agency">
                        <input name="agency" required autoComplete="organization" className={inputClass} placeholder="Agency name" />
                      </Field>
                    </div>
                    <Field label="Email">
                      <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@agency.com" />
                    </Field>
                    <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <button type="submit" disabled={status === "sending"} className="cta cursor-pointer px-7 py-4 text-lg">
                        {status === "sending" ? "Sending…" : "Send your “I wish”"}
                        <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                      <span className="font-mono text-[13px] tracking-[0.04em] text-steel">
                        A direct reply, not a sales sequence.
                      </span>
                    </div>
                    {status === "error" && (
                      <motion.p
                        initial={reduced ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={SPRING}
                        className="text-sm text-[#ffb37a]"
                      >
                        Something went wrong on our end. Try again, or email{" "}
                        <a href="mailto:matt@repflow.com" className="underline">
                          matt@repflow.com
                        </a>
                        .
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
