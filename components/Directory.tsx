"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Eye from "@/components/Eye";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { EXPO, POP } from "@/lib/motion";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import type { DirectoryEntry, Pillar } from "@/lib/types";

const GROUPS: Record<Pillar, { no: string; label: string; title: string; accent: string; blurb: string }> = {
  build: {
    no: "A",
    label: "Build",
    title: "Ideas into tools.",
    accent: "Three things we build.",
    blurb: "Each one is scoped and priced before we start, and built around the systems you already run.",
  },
  manage: {
    no: "B",
    label: "Manage",
    title: "Always on.",
    accent: "Four things we keep running.",
    blurb: "The work that never finishes: pipeline, marketing, data and the systems under them.",
  },
};

function SubNav({ items }: { items: DirectoryEntry[] }) {
  const [active, setActive] = useState(items[0]?.slug);
  const listRef = useRef<HTMLUListElement>(null);

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

  // Keep the active chip in view on narrow screens.
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !chip) return;
    list.scrollTo({ left: chip.offsetLeft - 24, behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[72px] z-30 border-b border-[#d9d5ca] bg-paper/85 backdrop-blur-xl backdrop-saturate-150">
      <nav aria-label="On this page" className="wrap">
        <ul
          ref={listRef}
          className="relative -mx-1 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const on = item.slug === active;
            return (
              <li key={item.slug} className="shrink-0">
                <a
                  href={`#${item.slug}`}
                  aria-current={on ? "true" : undefined}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] font-medium transition-[background-color,color,box-shadow] duration-200 ${
                    on
                      ? "bg-ink text-white shadow-[0_6px_16px_rgba(34,38,43,0.25)]"
                      : "text-body hover:bg-ink/[0.06] hover:text-ink"
                  }`}
                >
                  <span className={`tabular font-mono text-[11px] ${on ? "text-lilac" : "text-mute"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
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

// The right-hand "sheet": what we build for this entry, laid out like one of
// the tools we ship.
function Sheet({
  item,
  title,
  foot,
}: {
  item: DirectoryEntry;
  title: string;
  foot: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const show = reduced || inView;

  return (
    <div ref={ref} className="relative" style={{ perspective: 1400 }}>
      <motion.div
        className="lift relative overflow-hidden rounded-[20px] bg-white shadow-[0_32px_64px_rgba(34,38,43,0.14),0_2px_8px_rgba(34,38,43,0.06)]"
        style={{ transformOrigin: "50% 100%" }}
        initial={reduced ? false : { opacity: 0, y: 56, rotateX: 14 }}
        animate={show ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 56, rotateX: 14 }}
        transition={{ duration: 1.1, ease: EXPO }}
      >
        <div className="flex items-center gap-3.5 border-b border-[#eeece6] px-5 py-4 pr-24">
          <div aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e2dfd5]" />
          </div>
          <span className="truncate font-mono text-xs uppercase tracking-[0.08em] text-mute">
            {title}
          </span>
        </div>
        <ul>
          {item.bullets.map((b, i) => (
            <motion.li
              key={b}
              className="flex items-baseline gap-4 border-b border-[#f1efea] px-5 py-[18px]"
              initial={reduced ? false : { opacity: 0, x: 20 }}
              animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.7, ease: EXPO, delay: 0.35 + i * 0.09 }}
            >
              <span className="tabular shrink-0 font-mono text-[12px] font-medium text-cobalt-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[16px] font-medium leading-snug text-ink">{b}</span>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center gap-2 bg-[#f7f6f2] px-5 py-4">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-cobalt shadow-[0_0_0_3px_rgba(90,90,255,0.18)]" />
          <span className="font-mono text-xs text-body">{foot}</span>
        </div>
      </motion.div>

      {/* The one element that breaks the frame. */}
      <motion.div
        aria-hidden
        className="absolute -right-3 -top-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-cobalt shadow-[0_0_0_8px_rgba(90,90,255,0.14),0_16px_32px_rgba(90,90,255,0.4)] sm:-right-5 max-sm:-right-1"
        initial={reduced ? false : { scale: 0.4, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
        transition={{ ...POP, delay: 0.55 }}
      >
        <item.icon className="h-7 w-7 text-white" strokeWidth={1.9} />
      </motion.div>
    </div>
  );
}

function Entry({
  item,
  index,
  sheetTitle,
  sheetFoot,
}: {
  item: DirectoryEntry;
  index: number;
  sheetTitle: string;
  sheetFoot: string;
}) {
  const flip = index % 2 === 1;
  return (
    <section id={item.slug} className="scroll-mt-[136px] py-[clamp(56px,7vw,96px)]">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-x-[clamp(40px,7vw,96px)] gap-y-12 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className={`flex min-w-0 flex-col gap-6 ${flip ? "min-[900px]:order-2" : ""}`}>
          <Reveal>
            <div className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-mute">
              <span className="tabular text-cobalt-deep">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              {item.network && (
                <span className="rounded-full border border-line bg-safety px-2.5 py-1 text-[11px] tracking-[0.12em] text-body">
                  Rep network · {item.network}
                </span>
              )}
            </div>
          </Reveal>
          {item.wish && (
            <Reveal from="left" delay={0.05}>
              <div className="inline-flex max-w-full self-start rounded-[22px_22px_22px_4px] border border-line bg-safety px-[22px] py-3.5 shadow-[0_1px_2px_rgba(34,38,43,0.04),0_8px_24px_rgba(34,38,43,0.05)]">
                <span className="text-pretty text-base italic leading-[23px] text-[#3d4248]">
                  “{item.wish}”
                </span>
              </div>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <h2
              className="text-balance font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
            >
              {item.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-[520px] text-[18px] leading-[1.65] text-body">{item.body}</p>
          </Reveal>
        </div>

        <div className={`min-w-0 ${flip ? "min-[900px]:order-1" : ""}`}>
          <Sheet item={item} title={`${sheetTitle} · ${item.label}`} foot={sheetFoot} />
        </div>
      </div>
    </section>
  );
}

function GroupHeader({ pillar }: { pillar: Pillar }) {
  const g = GROUPS[pillar];
  return (
    <div className="wrap pt-[clamp(72px,9vw,120px)]">
      <Reveal>
        <SectionLabel no={g.no}>{g.label}</SectionLabel>
      </Reveal>
      <div className="mt-6 flex flex-col gap-5">
        <Reveal delay={0.06}>
          <p
            className="text-balance font-display font-bold leading-[1.02] tracking-[-0.035em]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {g.title} <span className="text-cobalt-deep">{g.accent}</span>
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-[560px] text-[18px] leading-relaxed text-body">{g.blurb}</p>
        </Reveal>
      </div>
    </div>
  );
}

export default function Directory({
  eyebrow,
  headline,
  accent,
  subhead,
  ctaLabel,
  sheetTitle,
  sheetFoot,
  kind,
}: {
  eyebrow: string;
  headline: string;
  accent: string;
  subhead: string;
  ctaLabel: string;
  sheetTitle: string;
  sheetFoot: string;
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

        <div className="wrap relative flex flex-col gap-8 pt-[clamp(152px,17vw,208px)]">
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

        {/* Index: every entry on the page, one tap away. */}
        <div className="wrap relative pb-[clamp(56px,7vw,88px)] pt-[clamp(56px,7vw,88px)]">
          <ul className="grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <motion.li
                key={item.slug}
                className="bg-midnight"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EXPO, delay: 0.75 + i * 0.045 }}
              >
                <a
                  href={`#${item.slug}`}
                  className="group flex h-full min-h-[84px] items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.05]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-lilac transition-[background-color,border-color,color] duration-200 group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-white">
                    <item.icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="tabular font-mono text-[11px] tracking-[0.14em] text-steel">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-balance font-display text-[16px] font-semibold leading-[1.2] tracking-[-0.01em] text-safety">
                      {item.label}
                    </span>
                  </span>
                  <ArrowDown
                    aria-hidden
                    className="ml-auto h-4 w-4 shrink-0 text-white/25 transition-[transform,color] duration-200 group-hover:translate-y-0.5 group-hover:text-white"
                  />
                </a>
              </motion.li>
            ))}
            <li className="hidden items-center bg-cobalt/[0.12] px-5 py-5 lg:flex">
              <span className="font-mono text-[12px] uppercase leading-relaxed tracking-[0.12em] text-lilac">
                One team.
                <br />
                Built around yours.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <SubNav items={items} />

      <div className="grain overflow-x-clip pb-[clamp(40px,6vw,80px)]">
        {items.map((item, i) => (
          <div key={item.slug}>
            {item.pillar && item.pillar !== items[i - 1]?.pillar && <GroupHeader pillar={item.pillar} />}
            {!item.pillar && i > 0 && (
              <div aria-hidden className="wrap">
                <div className="h-px bg-[#d9d5ca]" />
              </div>
            )}
            <Entry item={item} index={i} sheetTitle={sheetTitle} sheetFoot={sheetFoot} />
          </div>
        ))}
      </div>
    </>
  );
}
