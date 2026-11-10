import { Fan, Zap, Droplets, Flame, Waves, Factory, ChefHat } from "lucide-react";
import type { DirectoryEntry } from "@/lib/types";

export type Industry = DirectoryEntry;

export const INDUSTRIES: Industry[] = [
  {
    slug: "hvac",
    label: "HVAC",
    icon: Fan,
    network: "AIM/R",
    headline: "Built inside HVAC first.",
    body: "RepFlow started inside a mechanical rep agency. We built its quoting, price books and commission tracking around how HVAC reps sell: multiple lines, tiered pricing, and distributors who expect a fast, accurate quote.",
    bullets: [
      "Line cards for multiple non-competing mechanical lines",
      "Quoting against distributor and contractor price tiers",
      "Commission tracking that matches AIM/R-style rep agreements",
      "Built and tested inside a working HVAC agency",
    ],
  },
  {
    slug: "electrical",
    label: "Electrical",
    icon: Zap,
    network: "NEMRA",
    headline: "The same model, built for electrical.",
    body: "NEMRA agencies run on the same structure as mechanical reps: independent territories, non-competing lines, and distributor-driven sales. What we built for HVAC carries over. We set it up for electrical price books, panel and gear specs, and your territory map.",
    bullets: [
      "Price books for electrical gear and panel specs",
      "Territory and distributor mapping for NEMRA-style agencies",
      "Commission tracking across manufacturer lines",
      "Tools proven in HVAC, set up for electrical",
    ],
  },
  {
    slug: "plumbing-pvf",
    label: "Plumbing & PVF",
    icon: Droplets,
    network: "AIM/R",
    headline: "PVF reps already share HVAC’s world.",
    body: "Plumbing and PVF agencies overlap with HVAC through AIM/R and Supply House Times. Same wholesale distributors, same rep agreements, same quoting pressure. We build for both without starting over.",
    bullets: [
      "Price books for pipe, valve and fitting lines",
      "Quoting built around wholesale plumbing distributor pricing",
      "Distributor and contact data shared across PVF and HVAC lines",
      "Commission tracking for multi-line PVF rep agreements",
    ],
  },
  {
    slug: "fire-protection",
    label: "Fire Protection & Life Safety",
    icon: Flame,
    headline: "A smaller market where the data has to be exact.",
    body: "Fire protection and life safety runs on a tighter, more specialized rep network. The structure is the same: independent reps, non-competing lines, and distributors who expect precision. Specs and code compliance matter more here, so we build for accuracy first.",
    bullets: [
      "Price books for fire and life safety product specs",
      "Quote accuracy for code-driven, compliance-sensitive lines",
      "Commission tracking for a smaller, specialized line card",
      "Distributor and AHJ contact data kept current",
    ],
  },
  {
    slug: "waterworks",
    label: "Waterworks",
    icon: Waves,
    headline: "Built for longer sales cycles.",
    body: "Waterworks reps sell into municipalities and utilities as well as contractors and distributors. Cycles run longer and involve more people. We build pipeline and follow-up tools that hold a deal for months without anything falling through.",
    bullets: [
      "Pipeline stages for longer, multi-stakeholder sales cycles",
      "Municipal and utility contact and bid tracking",
      "Follow-up cadences that survive a six-month sales cycle",
      "Commission tracking across public and private-sector deals",
    ],
  },
  {
    slug: "industrial-mro",
    label: "Industrial & MRO Supplies",
    icon: Factory,
    headline: "A bigger, messier market, kept in one place.",
    body: "Industrial and MRO has more distributors, more SKUs and more lines than HVAC or electrical. We build one place for pricing, pipeline and commission across a sprawling line card.",
    bullets: [
      "Price books that handle high SKU counts across lines",
      "Pipeline for a fragmented, multi-distributor market",
      "Commission tracking across a large, varied line card",
      "Prospect and distributor data in one place, not five",
    ],
  },
  {
    slug: "foodservice-equipment",
    label: "Foodservice Equipment",
    icon: ChefHat,
    network: "MAFSI",
    headline: "A different trade, the same rep-agency model.",
    body: "Foodservice equipment isn’t mechanical, but it runs on the same rep-agency backbone through MAFSI: independent reps, non-competing lines, and dealer and distributor relationships. What we build fits your lines from the start.",
    bullets: [
      "Price books for foodservice equipment lines",
      "Dealer and distributor relationship tracking",
      "Commission tracking across non-competing equipment lines",
      "Tools built for your lines, not adapted from another trade",
    ],
  },
];
