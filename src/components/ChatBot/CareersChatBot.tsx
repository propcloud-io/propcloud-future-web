import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  sanitizeText, 
  validateFile, 
  emailSchema, 
  nameSchema, 
  urlSchema, 
  textSchema,
  RateLimiter,
  sanitizeFileName
} from '@/lib/security';
import { createJobApplication, createConversation } from './supabaseService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ApplicationData {
  fullName: string;
  email: string;
  role: string;
  motivation: string;
  linkedinPortfolio: string;
  additionalNotes: string;
  resume: File | null;
}

interface CareersChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

// Create rate limiter instance
const rateLimiter = new RateLimiter(3, 300000); // 3 attempts per 5 minutes

export default function CareersChatBot({ isOpen, onClose, initialRole = '' }: CareersChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    fullName: '',
    email: '',
    role: initialRole,
    motivation: '',
    linkedinPortfolio: '',
    additionalNotes: '',
    resume: null
  });
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [isRateLimited, setIsRateLimited] = useState(false);

  const steps = [
    { field: 'fullName', question: 'What\'s your full name?', type: 'text', validation: nameSchema },
    { field: 'email', question: 'What\'s your email address?', type: 'email', validation: emailSchema },
    { field: 'role', question: 'Which role are you applying for?', type: 'select', options: ['Full-Stack Developer (AI-Enabled SaaS)', 'Customer Success & Onboarding Lead', 'AI Product Manager'] },
    { field: 'motivation', question: 'Why do you want to work with PropCloud?', type: 'textarea', validation: textSchema },
    { field: 'linkedinPortfolio', question: 'LinkedIn or Portfolio URL (optional)?', type: 'text', optional: true, validation: urlSchema },
    { field: 'additionalNotes', question: 'Any additional notes or questions? (optional)', type: 'textarea', optional: true, validation: textSchema },
    { field: 'resume', question: 'Please upload your resume', type: 'file' }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hi! I'm here to help you apply for a position at PropCloud. Let's get started! 🚀");
      setTimeout(() => {
        addBotMessage(steps[0].question);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialRole && applicationData.role !== initialRole) {
      setApplicationData(prev => ({ ...prev, role: initialRole }));
    }
  }, [initialRole]);

  const addMessage = (text: string, isBot: boolean) => {
    // Sanitize message text to prevent XSS
    const sanitizedText = sanitizeText(text);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: sanitizedText,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    addMessage(text, true);
  };

  const validateInput = (value: string, step: typeof steps[0]): boolean => {
    setValidationError('');
    
    if (!step.optional && !value.trim()) {
      setValidationError('This field is required');
      return false;
    }

    if (value.trim() && step.validation) {
      try {
        step.validation.parse(value.trim());
      } catch (error: any) {
        setValidationError(error.errors?.[0]?.message || 'Invalid input');
        return false;
      }
    }

    return true;
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim() && steps[currentStep].type !== 'file') return;

    const currentStepData = steps[currentStep];
    
    // Validate input
    if (!validateInput(inputValue, currentStepData)) {
      return;
    }

    const currentField = currentStepData.field as keyof ApplicationData;
    
    if (currentStepData.type !== 'file') {
      const sanitizedValue = sanitizeText(inputValue.trim());
      addMessage(sanitizedValue, false);
      setApplicationData(prev => ({ ...prev, [currentField]: sanitizedValue }));
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setInputValue('');
      setTimeout(() => {
        addBotMessage(steps[currentStep + 1].question);
      }, 500);
    } else {
      handleSubmitApplication();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        validateFile(file);
        const sanitizedFileName = sanitizeFileName(file.name);
        
        // Create a new file with sanitized name
        const sanitizedFile = new File([file], sanitizedFileName, { type: file.type });
        
        setApplicationData(prev => ({ ...prev, resume: sanitizedFile }));
        addMessage(`Resume uploaded: ${sanitizedFileName}`, false);
        handleSubmitApplication();
      } catch (error: any) {
        setValidationError(error.message);
        setTimeout(() => setValidationError(''), 5000);
      }
    }
  };

  const handleSubmitApplication = async () => {
    // Check rate limiting
    const userKey = applicationData.email || 'anonymous';
    if (!rateLimiter.isAllowed(userKey)) {
      const cooldown = rateLimiter.getRemainingCooldown(userKey);
      setIsRateLimited(true);
      addBotMessage(`Please wait ${cooldown} seconds before submitting another application.`);
      setTimeout(() => setIsRateLimited(false), cooldown * 1000);
      return;
    }

    setIsSubmitting(true);
    addBotMessage("Submitting your application...");

    try {
      // Store in Supabase
      const jobApplicationData = {
        name: sanitizeText(applicationData.fullName),
        email: sanitizeText(applicationData.email),
        role_applied: sanitizeText(applicationData.role),
        motivation: sanitizeText(applicationData.motivation),
        linkedin_url: applicationData.linkedinPortfolio ? sanitizeText(applicationData.linkedinPortfolio) : undefined,
        source: 'careers_chatbot'
      };

      await createJobApplication(jobApplicationData);

      // Store conversation
      await createConversation({
        message: `Job application submitted: ${JSON.stringify(jobApplicationData)}`,
        is_from_user: false,
        page_context: '/careers'
      });

      // Also submit to Formspree as backup
      const formData = new FormData();
      formData.append('name', sanitizeText(applicationData.fullName));
      formData.append('email', sanitizeText(applicationData.email));
      formData.append('role', sanitizeText(applicationData.role));
      formData.append('motivation', sanitizeText(applicationData.motivation));
      formData.append('linkedinPortfolio', applicationData.linkedinPortfolio ? sanitizeText(applicationData.linkedinPortfolio) : '');
      formData.append('additionalNotes', applicationData.additionalNotes ? sanitizeText(applicationData.additionalNotes) : '');
      
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume);
      }

      const response = await fetch('https://formspree.io/f/mwpbzboq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setTimeout(() => {
          addBotMessage("Thank you! We've received your application. Our team will be in touch if there's a fit. 🎉");
        }, 1000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setTimeout(() => {
        addBotMessage("Sorry, there was an error submitting your application. Please try again or email us directly at contact@propcloud.io");
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (steps[currentStep].optional) {
      handleInputSubmit();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep(0);
    setApplicationData({
      fullName: '',
      email: '',
      role: initialRole,
      motivation: '',
      linkedinPortfolio: '',
      additionalNotes: '',
      resume: null
    });
    setInputValue('');
    setIsSubmitting(false);
    setValidationError('');
    setIsRateLimited(false);
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 w-full max-w-md h-96 flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className="font-semibold">PropCloud Careers</h3>
              <p className="text-xs opacity-90">Job Application</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-slate-50/50 to-teal-50/30">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                  message.isBot
                    ? 'bg-gray-100 text-propcloud-800'
                    : 'bg-gradient-to-r from-propcloud-700 to-teal-600 text-white'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        {currentStep < steps.length && !isSubmitting && !isRateLimited && (
          <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
            {validationError && (
              <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
                {validationError}
              </div>
            )}
            
            {currentStepData.type === 'select' ? (
              <div className="space-y-2">
                <select
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                >
                  <option value="">Select a role...</option>
                  {currentStepData.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <Button onClick={handleInputSubmit} disabled={!inputValue} className="w-full">
                  Next
                </Button>
              </div>
            ) : currentStepData.type === 'file' ? (
              <div className="space-y-2">
                <Label htmlFor="resume-upload" className="text-sm font-medium">
                  Upload Resume (PDF, DOC, DOCX - Max 10MB)
                </Label>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                />
              </div>
            ) : currentStepData.type === 'textarea' ? (
              <div className="space-y-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleInputSubmit())}
                  placeholder="Type your response..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90 resize-none"
                  rows={3}
                  maxLength={2000}
                />
                <div className="flex gap-2">
                  <Button onClick={handleInputSubmit} disabled={!inputValue && !currentStepData.optional} className="flex-1">
                    <Send size={16} className="mr-2" />
                    {currentStepData.optional && !inputValue ? 'Skip' : 'Next'}
                  </Button>
                  {currentStepData.optional && (
                    <Button variant="outline" onClick={handleSkip}>
                      Skip
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type={currentStepData.type}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                  placeholder="Type your response..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                  autoComplete={currentStepData.type === 'email' ? 'email' : 'off'}
                />
                <Button onClick={handleInputSubmit} disabled={!inputValue && !currentStepData.optional}>
                  <Send size={16} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
