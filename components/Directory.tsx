"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Eye from "@/components/Eye";
import Reveal from "@/components/Reveal";
import { EXPO } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import type { DirectoryEntry, Pillar } from "@/lib/types";

const PILLAR_LABEL: Record<Pillar, string> = {
  build: "Build",
  run: "Manage",
  solve: "Manage",
};

function SubNav({ items }: { items: DirectoryEntry[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="sticky top-[72px] z-30 border-b border-[#d9d5ca] bg-paper/85 backdrop-blur-xl backdrop-saturate-150">
      <nav aria-label="On this page" className="wrap">
        <ul className="-mx-1 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const on = item.slug === active;
            return (
              <li key={item.slug} className="shrink-0">
                <a
                  href={`#${item.slug}`}
                  aria-current={on ? "true" : undefined}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] font-medium transition-[background-color,color,box-shadow] duration-200 ${
                    on
                      ? "bg-cobalt text-white shadow-[0_6px_16px_rgba(90,90,255,0.3)]"
                      : "text-body hover:bg-ink/[0.06] hover:text-ink"
                  }`}
                >
                  <item.icon aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Entry({
  item,
  index,
  cardLabel,
}: {
  item: DirectoryEntry;
  index: number;
  cardLabel: string;
}) {
  return (
    <section
      id={item.slug}
      className="scroll-mt-[136px] border-b border-[#d9d5ca] py-[clamp(64px,8vw,104px)] last:border-b-0"
    >
      <div className="wrap grid items-start gap-x-16 gap-y-10 min-[900px]:grid-cols-[6fr_5fr]">
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="label flex items-center gap-4 text-mute">
              <span className="tabular text-cobalt-deep">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              {item.pillar && (
                <span className="rounded-full bg-[#ececff] px-2.5 py-1 text-[11px] tracking-[0.12em] text-cobalt-ink">
                  {PILLAR_LABEL[item.pillar]}
                </span>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="text-balance font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(30px, 3.8vw, 46px)" }}
            >
              {item.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-[18px] leading-relaxed text-body">{item.body}</p>
          </Reveal>
        </div>

        <Reveal from="rise" delay={0.1}>
          <div className="lift overflow-clip rounded-[28px] border border-line bg-safety shadow-[0_1px_2px_rgba(34,38,43,0.04),0_24px_48px_rgba(34,38,43,0.08)]">
            <div className="blueprint flex items-center gap-4 px-7 py-6">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cobalt shadow-[0_0_0_7px_rgba(90,90,255,0.14),0_12px_28px_rgba(90,90,255,0.35)]">
                <item.icon aria-hidden className="h-5 w-5 text-white" strokeWidth={2} />
              </span>
              <span className="label relative text-[12px] text-lilac">{cardLabel}</span>
            </div>
            <ul className="px-7 py-3">
              {item.bullets.map((b, i) => (
                <li
                  key={b}
                  className={`flex items-start gap-3.5 py-4 text-[16px] leading-snug text-ink ${
                    i > 0 ? "border-t border-[#ebe8df]" : ""
                  }`}
                >
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ececff]">
                    <Check className="h-3 w-3 text-cobalt-ink" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Directory({
  eyebrow,
  headline,
  accent,
  subhead,
  ctaLabel,
  cardLabel,
  kind,
}: {
  eyebrow: string;
  headline: string;
  accent: string;
  subhead: string;
  ctaLabel: string;
  cardLabel: string;
  // Entries hold icon components, so they are looked up here on the client
  // side instead of being passed across from a server page.
  kind: "services" | "industries";
}) {
  const items = kind === "services" ? SERVICES : INDUSTRIES;
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const markY = useTransform(scrollY, [0, 800], [0, 160]);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 40, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 1.2, ease: EXPO, delay },
        };

  return (
    <>
      <section id="top" className="blueprint overflow-clip">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 w-[280px] sm:-right-[120px] sm:-top-[110px] sm:w-[400px] min-[1160px]:left-[calc(50%+180px)] min-[1160px]:right-auto min-[1160px]:-top-[120px] min-[1160px]:w-[560px]"
          style={reduced ? undefined : { y: markY }}
          initial={reduced ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EXPO, delay: 0.1 }}
        >
          <Eye className="h-auto w-full" ringOpacity={0.82} reach={90} />
        </motion.div>

        <div className="wrap relative flex flex-col gap-8 pb-[clamp(72px,9vw,112px)] pt-[clamp(152px,17vw,208px)]">
          <motion.div className="label flex items-center gap-3 text-steel" {...enter(0.2)}>
            <span aria-hidden className="h-2 w-2 rounded-full bg-cobalt shadow-[0_0_0_4px_rgba(90,90,255,0.2)]" />
            {eyebrow}
          </motion.div>
          <motion.h1
            className="max-w-[820px] font-display font-bold leading-[0.98] tracking-[-0.04em] text-safety"
            style={{ fontSize: "clamp(44px, 6.6vw, 80px)" }}
            {...enter(0.34)}
          >
            {headline} <span className="text-cobalt">{accent}</span>
          </motion.h1>
          <motion.p
            className="max-w-[580px] text-pretty text-[clamp(18px,1.8vw,21px)] leading-[1.55] text-fog"
            {...enter(0.5)}
          >
            {subhead}
          </motion.p>
          <motion.div {...enter(0.62)}>
            <Link href="#assessment" className="cta px-7 py-4 text-lg">
              {ctaLabel}
              <ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      <SubNav items={items} />

      <div className="grain">
        {items.map((item, i) => (
          <Entry key={item.slug} item={item} index={i} cardLabel={cardLabel} />
        ))}
      </div>
    </>
  );
}
