import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import LineCard from "@/components/LineCard";
import FieldReport from "@/components/FieldReport";
import HowItRuns from "@/components/HowItRuns";
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
        <LineCard />
        <FieldReport />
        <HowItRuns />
        <Fit />
        <Intake />
      </main>
      <Footer />
    </>
  );
}
