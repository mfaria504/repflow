import {
  Sparkles,
  Users,
  Workflow,
  Megaphone,
  Settings2,
  Database,
  ServerCog,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  headline: string;
  body: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "artificial-intelligence",
    label: "Artificial Intelligence",
    icon: Sparkles,
    blurb: "AI built into the tools you already run, not bolted on top.",
    headline: "AI that runs your work, not a chatbot bolted onto it.",
    body: "Applied AI built into the systems you already use: quote generation, lead scoring, document extraction, and written communications drafted from your own data. Not a demo. Production tools that run every day.",
    bullets: [
      "Quote and proposal drafting",
      "Lead and deal scoring",
      "Document and data extraction",
      "AI-assisted outreach drafting",
    ],
  },
  {
    slug: "crm-implementation",
    label: "CRM Implementation",
    icon: Users,
    blurb: "A CRM configured for your sales process, not the vendor's demo.",
    headline: "A CRM configured for how your team actually sells.",
    body: "Most CRMs get implemented once and abandoned. We configure the pipeline, fields, and automations around your real sales process, then keep it maintained as the business changes.",
    bullets: [
      "Pipeline and stage design",
      "Custom fields and objects",
      "Migration from spreadsheets or legacy tools",
      "Ongoing configuration and training",
    ],
  },
  {
    slug: "automation",
    label: "Automation",
    icon: Workflow,
    blurb: "The recurring manual work, turned into a system that runs itself.",
    headline: "The manual steps, removed.",
    body: "Every recurring task that eats an afternoon: reconciliation, data entry, follow-up reminders, status updates, becomes a system that runs itself. Built once, monitored, and fixed when something upstream changes.",
    bullets: [
      "Workflow and approval automation",
      "Cross-system data sync",
      "Scheduled reporting",
      "Error monitoring and alerts",
    ],
  },
  {
    slug: "demand-generation",
    label: "Demand Generation",
    icon: Megaphone,
    blurb: "Outbound and inbound pipeline built as a repeatable system.",
    headline: "Pipeline that doesn't depend on one person's memory.",
    body: "Outbound and inbound programs built as repeatable systems: target lists, sequences, and campaigns that run on a schedule instead of whenever there's time.",
    bullets: [
      "Outbound sequencing",
      "List building and segmentation",
      "Campaign calendars",
      "Lead routing and follow-up",
    ],
  },
  {
    slug: "marketing-ops",
    label: "Marketing Ops",
    icon: Settings2,
    blurb: "The operations layer that makes marketing numbers hold up.",
    headline: "The operations layer behind the marketing.",
    body: "Marketing tools connected and instrumented properly: tracking that's accurate, attribution that holds up, and campaigns that report real numbers instead of vanity metrics.",
    bullets: [
      "Tracking and attribution setup",
      "Campaign and asset workflows",
      "Reporting dashboards",
      "Tool stack consolidation",
    ],
  },
  {
    slug: "data-management",
    label: "Data Management",
    icon: Database,
    blurb: "Contact and account data cleaned, structured, and kept current.",
    headline: "Data you can actually trust.",
    body: "Contact and account records cleaned, deduplicated, and kept current. Structured for reporting and integration, not scattered across five spreadsheets.",
    bullets: [
      "Cleansing and deduplication",
      "Enrichment and standardization",
      "Integration between systems",
      "Governance and ongoing upkeep",
    ],
  },
  {
    slug: "msp-solutions",
    label: "MSP Solutions",
    icon: ServerCog,
    blurb: "Infrastructure and systems support, managed as a retainer.",
    headline: "The technical backbone, managed.",
    body: "Ongoing infrastructure and systems support for teams that need reliability without hiring a full internal team: uptime, security basics, and a direct line when something breaks.",
    bullets: [
      "Systems monitoring",
      "Security and access management",
      "Vendor and tool management",
      "Direct support, no ticket queue",
    ],
  },
];
