
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createLead, createProperty, saveConversation } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';

export interface FlowData {
  flowType: 'waitlist' | 'management' | 'connect';
  name?: string;
  email?: string;
  city?: string;
  currentlyManaging?: string;
  aiExcitement?: string;
  propertyCount?: string;
  location?: string;
  managementType?: string;
  helpMessage?: string;
}

interface ConversationFlowsProps {
  onFlowComplete: (data: FlowData) => void;
}

interface FlowConfig {
  key: string;
  question: string;
  placeholder?: string;
}

export function ConversationFlows({ onFlowComplete }: ConversationFlowsProps) {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FlowData>>({});
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFlowSelection = async (flowType: 'waitlist' | 'management' | 'connect') => {
    console.log('🎯 Flow selected:', flowType);
    setSelectedFlow(flowType);
    setFormData({ flowType });
    setStep(1);

    // Save initial conversation
    try {
      await saveConversation({
        message: `User selected flow: ${flowType}`,
        is_from_user: true,
        page_context: 'general_website',
      });
    } catch (error) {
      console.error('⚠️ Error saving flow selection:', error);
      // Don't block flow for conversation save errors
    }
  };

  const handleInputSubmit = async (key: string, value: string) => {
    console.log('📝 Input submitted:', { key, value });
    const newData = { ...formData, [key]: value };
    setFormData(newData);

    // Save conversation message
    try {
      await saveConversation({
        message: `${key}: ${value}`,
        is_from_user: true,
        page_context: 'general_website',
        lead_id: leadId || undefined,
      });
    } catch (error) {
      console.error('⚠️ Error saving conversation:', error);
      // Don't block flow for conversation save errors
    }

    const flows = {
      waitlist: ['name', 'email', 'city', 'currentlyManaging', 'aiExcitement'],
      management: ['name', 'email', 'propertyCount', 'location', 'managementType'],
      connect: ['name', 'email', 'helpMessage']
    };

    const currentFlow = flows[selectedFlow as keyof typeof flows];
    
    if (step < currentFlow.length) {
      setStep(step + 1);
    } else {
      await handleFlowCompletion(newData as FlowData);
    }
  };

  const handleFlowCompletion = async (data: FlowData) => {
    console.log('🎉 Starting flow completion with data:', data);
    setIsSubmitting(true);
    
    try {
      // Show loading toast
      toast({
        title: "Submitting...",
        description: "We're processing your information.",
      });

      // Create lead in Supabase with proper error handling
      const leadData = {
        name: data.name!,
        email: data.email!,
        source: 'website_chatbot',
        location: '',
        message: '',
        number_of_properties: undefined as number | undefined,
        property_type: undefined as string | undefined,
      };

      if (data.flowType === 'waitlist') {
        leadData.location = data.city || '';
        leadData.message = `AI Waitlist: Currently managing: ${data.currentlyManaging}, Excitement: ${data.aiExcitement}`;
      } else if (data.flowType === 'management') {
        leadData.location = data.location || '';
        leadData.number_of_properties = data.propertyCount ? parseInt(data.propertyCount) : undefined;
        leadData.message = `Property Management: ${data.managementType}`;
        leadData.property_type = 'rental';
      } else if (data.flowType === 'connect') {
        leadData.message = data.helpMessage || '';
      }

      console.log('💾 Creating lead with processed data:', leadData);
      const createdLead = await createLead(leadData);
      setLeadId(createdLead.id);

      console.log('✅ Lead created with ID:', createdLead.id);

      // If management flow and has property details, create property record
      if (data.flowType === 'management' && data.location && data.propertyCount) {
        const propertyCount = parseInt(data.propertyCount) || 1;
        console.log(`🏠 Creating ${propertyCount} properties for lead ${createdLead.id}`);
        
        for (let i = 0; i < Math.min(propertyCount, 5); i++) {
          try {
            await createProperty({
              name: `Property ${i + 1}`,
              lead_id: createdLead.id,
              city: data.location,
              property_type: 'rental',
            });
            console.log(`✅ Created property ${i + 1}`);
          } catch (propertyError) {
            console.error(`❌ Failed to create property ${i + 1}:`, propertyError);
          }
        }
      }

      // Save completion conversation
      try {
        await saveConversation({
          message: `Flow completed: ${data.flowType}`,
          is_from_user: false,
          page_context: 'general_website',
          lead_id: createdLead.id,
        });
      } catch (convError) {
        console.error('⚠️ Error saving completion conversation:', convError);
      }

      // Show success toast
      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
        variant: "default",
      });

      console.log('🎊 Flow completed successfully');
      onFlowComplete(data);
    } catch (error) {
      console.error('❌ Error completing flow:', error);
      
      // Show error toast
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your information. Please try again.",
        variant: "destructive",
      });

      // Still complete the flow for user experience, but log the error
      onFlowComplete(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedFlow) {
    return (
      <div className="space-y-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/60">
        <p className="text-slate-800 font-medium mb-4">
          Hi! I'm PropBot. What brings you here today?
        </p>
        <div className="space-y-2">
          <Button
            onClick={() => handleFlowSelection('waitlist')}
            className="w-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 hover:brightness-110 shadow-md"
            disabled={isSubmitting}
          >
            🚀 Join the AI Waitlist
          </Button>
          <Button
            onClick={() => handleFlowSelection('management')}
            className="w-full bg-gradient-to-r from-teal-600 via-accent-500 to-propcloud-600 hover:brightness-110 shadow-md"
            disabled={isSubmitting}
          >
            🏠 Start Property Management
          </Button>
          <Button
            onClick={() => handleFlowSelection('connect')}
            className="w-full bg-slate-600 hover:bg-slate-700 shadow-md"
            disabled={isSubmitting}
          >
            💬 Just Looking to Connect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FlowStep
      flowType={selectedFlow as 'waitlist' | 'management' | 'connect'}
      step={step}
      formData={formData}
      onSubmit={handleInputSubmit}
      isSubmitting={isSubmitting}
    />
  );
}

interface FlowStepProps {
  flowType: 'waitlist' | 'management' | 'connect';
  step: number;
  formData: Partial<FlowData>;
  onSubmit: (key: string, value: string) => void;
  isSubmitting?: boolean;
}

function FlowStep({ flowType, step, formData, onSubmit, isSubmitting = false }: FlowStepProps) {
  const [inputValue, setInputValue] = useState('');

  const flowConfigs: Record<string, FlowConfig[]> = {
    waitlist: [
      { key: 'name', question: "What's your name?", placeholder: 'Your full name' },
      { key: 'email', question: "What's your email address?", placeholder: 'your@email.com' },
      { key: 'city', question: 'What city or market are you in?', placeholder: 'e.g., Miami, Dubai' },
      { key: 'currentlyManaging', question: 'Are you currently managing any properties?', placeholder: 'Yes/No and details' },
      { key: 'aiExcitement', question: 'What excites you about our AI tools?', placeholder: 'Tell us what interests you most' }
    ],
    management: [
      { key: 'name', question: "What's your name?", placeholder: 'Your full name' },
      { key: 'email', question: "What's your email address?", placeholder: 'your@email.com' },
      { key: 'propertyCount', question: 'How many properties do you have?', placeholder: 'e.g., 1-3, 5-10, 20+' },
      { key: 'location', question: 'Where are your properties located?', placeholder: 'City, state/country' },
      { key: 'managementType', question: 'Are they self-managed or with a company?', placeholder: 'Current management situation' }
    ],
    connect: [
      { key: 'name', question: "What's your name?", placeholder: 'Your full name' },
      { key: 'email', question: "What's your email address?", placeholder: 'your@email.com' },
      { key: 'helpMessage', question: 'How can we help?', placeholder: 'Tell us what you need...' }
    ]
  };

  const currentConfig = flowConfigs[flowType][step - 1];
  
  if (!currentConfig) return null;

  const handleSubmit = () => {
    if (inputValue.trim() && !isSubmitting) {
      onSubmit(currentConfig.key, inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/60">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-800 mb-2">
          {currentConfig.question}
        </p>
        <div className="text-xs text-slate-500 mb-3">
          Step {step} of {flowConfigs[flowType].length}
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={currentConfig.placeholder}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
          autoFocus
          disabled={isSubmitting}
        />
        <Button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isSubmitting}
          className="w-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 hover:brightness-110 disabled:opacity-50 shadow-md"
        >
          {isSubmitting ? 'Submitting...' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
