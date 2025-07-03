
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetricCard from '@/components/Dashboard/MetricCard';
import MiniChart from '@/components/Dashboard/MiniChart';
import ChatAssistant from '@/components/Dashboard/ChatAssistant';
import DetailedView from '@/components/Dashboard/DetailedView';
import AbstractAccent from '@/components/AbstractAccent';
import ParticleBackground from '@/components/ParticleBackground';
import { 
  Home, 
  DollarSign, 
  Users, 
  Star, 
  Calendar, 
  Wrench,
  TrendingUp,
  MessageCircle
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
      <Header />
      
      <main className="flex-1 pt-24 pb-16 relative">
        <AbstractAccent position="top" color="blue" className="opacity-60" />
        <ParticleBackground density="medium" className="opacity-30" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/6 w-56 h-56 bg-gradient-to-br from-teal-300/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-gradient-to-br from-slate-300/50 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-teal-200/40 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-15">
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
          {/* Enhanced Page Header */}
          <div className="mb-12 text-center relative">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/60 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent mb-4 animate-fade-up">
                Performance Overview
              </h1>
              <p className="text-gray-600 text-xl animate-fade-up leading-relaxed" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                Monitor your properties and track key metrics in real-time
              </p>
            </div>
          </div>

          {/* Performance Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <MetricCard
              icon={<Home size={24} className="text-teal-600" />}
              label="Properties Under Management"
              value="8 Properties"
              subtext="Active listings"
              delay={0.1}
              clickable={true}
              onClick={() => handleCardClick('properties')}
            />
            
            <MetricCard
              icon={<DollarSign size={24} className="text-teal-600" />}
              label="Monthly Revenue"
              value="$14,800"
              subtext="Revenue this month"
              delay={0.2}
              isLive={true}
            />
            
            <MetricCard
              icon={<Users size={24} className="text-teal-600" />}
              label="Occupancy Rate"
              value="91%"
              subtext="Across all units"
              delay={0.3}
              isLive={true}
            />
            
            <MetricCard
              icon={<Star size={24} className="text-teal-600" />}
              label="Guest Satisfaction"
              value="4.8 / 5 ⭐"
              subtext="Based on guest feedback"
              delay={0.4}
            />
            
            <MetricCard
              icon={<Calendar size={24} className="text-teal-600" />}
              label="Upcoming Turnovers"
              value="5 Turnovers"
              subtext="Scheduled cleanings"
              delay={0.5}
              clickable={true}
              onClick={() => handleCardClick('turnovers')}
            />
            
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

          {/* Enhanced Booking Trend Chart */}
          <div className="mb-16">
            <div 
              className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/60 animate-fade-up hover:shadow-3xl transition-all duration-500"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-6 mb-10">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-xl">
                  <TrendingUp size={32} className="text-teal-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Trend (Last 7 Days)</h3>
                  <p className="text-gray-600">Daily occupancy percentage • Live updates</p>
                </div>
              </div>
              <MiniChart data={mockChartData} />
            </div>
          </div>

          {/* Enhanced AI Chat Assistant */}
          <div 
            className="animate-fade-up mb-16"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <ChatAssistant />
          </div>

          {/* Enhanced CTA Section */}
          <div 
            className="relative bg-gradient-to-br from-white/95 via-teal-50/90 to-slate-50/95 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl border border-white/60 animate-fade-up overflow-hidden"
            style={{ animationDelay: "0.9s", animationFillMode: "both" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100/30 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent">Want to see your data here?</h3>
              <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Get this dashboard for your properties and start maximizing your revenue with AI-powered insights.
              </p>
              <button
                onClick={openChatBot}
                className="inline-block rounded-2xl bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-4">
                  <MessageCircle size={28} />
                  Get Started Today
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Detailed View Modal */}
      {selectedView && (
        <DetailedView 
          type={selectedView} 
          onClose={handleCloseView} 
        />
      )}
    </div>
  );
}
