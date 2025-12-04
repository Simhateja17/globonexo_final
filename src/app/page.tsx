import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LiquidBackground from "@/components/LiquidBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <LiquidBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
