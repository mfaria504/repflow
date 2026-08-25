import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";

const linkClass =
  "text-sm text-safety/65 transition-colors duration-150 hover:text-safety";
const headingClass =
  "font-mono text-xs uppercase tracking-widest text-safety/40 transition-colors duration-150 hover:text-safety";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-safety">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brass/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-[-6rem] h-72 w-72 rounded-full bg-blueprint/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
          <div>
            <Link href="/#top" className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brass" aria-hidden />
              <span className="font-display text-lg font-bold tracking-tight">
                RepFlow
              </span>
            </Link>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-safety/55">
              Fractional RevOps for manufacturers&apos; representative
              agencies. One retainer for the software, the pipeline, the
              data, and the communications.
            </p>
            <a
              href="/#assessment"
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-widest text-safety/80 transition-[transform,border-color,color] duration-150 hover:-translate-y-px hover:border-brass hover:text-safety active:translate-y-0 active:scale-[0.97]"
            >
              Request Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <Link href="/services" className={headingClass}>
                Services
              </Link>
              <ul className="mt-4 flex flex-col gap-2.5">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services#${service.slug}`}
                      className={linkClass}
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Link href="/industries" className={headingClass}>
                Industries
              </Link>
              <ul className="mt-4 flex flex-col gap-2.5">
                {INDUSTRIES.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries#${industry.slug}`}
                      className={linkClass}
                    >
                      {industry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="font-mono text-xs uppercase tracking-widest text-safety/40">
                Company
              </span>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <Link href="/#approach" className={linkClass}>
                    Approach
                  </Link>
                </li>
                <li>
                  <Link href="/#field-report" className={linkClass}>
                    Field Report
                  </Link>
                </li>
                <li>
                  <a href="/#assessment" className={linkClass}>
                    Request an Assessment
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs text-safety/40 tabular">
            © 2026 RepFlow. All rights reserved.
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-safety/30">
            Fractional RevOps · Manufacturers&apos; Rep Agencies
          </span>
        </div>
      </div>
    </footer>
  );
}
