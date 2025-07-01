
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetricCard from '@/components/Dashboard/MetricCard';
import MiniChart from '@/components/Dashboard/MiniChart';
import ChatAssistant from '@/components/Dashboard/ChatAssistant';
import { 
  Home, 
  DollarSign, 
  Users, 
  Star, 
  Calendar, 
  Wrench,
  TrendingUp
} from 'lucide-react';

const mockChartData = [65, 72, 68, 75, 80, 78, 91];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Overview</h1>
            <p className="text-gray-600">Monitor your properties and track key metrics</p>
          </div>

          {/* Performance Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <MetricCard
              icon={<Home size={24} className="text-teal-600" />}
              label="Properties Under Management"
              value="8 Properties"
              subtext="Active listings"
              delay={0.1}
            />
            
            <MetricCard
              icon={<DollarSign size={24} className="text-teal-600" />}
              label="Monthly Revenue"
              value="$14,800"
              subtext="Revenue this month"
              delay={0.2}
            />
            
            <MetricCard
              icon={<Users size={24} className="text-teal-600" />}
              label="Occupancy Rate"
              value="91%"
              subtext="Across all units"
              delay={0.3}
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
            />
            
            <MetricCard
              icon={<Wrench size={24} className="text-teal-600" />}
              label="Open Maintenance Issues"
              value="2 Issues"
              subtext="Pending resolution"
              delay={0.6}
            />
          </div>

          {/* Booking Trend Chart */}
          <div className="mb-12">
            <div 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-up"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100">
                  <TrendingUp size={24} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Booking Trend (Last 7 Days)</h3>
                  <p className="text-sm text-gray-500">Daily occupancy percentage</p>
                </div>
              </div>
              <MiniChart data={mockChartData} />
            </div>
          </div>

          {/* AI Chat Assistant */}
          <div 
            className="animate-fade-up"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <ChatAssistant />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
