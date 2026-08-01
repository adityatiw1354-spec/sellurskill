import { Navbar } from "@/components/home/navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ProvidersSection } from "@/components/home/ProvidersSection";
import { AiMatchingSection } from "@/components/home/AiMatchingSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TrustSection } from "@/components/home/TrustSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <ProvidersSection />
      <AiMatchingSection />
      <HowItWorksSection />
      <TrustSection />
      <Footer />
    </main>
  );
}