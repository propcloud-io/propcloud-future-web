
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

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

  const handleFlowSelection = (flowType: 'waitlist' | 'management' | 'connect') => {
    setSelectedFlow(flowType);
    setFormData({ flowType });
    setStep(1);
  };

  const handleInputSubmit = (key: string, value: string) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);

    const flows = {
      waitlist: ['name', 'email', 'city', 'currentlyManaging', 'aiExcitement'],
      management: ['name', 'email', 'propertyCount', 'location', 'managementType'],
      connect: ['name', 'email', 'helpMessage']
    };

    const currentFlow = flows[selectedFlow as keyof typeof flows];
    
    if (step < currentFlow.length) {
      setStep(step + 1);
    } else {
      onFlowComplete(newData as FlowData);
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
          >
            🚀 Join the AI Waitlist
          </Button>
          <Button
            onClick={() => handleFlowSelection('management')}
            className="w-full bg-gradient-to-r from-teal-600 via-accent-500 to-propcloud-600 hover:brightness-110 shadow-md"
          >
            🏠 Start Property Management
          </Button>
          <Button
            onClick={() => handleFlowSelection('connect')}
            className="w-full bg-slate-600 hover:bg-slate-700 shadow-md"
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
    />
  );
}

interface FlowStepProps {
  flowType: 'waitlist' | 'management' | 'connect';
  step: number;
  formData: Partial<FlowData>;
  onSubmit: (key: string, value: string) => void;
}

function FlowStep({ flowType, step, formData, onSubmit }: FlowStepProps) {
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
    if (inputValue.trim()) {
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
        />
        <Button
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
          className="w-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 hover:brightness-110 disabled:opacity-50 shadow-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
