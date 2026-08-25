import type { LucideIcon } from "lucide-react";

export type DirectoryEntry = {
  slug: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  headline: string;
  body: string;
  bullets: string[];
};
