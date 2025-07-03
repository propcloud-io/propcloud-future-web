
import { LeadData, JobApplicationData } from '@/types/chatbot';

// Simple email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simplified Formspree submission
export const submitToFormspree = async (url: string, data: any): Promise<boolean> => {
  try {
    console.log('📧 Submitting to Formspree:', data);
    
    const formData = new FormData();
    
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

// Submit lead data
export async function submitLead(leadData: LeadData): Promise<{ success: boolean, method: string }> {
  try {
    const formspreeData = {
      name: leadData.name,
      email: leadData.email,
      numberOfProperties: leadData.numberOfProperties,
      locations: leadData.locations,
      platforms: Array.isArray(leadData.platforms) ? leadData.platforms.join(', ') : leadData.platforms || '',
      additionalNotes: leadData.additionalNotes || '',
      source: 'website_chatbot',
      timestamp: new Date().toISOString()
    };

    const success = await submitToFormspree('https://formspree.io/f/mblyajdg', formspreeData);
    
    if (success) {
      console.log('✅ Lead submission successful');
      return { success: true, method: 'formspree' };
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (error) {
    console.error('❌ Lead submission failed:', error);
    return { success: false, method: 'failed' };
  }
}

// Submit job application
export async function submitJobApplication(appData: JobApplicationData): Promise<{ success: boolean, method: string }> {
  try {
    const formspreeData = {
      name: appData.name,
      email: appData.email,
      role: appData.role,
      linkedinUrl: appData.linkedinUrl || '',
      motivation: appData.motivation,
      resume: appData.resume,
      source: 'careers_chatbot',
      timestamp: new Date().toISOString()
    };

    const success = await submitToFormspree('https://formspree.io/f/mwpbzboq', formspreeData);
    
    if (success) {
      console.log('✅ Job application submission successful');
      return { success: true, method: 'formspree' };
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (error) {
    console.error('❌ Job application submission failed:', error);
    return { success: false, method: 'failed' };
  }
}

// Mock knowledge base for chatbot responses
export const getKnowledgeBase = () => ({
  pricing: "Our pricing starts at $99/month for up to 5 properties, with custom pricing for larger portfolios. Contact us for a personalized quote.",
  platforms: "We integrate with Airbnb, VRBO, Booking.com, Expedia, and 50+ other major platforms to maximize your bookings.",
  process: "Our AI handles guest communication in 50+ languages, optimizes pricing in real-time, and coordinates maintenance automatically.",
  locations: "We serve property managers globally, with strong presence in Miami, Dubai, London, Barcelona, and other major markets.",
  features: "AI guest communication, dynamic pricing, maintenance management, financial reporting, multi-platform integration, and 24/7 support.",
  benefits: "Save 20+ hours per week, increase revenue by 30%, and provide 5-star guest experiences automatically.",
  support: "24/7 multilingual support, dedicated account manager for 10+ properties, and comprehensive onboarding included."
});
