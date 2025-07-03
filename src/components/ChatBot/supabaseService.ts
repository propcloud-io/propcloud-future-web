
import { supabase } from '@/integrations/supabase/client';

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  property_type?: string;
  number_of_properties?: number;
  message?: string;
  platform_usage?: string[];
}

export interface ConversationData {
  lead_id?: string;
  message: string;
  is_from_user: boolean;
  page_context?: string;
}

export interface JobApplicationData {
  name: string;
  email: string;
  role_applied?: string;
  motivation?: string;
  linkedin_url?: string;
  resume_url?: string;
  source?: string;
}

export interface PropertyData {
  lead_id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  property_type?: string;
  number_of_rooms?: number;
  has_pool?: boolean;
}

export const createLead = async (leadData: LeadData) => {
  console.log('Creating lead:', leadData);
  
  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
    .select()
    .single();

  if (error) {
    console.error('Error creating lead:', error);
    throw error;
  }

  console.log('Lead created successfully:', data);
  return data;
};

export const createConversation = async (conversationData: ConversationData) => {
  console.log('Creating conversation:', conversationData);
  
  const { data, error } = await supabase
    .from('conversations')
    .insert([conversationData])
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }

  console.log('Conversation created successfully:', data);
  return data;
};

export const createJobApplication = async (applicationData: JobApplicationData) => {
  console.log('Creating job application:', applicationData);
  
  const { data, error } = await supabase
    .from('job_applications')
    .insert([applicationData])
    .select()
    .single();

  if (error) {
    console.error('Error creating job application:', error);
    throw error;
  }

  console.log('Job application created successfully:', data);
  return data;
};

export const createProperty = async (propertyData: PropertyData) => {
  console.log('Creating property:', propertyData);
  
  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData])
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    throw error;
  }

  console.log('Property created successfully:', data);
  return data;
};

export const getRecentConversations = async (leadId?: string) => {
  console.log('Fetching conversations for lead:', leadId);
  
  let query = supabase
    .from('conversations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (leadId) {
    query = query.eq('lead_id', leadId);
  }

  const { data, error } = query;

  if (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }

  console.log('Conversations fetched successfully:', data);
  return data || [];
};
