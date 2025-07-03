
import { supabase } from '@/integrations/supabase/client';
import { LeadData, JobApplicationData } from '@/types/chatbot';
import { submitToFormspree } from '@/services/formspreeService';

// Enhanced error handling with detailed logging
const handleSupabaseError = (operation: string, error: any) => {
  console.error(`🚨 Supabase ${operation} error:`, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
    statusCode: error.statusCode
  });
  
  return new Error(`${operation} failed: ${error.message || 'Unknown error'}`);
};

// Test connection with detailed diagnostics
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    const { data, error, count } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful, leads count:', count);
    return true;
  } catch (err) {
    console.error('❌ Connection test error:', err);
    return false;
  }
}

// Create lead with corrected field mapping
export async function createLead(leadData: LeadData): Promise<any> {
  console.log('💾 Creating lead with data:', leadData);
  
  try {
    // Handle platforms field properly with explicit type checking
    let platformUsage: string[] = [];
    const platforms = leadData.platforms;
    
    if (Array.isArray(platforms)) {
      platformUsage = platforms;
    } else if (platforms && typeof platforms === 'string') {
      platformUsage = platforms.split(',').map(p => p.trim());
    }

    // Handle locations field with proper type checking
    let locationString = '';
    const locationsData = leadData.locations;
    
    if (locationsData && typeof locationsData === 'string') {
      locationString = locationsData;
    }

    // Correct field mapping to match database schema
    const leadRecord = {
      name: leadData.name,
      email: leadData.email,
      location: locationString,
      message: leadData.additionalNotes || '',
      number_of_properties: parseInt(leadData.numberOfProperties) || 1,
      platform_usage: platformUsage,
      source: 'website_chatbot'
    };

    console.log('📝 Lead record to insert:', leadRecord);

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert(leadRecord)
      .select()
      .single();
    
    if (leadError) {
      throw handleSupabaseError('createLead', leadError);
    }
    
    console.log('✅ Lead created successfully:', lead);

    // Create properties if specified
    if (leadData.numberOfProperties && parseInt(leadData.numberOfProperties) > 0) {
      await createPropertiesForLead(lead.id, leadData);
    }

    return lead;
  } catch (error) {
    console.error('❌ Lead creation failed:', error);
    throw error;
  }
}

// Create properties for a lead
async function createPropertiesForLead(leadId: string, leadData: LeadData): Promise<void> {
  const propertyCount = Math.min(parseInt(leadData.numberOfProperties), 10);
  
  // Safely handle locations with proper type checking and explicit fallback
  let locations: string[] = ['Unknown Location'];
  const locationsData = leadData.locations;
  
  if (locationsData && typeof locationsData === 'string' && locationsData.trim().length > 0) {
    const splitLocations = locationsData.split(',').map(loc => loc.trim()).filter(loc => loc.length > 0);
    if (splitLocations.length > 0) {
      locations = splitLocations;
    }
  }
  
  for (let i = 0; i < propertyCount; i++) {
    try {
      const propertyLocation = locations[i % locations.length] || 'Unknown Location';
      
      const propertyRecord = {
        name: `Property ${i + 1}`,
        lead_id: leadId,
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
        console.log(`✅ Created property ${i + 1} for lead ${leadId}`);
      }
    } catch (propError) {
      console.error(`⚠️ Failed to create property ${i + 1}:`, propError);
    }
  }
}

// Create job application
export async function createJobApplication(appData: JobApplicationData): Promise<any> {
  console.log('💼 Creating job application:', appData);
  
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
      throw handleSupabaseError('createJobApplication', error);
    }
    
    console.log('✅ Job application created successfully:', application);
    return application;
  } catch (error) {
    console.error('❌ Job application creation failed:', error);
    throw error;
  }
}

// Save conversation
export async function saveConversation(message: string, isFromUser: boolean, source: string, leadId?: string): Promise<void> {
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
    } else {
      console.log('✅ Conversation saved');
    }
  } catch (error) {
    console.error('⚠️ Conversation save failed:', error);
  }
}

// Get dashboard data with correct service calls
export async function getDashboardData(): Promise<{ properties: any[], reports: any[] }> {
  try {
    console.log('📊 Fetching dashboard data...');
    
    const [propertiesResult, reportsResult] = await Promise.all([
      supabase.from('properties').select('*').eq('active', true),
      supabase.from('reports').select('*').order('month', { ascending: false })
    ]);
    
    if (propertiesResult.error) {
      console.error('❌ Properties fetch error:', propertiesResult.error);
      throw propertiesResult.error;
    }
    
    if (reportsResult.error) {
      console.error('❌ Reports fetch error:', reportsResult.error);
      throw reportsResult.error;
    }
    
    const properties = propertiesResult.data || [];
    const reports = reportsResult.data || [];
    
    console.log('✅ Dashboard data fetched:', { properties: properties.length, reports: reports.length });
    
    return { properties, reports };
  } catch (error) {
    console.error('❌ Dashboard data fetch failed:', error);
    throw error;
  }
}

// Unified submission function with simplified error handling
export async function submitWithFallback(
  data: LeadData | JobApplicationData, 
  type: 'lead' | 'job_application'
): Promise<{ success: boolean, method: 'supabase' | 'formspree' | 'failed' }> {
  
  // First attempt: Supabase
  try {
    if (type === 'lead') {
      await createLead(data as LeadData);
      console.log('✅ Supabase submission successful');
      return { success: true, method: 'supabase' };
    } else {
      await createJobApplication(data as JobApplicationData);
      console.log('✅ Supabase submission successful');
      return { success: true, method: 'supabase' };
    }
  } catch (supabaseError) {
    console.error('❌ Supabase submission failed, trying Formspree fallback:', supabaseError);
  }
  
  // Fallback: Formspree
  try {
    let formspreeSuccess = false;
    
    if (type === 'lead') {
      const formspreeData = {
        ...data,
        source: 'website_chatbot',
        timestamp: new Date().toISOString()
      };
      formspreeSuccess = await submitToFormspree('https://formspree.io/f/mblyajdg', formspreeData);
    } else {
      const formspreeData = {
        ...data,
        source: 'careers_chatbot',
        timestamp: new Date().toISOString()
      };
      formspreeSuccess = await submitToFormspree('https://formspree.io/f/mwpbzboq', formspreeData);
    }
    
    if (formspreeSuccess) {
      console.log('✅ Formspree fallback successful');
      return { success: true, method: 'formspree' };
    }
  } catch (formspreeError) {
    console.error('❌ Formspree fallback also failed:', formspreeError);
  }
  
  return { success: false, method: 'failed' };
}

// Mock knowledge base
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
