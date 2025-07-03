
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
import AdvancedParticles from "@/components/InteractiveElements/AdvancedParticles";
import FloatingGeometry from "@/components/InteractiveElements/FloatingGeometry";
import AnimatedGradient from "@/components/InteractiveElements/AnimatedGradient";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative">
      <ScrollProgressBar />
      
      {/* Advanced background system */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedGradient variant="primary" intensity="medium" />
        <AdvancedParticles density="medium" color="gradient" className="opacity-60" />
        <FloatingGeometry variant="mixed" className="opacity-40" />
        
        {/* Dynamic flowing elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
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

        {/* TESTIMONIALS with enhanced styling */}
        <section id="testimonials" className="py-16 lg:py-24 relative overflow-hidden">
          <AnimatedGradient variant="secondary" intensity="medium" />
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
