"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SPRING } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";

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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHovering = useRef(false);
  const reduced = useReducedMotion();
  const lastSpans2 = items.length % 2 === 1;

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
              className="fixed inset-x-0 top-[65px] bottom-0 z-40 bg-ink/10 backdrop-blur-[1px]"
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
              <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
                {items.map((item, i) => {
                  const Icon = item.icon;
                  const isLastOdd = lastSpans2 && i === items.length - 1;
                  return (
                    <motion.div
                      key={item.slug}
                      initial={reduced ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.18,
                        delay: reduced ? 0 : i * 0.035,
                      }}
                      className={`bg-safety ${isLastOdd ? "sm:col-span-2" : ""}`}
                    >
                      <Link
                        href={`${basePath}#${item.slug}`}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className={`group flex items-start gap-4 px-5 py-4 transition-colors duration-150 hover:bg-paper ${
                          isLastOdd ? "sm:max-w-[50%]" : ""
                        }`}
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-ink/15 bg-paper text-brass transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_16px_rgba(199,123,39,0.25)]">
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
                })}
              </div>

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
