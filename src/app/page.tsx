import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import SocialProof from "@/components/SocialProof";
import GlobalModal from "@/components/GlobalModal";
import Lightfall from "@/components/Lightfall";
import InitialLoader from "@/components/InitialLoader";

export default function Home() {
  return (
    <main className="min-h-screen bg-oceanic-noir text-arctic-powder selection:bg-deep-saffron selection:text-oceanic-noir font-sans relative overflow-x-hidden">
      <InitialLoader />
      {/* Background Graphic */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-screen">
        <Lightfall
          colors={["#FFC801", "#FF9932", "#D9E8E2"]}
          backgroundColor="transparent"
          speed={0.5}
          streakCount={3}
          streakWidth={1}
          streakLength={1}
          density={0.6}
          twinkle={1}
          glow={1}
          backgroundGlow={0}
          zoom={3}
          opacity={1}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={1}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <HeroSection />
        <FeatureShowcase />
        <PricingSection />
        <SocialProof />
      </div>
      <GlobalModal />
    </main>
  );
}
