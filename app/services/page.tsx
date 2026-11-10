import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Directory from "@/components/Directory";
import Close from "@/components/Close";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services · RepFlow",
  description:
    "What RepFlow builds and keeps running for rep agencies: applied AI, CRM implementation, automation, demand generation, sales and marketing ops, data management, and systems support. One team of builders.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <Directory
          eyebrow="Services"
          headline="Everything we build,"
          accent="and keep running."
          subhead="Seven things rep agencies ask us for, and one team that builds and runs them. Each starts the same way: someone says “I wish.”"
          ctaLabel="Tell us your first “I wish”"
          sheetTitle="What we build"
          sheetFoot="Built into the systems you already run"
          kind="services"
        />
        <Close />
      </main>
      <Footer />
    </>
  );
}
