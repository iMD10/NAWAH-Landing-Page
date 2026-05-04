import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden" style={{ background: "var(--bg-page)" }}>
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
    </div>
  );
}
