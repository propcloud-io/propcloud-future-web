
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetricCard from '@/components/Dashboard/MetricCard';
import MiniChart from '@/components/Dashboard/MiniChart';
import ChatAssistant from '@/components/Dashboard/ChatAssistant';
import DetailedView from '@/components/Dashboard/DetailedView';
import AbstractAccent from '@/components/AbstractAccent';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingActionButton from '@/components/InteractiveElements/FloatingActionButton';
import MagneticButton from '@/components/InteractiveElements/MagneticButton';
import ScrollProgressBar from '@/components/InteractiveElements/ScrollProgressBar';
import AdvancedParticles from '@/components/InteractiveElements/AdvancedParticles';
import FloatingGeometry from '@/components/InteractiveElements/FloatingGeometry';
import AnimatedGradient from '@/components/InteractiveElements/AnimatedGradient';
import GlassMorphCard from '@/components/InteractiveElements/GlassMorphCard';
import { 
  Home, 
  DollarSign, 
  Users, 
  Star, 
  Calendar, 
  Wrench,
  TrendingUp,
  MessageCircle,
  Sparkles
} from 'lucide-react';

const mockChartData = [65, 72, 68, 75, 80, 78, 91];

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState<string | null>(null);

  const handleCardClick = (type: string) => {
    setSelectedView(type);
  };

  const handleCloseView = () => {
    setSelectedView(null);
  };

  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  useEffect(() => {
    // Update page-specific metadata for dashboard
    document.title = "Your Dashboard | PropCloud";
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/app');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <ScrollProgressBar />
      <Header />
      
      <main className="flex-1 pt-24 pb-32 relative">
        {/* Simplified background system with consistent colors */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <AnimatedGradient variant="dark" intensity="medium" />
          <AdvancedParticles density="dense" color="gradient" className="opacity-30" />
          <FloatingGeometry variant="mixed" className="opacity-20" />
          
          {/* Consistent light rays - only teal and dark blue */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-teal-400/15 to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-700/15 to-transparent" />
          
          {/* Simplified floating elements with consistent colors */}
          <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-r from-teal-500/20 to-slate-900/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-gradient-to-r from-slate-900/20 to-teal-400/15 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-white/10 to-teal-500/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        {/* Simplified neural network pattern with consistent colors */}
        <div className="absolute inset-0 opacity-5 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="neural-network" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="3" fill="#14b8a6" opacity="0.4"/>
                <circle cx="25" cy="25" r="2" fill="#0f172a" opacity="0.3"/>
                <circle cx="75" cy="75" r="2" fill="#ffffff" opacity="0.2"/>
                <line x1="25" y1="25" x2="50" y2="50" stroke="#14b8a6" strokeWidth="0.5" opacity="0.2"/>
                <line x1="50" y1="50" x2="75" y2="75" stroke="#0f172a" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-network)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced page header */}
          <div className="mb-12 text-center relative">
            <GlassMorphCard variant="dark" className="p-12 max-w-4xl mx-auto">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-teal-500 to-slate-700 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-teal-300 to-slate-300 bg-clip-text text-transparent mb-6 animate-fade-up">
                Performance Overview
              </h1>
              <p className="text-white/80 text-xl animate-fade-up leading-relaxed" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                Monitor your properties and track key metrics in real-time
              </p>
            </GlassMorphCard>
          </div>

          {/* Enhanced metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative">
            <div className="transform hover:scale-105 transition-all duration-300 relative">
              <MetricCard
                icon={<Home size={24} className="text-teal-400" />}
                label="Properties Under Management"
                value="8 Properties"
                subtext="Active listings"
                delay={0.1}
                clickable={true}
                onClick={() => handleCardClick('properties')}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.1s'}}>
              <MetricCard
                icon={<DollarSign size={24} className="text-teal-400" />}
                label="Monthly Revenue"
                value="$14,800"
                subtext="Revenue this month"
                delay={0.2}
                isLive={true}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.2s'}}>
              <MetricCard
                icon={<Users size={24} className="text-slate-600" />}
                label="Occupancy Rate"
                value="91%"
                subtext="Across all units"
                delay={0.3}
                isLive={true}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.3s'}}>
              <MetricCard
                icon={<Star size={24} className="text-teal-400" />}
                label="Guest Satisfaction"
                value="4.8 / 5 ⭐"
                subtext="Based on guest feedback"
                delay={0.4}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.4s'}}>
              <MetricCard
                icon={<Calendar size={24} className="text-slate-600" />}
                label="Upcoming Turnovers"
                value="5 Turnovers"
                subtext="Scheduled cleanings"
                delay={0.5}
                clickable={true}
                onClick={() => handleCardClick('turnovers')}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.5s'}}>
              <MetricCard
                icon={<Wrench size={24} className="text-teal-400" />}
                label="Open Maintenance Issues"
                value="2 Issues"
                subtext="Pending resolution"
                delay={0.6}
                clickable={true}
                onClick={() => handleCardClick('maintenance')}
              />
            </div>
          </div>

          {/* Enhanced booking trend chart */}
          <div className="mb-16 relative">
            <GlassMorphCard 
              variant="dark"
              className="p-10 overflow-hidden"
            >
              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-500/20 to-slate-900/20 shadow-xl backdrop-blur-sm border border-teal-400/20">
                  <TrendingUp size={32} className="text-teal-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Booking Trend (Last 7 Days)</h3>
                  <p className="text-white/70">Daily occupancy percentage • Live updates</p>
                </div>
              </div>
              <MiniChart data={mockChartData} />
            </GlassMorphCard>
          </div>

          {/* Enhanced AI Chat Assistant */}
          <div className="animate-fade-up mb-16 transform hover:scale-[1.02] transition-all duration-300 relative">
            <ChatAssistant />
          </div>

          {/* Premium CTA Section */}
          <GlassMorphCard 
            variant="dark" 
            className="p-12 text-center overflow-hidden mb-20"
          >
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-teal-300 to-slate-300 bg-clip-text text-transparent">
                Want to see your data here?
              </h3>
              <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
                Get this dashboard for your properties and start maximizing your revenue with AI-powered insights.
              </p>
              <MagneticButton
                className="inline-block rounded-2xl bg-gradient-to-r from-teal-500 to-slate-700 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl backdrop-blur-sm"
                onClick={openChatBot}
                magneticStrength={0.2}
              >
                <span className="flex items-center gap-4">
                  <MessageCircle size={28} />
                  Get Started Today
                </span>
              </MagneticButton>
            </div>
          </GlassMorphCard>
        </div>
      </main>
      
      <Footer />
      <FloatingActionButton />

      {/* Detailed View Modal */}
      {selectedView && (
        <div className="fixed inset-0 z-50">
          <DetailedView 
            type={selectedView} 
            onClose={handleCloseView} 
          />
        </div>
      )}
    </div>
  );
}
