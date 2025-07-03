
// Mock dashboard data service - no Supabase dependencies
export interface Property {
  id: string;
  name: string;
  city: string;
  active: boolean;
  property_type: string;
  revenue?: number;
  occupancy_rate?: number;
  bookings?: number;
}

export interface Report {
  id: string;
  month: string;
  revenue: number;
  occupancy_rate: number;
  number_of_bookings: number;
  guest_rating: number;
  maintenance_issues: number;
  property_id: string;
}

// Mock properties data
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Miami Beach Condo',
    city: 'Miami',
    active: true,
    property_type: 'condo',
    revenue: 8500,
    occupancy_rate: 85,
    bookings: 12
  },
  {
    id: '2',
    name: 'Dubai Marina Apartment',
    city: 'Dubai',
    active: true,
    property_type: 'apartment',
    revenue: 12000,
    occupancy_rate: 92,
    bookings: 18
  },
  {
    id: '3',
    name: 'London Townhouse',
    city: 'London',
    active: true,
    property_type: 'house',
    revenue: 15000,
    occupancy_rate: 78,
    bookings: 8
  },
  {
    id: '4',
    name: 'Barcelona Loft',
    city: 'Barcelona',
    active: true,
    property_type: 'loft',
    revenue: 6800,
    occupancy_rate: 88,
    bookings: 14
  }
];

// Mock reports data
const mockReports: Report[] = [
  {
    id: '1',
    month: '2024-01',
    revenue: 8500,
    occupancy_rate: 85,
    number_of_bookings: 12,
    guest_rating: 4.8,
    maintenance_issues: 2,
    property_id: '1'
  },
  {
    id: '2',
    month: '2024-01',
    revenue: 12000,
    occupancy_rate: 92,
    number_of_bookings: 18,
    guest_rating: 4.9,
    maintenance_issues: 1,
    property_id: '2'
  },
  {
    id: '3',
    month: '2024-01',
    revenue: 15000,
    occupancy_rate: 78,
    number_of_bookings: 8,
    guest_rating: 4.7,
    maintenance_issues: 3,
    property_id: '3'
  },
  {
    id: '4',
    month: '2024-01',
    revenue: 6800,
    occupancy_rate: 88,
    number_of_bookings: 14,
    guest_rating: 4.6,
    maintenance_issues: 1,
    property_id: '4'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getDashboardData(): Promise<{ properties: Property[], reports: Report[] }> {
  console.log('📊 Fetching mock dashboard data...');
  await delay(800); // Simulate API call
  
  return { 
    properties: mockProperties, 
    reports: mockReports 
  };
}

export async function getProperties(): Promise<Property[]> {
  console.log('🏠 Fetching mock properties...');
  await delay(500);
  return mockProperties;
}

export async function getReports(): Promise<Report[]> {
  console.log('📈 Fetching mock reports...');
  await delay(500);
  return mockReports;
}

// Calculate summary statistics
export function calculateSummaryStats(properties: Property[], reports: Report[]) {
  const totalRevenue = reports.reduce((sum, report) => sum + report.revenue, 0);
  const avgOccupancy = reports.reduce((sum, report) => sum + report.occupancy_rate, 0) / reports.length;
  const totalBookings = reports.reduce((sum, report) => sum + report.number_of_bookings, 0);
  const avgRating = reports.reduce((sum, report) => sum + report.guest_rating, 0) / reports.length;
  
  return {
    totalRevenue,
    avgOccupancy: Math.round(avgOccupancy),
    totalBookings,
    avgRating: Math.round(avgRating * 10) / 10,
    activeProperties: properties.filter(p => p.active).length
  };
}
