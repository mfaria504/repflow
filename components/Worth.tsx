"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { EXPO } from "@/lib/motion";

// Same arithmetic as the calculator we use on calls: loaded cost of the
// hours a team loses to manual work, with only half counted as recoverable.
const LOAD = 1.25;
const WORK_HOURS = 2080;
const RECOVERED = 0.5;

function Count({ value, format }: { value: number; format: (n: number) => string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = format(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.7,
      ease: EXPO,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, format, reduced]);

  return (
    <span ref={ref} className="tabular">
      {format(value)}
    </span>
  );
}

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const whole = (n: number) => Math.round(n).toLocaleString("en-US");
const tenth = (n: number) => (Math.round(n * 10) / 10).toFixed(1);

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (n: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="flex flex-col gap-3">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-display text-[19px] font-semibold tracking-[-0.01em] text-ink">
          {label}
        </span>
        <span className="tabular font-mono text-[15px] font-medium text-cobalt-ink">
          {display}
        </span>
      </span>
      <input
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
      <span className="text-[14px] leading-snug text-mute">{hint}</span>
    </label>
  );
}

export default function Worth() {
  const [people, setPeople] = useState(10);
  const [hours, setHours] = useState(7);
  const [comp, setComp] = useState(80000);

  const rate = (comp * LOAD) / WORK_HOURS;
  const lostHours = people * hours;
  const friction = lostHours * rate * 52;
  const hoursBack = lostHours * RECOVERED;
  const fte = hoursBack / 40;

  return (
    <section id="worth" className="grain sec pt-0">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <Reveal>
            <SectionLabel no="06" fig="FIG. 03">
              What it’s worth
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 4.7vw, 56px)" }}
            >
              What is manual work
              <br />
              <span className="text-cobalt-deep">costing your team?</span>
            </h2>
          </Reveal>
        </div>

        <Reveal from="rise">
          <div className="grid overflow-clip rounded-[32px] border border-line bg-safety shadow-[0_1px_2px_rgba(34,38,43,0.04),0_32px_72px_rgba(34,38,43,0.1)] min-[900px]:grid-cols-[5fr_6fr]">
            <div className="flex flex-col gap-9 p-7 sm:p-10">
              <div className="label text-mute">Three numbers you already know</div>
              <Slider
                label="People on the team"
                hint="Anyone who touches a quote, an order or a report."
                value={people}
                min={2}
                max={60}
                step={1}
                display={whole(people)}
                onChange={setPeople}
              />
              <Slider
                label="Hours each person loses a week"
                hint="Re-keying quotes, matching POs, chasing price books, building reports by hand."
                value={hours}
                min={1}
                max={20}
                step={0.5}
                display={`${hours % 1 === 0 ? hours : hours.toFixed(1)} hrs`}
                onChange={setHours}
              />
              <Slider
                label="Average pay per person"
                hint="Salary plus commission, per year, across the team."
                value={comp}
                min={40000}
                max={200000}
                step={5000}
                display={money(comp)}
                onChange={setComp}
              />
            </div>

            <div className="blueprint flex flex-col justify-between gap-10 overflow-clip p-7 sm:p-10">
              <div className="relative flex flex-col gap-3">
                <div className="label text-lilac">What friction costs you today</div>
                <div
                  className="font-display font-bold leading-none tracking-[-0.045em] text-safety"
                  style={{ fontSize: "clamp(52px, 7.4vw, 88px)" }}
                >
                  <Count value={friction} format={money} />
                </div>
                <div className="font-mono text-[13px] tracking-[0.04em] text-fog">
                  per year, in hours your team is already paid for
                </div>
              </div>

              <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10">
                <div className="flex flex-col gap-2 bg-midnight p-5 sm:p-6">
                  <div className="font-display text-[40px] font-bold leading-none tracking-[-0.03em] text-safety">
                    <Count value={lostHours} format={whole} />
                  </div>
                  <div className="text-[14px] leading-snug text-fog">hours a week lost to manual work</div>
                </div>
                <div className="flex flex-col gap-2 bg-midnight p-5 sm:p-6">
                  <div className="font-display text-[40px] font-bold leading-none tracking-[-0.03em] text-cobalt">
                    <Count value={hoursBack} format={whole} />
                  </div>
                  <div className="text-[14px] leading-snug text-fog">
                    hours a week back, counting only half
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col gap-6">
                <p className="text-[17px] leading-relaxed text-[#c9ccd1]">
                  That’s the selling time of{" "}
                  <b className="font-semibold text-safety">
                    <Count value={fte} format={tenth} /> full-time people
                  </b>
                  , handed back to the team you already have.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Link href="/#assessment" className="cta px-6 py-3.5 text-[17px]">
                    Tell us where the hours go
                    <ArrowRight aria-hidden className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="font-mono text-[13px] leading-relaxed tracking-[0.02em] text-mute">
            Your inputs and plain arithmetic. Pay is loaded 25% for taxes and
            benefits, and we count only half of the lost hours as recovered.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
