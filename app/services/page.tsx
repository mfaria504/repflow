import type { Metadata } from "next";
import Nav from "@/components/Nav";
import DirectoryHero from "@/components/DirectoryHero";
import DirectorySubNav from "@/components/DirectorySubNav";
import DirectorySection from "@/components/DirectorySection";
import Intake from "@/components/Intake";
import Footer from "@/components/Footer";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services · RepFlow",
  description:
    "Artificial intelligence, CRM implementation, automation, demand generation, marketing ops, data management, and MSP solutions, run as one system.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <DirectoryHero
          eyebrow="Services"
          headline="The full technical bench, run as one system."
          subhead="Seven capabilities, one team. Everything below runs together in practice, not as separate line items handed to separate vendors."
          ctaLabel="Talk through your stack"
          plateTitle="Service Directory"
          kind="services"
        />
        <DirectorySubNav kind="services" />
        {SERVICES.map((service, i) => (
          <DirectorySection
            key={service.slug}
            item={service}
            index={i}
            cardLabel="What's included"
          />
        ))}
        <Intake />
      </main>
      <Footer />
    </>
  );
}
