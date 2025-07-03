
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AISection from "@/components/sections/AISection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollProgressBar from "@/components/InteractiveElements/ScrollProgressBar";
import ParallaxSection from "@/components/InteractiveElements/ParallaxSection";
import GlowingOrb from "@/components/InteractiveElements/GlowingOrb";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col font-sans overflow-x-hidden relative">
      <ScrollProgressBar />
      
      {/* Interactive background orbs - Enhanced visibility with teal colors on white background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <GlowingOrb 
          size={300} 
          color="#14b8a6" 
          intensity={0.5}
          className="top-20 -left-20"
        />
        <GlowingOrb 
          size={200} 
          color="#0f766e" 
          intensity={0.4}
          className="top-1/2 -right-20"
        />
        <GlowingOrb 
          size={150} 
          color="#134e4a" 
          intensity={0.3}
          className="bottom-1/4 left-1/4"
          animate={false}
        />
      </div>

      <Header />
      <main className="relative z-10">
        <ParallaxSection speed={0.2}>
          <HeroSection />
        </ParallaxSection>
        
        <ParallaxSection speed={0.1}>
          <ServicesSection />
        </ParallaxSection>
        
        <ParallaxSection speed={0.15}>
          <HowItWorksSection />
        </ParallaxSection>
        
        <ParallaxSection speed={0.1}>
          <AISection />
        </ParallaxSection>

        {/* TESTIMONIALS - Enhanced background contrast */}
        <section id="testimonials" className="py-16 lg:py-24 bg-gradient-to-br from-slate-100 via-white to-teal-50">
          <ParallaxSection speed={0.05}>
            <Testimonials />
          </ParallaxSection>
        </section>

        <ParallaxSection speed={0.1}>
          <ContactSection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
}
