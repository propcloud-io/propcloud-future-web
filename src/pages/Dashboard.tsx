import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetricCard from '@/components/Dashboard/MetricCard';
import MiniChart from '@/components/Dashboard/MiniChart';
import ChatAssistant from '@/components/Dashboard/ChatAssistant';
import DetailedView from '@/components/Dashboard/DetailedView';
import AbstractAccent from '@/components/AbstractAccent';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-teal-50/60 flex flex-col relative overflow-hidden">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 relative">
        <AbstractAccent position="top" color="blue" className="opacity-40" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-gradient-to-br from-teal-300/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-56 h-56 bg-gradient-to-br from-slate-300/50 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-teal-200/40 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dashboard-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#14b8a6" opacity="0.4"/>
                <circle cx="10" cy="10" r="0.5" fill="#1e293b" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dashboard-dots)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Page Header */}
          <div className="mb-8 text-center relative">
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent mb-3 animate-fade-up">
                Performance Overview
              </h1>
              <p className="text-gray-600 text-lg animate-fade-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                Monitor your properties and track key metrics in real-time
              </p>
            </div>
          </div>

          {/* Performance Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
          <div className="mb-12">
            <div 
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/60 animate-fade-up hover:shadow-3xl transition-all duration-500"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-lg">
                  <TrendingUp size={28} className="text-teal-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Booking Trend (Last 7 Days)</h3>
                  <p className="text-sm text-gray-600">Daily occupancy percentage • Live updates</p>
                </div>
              </div>
              <MiniChart data={mockChartData} />
            </div>
          </div>

          {/* Enhanced AI Chat Assistant */}
          <div 
            className="animate-fade-up mb-12"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <ChatAssistant />
          </div>

          {/* Enhanced CTA Section */}
          <div 
            className="relative bg-gradient-to-br from-slate-800 via-propcloud-700 to-teal-600 rounded-3xl p-10 text-center text-white animate-fade-up shadow-2xl overflow-hidden"
            style={{ animationDelay: "0.9s", animationFillMode: "both" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Want to see your data here?</h3>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get this dashboard for your properties and start maximizing your revenue with AI-powered insights.
              </p>
              <button
                onClick={openChatBot}
                className="inline-block rounded-2xl bg-white text-slate-800 font-bold px-10 py-5 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle size={24} />
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
