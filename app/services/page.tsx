import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
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
    "The bench behind Build, Run, and Solve: artificial intelligence, CRM implementation, automation, demand generation, sales and marketing ops, data management, and MSP support. One team.",
};

export default function ServicesPage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <DirectoryHero
          eyebrow="Services"
          headline="The bench behind Build, Run, and Solve."
          subhead="Seven capabilities, one team. Build pulls from this bench to make your tools. Run keeps the stack working month after month. And when a rep calls with a problem, this is where the answer comes from."
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
