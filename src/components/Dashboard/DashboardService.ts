
import { supabase } from '@/integrations/supabase/client';

export interface DashboardMetrics {
  totalRevenue: number;
  averageOccupancy: number;
  totalProperties: number;
  maintenanceIssues: number;
  recentBookings: number;
}

export interface PropertyReport {
  property_name: string;
  revenue: number;
  occupancy_rate: number;
  maintenance_issues: number;
  guest_rating: number;
  number_of_bookings: number;
  month: string;
}

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  console.log('Fetching dashboard metrics...');
  
  try {
    // Get all reports for current month calculation
    const { data: reports, error: reportsError } = await supabase
      .from('reports')
      .select(`
        revenue,
        occupancy_rate,
        maintenance_issues,
        number_of_bookings,
        properties!inner(name)
      `)
      .order('created_at', { ascending: false });

    if (reportsError) {
      console.error('Error fetching reports:', reportsError);
      throw reportsError;
    }

    // Get total properties count
    const { count: propertiesCount, error: propertiesError } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    if (propertiesError) {
      console.error('Error fetching properties count:', propertiesError);
      throw propertiesError;
    }

    // Calculate metrics from reports
    const totalRevenue = reports?.reduce((sum, report) => sum + (report.revenue || 0), 0) || 0;
    const averageOccupancy = reports?.length > 0 
      ? reports.reduce((sum, report) => sum + (report.occupancy_rate || 0), 0) / reports.length 
      : 0;
    const totalMaintenanceIssues = reports?.reduce((sum, report) => sum + (report.maintenance_issues || 0), 0) || 0;
    const recentBookings = reports?.reduce((sum, report) => sum + (report.number_of_bookings || 0), 0) || 0;

    const metrics: DashboardMetrics = {
      totalRevenue: Math.round(totalRevenue),
      averageOccupancy: Math.round(averageOccupancy),
      totalProperties: propertiesCount || 0,
      maintenanceIssues: totalMaintenanceIssues,
      recentBookings
    };

    console.log('Dashboard metrics calculated:', metrics);
    return metrics;
  } catch (error) {
    console.error('Error calculating dashboard metrics:', error);
    // Return mock data as fallback
    return {
      totalRevenue: 17910,
      averageOccupancy: 82,
      totalProperties: 8,
      maintenanceIssues: 2,
      recentBookings: 24
    };
  }
};

export const getPropertyReports = async (): Promise<PropertyReport[]> => {
  console.log('Fetching property reports...');
  
  try {
    const { data: reports, error } = await supabase
      .from('reports')
      .select(`
        revenue,
        occupancy_rate,
        maintenance_issues,
        guest_rating,
        number_of_bookings,
        month,
        properties!inner(name)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching property reports:', error);
      throw error;
    }

    const propertyReports: PropertyReport[] = reports?.map(report => ({
      property_name: (report.properties as any)?.name || 'Unknown Property',
      revenue: report.revenue || 0,
      occupancy_rate: report.occupancy_rate || 0,
      maintenance_issues: report.maintenance_issues || 0,
      guest_rating: report.guest_rating || 0,
      number_of_bookings: report.number_of_bookings || 0,
      month: report.month
    })) || [];

    console.log('Property reports fetched:', propertyReports);
    return propertyReports;
  } catch (error) {
    console.error('Error fetching property reports:', error);
    // Return mock data as fallback
    return [
      {
        property_name: 'Villa Nova',
        revenue: 3420,
        occupancy_rate: 95,
        maintenance_issues: 0,
        guest_rating: 4.8,
        number_of_bookings: 12,
        month: '2025-01-01'
      },
      {
        property_name: 'Ocean View',
        revenue: 2890,
        occupancy_rate: 88,
        maintenance_issues: 1,
        guest_rating: 4.6,
        number_of_bookings: 10,
        month: '2025-01-01'
      }
    ];
  }
};

export const getLeadsCount = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching leads count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error fetching leads count:', error);
    return 0;
  }
};
