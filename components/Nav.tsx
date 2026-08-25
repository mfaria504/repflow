import Link from "next/link";
import NavMegaMenu from "@/components/NavMegaMenu";
import MobileMenu from "@/components/MobileMenu";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#top" className="shrink-0">
          <img
            src="/logo/repflow-logo.svg"
            alt="RepFlow"
            width={135}
            height={28}
            className="h-7 w-auto sm:h-[30px]"
          />
        </Link>
        <div className="flex items-center gap-6">
          <NavMegaMenu
            label="Services"
            kind="services"
            basePath="/services"
            viewAllLabel="View all services"
          />
          <NavMegaMenu
            label="Industries"
            kind="industries"
            basePath="/industries"
            viewAllLabel="View all industries"
          />
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
            className="hidden rounded-sm border border-ink/25 px-4 py-2 text-sm font-semibold text-ink transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-px hover:border-brass hover:shadow-[0_4px_14px_rgba(199,123,39,0.2)] active:translate-y-0 active:scale-[0.97] sm:block"
          >
            Request Assessment
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
