export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-ink"
        >
          RepFlow
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#approach"
            className="hidden text-sm font-medium text-ink/65 transition-colors duration-150 hover:text-ink sm:block"
          >
            Approach
          </a>
          <a
            href="#field-report"
            className="hidden text-sm font-medium text-ink/65 transition-colors duration-150 hover:text-ink sm:block"
          >
            Field Report
          </a>
          <a
            href="#assessment"
            className="rounded-sm border border-ink/25 px-4 py-2 text-sm font-semibold text-ink transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-px hover:border-brass hover:shadow-[0_4px_14px_rgba(199,123,39,0.2)] active:translate-y-0 active:scale-[0.97]"
          >
            Request Assessment
          </a>
        </div>
      </nav>
    </header>
  );
}
