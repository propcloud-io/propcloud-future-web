
import React, { useState } from 'react';

interface LeadData {
  name: string;
  email: string;
  properties: string;
  location: string;
  propertyType: string;
  currentManagement: string;
  wantsConsultation: boolean;
}

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
}

export function LeadForm({ onSubmit }: LeadFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<LeadData>>({});

  const questions = [
    {
      key: 'properties',
      question: 'How many properties are you looking to manage?',
      placeholder: 'e.g., 1-3 properties, 10+ properties'
    },
    {
      key: 'location',
      question: 'Where are your properties located?',
      placeholder: 'e.g., Miami, Dubai, Multiple cities'
    },
    {
      key: 'propertyType',
      question: 'What type of properties do you manage?',
      placeholder: 'e.g., apartments, villas, vacation homes'
    },
    {
      key: 'currentManagement',
      question: 'Are you currently managing them yourself or using another company?',
      placeholder: 'e.g., Self-managed, Using Airbnb co-host'
    },
    {
      key: 'name',
      question: "What's your name?",
      placeholder: 'Your full name'
    },
    {
      key: 'email',
      question: "What's the best email to contact you?",
      placeholder: 'your@email.com'
    },
  ];

  const handleNext = (value: string) => {
    const currentQuestion = questions[step];
    setFormData(prev => ({ ...prev, [currentQuestion.key]: value }));

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Ask about consultation
      handleConsultationQuestion();
    }
  };

  const handleConsultationQuestion = () => {
    // This will be handled by parent component
    const finalData: LeadData = {
      name: formData.name || '',
      email: formData.email || '',
      properties: formData.properties || '',
      location: formData.location || '',
      propertyType: formData.propertyType || '',
      currentManagement: formData.currentManagement || '',
      wantsConsultation: true // We'll assume they want consultation for now
    };
    onSubmit(finalData);
  };

  const currentQuestion = questions[step];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-accent-600">
      <div className="mb-3">
        <p className="text-sm font-medium text-propcloud-800 mb-2">
          {currentQuestion.question}
        </p>
        <div className="text-xs text-gray-500 mb-2">
          Question {step + 1} of {questions.length}
        </div>
      </div>
      
      <QuickResponseInput
        placeholder={currentQuestion.placeholder}
        onSubmit={handleNext}
      />
    </div>
  );
}

interface QuickResponseInputProps {
  placeholder: string;
  onSubmit: (value: string) => void;
}

function QuickResponseInput({ placeholder, onSubmit }: QuickResponseInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-transparent text-sm"
        autoFocus
      />
      <button
        onClick={handleSubmit}
        className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors text-sm font-medium"
      >
        Next
      </button>
    </div>
  );
}
