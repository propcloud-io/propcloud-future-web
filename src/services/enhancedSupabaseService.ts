
import { supabase } from '@/integrations/supabase/client';
import { LeadData, JobApplicationData } from '@/types/chatbot';

// Enhanced error handling with detailed logging
const handleSupabaseError = (operation: string, error: any) => {
  console.error(`🚨 Supabase ${operation} error:`, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code
  });
  
  throw new Error(`${operation} failed: ${error.message || 'Unknown error'}`);
};

// Test connection with detailed diagnostics
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    // Test basic connectivity
    const { data, error } = await supabase
      .from('leads')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (err) {
    console.error('❌ Connection test error:', err);
    return false;
  }
}

// Enhanced lead creation with validation
export async function createEnhancedLead(leadData: LeadData): Promise<any> {
  console.log('💾 Creating enhanced lead:', leadData);
  
  try {
    const leadRecord = {
      name: leadData.name,
      email: leadData.email,
      source: 'website_chatbot',
      location: leadData.locations,
      message: leadData.additionalNotes || '',
      number_of_properties: parseInt(leadData.numberOfProperties) || 1,
      platform_usage: leadData.platforms || []
    };

    console.log('📝 Lead record to insert:', leadRecord);

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert(leadRecord)
      .select()
      .single();
    
    if (leadError) {
      handleSupabaseError('createLead', leadError);
    }
    
    console.log('✅ Lead created:', lead);

    // Create properties if specified
    if (leadData.numberOfProperties && parseInt(leadData.numberOfProperties) > 0) {
      const propertyCount = Math.min(parseInt(leadData.numberOfProperties), 10); // Cap at 10
      const locations = leadData.locations.split(',').map(loc => loc.trim());
      
      for (let i = 0; i < propertyCount; i++) {
        try {
          const propertyLocation = locations[i % locations.length] || locations[0] || leadData.locations;
          
          const propertyRecord = {
            name: `Property ${i + 1}`,
            lead_id: lead.id,
            city: propertyLocation,
            property_type: 'rental',
            active: true
          };

          console.log(`📝 Creating property ${i + 1}:`, propertyRecord);

          const { error: propError } = await supabase
            .from('properties')
            .insert(propertyRecord);
          
          if (propError) {
            console.error(`⚠️ Failed to create property ${i + 1}:`, propError);
          } else {
            console.log(`✅ Created property ${i + 1} for lead ${lead.id}`);
          }
        } catch (propError) {
          console.error(`⚠️ Failed to create property ${i + 1}:`, propError);
        }
      }
    }

    return lead;
  } catch (error) {
    console.error('❌ Enhanced lead creation failed:', error);
    throw error;
  }
}

// Enhanced job application creation
export async function createEnhancedJobApplication(appData: JobApplicationData): Promise<any> {
  console.log('💼 Creating enhanced job application:', appData);
  
  try {
    const applicationRecord = {
      name: appData.name,
      email: appData.email,
      role_applied: appData.role,
      motivation: appData.motivation,
      linkedin_url: appData.linkedinUrl,
      source: 'careers_chatbot'
    };

    console.log('📝 Application record to insert:', applicationRecord);

    const { data: application, error } = await supabase
      .from('job_applications')
      .insert(applicationRecord)
      .select()
      .single();
    
    if (error) {
      handleSupabaseError('createJobApplication', error);
    }
    
    console.log('✅ Job application created:', application);
    return application;
  } catch (error) {
    console.error('❌ Enhanced job application creation failed:', error);
    throw error;
  }
}

// Enhanced conversation saving
export async function saveEnhancedConversation(message: string, isFromUser: boolean, source: string, leadId?: string): Promise<void> {
  try {
    const conversationRecord = {
      message,
      is_from_user: isFromUser,
      page_context: source,
      lead_id: leadId
    };

    console.log('💬 Saving conversation:', conversationRecord);

    const { error } = await supabase
      .from('conversations')
      .insert(conversationRecord);
    
    if (error) {
      console.error('⚠️ Conversation save error:', error);
      // Don't throw for conversation saves
    } else {
      console.log('✅ Conversation saved');
    }
  } catch (error) {
    console.error('⚠️ Conversation save failed:', error);
  }
}

// Get dashboard data with enhanced error handling
export async function getEnhancedDashboardData(): Promise<{ properties: any[], reports: any[] }> {
  try {
    console.log('📊 Fetching enhanced dashboard data...');
    
    const [propertiesResult, reportsResult] = await Promise.all([
      supabase.from('properties').select('*').eq('active', true),
      supabase.from('reports').select('*').order('month', { ascending: false })
    ]);
    
    if (propertiesResult.error) {
      console.error('❌ Properties fetch error:', propertiesResult.error);
    }
    
    if (reportsResult.error) {
      console.error('❌ Reports fetch error:', reportsResult.error);
    }
    
    const properties = propertiesResult.data || [];
    const reports = reportsResult.data || [];
    
    console.log('✅ Dashboard data fetched:', { properties: properties.length, reports: reports.length });
    
    return { properties, reports };
  } catch (error) {
    console.error('❌ Dashboard data fetch failed:', error);
    return { properties: [], reports: [] };
  }
}

// Get mock knowledge base for intelligent responses
export async function getMockKnowledgeBase(): Promise<any> {
  return {
    pricing: "Our pricing is tailored to your property portfolio size. Contact us for a custom quote.",
    platforms: "We integrate with Airbnb, VRBO, Booking.com, and 50+ other platforms.",
    process: "Our AI handles guest communication, pricing optimization, and maintenance coordination automatically.",
    locations: "We serve property managers globally, with strong presence in Miami, Dubai, and major markets.",
    features: "AI guest communication, dynamic pricing, maintenance management, financial reporting, and more.",
    remote: "Yes, we're a fully remote team with members across different time zones.",
    team: "Our team is distributed globally with members in multiple countries.",
    interview: "Our interview process includes a skills assessment, team fit interview, and final discussion with founders."
  };
}
