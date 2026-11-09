import Link from "next/link";
import Logo from "@/components/Logo";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";

const linkClass =
  "text-[15px] text-fog transition-colors duration-150 hover:text-white";
const headingClass = "label text-[12px] text-steel transition-colors duration-150 hover:text-white";

const COMPANY = [
  { href: "/#how", label: "How it works" },
  { href: "/#why", label: "Why now" },
  { href: "/#what", label: "What we do" },
  { href: "/#field-report", label: "Field report" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#assessment", label: "Start a build" },
];

export default function Footer() {
  return (
    <footer className="bg-midnight text-safety">
      <div className="wrap border-t border-white/10 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Link href="/#top" className="inline-block self-start" aria-label="RepFlow home">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="max-w-[30ch] text-[15px] leading-relaxed text-fog">
              The builder behind the scenes for manufacturers’ rep agencies.
              We build it, teach it, and keep it running.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <Link href="/services" className={headingClass}>
                Services
              </Link>
              <ul className="mt-4 flex flex-col gap-2.5">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className={linkClass}>
                      {s.label}
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
                {INDUSTRIES.map((ind) => (
                  <li key={ind.slug}>
                    <Link href={`/industries#${ind.slug}`} className={linkClass}>
                      {ind.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className={headingClass}>RepFlow</span>
              <ul className="mt-4 flex flex-col gap-2.5">
                {COMPANY.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className={linkClass}>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-[13px] text-steel">
          <span className="tabular">© {new Date().getFullYear()} RepFlow</span>
          <span>
            <a href="https://www.repflow.com" className="text-safety transition-colors hover:text-lilac">
              repflow.com
            </a>{" "}
            ·{" "}
            <a href="mailto:matt@repflow.com" className="text-safety transition-colors hover:text-lilac">
              matt@repflow.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
