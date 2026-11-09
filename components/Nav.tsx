"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { EXPO } from "@/lib/motion";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#what", label: "What we do" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
];

export default function Nav() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "border-b border-white/[0.08] bg-midnight/75 backdrop-blur-xl backdrop-saturate-[1.6]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Link href="/#top" aria-label="RepFlow home" className="shrink-0">
            <Logo className="h-8 w-auto" />
          </Link>

          <nav
            aria-label="Primary"
            className={`hidden items-center gap-0.5 rounded-full border p-1 transition-[background-color,border-color] duration-300 lg:flex ${
              scrolled
                ? "border-transparent bg-transparent"
                : "border-white/10 bg-midnight/70 backdrop-blur-xl backdrop-saturate-[1.6]"
            }`}
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-[15px] font-medium text-white/70 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#assessment"
              className="cta hidden px-5 py-2.5 text-[15px] sm:inline-flex"
            >
              Start a build
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-midnight/70 text-white backdrop-blur-xl transition-transform duration-150 active:scale-95 lg:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="blueprint fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pb-10 pt-[104px] lg:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Mobile" className="relative flex flex-col">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EXPO, delay: 0.04 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 py-5 font-display text-[32px] font-bold tracking-[-0.03em] text-safety"
                  >
                    {l.label}
                    <span className="label text-steel tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/#assessment"
              onClick={() => setOpen(false)}
              className="cta relative mt-10 justify-center px-6 py-4 text-lg"
            >
              Tell us your first “I wish”
              <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
