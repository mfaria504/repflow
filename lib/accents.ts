import type { Accent } from "@/lib/types";

// Full literal class strings (not template-built) so Tailwind's scanner
// picks them up regardless of which accent a given item resolves to.
export const ACCENT_CLASSES: Record<
  Accent,
  { text: string; border: string; wash: string; shadow: string; dot: string }
> = {
  brass: {
    text: "text-brass",
    border: "border-brass/30",
    wash: "bg-brass/[0.07]",
    shadow: "hover:shadow-[0_6px_18px_rgba(199,123,39,0.22)]",
    dot: "bg-brass",
  },
  blueprint: {
    text: "text-blueprint",
    border: "border-blueprint/30",
    wash: "bg-blueprint/[0.06]",
    shadow: "hover:shadow-[0_6px_18px_rgba(43,76,111,0.22)]",
    dot: "bg-blueprint",
  },
  steel: {
    text: "text-steel",
    border: "border-steel/40",
    wash: "bg-steel/[0.08]",
    shadow: "hover:shadow-[0_6px_18px_rgba(139,143,148,0.22)]",
    dot: "bg-steel",
  },
};
