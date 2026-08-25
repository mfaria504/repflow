import Reveal from "@/components/Reveal";

const BLOCKS = [
  {
    heading: "Before",
    body: "Commissions reconciled by hand from principal statements. Deals tracked in inboxes and memory. A generic CRM, tried once, abandoned.",
  },
  {
    heading: "Built",
    body: "The RepFlow platform, live. Quoting, price books, and pipeline in one place. Commission reconciliation run monthly as a system. A distributor newsletter, sent on schedule.",
  },
  {
    heading: "Result",
    body: "The back office runs without the founder in it. Errors get caught before checks clear. Follow-up happens on schedule, not on memory.",
  },
];

export default function FieldReport() {
  return (
    <section
      id="field-report"
      className="grain relative scroll-mt-20 bg-ink text-safety"
    >
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-6">
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              Field Report
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-safety/40 tabular">
              Report No. 001 · Job Complete
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-12 grid gap-2 font-mono text-sm sm:grid-cols-2">
            <p className="text-safety/65">
              <span className="text-safety/40">SITE:</span> A regional HVAC
              and mechanical rep agency
            </p>
            <p className="text-safety/65">
              <span className="text-safety/40">SCOPE:</span> Full RepFlow
              retainer, all four lines
            </p>
          </div>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-3">
          {BLOCKS.map((block, i) => (
            <Reveal key={block.heading} delay={0.15 + i * 0.1} className="h-full">
              <div className="h-full bg-ink p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-brass">
                  {String(i + 1).padStart(2, "0")} · {block.heading}
                </span>
                <p className="mt-4 text-base leading-relaxed text-safety/80">
                  {block.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 max-w-2xl text-sm text-safety/50">
            HVAC is where this model was proven. The same structure runs in
            electrical, plumbing, and adjacent trades, and so does RepFlow.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
