import React from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import WorksSection from "@/components/WorksSection";
import FeatureSection from "@/components/FeatureSection";
import FootprintSection from "@/components/FootprintSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import MethodSection from "@/components/MethodSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-[#0b0b0b]">
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <WorksSection />
        <FeatureSection />
        <FootprintSection />
        <ExpertiseSection />
        <MethodSection />
        <EducationSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

