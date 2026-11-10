import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Directory from "@/components/Directory";
import Close from "@/components/Close";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Industries · RepFlow",
  description:
    "HVAC, electrical, plumbing and PVF, fire protection, waterworks, industrial and MRO, and foodservice equipment. Tools built around how each trade actually sells.",
};

export default function IndustriesPage() {
  return (
    <>
      <Nav />
      <main>
        <Directory
          eyebrow="Industries"
          headline="Built for how each trade"
          accent="actually sells."
          subhead="HVAC is where this started. The same builders work in every trade that sells through independent reps and distributors."
          ctaLabel="Talk about your trade"
          sheetTitle="Built for"
          sheetFoot="Set up for your lines and your territory"
          kind="industries"
        />
        <Close />
      </main>
      <Footer />
    </>
  );
}
