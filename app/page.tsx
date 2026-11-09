import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WishFlow from "@/components/WishFlow";
import WhyNow from "@/components/WhyNow";
import WhatWeDo from "@/components/WhatWeDo";
import Builders from "@/components/Builders";
import FieldReport from "@/components/FieldReport";
import Worth from "@/components/Worth";
import Pricing from "@/components/Pricing";
import WhoFor from "@/components/WhoFor";
import Close from "@/components/Close";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WishFlow />
        <WhyNow />
        <WhatWeDo />
        <Builders />
        <FieldReport />
        <Worth />
        <Pricing />
        <WhoFor />
        <Close />
      </main>
      <Footer />
    </>
  );
}
