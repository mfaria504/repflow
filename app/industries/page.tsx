import type { Metadata } from "next";
import Nav from "@/components/Nav";
import DirectoryHero from "@/components/DirectoryHero";
import DirectorySubNav from "@/components/DirectorySubNav";
import DirectorySection from "@/components/DirectorySection";
import Intake from "@/components/Intake";
import Footer from "@/components/Footer";
import { INDUSTRIES } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries · RepFlow",
  description:
    "HVAC, electrical, plumbing and PVF, fire protection, waterworks, industrial and MRO, and foodservice equipment. The same rep-agency discipline, built for each trade.",
};

export default function IndustriesPage() {
  return (
    <>
      <Nav />
      <main>
        <DirectoryHero
          eyebrow="Industries"
          headline="One back office. Built for how each trade actually sells."
          subhead="HVAC is where this started. The same rep-agency discipline runs across every trade that sells through independent reps and distributors."
          ctaLabel="Talk about your industry"
          plateTitle="Industry Directory"
          kind="industries"
        />
        <DirectorySubNav kind="industries" />
        {INDUSTRIES.map((industry, i) => (
          <DirectorySection
            key={industry.slug}
            item={industry}
            index={i}
            cardLabel="Built for"
          />
        ))}
        <Intake />
      </main>
      <Footer />
    </>
  );
}
