import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pillars from "@/components/Pillars";
import FieldReport from "@/components/FieldReport";
import HowItRuns from "@/components/HowItRuns";
import AiShift from "@/components/AiShift";
import Fit from "@/components/Fit";
import Intake from "@/components/Intake";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Pillars />
        <FieldReport />
        <HowItRuns />
        <AiShift />
        <Fit />
        <Intake />
      </main>
      <Footer />
    </>
  );
}
