
import { supabase } from '@/integrations/supabase/client';

// Lead-related operations
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
  const { data, error } = await supabase
    .from('leads')
    .insert(leadData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
  
  return data;
}

// Property-related operations
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
  const { data, error } = await supabase
    .from('properties')
    .insert(propertyData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating property:', error);
    throw error;
  }
  
  return data;
}

// Job application operations
export async function createJobApplication(applicationData: {
  name: string;
  email: string;
  role_applied?: string;
  motivation?: string;
  linkedin_url?: string;
  resume_url?: string;
  source?: string;
}) {
  const { data, error } = await supabase
    .from('job_applications')
    .insert(applicationData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating job application:', error);
    throw error;
  }
  
  return data;
}

// Conversation operations
export async function saveConversation(conversationData: {
  message: string;
  is_from_user: boolean;
  page_context: string;
  lead_id?: string;
}) {
  const { data, error } = await supabase
    .from('conversations')
    .insert(conversationData)
    .select()
    .single();
  
  if (error) {
    console.error('Error saving conversation:', error);
    throw error;
  }
  
  return data;
}

// Dashboard data operations
export async function getDashboardProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('active', true);
  
  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
  
  return data || [];
}

export async function getDashboardReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('month', { ascending: false });
  
  if (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
  
  return data || [];
}

export async function getConversationHistory(leadId?: string, pageContext?: string) {
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
    console.error('Error fetching conversation history:', error);
    return [];
  }
  
  return data || [];
}
