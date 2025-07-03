
export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export interface LeadData {
  name: string;
  email: string;
  numberOfProperties: string;
  locations: string;
  platforms?: string | string[];
  additionalNotes?: string;
}

export interface JobApplicationData {
  name: string;
  email: string;
  role: string;
  linkedinUrl?: string;
  motivation: string;
  resume?: File;
}

export interface FormValidation {
  isValid: boolean;
  errors: string[];
}

export interface ChatBotConfig {
  welcomeMessage: string;
  source: 'website' | 'careers' | 'dashboard';
  formspreeUrl?: string;
  enableFileUpload?: boolean;
}
