
import { LeadData, JobApplicationData } from '@/types/chatbot';

export const submitToFormspree = async (url: string, data: any): Promise<boolean> => {
  try {
    console.log('📧 Submitting to Formspree:', url, data);
    
    const formData = new FormData();
    
    // Handle different data types
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, value.join(', '));
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      console.log('✅ Formspree submission successful');
      return true;
    } else {
      console.error('❌ Formspree submission failed:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ Formspree submission error:', error);
    return false;
  }
};

export const submitLeadToFormspree = async (leadData: LeadData): Promise<boolean> => {
  const formspreeData = {
    name: leadData.name,
    email: leadData.email,
    numberOfProperties: leadData.numberOfProperties,
    locations: leadData.locations,
    platforms: leadData.platforms,
    additionalNotes: leadData.additionalNotes,
    source: 'website_chatbot',
    timestamp: new Date().toISOString()
  };

  return submitToFormspree('https://formspree.io/f/xnqepwqz', formspreeData);
};

export const submitJobApplicationToFormspree = async (appData: JobApplicationData): Promise<boolean> => {
  const formspreeData = {
    name: appData.name,
    email: appData.email,
    role: appData.role,
    linkedinUrl: appData.linkedinUrl,
    motivation: appData.motivation,
    resume: appData.resume,
    source: 'careers_chatbot',
    timestamp: new Date().toISOString()
  };

  return submitToFormspree('https://formspree.io/f/mwpbzboq', formspreeData);
};
