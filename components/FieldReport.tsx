import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

const BLOCKS = [
  {
    heading: "Before",
    body: "Commissions reconciled by hand from principal statements. Deals tracked in inboxes and memory. A generic CRM, tried once, abandoned.",
  },
  {
    heading: "Built",
    body: "Quoting, price books, and pipeline in one place. Commission reconciliation built once, then run monthly. A distributor newsletter, sent on schedule.",
  },
  {
    heading: "Result",
    body: "The back office runs without the founder in it. Errors get caught before checks clear. Follow-up happens on schedule, not on memory.",
  },
];

export default function FieldReport() {
  return (
    <section id="field-report" className="grain sec">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <Reveal>
            <SectionLabel no="05" fig="REPORT NO. 001">
              Field report
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 4.7vw, 56px)" }}
            >
              Proven inside
              <br />
              <span className="text-cobalt-deep">a working rep agency.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-2 font-mono text-[13px] tracking-[0.04em] text-body">
              <div className="flex gap-2">
                <dt className="text-mute">SITE</dt>
                <dd>A regional HVAC and mechanical rep agency</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-mute">SCOPE</dt>
                <dd>Build, train and manage</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: 1400 }}>
          {BLOCKS.map((b, i) => {
            const last = i === BLOCKS.length - 1;
            return (
              <Reveal key={b.heading} from="rise" delay={i * 0.12} className="h-full">
                <div
                  className={`lift flex h-full flex-col gap-5 rounded-[28px] p-8 sm:p-9 ${
                    last
                      ? "blueprint overflow-clip shadow-[0_32px_64px_rgba(11,15,18,0.28),0_2px_8px_rgba(11,15,18,0.2)]"
                      : "border border-line bg-safety shadow-[0_1px_2px_rgba(34,38,43,0.04),0_24px_48px_rgba(34,38,43,0.08)]"
                  }`}
                >
                  <div className={`label relative flex items-center gap-3 text-[12px] ${last ? "text-lilac" : "text-cobalt-deep"}`}>
                    <span className="tabular">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden className={`h-px w-6 ${last ? "bg-white/25" : "bg-[#cfcbc0]"}`} />
                    {b.heading}
                  </div>
                  <p className={`relative text-[17px] leading-relaxed ${last ? "text-safety" : "text-body"}`}>
                    {b.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="max-w-2xl text-[15px] text-mute">
            HVAC is where this was proven. The same structure runs in
            electrical, plumbing, and adjacent trades, and so do we.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
