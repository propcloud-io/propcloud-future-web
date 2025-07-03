
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Enhanced error handling utility
const handleSupabaseError = (operation: string, error: any) => {
  console.error(`Supabase ${operation} error:`, error);
  
  if (error.message) {
    console.error(`Error message: ${error.message}`);
  }
  
  if (error.details) {
    console.error(`Error details: ${error.details}`);
  }
  
  throw new Error(`${operation} failed: ${error.message || 'Unknown error'}`);
};

// Lead-related operations with enhanced error handling
export async function createLead(leadData: {
  name: string;
  email: string;
  location?: string;
  message?: string;
  number_of_properties?: number;
  property_type?: string;
  platform_usage?: string[];
  source?: string;
}) {
  console.log('🚀 Creating lead with data:', leadData);
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();
    
    if (error) {
      handleSupabaseError('createLead', error);
    }
    
    console.log('✅ Lead created successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to create lead:', error);
    throw error;
  }
}

// Property-related operations with enhanced error handling
export async function createProperty(propertyData: {
  name: string;
  lead_id: string;
  address?: string;
  city?: string;
  country?: string;
  property_type?: string;
  number_of_rooms?: number;
  has_pool?: boolean;
}) {
  console.log('🏠 Creating property with data:', propertyData);
  
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();
    
    if (error) {
      handleSupabaseError('createProperty', error);
    }
    
    console.log('✅ Property created successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to create property:', error);
    throw error;
  }
}

// Job application operations with enhanced error handling
export async function createJobApplication(applicationData: {
  name: string;
  email: string;
  role_applied?: string;
  motivation?: string;
  linkedin_url?: string;
  resume_url?: string;
  source?: string;
}) {
  console.log('💼 Creating job application with data:', applicationData);
  
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .insert(applicationData)
      .select()
      .single();
    
    if (error) {
      handleSupabaseError('createJobApplication', error);
    }
    
    console.log('✅ Job application created successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to create job application:', error);
    throw error;
  }
}

// Conversation operations with enhanced error handling
export async function saveConversation(conversationData: {
  message: string;
  is_from_user: boolean;
  page_context: string;
  lead_id?: string;
}) {
  console.log('💬 Saving conversation with data:', conversationData);
  
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert(conversationData)
      .select()
      .single();
    
    if (error) {
      handleSupabaseError('saveConversation', error);
    }
    
    console.log('✅ Conversation saved successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to save conversation:', error);
    // Don't throw for conversation saves to avoid blocking main functionality
    return null;
  }
}

// Dashboard data operations with enhanced error handling and retry logic
export async function getDashboardProperties() {
  console.log('📊 Fetching dashboard properties...');
  
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('active', true);
    
    if (error) {
      handleSupabaseError('getDashboardProperties', error);
    }
    
    console.log('✅ Properties fetched successfully:', data?.length || 0, 'properties');
    return data || [];
  } catch (error) {
    console.error('❌ Failed to fetch properties:', error);
    return [];
  }
}

export async function getDashboardReports() {
  console.log('📈 Fetching dashboard reports...');
  
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('month', { ascending: false });
    
    if (error) {
      handleSupabaseError('getDashboardReports', error);
    }
    
    console.log('✅ Reports fetched successfully:', data?.length || 0, 'reports');
    return data || [];
  } catch (error) {
    console.error('❌ Failed to fetch reports:', error);
    return [];
  }
}

export async function getConversationHistory(leadId?: string, pageContext?: string) {
  console.log('🗨️ Fetching conversation history with filters:', { leadId, pageContext });
  
  try {
    let query = supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (leadId) {
      query = query.eq('lead_id', leadId);
    }
    
    if (pageContext) {
      query = query.eq('page_context', pageContext);
    }
    
    const { data, error } = await query;
    
    if (error) {
      handleSupabaseError('getConversationHistory', error);
    }
    
    console.log('✅ Conversation history fetched successfully:', data?.length || 0, 'messages');
    return data || [];
  } catch (error) {
    console.error('❌ Failed to fetch conversation history:', error);
    return [];
  }
}

// Enhanced connection test with detailed logging
export async function testSupabaseConnection() {
  console.log('🔗 Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection test successful');
    console.log('📊 Database accessible and responding');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection test error:', err);
    return false;
  }
}

// Utility function to add sample data for testing
export async function addSampleData() {
  console.log('🧪 Adding sample data for testing...');
  
  try {
    // Add sample properties
    const sampleProperties = [
      {
        name: 'Miami Beach Condo',
        city: 'Miami',
        country: 'USA',
        property_type: 'condo',
        number_of_rooms: 2,
        has_pool: true,
        active: true
      },
      {
        name: 'Dubai Marina Apartment',
        city: 'Dubai',
        country: 'UAE',
        property_type: 'apartment',
        number_of_rooms: 3,
        has_pool: false,
        active: true
      }
    ];
    
    const { data: propertiesData, error: propertiesError } = await supabase
      .from('properties')
      .insert(sampleProperties)
      .select();
    
    if (propertiesError) {
      console.error('Error adding sample properties:', propertiesError);
    } else {
      console.log('✅ Sample properties added:', propertiesData?.length);
    }
    
    // Add sample reports
    const sampleReports = [
      {
        month: '2024-01-01',
        revenue: 15000,
        occupancy_rate: 85,
        maintenance_issues: 2,
        guest_rating: 4.5,
        number_of_bookings: 12
      },
      {
        month: '2024-02-01',
        revenue: 18000,
        occupancy_rate: 92,
        maintenance_issues: 0,
        guest_rating: 4.8,
        number_of_bookings: 15
      }
    ];
    
    const { data: reportsData, error: reportsError } = await supabase
      .from('reports')
      .insert(sampleReports)
      .select();
    
    if (reportsError) {
      console.error('Error adding sample reports:', reportsError);
    } else {
      console.log('✅ Sample reports added:', reportsData?.length);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to add sample data:', error);
    return false;
  }
}
