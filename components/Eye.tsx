"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

// The RepFlow brandmark. Its iris follows the pointer, so the mark is
// quietly watching the work, which is the whole idea of the company.
const SIZE = 118.18;
const CENTER = 59.09;
const IRIS_REST = { x: 66.06 - CENTER, y: 52.86 - CENTER };
const MAX_OFFSET = 14;

export default function Eye({
  className,
  ring = "#22262b",
  ringOpacity = 1,
  reach = 60,
}: {
  className?: string;
  ring?: string;
  ringOpacity?: number;
  // Pointer distance (in mark units) at which the iris reaches full travel.
  reach?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const x = useSpring(dx, { stiffness: 120, damping: 15 });
  const y = useSpring(dy, { stiffness: 120, damping: 15 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const svg = ref.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scale = rect.height / SIZE;
      const vx = e.clientX - (rect.left + CENTER * scale);
      const vy = e.clientY - (rect.top + CENTER * scale);
      const dist = Math.hypot(vx, vy);
      if (dist === 0) return;
      const travel = MAX_OFFSET * Math.min(1, dist / (reach * scale));
      dx.set((vx / dist) * travel - IRIS_REST.x);
      dy.set((vy / dist) * travel - IRIS_REST.y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, dx, dy, reach]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      aria-hidden
    >
      <circle cx={CENTER} cy={CENTER} r={CENTER} fill={ring} fillOpacity={ringOpacity} />
      <circle cx={CENTER} cy={CENTER} r="39.18" fill="#fff" />
      <motion.g style={{ x, y }}>
        <circle cx="66.06" cy="52.86" r="23.93" fill="#5a5aff" />
        <circle cx="74.01" cy="43.74" r="13.21" fill="#fff" />
      </motion.g>
    </svg>
  );
}
