import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function AiShift() {
  return (
    <section
      id="ai"
      className="grain relative overflow-hidden scroll-mt-20 bg-ink text-safety"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cobalt/15 blur-[100px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-brass">
            Where this is going
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-[24ch] font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            AI is going to run more of your business than you think.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-safety/70">
            Quoting, follow-up, reconciliation, reporting: within a few
            years, most of it runs itself. The agencies that set up early
            will carry more lines with fewer late nights. That transition is
            the job we&apos;re built for. We&apos;re already wiring it into
            everything above, one workflow at a time.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <a
            href="#assessment"
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-brass transition-[gap] duration-150 hover:gap-2.5"
          >
            Start with one workflow
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
