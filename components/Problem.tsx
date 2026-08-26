import Reveal from "@/components/Reveal";

const LINES = [
  "Most agencies still run on spreadsheets and memory.",
  "The fix is technology, and nobody in the building has time to build it, run it, and keep it working.",
  "Your reps should be selling. That's the whole point.",
];

export default function Problem() {
  return (
    <section className="border-y border-ink/10 bg-safety">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          {LINES.map((line, i) => (
            <Reveal key={line} delay={i * 0.08}>
              <p
                className={`border-l-2 py-3 pl-6 text-xl font-medium leading-snug text-ink sm:text-2xl ${
                  i === LINES.length - 1 ? "border-brass" : "border-steel/40"
                }`}
              >
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
