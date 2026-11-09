import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

const ROWS = [
  {
    software: "You change how you work to fit the tool.",
    builder: "The tool is shaped around how your team works.",
  },
  {
    software: "Another login. Another subscription.",
    builder: "Built into the systems you already run.",
  },
  {
    software: "New features arrive when the vendor decides.",
    builder: "Your idea, scoped and priced before we start.",
  },
  {
    software: "You’re handed a login and a help article.",
    builder: "We walk every person through it and stay on call.",
  },
  {
    software: "Priced per seat, per year.",
    builder: "Priced per build.",
  },
];

// What teams have asked for. The pattern, not the menu.
const REQUESTS = [
  "Quotes and POs tracked in one place",
  "Quoting for a multi-line agency, an afternoon’s work down to minutes",
  "A verified contact list for a new territory",
  "A principal’s commission statement turned into a dashboard",
  "Open quotes on automatic follow-up so they stop going quiet",
  "Commission reconciliation, built once and run monthly",
  "A distributor newsletter, sent on schedule",
];

export default function Builders() {
  return (
    <section id="builders" className="blueprint overflow-clip py-[clamp(96px,13vw,160px)]">
      <div className="wrap relative flex flex-col gap-14">
        <div className="flex flex-col gap-5">
          <Reveal>
            <SectionLabel no="04" tone="dark">
              Builders, not software
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="max-w-[900px] font-display font-bold tracking-[-0.035em]"
              style={{ fontSize: "clamp(40px, 5.6vw, 72px)" }}
            >
              <span className="text-steel">We don’t sell software.</span>
              <br />
              We build what software <span className="text-cobalt">can’t.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-[600px] text-[clamp(17px,1.7vw,20px)] leading-relaxed text-fog">
              Software comes off a shelf and asks your team to adapt. A builder
              starts with how you already work and makes the tool fit.
            </p>
          </Reveal>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10">
          <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03]">
            <div className="label px-5 py-4 text-steel sm:px-8">Off-the-shelf software</div>
            <div className="label flex items-center gap-2.5 border-l border-white/10 bg-cobalt/[0.12] px-5 py-4 text-lilac sm:px-8">
              <span aria-hidden className="h-2 w-2 rounded-full bg-cobalt shadow-[0_0_0_4px_rgba(90,90,255,0.25)]" />
              A builder
            </div>
          </div>
          {ROWS.map((r, i) => (
            <Reveal key={r.builder} delay={i * 0.05}>
              <div className={`grid grid-cols-2 ${i > 0 ? "border-t border-white/10" : ""}`}>
                <div className="px-5 py-5 text-[15px] leading-snug text-steel sm:px-8 sm:py-6 sm:text-[17px]">
                  {r.software}
                </div>
                <div className="border-l border-white/10 bg-cobalt/[0.07] px-5 py-5 font-display text-[16px] font-semibold leading-snug tracking-[-0.01em] text-safety sm:px-8 sm:py-6 sm:text-[20px]">
                  {r.builder}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative mt-16 flex flex-col gap-6">
        <div className="wrap">
          <Reveal>
            <div className="label text-steel">
              What teams ask us for <span className="text-lilac">·</span> the pattern, not the menu
            </div>
          </Reveal>
        </div>
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee-slow gap-4 pr-4">
            {[0, 1].map((dup) =>
              REQUESTS.map((r, i) => (
                <div
                  key={`${dup}-${r}`}
                  aria-hidden={dup === 1}
                  className="flex w-[320px] shrink-0 flex-col gap-4 rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.14em] text-lilac tabular">
                      REQ {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowRight aria-hidden className="h-4 w-4 text-white/30" />
                  </div>
                  <p className="font-display text-[19px] font-semibold leading-snug tracking-[-0.01em] text-safety">
                    {r}
                  </p>
                </div>
              )),
            )}
          </div>
        </div>
        <div className="wrap">
          <p className="text-[15px] text-steel">
            If it’s slowing your team down, it qualifies.
          </p>
        </div>
      </div>
    </section>
  );
}
