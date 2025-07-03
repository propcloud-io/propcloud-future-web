import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AISection from "@/components/sections/AISection";
import ContactSection from "@/components/sections/ContactSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col font-sans overflow-x-hidden relative">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <AISection />

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-16 lg:py-24">
          <Testimonials />
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
