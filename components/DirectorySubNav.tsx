"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";

export default function DirectorySubNav({
  kind,
}: {
  kind: "services" | "industries";
}) {
  // Resolved here rather than passed as a prop: these arrays carry live
  // icon components, which a Server Component parent can't pass across
  // the client boundary as serializable props.
  const items = kind === "services" ? SERVICES : INDUSTRIES;
  const [active, setActive] = useState(items[0].slug);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const activeEl = ref.current?.querySelector<HTMLAnchorElement>(
      `a[data-slug="${active}"]`,
    );
    activeEl?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[65px] z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <div
        ref={ref}
        className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const isActive = active === item.slug;
          return (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              data-slug={item.slug}
              onClick={() => setActive(item.slug)}
              className="relative shrink-0 rounded-sm px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest"
            >
              {isActive && (
                <motion.span
                  layoutId="subnav-pill"
                  className="absolute inset-0 rounded-sm bg-ink"
                  transition={reduced ? { duration: 0 } : SPRING}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-safety" : "text-ink/55 hover:text-ink"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
