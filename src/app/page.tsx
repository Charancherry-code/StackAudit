import { FAQSection } from "@/components/landing/faq-section";
import { FeaturesGridSection } from "@/components/landing/features-grid-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { SavingsShowcaseSection } from "@/components/landing/savings-showcase-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { TrustedSection } from "@/components/landing/trusted-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main>
        <HeroSection />
        <TrustedSection />
        <HowItWorksSection />
        <SavingsShowcaseSection />
        <FeaturesGridSection />
        <FAQSection />
      </main>
      <SiteFooter />
    </div>
  );
}
