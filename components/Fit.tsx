import Reveal from "@/components/Reveal";

export default function Fit() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-blueprint">
                Who this is for
              </span>
              <p className="mt-4 text-xl font-medium leading-snug text-ink sm:text-2xl">
                Built for agencies actively growing: adding lines, adding
                territory, building toward something bigger than one
                founder&apos;s contact list.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="border-l-2 border-steel/40 pl-8">
              <span className="font-mono text-xs uppercase tracking-widest text-steel">
                Who it isn&apos;t
              </span>
              <p className="mt-4 text-xl font-medium leading-snug text-ink/65 sm:text-2xl">
                If that&apos;s not where you are yet, this probably isn&apos;t
                the right fit. That&apos;s fine.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
