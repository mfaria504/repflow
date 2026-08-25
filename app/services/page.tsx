import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ServicesHero from "@/components/ServicesHero";
import ServicesSubNav from "@/components/ServicesSubNav";
import ServiceSection from "@/components/ServiceSection";
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
        <ServicesHero />
        <ServicesSubNav />
        {SERVICES.map((service, i) => (
          <ServiceSection key={service.slug} service={service} index={i} />
        ))}
        <Intake />
      </main>
      <Footer />
    </>
  );
}
