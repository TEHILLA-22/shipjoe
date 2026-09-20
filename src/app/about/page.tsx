import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

// Dossier Components
import { AboutHero } from "@/components/about/AboutHero";
import { OriginSection } from "@/components/about/OriginSection";
import { CorridorSection } from "@/components/about/CorridorSection";
import { OperationsSection } from "@/components/about/OperationsSection";
import { HumanSection } from "@/components/about/HumanSection";
import { PrinciplesSection } from "@/components/about/PrinciplesSection";
import { StandardsSection } from "@/components/about/StandardsSection";
import { PeopleSection } from "@/components/about/PeopleSection";
import { FutureSection } from "@/components/about/FutureSection";
import { ConfidenceSection } from "@/components/about/ConfidenceSection";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About | Ship Joe",
  description: "Learn about the people, principles, and process behind the Ship Joe logistics system.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <OriginSection />
        <CorridorSection />
        <OperationsSection />
        <HumanSection />
        <PrinciplesSection />
        <StandardsSection />
        <PeopleSection />
        <FutureSection />
        <ConfidenceSection />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
