"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SPRING } from "@/lib/motion";
import { SERVICES, type Service } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { ACCENT_CLASSES } from "@/lib/accents";

const SERVICE_PILLARS = [
  { key: "build", label: "Build" },
  { key: "run", label: "Run" },
] as const;

function MenuItem({
  item,
  basePath,
  delay,
  reduced,
  className = "",
  linkClassName = "",
  onNavigate,
}: {
  item: Service;
  basePath: string;
  delay: number;
  reduced: boolean | null;
  className?: string;
  linkClassName?: string;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const accent = ACCENT_CLASSES[item.accent];
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: reduced ? 0 : delay }}
      className={`bg-safety ${className}`}
    >
      <Link
        href={`${basePath}#${item.slug}`}
        role="menuitem"
        onClick={onNavigate}
        className={`group flex items-start gap-4 px-5 py-4 transition-colors duration-150 hover:bg-paper ${linkClassName}`}
      >
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border bg-paper transition-transform duration-200 group-hover:-translate-y-0.5 ${accent.text} ${accent.border} ${accent.shadow}`}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <span>
          <span className="block font-display text-[15px] font-bold tracking-[-0.01em] text-ink">
            {item.label}
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-ink/60">
            {item.blurb}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function NavMegaMenu({
  label,
  kind,
  basePath,
  viewAllLabel,
}: {
  label: string;
  kind: "services" | "industries";
  basePath: string;
  viewAllLabel: string;
}) {
  // Resolved here, inside the client component, rather than passed in as a
  // prop: these arrays carry live icon components, and passing those as
  // props from a Server Component (Nav) across the client boundary isn't
  // serializable.
  const items = kind === "services" ? SERVICES : INDUSTRIES;
  const [open, setOpen] = useState(false);
  const [overlayTop, setOverlayTop] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHovering = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const lastSpans2 = items.length % 2 === 1;

  // The backdrop needs to start exactly at the header's bottom edge, not a
  // hardcoded pixel value: the header's rendered height (and position, while
  // it's not yet stuck to the top) shifts whenever the announcement bar
  // above it is present or its copy wraps differently.
  useLayoutEffect(() => {
    if (!open) return;
    const header = containerRef.current?.closest("header");
    if (!header) return;
    const update = () => setOverlayTop(header.getBoundingClientRect().bottom);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [open]);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        isHovering.current = true;
        openNow();
      }}
      onMouseLeave={() => {
        isHovering.current = false;
        closeSoon();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => {
          // A mouse click always arrives after hover already opened the
          // menu, so toggling here would immediately re-close it. Only
          // treat this as a toggle for keyboard/touch activation, which
          // never fires mouseenter first.
          if (isHovering.current) {
            setOpen(true);
          } else {
            setOpen((v) => !v);
          }
        }}
        aria-expanded={open}
        aria-haspopup="true"
        className="hidden items-center gap-1 text-sm font-medium text-ink/65 transition-colors duration-150 hover:text-ink sm:flex"
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-x-0 bottom-0 z-40 bg-ink/10 backdrop-blur-[1px]"
              style={{ top: overlayTop }}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={closeSoon}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="menu"
              className="absolute left-1/2 top-full z-50 mt-3 w-[min(90vw,760px)] -translate-x-[62%] overflow-hidden rounded-sm border border-ink/15 bg-safety shadow-[0_20px_60px_rgba(34,38,43,0.18),0_4px_16px_rgba(199,123,39,0.1)]"
              initial={reduced ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: -6, scale: 0.99 }}
              transition={SPRING}
            >
              {kind === "services" ? (
                <>
                  <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
                    {SERVICE_PILLARS.map((pillar, gi) => (
                      <div key={pillar.key} className="bg-safety">
                        <div className="border-b border-ink/10 px-5 pb-2 pt-4">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-brass">
                            {pillar.label}
                          </span>
                        </div>
                        {items
                          .filter((item) => item.pillar === pillar.key)
                          .map((item, i) => (
                            <MenuItem
                              key={item.slug}
                              item={item}
                              basePath={basePath}
                              delay={(gi * 3 + i) * 0.035}
                              reduced={reduced}
                              onNavigate={() => setOpen(false)}
                            />
                          ))}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-ink/15 bg-safety px-5 py-3.5">
                    <Link
                      href="/#approach"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="group flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink/60 transition-colors duration-150 hover:text-ink"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-widest text-brass">
                        Solve
                      </span>
                      Something else slowing your reps down? That&apos;s the
                      third job.
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
                  {items.map((item, i) => {
                    const isLastOdd = lastSpans2 && i === items.length - 1;
                    return (
                      <MenuItem
                        key={item.slug}
                        item={item}
                        basePath={basePath}
                        delay={i * 0.035}
                        reduced={reduced}
                        className={isLastOdd ? "sm:col-span-2" : ""}
                        linkClassName={isLastOdd ? "sm:max-w-[50%]" : ""}
                        onNavigate={() => setOpen(false)}
                      />
                    );
                  })}
                </div>
              )}

              <div className="border-t border-ink/15 bg-paper px-5 py-3.5">
                <Link
                  href={basePath}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink transition-[gap] duration-150 hover:gap-2.5"
                >
                  {viewAllLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
