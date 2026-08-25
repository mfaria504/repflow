import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-safety">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-6 px-6 py-12">
        <div>
          <span className="font-display text-lg font-bold tracking-tight">
            RepFlow
          </span>
          <p className="mt-2 max-w-sm text-sm text-safety/50">
            Fractional RevOps for manufacturers&apos; representative agencies.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Link
            href="/services"
            className="text-sm font-medium text-safety/80 transition-colors duration-150 hover:text-safety"
          >
            Services
          </Link>
          <Link
            href="/industries"
            className="text-sm font-medium text-safety/80 transition-colors duration-150 hover:text-safety"
          >
            Industries
          </Link>
          <a
            href="#assessment"
            className="text-sm font-medium text-safety/80 transition-colors duration-150 hover:text-safety"
          >
            Request an assessment
          </a>
          <span className="font-mono text-xs text-safety/40 tabular">
            © 2026 RepFlow
          </span>
        </div>
      </div>
    </footer>
  );
}
