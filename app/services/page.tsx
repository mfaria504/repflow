import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Directory from "@/components/Directory";
import Close from "@/components/Close";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services · RepFlow",
  description:
    "What RepFlow builds and keeps running for rep agencies: AI, CRM implementation, automation, demand generation, sales and marketing ops, data management, and systems support. One team of builders.",
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
          subhead="Seven capabilities, one team of builders. When someone on your team says “I wish,” this is the bench the answer comes from."
          ctaLabel="Tell us your first “I wish”"
          cardLabel="What’s included"
          kind="services"
        />
        <Close />
      </main>
      <Footer />
    </>
  );
}
