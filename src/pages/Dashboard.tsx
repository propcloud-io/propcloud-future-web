
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
import GlowingOrb from '@/components/InteractiveElements/GlowingOrb';
import ScrollProgressBar from '@/components/InteractiveElements/ScrollProgressBar';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 flex flex-col relative overflow-hidden">
      <ScrollProgressBar />
      <Header />
      
      <main className="flex-1 pt-24 pb-32 relative">
        <AbstractAccent position="top" color="blue" className="opacity-60" />
        <ParticleBackground density="medium" className="opacity-30" />
        
        {/* Enhanced background visuals with darker orbs for better contrast */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <GlowingOrb 
            size={200} 
            color="#0f766e" 
            intensity={0.6}
            className="top-1/4 left-1/6"
          />
          <GlowingOrb 
            size={150} 
            color="#1e293b" 
            intensity={0.5}
            className="bottom-1/4 right-1/6"
            animate={false}
          />
          <GlowingOrb 
            size={120} 
            color="#134e4a" 
            intensity={0.7}
            className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-15 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dashboard-dots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#14b8a6" opacity="0.5"/>
                <circle cx="15" cy="15" r="1" fill="#1e293b" opacity="0.4"/>
                <circle cx="45" cy="45" r="1" fill="#0f766e" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dashboard-dots)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Page Header - Removed parallax */}
          <div className="mb-12 text-center relative">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/60 max-w-3xl mx-auto hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-8 h-8 text-teal-500 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent mb-4 animate-fade-up group-hover:scale-105 transition-transform duration-300">
                Performance Overview
              </h1>
              <p className="text-gray-600 text-xl animate-fade-up leading-relaxed group-hover:text-gray-700 transition-colors duration-300" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                Monitor your properties and track key metrics in real-time
              </p>
            </div>
          </div>

          {/* Performance Dashboard Grid - Fixed z-index without overlapping issues */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative">
            <div className="transform hover:scale-105 transition-all duration-300 relative">
              <MetricCard
                icon={<Home size={24} className="text-teal-600" />}
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
                icon={<DollarSign size={24} className="text-teal-600" />}
                label="Monthly Revenue"
                value="$14,800"
                subtext="Revenue this month"
                delay={0.2}
                isLive={true}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.2s'}}>
              <MetricCard
                icon={<Users size={24} className="text-teal-600" />}
                label="Occupancy Rate"
                value="91%"
                subtext="Across all units"
                delay={0.3}
                isLive={true}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.3s'}}>
              <MetricCard
                icon={<Star size={24} className="text-teal-600" />}
                label="Guest Satisfaction"
                value="4.8 / 5 ⭐"
                subtext="Based on guest feedback"
                delay={0.4}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300 relative" style={{animationDelay: '0.4s'}}>
              <MetricCard
                icon={<Calendar size={24} className="text-teal-600" />}
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
                icon={<Wrench size={24} className="text-teal-600" />}
                label="Open Maintenance Issues"
                value="2 Issues"
                subtext="Pending resolution"
                delay={0.6}
                clickable={true}
                onClick={() => handleCardClick('maintenance')}
              />
            </div>
          </div>

          {/* Booking Trend Chart - Removed parallax */}
          <div className="mb-16 relative">
            <div 
              className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/60 animate-fade-up hover:shadow-3xl transition-all duration-500 group overflow-hidden relative"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-50/0 via-teal-50/30 to-teal-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <TrendingUp size={32} className="text-teal-700 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">Booking Trend (Last 7 Days)</h3>
                  <p className="text-gray-600">Daily occupancy percentage • Live updates</p>
                </div>
              </div>
              <MiniChart data={mockChartData} />
            </div>
          </div>

          {/* AI Chat Assistant */}
          <div 
            className="animate-fade-up mb-16 transform hover:scale-[1.02] transition-all duration-300 relative"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <ChatAssistant />
          </div>

          {/* CTA Section - Removed parallax */}
          <div 
            className="relative bg-gradient-to-br from-white/95 via-teal-50/90 to-slate-50/95 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl border border-white/60 animate-fade-up overflow-hidden group mb-20"
            style={{ animationDelay: "0.9s", animationFillMode: "both" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent">Want to see your data here?</h3>
              <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Get this dashboard for your properties and start maximizing your revenue with AI-powered insights.
              </p>
              <MagneticButton
                className="inline-block rounded-2xl bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl"
                onClick={openChatBot}
                magneticStrength={0.2}
              >
                <span className="flex items-center gap-4">
                  <MessageCircle size={28} />
                  Get Started Today
                </span>
              </MagneticButton>
            </div>
          </div>
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
