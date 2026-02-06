import { onBoardUser } from "@/modules/auth/actions";
import HeroSection from "@/modules/home/components/hero-section";
import StatsSection from "@/modules/home/components/stats-section";
import FeaturesSection from "@/modules/home/components/features-section";
import ProblemCategoriesSection from "@/modules/home/components/problem-categories-section";
import HowItWorksSection from "@/modules/home/components/how-it-works-section";
import CTASection from "@/modules/home/components/cta-section";
import Footer from "@/modules/home/components/footer";

export default async function Home() {
  await onBoardUser();

  return (
    <div className="min-h-screen transition-colors mt-20">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ProblemCategoriesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}