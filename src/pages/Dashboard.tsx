
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, DollarSign, TrendingUp, Home, AlertTriangle, Calendar, Users } from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';
import MiniChart from '@/components/Dashboard/MiniChart';
import ChatAssistant from '@/components/Dashboard/ChatAssistant';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getDashboardMetrics, getPropertyReports, getLeadsCount, type DashboardMetrics, type PropertyReport } from '@/components/Dashboard/DashboardService';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [propertyReports, setPropertyReports] = useState<PropertyReport[]>([]);
  const [leadsCount, setLeadsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [metricsData, reportsData, leads] = await Promise.all([
        getDashboardMetrics(),
        getPropertyReports(),
        getLeadsCount()
      ]);
      
      setMetrics(metricsData);
      setPropertyReports(reportsData);
      setLeadsCount(leads);
      console.log('Dashboard data loaded:', { metricsData, reportsData, leads });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sample chart data for revenue trends
  const chartData = [85, 89, 78, 95, 88, 92, 85, 90];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-teal-50/60"></div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Property Dashboard</h1>
          <p className="text-slate-600">Real-time insights into your property portfolio performance</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<DollarSign className="w-6 h-6 text-teal-600" />}
            label="Total Revenue"
            value={`$${metrics?.totalRevenue.toLocaleString() || '0'}`}
            subtext="This month"
            delay={0.1}
            isLive={true}
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6 text-teal-600" />}
            label="Avg Occupancy"
            value={`${metrics?.averageOccupancy || 0}%`}
            subtext="Across all properties"
            delay={0.2}
            isLive={true}
          />
          <MetricCard
            icon={<Home className="w-6 h-6 text-teal-600" />}
            label="Total Properties"
            value={metrics?.totalProperties.toString() || '0'}
            subtext="Active listings"
            delay={0.3}
          />
          <MetricCard
            icon={<AlertTriangle className="w-6 h-6 text-teal-600" />}
            label="Maintenance Issues"
            value={metrics?.maintenanceIssues.toString() || '0'}
            subtext="Requires attention"
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trends Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/80">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Occupancy Trends</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>Live Data</span>
              </div>
            </div>
            <MiniChart data={chartData} />
          </div>

          {/* Leads Overview */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/80">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Lead Generation</h2>
              <Users className="w-5 h-5 text-teal-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-teal-700">{leadsCount}</div>
                <div className="text-sm text-slate-600">Total Leads</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-slate-700">{metrics?.recentBookings || 0}</div>
                <div className="text-sm text-slate-600">Recent Bookings</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Performance Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/80">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Property Performance</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyReports.slice(0, 6).map((property, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{property.property_name}</TableCell>
                      <TableCell>${property.revenue.toLocaleString()}</TableCell>
                      <TableCell>{property.occupancy_rate}%</TableCell>
                      <TableCell>{property.guest_rating}/5</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* AI Chat Assistant */}
          <ChatAssistant />
        </div>
      </div>
    </div>
  );
}
