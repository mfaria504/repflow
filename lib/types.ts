import type { LucideIcon } from "lucide-react";

export type Accent = "brass" | "blueprint" | "steel";

export type Pattern =
  | "radial-rings"
  | "circuit-trace"
  | "dot-grid"
  | "wave-lines"
  | "diagonal-hatch"
  | "orbit-arc";

export type Pillar = "build" | "run" | "solve";

export type DirectoryEntry = {
  slug: string;
  label: string;
  icon: LucideIcon;
  accent: Accent;
  pattern: Pattern;
  blurb: string;
  headline: string;
  body: string;
  bullets: string[];
  // Which of the three jobs (Build / Run / Solve) this capability serves.
  // Only set for services; industries entries leave it unset.
  pillar?: Pillar;
};
