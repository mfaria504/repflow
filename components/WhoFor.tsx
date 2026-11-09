import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { INDUSTRIES } from "@/lib/industries";

export default function WhoFor() {
  return (
    <section id="who" className="grain sec pt-0">
      <div className="wrap flex flex-col gap-12">
        <Reveal>
          <SectionLabel no="08">Who it’s for</SectionLabel>
        </Reveal>
        <div className="grid gap-x-16 gap-y-10 min-[900px]:grid-cols-[6fr_5fr]">
          <Reveal>
            <h2
              className="text-balance font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
            >
              Built for rep agencies that are growing: adding lines, adding
              territory, and ready to hand the technology to{" "}
              <span className="text-cobalt-deep">someone whose job it is.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              <div className="label text-mute">Trades we build for</div>
              <ul className="flex flex-wrap gap-2.5">
                {INDUSTRIES.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={`/industries#${ind.slug}`}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-safety py-2.5 pl-3 pr-4 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgba(34,38,43,0.04)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-cobalt hover:shadow-[0_8px_20px_rgba(90,90,255,0.16)] active:scale-[0.97]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ececff] text-cobalt-ink transition-colors duration-200 group-hover:bg-cobalt group-hover:text-white">
                        <ind.icon aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                      {ind.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="group mt-2 inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.14em] text-cobalt-ink"
              >
                See everything we build
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
