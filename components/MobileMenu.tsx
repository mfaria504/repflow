"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { SPRING } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { ACCENT_CLASSES } from "@/lib/accents";

const SERVICE_PILLARS = [
  { key: "build", label: "Build" },
  { key: "run", label: "Run" },
] as const;

const GROUPS = [
  { key: "services", label: "Services", basePath: "/services", items: SERVICES },
  { key: "industries", label: "Industries", basePath: "/industries", items: INDUSTRIES },
] as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // The panel is portaled to <body>, so it sits alongside the sticky header
  // rather than inside it — it needs the header's actual rendered bottom
  // edge, not a hardcoded pixel height, or the header (higher z-index) ends
  // up painted over the top of the panel and hides the first item.
  useLayoutEffect(() => {
    if (!open) return;
    const header = buttonRef.current?.closest("header");
    if (!header) return;
    const update = () => setPanelTop(header.getBoundingClientRect().bottom);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setExpanded(null);
  }

  return (
    <div className="sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink/25 text-ink transition-colors duration-150 hover:border-brass"
      >
        {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-paper"
                style={{ top: panelTop }}
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={SPRING}
              >
                <div className="flex flex-col divide-y divide-ink/10 border-b border-ink/10">
                  {GROUPS.map((group) => {
                    const isExpanded = expanded === group.key;
                    return (
                      <div key={group.key}>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded(isExpanded ? null : group.key)
                          }
                          aria-expanded={isExpanded}
                          className="flex w-full items-center justify-between px-6 py-4 text-left font-display text-lg font-bold text-ink"
                        >
                          {group.label}
                          <ChevronDown
                            className={`h-4 w-4 text-steel transition-transform duration-200 ${
                              isExpanded ? "-rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={reduced ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduced ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-safety"
                            >
                              <div className="flex flex-col divide-y divide-ink/10">
                                {(group.key === "services"
                                  ? SERVICE_PILLARS.flatMap((pillar) => [
                                      { header: pillar.label },
                                      ...group.items.filter(
                                        (item) => item.pillar === pillar.key,
                                      ),
                                    ])
                                  : [...group.items]
                                ).map((entry) =>
                                  "header" in entry ? (
                                    <span
                                      key={entry.header}
                                      className="px-6 pb-1.5 pt-3.5 font-mono text-[11px] uppercase tracking-widest text-brass"
                                    >
                                      {entry.header}
                                    </span>
                                  ) : (
                                    (() => {
                                      const item = entry;
                                      const Icon = item.icon;
                                      const accent = ACCENT_CLASSES[item.accent];
                                      return (
                                        <Link
                                          key={item.slug}
                                          href={`${group.basePath}#${item.slug}`}
                                          onClick={closeMenu}
                                          className="flex items-center gap-3.5 px-6 py-3.5"
                                        >
                                          <span
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border bg-paper ${accent.text} ${accent.border}`}
                                          >
                                            <Icon
                                              className="h-4 w-4"
                                              strokeWidth={1.75}
                                            />
                                          </span>
                                          <span className="text-[15px] font-medium text-ink">
                                            {item.label}
                                          </span>
                                        </Link>
                                      );
                                    })()
                                  ),
                                )}
                                {group.key === "services" && (
                                  <Link
                                    href="/#approach"
                                    onClick={closeMenu}
                                    className="px-6 py-3.5 text-sm text-ink/60"
                                  >
                                    <span className="font-mono text-[11px] uppercase tracking-widest text-brass">
                                      Solve
                                    </span>{" "}
                                    Something else slowing your reps down?
                                    That&apos;s the third job.
                                  </Link>
                                )}
                                <Link
                                  href={group.basePath}
                                  onClick={closeMenu}
                                  className="px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-brass"
                                >
                                  View all {group.label.toLowerCase()}
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  <Link
                    href="/#approach"
                    onClick={closeMenu}
                    className="px-6 py-4 font-display text-lg font-bold text-ink"
                  >
                    Approach
                  </Link>
                  <Link
                    href="/#field-report"
                    onClick={closeMenu}
                    className="px-6 py-4 font-display text-lg font-bold text-ink"
                  >
                    Field Report
                  </Link>
                </div>

                <div className="px-6 py-6">
                  <Link
                    href="/#assessment"
                    onClick={closeMenu}
                    className="block rounded-sm bg-brass px-6 py-3.5 text-center font-display text-base font-bold text-white transition-[transform,box-shadow] duration-150 active:translate-y-0 active:scale-[0.97]"
                  >
                    Request Assessment
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
