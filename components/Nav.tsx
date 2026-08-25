import Link from "next/link";
import MegaMenu from "@/components/MegaMenu";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/#top"
          className="font-display text-lg font-bold tracking-tight text-ink"
        >
          RepFlow
        </Link>
        <div className="flex items-center gap-6">
          <MegaMenu />
          <Link
            href="/#approach"
            className="hidden text-sm font-medium text-ink/65 transition-colors duration-150 hover:text-ink sm:block"
          >
            Approach
          </Link>
          <Link
            href="/#field-report"
            className="hidden text-sm font-medium text-ink/65 transition-colors duration-150 hover:text-ink sm:block"
          >
            Field Report
          </Link>
          <Link
            href="/#assessment"
            className="rounded-sm border border-ink/25 px-4 py-2 text-sm font-semibold text-ink transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-px hover:border-brass hover:shadow-[0_4px_14px_rgba(199,123,39,0.2)] active:translate-y-0 active:scale-[0.97]"
          >
            Request Assessment
          </Link>
        </div>
      </nav>
    </header>
  );
}
