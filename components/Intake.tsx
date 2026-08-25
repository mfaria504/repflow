"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { SPRING } from "@/lib/motion";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-sm border border-ink/20 bg-safety px-4 py-3 text-base text-ink placeholder:text-steel focus:border-brass transition-colors duration-150";

export default function Intake() {
  const [status, setStatus] = useState<Status>("idle");
  const reduced = useReducedMotion();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

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
    <section id="assessment" className="scroll-mt-20 border-t border-ink/10 bg-safety">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
              Tell us where it&apos;s breaking.
            </h2>
            <p className="mt-4 text-base text-ink/65">
              A short intake, not a demo booking. We&apos;ll tell you honestly
              whether this is a fit.
            </p>
          </Reveal>

          <div className="relative mt-10 min-h-[22rem]">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: 6 }}
                  transition={SPRING}
                  className="rounded-sm border border-ink/20 bg-paper p-8"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-brass">
                    Received
                  </span>
                  <p className="mt-3 text-lg font-medium text-ink">
                    Got it. Expect a direct reply, not a sequence.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={reduced ? undefined : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.14 }}
                  className="grid gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-steel">
                        Name
                      </span>
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-steel">
                        Agency
                      </span>
                      <input
                        name="agency"
                        required
                        autoComplete="organization"
                        className={inputClass}
                        placeholder="Agency name"
                      />
                    </label>
                  </div>
                  <label className="grid gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-steel">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@agency.com"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-steel">
                      Where is it breaking?
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className={inputClass}
                      placeholder="Commissions, pipeline, follow-up, all of it. Plain language is fine."
                    />
                  </label>
                  <div className="mt-2 flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="rounded-sm bg-brass px-6 py-3.5 font-display text-base font-bold text-white transition-[transform,box-shadow,opacity] duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(199,123,39,0.4)] active:translate-y-0 active:scale-[0.97] disabled:opacity-50"
                    >
                      {status === "sending"
                        ? "Sending..."
                        : "Request a RevOps Assessment"}
                    </button>
                  </div>
                  {status === "error" && (
                    <motion.p
                      initial={reduced ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={SPRING}
                      className="text-sm text-blueprint"
                    >
                      Something went wrong on our end. Try again, or email us
                      directly.
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
