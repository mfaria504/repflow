import Reveal from "@/components/Reveal";

const STEPS = [
  {
    no: "01",
    name: "Diagnose",
    desc: "Two weeks inside your operation. What's breaking, and what it costs you.",
  },
  {
    no: "02",
    name: "Build",
    desc: "The first tools and the stack, configured to your lines and your territory.",
  },
  {
    no: "03",
    name: "Operate",
    desc: "The monthly work: maintenance, optimization, data upkeep, and whatever your reps ask for.",
  },
  {
    no: "04",
    name: "Report",
    desc: "A plain monthly report. What ran, what was caught, what's next.",
  },
];

export default function HowItRuns() {
  return (
    <section className="border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <h2 className="mb-14 font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            How it runs
          </h2>
        </Reveal>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.09}>
              <li className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-mono text-sm text-brass tabular">
                    {step.no}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-steel/40"
                  />
                </div>
                <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">
                  {step.name}
                </h3>
                <p className="mt-3 text-base text-ink/65">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
