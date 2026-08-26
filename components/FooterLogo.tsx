"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

// Geometry from public/logo/repflow-logo.svg, in SVG units.
const VIEWBOX_H = 118.18;
const EYE_CENTER = { x: 59.09, y: 59.09 };
// The iris is drawn offset toward the upper-right; the tracking delta is
// applied on top of this rest position.
const IRIS_REST = { x: 66.06 - 59.09, y: 52.86 - 59.09 };
// Eyeball r 39.18 minus iris r 23.93, with a little margin so the iris
// never touches the eyeball's edge.
const MAX_OFFSET = 14;

const WORDMARK_PATHS = [
  "M129.45,94.68V25.19h20.08v24.78h.29c3.37-21.11,9.09-24.78,18.77-24.78h3.37v22.87h-7.62c-11.29,0-14.81,3.08-14.81,13.49v33.13h-20.08Z",
  "M173.43,61.4c0-24.04,13.34-38.12,35.92-38.12,21.4,0,31.81,13.63,31.81,32.55,0,3.08,0,5.42-.29,9.24h-47.5c1.32,9.97,6.6,14.37,15.98,14.37s12.32-4.54,13.93-9.97l17.3,4.84c-3.37,12.61-12.46,22.28-31.52,22.28-20.96,0-35.63-12.02-35.63-35.19ZM193.51,53.78h29.32c-.59-9.24-5.13-13.93-14.07-13.93s-13.93,4.11-15.25,13.93Z",
  "M289.68,96.74c-12.02,0-19.5-6.16-22.87-20.82h-.29v38.7h-20.08V25.19h20.08v18.77h.29c3.37-14.66,11.29-20.67,23.31-20.67,16.71,0,25.36,13.63,25.36,36.21s-8.94,37.24-25.8,37.24ZM295.69,59.65c0-11.58-4.4-18.33-14.51-18.33-9.24,0-14.66,6.3-14.66,17.74v1.32c0,11.29,5.42,18.33,14.66,18.33,9.97,0,14.51-7.04,14.51-19.06Z",
  "M346.56,25.19h14.81v16.71h-14.81v52.78h-19.94v-52.78h-9.38v-16.71h9.38v-1.03c0-13.34,7.92-22.87,25.07-22.87,5.28,0,8.36.44,11.14,1.03l-1.47,14.07c-2.35-.44-4.54-.59-6.74-.59-5.28,0-8.06,2.49-8.06,8.21v1.17Z",
  "M386.73,94.68h-20.08V4.81h20.08v89.87Z",
  "M392,59.94c0-23.16,14.07-36.65,36.07-36.65s35.92,13.49,35.92,36.65-13.63,36.8-35.92,36.8-36.07-13.93-36.07-36.8ZM412.09,59.79c0,11.29,5.57,18.62,15.83,18.62s16.13-7.33,16.13-18.62-5.86-18.33-15.98-18.33-15.98,7.18-15.98,18.33Z",
  "M533.18,52.61c2.05,8.8,3.67,17.74,5.28,27.27h.59c1.76-9.09,3.67-17.59,5.72-27.42l5.42-27.27h19.65l-19.5,69.49h-24.48l-6.3-29.91c-1.76-8.06-3.08-16.42-4.1-24.92h-.73c-1.17,8.36-2.64,17.01-4.11,24.92l-5.72,29.91h-24.63l-19.5-69.49h20.52l6.6,27.27c2.35,9.68,4.25,18.18,5.72,27.42h.59c1.61-9.53,3.23-18.47,5.13-27.27l6.01-27.42h21.84l6.01,27.42Z",
];

export default function FooterLogo({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const springX = useSpring(dx, { stiffness: 120, damping: 15 });
  const springY = useSpring(dy, { stiffness: 120, damping: 15 });

  useEffect(() => {
    if (reduced) return;
    const onMouseMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scale = rect.height / VIEWBOX_H;
      const centerX = rect.left + EYE_CENTER.x * scale;
      const centerY = rect.top + EYE_CENTER.y * scale;
      const vx = e.clientX - centerX;
      const vy = e.clientY - centerY;
      const dist = Math.hypot(vx, vy);
      if (dist === 0) return;
      // Saturate quickly so the eye commits to a direction even for a
      // nearby cursor, easing off only very close to the mark.
      const reach = MAX_OFFSET * Math.min(1, dist / (60 * scale));
      const targetX = (vx / dist) * reach;
      const targetY = (vy / dist) * reach;
      dx.set(targetX - IRIS_REST.x);
      dy.set(targetY - IRIS_REST.y);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [reduced, dx, dy]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 569.83 118.18"
      className={className}
      role="img"
      aria-label="RepFlow"
    >
      <circle
        cx="59.09"
        cy="59.09"
        r="58.59"
        fill="#22262b"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
      />
      <g fill="#fafaf8">
        {WORDMARK_PATHS.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
      </g>
      <circle cx="59.09" cy="59.09" r="39.18" fill="#fff" />
      <motion.g style={{ x: springX, y: springY }}>
        <circle cx="66.06" cy="52.86" r="23.93" fill="#5a5aff" />
        <circle cx="74.01" cy="43.74" r="13.21" fill="#fff" />
      </motion.g>
    </svg>
  );
}
