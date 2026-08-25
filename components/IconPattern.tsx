import type { Pattern } from "@/lib/types";

// A small, disciplined set of technical micro-patterns, drawn once and
// assigned per item by content fit (radial-rings for airflow/broadcast,
// circuit-trace for systems, dot-grid for records, wave-lines for flow,
// diagonal-hatch for spec/hazard precision, orbit-arc for network/orbit).
// Each renders in the item's accent color via currentColor, so the same
// six shapes recombine with three accent colors into distinct badges
// without introducing new visual vocabulary per item.
const SHAPES: Record<Pattern, React.ReactNode> = {
  "radial-rings": (
    <>
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="50" r="24" />
      <circle cx="50" cy="50" r="40" />
    </>
  ),
  "circuit-trace": (
    <>
      <path d="M15 88 V50 H50" />
      <path d="M88 15 V45 H55" />
      <circle cx="15" cy="88" r="4" fill="currentColor" stroke="none" />
      <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
      <circle cx="88" cy="15" r="4" fill="currentColor" stroke="none" />
      <circle cx="55" cy="45" r="4" fill="currentColor" stroke="none" />
    </>
  ),
  "dot-grid": (
    <>
      {[15, 38, 61, 84].flatMap((cy) =>
        [15, 38, 61, 84].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} fill="currentColor" stroke="none" />
        )),
      )}
    </>
  ),
  "wave-lines": (
    <>
      <path d="M5 28 Q 27 13, 50 28 T 95 28" />
      <path d="M5 54 Q 27 39, 50 54 T 95 54" />
      <path d="M5 80 Q 27 65, 50 80 T 95 80" />
    </>
  ),
  "diagonal-hatch": (
    <>
      <path d="M0 80 L20 100" />
      <path d="M0 50 L50 100" />
      <path d="M0 20 L80 100" />
      <path d="M20 0 L100 80" />
      <path d="M50 0 L100 50" />
      <path d="M80 0 L100 20" />
    </>
  ),
  "orbit-arc": (
    <>
      <circle
        cx="50"
        cy="50"
        r="35"
        strokeDasharray="140 80"
        transform="rotate(-40 50 50)"
      />
      <circle cx="82" cy="30" r="5" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function IconPattern({
  pattern,
  className,
}: {
  pattern: Pattern;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {SHAPES[pattern]}
    </svg>
  );
}

// Tiny 10x10 glyphs echoing each pattern's shape, for use as a list-item
// marker in place of a generic dot, so even the bullet marks carry the
// item's identity.
const MARKERS: Record<Pattern, React.ReactNode> = {
  "radial-rings": (
    <>
      <circle cx="5" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="5" cy="5" r="3.6" strokeWidth={1} />
    </>
  ),
  "circuit-trace": (
    <>
      <path d="M2 8 V5 H8" strokeWidth={1.4} />
      <circle cx="2" cy="8" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="8" cy="5" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  "dot-grid": (
    <>
      <circle cx="3" cy="3" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="3" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="3" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  "wave-lines": <path d="M1 5.5 Q 3 2.5, 5 5.5 T 9 5.5" strokeWidth={1.4} />,
  "diagonal-hatch": <path d="M2 8 L8 2" strokeWidth={1.6} />,
  "orbit-arc": (
    <>
      <circle cx="5" cy="5" r="3.6" strokeWidth={1} strokeDasharray="6 4" />
      <circle cx="8" cy="2.6" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
};

export function PatternMarker({
  pattern,
  className,
}: {
  pattern: Pattern;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {MARKERS[pattern]}
    </svg>
  );
}
