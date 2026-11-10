import type { LucideIcon } from "lucide-react";

export type Pillar = "build" | "manage";

export type DirectoryEntry = {
  slug: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  body: string;
  bullets: string[];
  // Services only: the "I wish" this capability answers, and which half of
  // the work it belongs to.
  wish?: string;
  pillar?: Pillar;
  // Industries only: the rep association or network the trade runs through.
  network?: string;
};
