import { Check, X } from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

const OLD = [
  { name: "Hire a developer", desc: "A full salary for one person, if you can find one." },
  { name: "Buy more software", desc: "Another subscription fee or upsell." },
  { name: "Live with it", desc: "Spreadsheets, copy-paste, and workarounds." },
];

const NEW = [
  "A build team on call, without a full salary",
  "Tools shaped around how your team works",
  "Work that moves on its own",
];

export default function WhyNow() {
  return (
    <section id="why" className="grain overflow-x-clip bg-cobalt py-[clamp(80px,10.6vw,128px)] text-white">
      <div className="wrap flex flex-col gap-14">
        <Reveal>
          <SectionLabel no="02" tone="cobalt">
            Why now
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="max-w-[960px] font-display font-bold tracking-[-0.035em]"
            style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
          >
            An in-house builder used to cost too much.{" "}
            <span className="text-midnight">Not anymore.</span>
          </h2>
        </Reveal>

        <div className="relative grid gap-8 min-[900px]:grid-cols-2">
          <Reveal from="left" className="h-full">
            <div className="flex h-full flex-col gap-7 rounded-[28px] border border-white/25 bg-midnight/[0.14] p-8 sm:p-10">
              <div className="flex flex-col gap-3">
                <div className="label">The old way</div>
                <h3 className="font-display text-[32px] font-bold tracking-[-0.02em]">
                  Three options. None of them good.
                </h3>
              </div>
              <ul>
                {OLD.map((o, i) => (
                  <li
                    key={o.name}
                    className={`flex items-start gap-4 py-5 ${i > 0 ? "border-t border-white/20" : ""} ${i === OLD.length - 1 ? "pb-0" : ""}`}
                  >
                    <span aria-hidden className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/40">
                      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="font-display text-[26px] font-semibold leading-tight text-[#dcdcff] line-through decoration-white/40 decoration-[1.5px]">
                        {o.name}
                      </div>
                      <div className="text-[15px] leading-snug">{o.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.08} className="h-full">
            <div className="blueprint flex h-full flex-col gap-7 overflow-clip rounded-[28px] p-8 shadow-[0_32px_64px_rgba(11,15,18,0.35),0_2px_8px_rgba(11,15,18,0.2)] sm:p-10">
              <div className="relative flex flex-col gap-3">
                <div className="label text-lilac">The new way</div>
                <h3>
                  <Logo className="h-10 w-auto sm:h-11" />
                </h3>
              </div>
              <p className="relative text-[17px] leading-relaxed text-[#c9ccd1]">
                AI lets a small team build what used to take a department. You
                get an in‑house builder without the in‑house cost.
              </p>
              <ul className="relative">
                {NEW.map((n, i) => (
                  <li
                    key={n}
                    className={`flex items-center gap-4 py-[18px] ${i > 0 ? "border-t border-white/10" : ""} ${i === NEW.length - 1 ? "pb-0" : ""}`}
                  >
                    <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cobalt shadow-[0_0_0_5px_rgba(90,90,255,0.18)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[17px] font-medium">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 min-[900px]:block">
            <Reveal delay={0.4}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white font-mono text-[13px] font-medium tracking-[0.08em] text-cobalt-ink shadow-[0_0_0_8px_rgba(255,255,255,0.18),0_12px_28px_rgba(11,15,18,0.3)]">
                VS
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
