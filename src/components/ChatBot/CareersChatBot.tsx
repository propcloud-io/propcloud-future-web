
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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

  const steps = [
    { field: 'fullName', question: 'What\'s your full name?', type: 'text' },
    { field: 'email', question: 'What\'s your email address?', type: 'email' },
    { field: 'role', question: 'Which role are you applying for?', type: 'select', options: ['Full-Stack Developer (AI-Enabled SaaS)', 'Customer Success & Onboarding Lead', 'AI Product Manager'] },
    { field: 'motivation', question: 'Why do you want to work with PropCloud?', type: 'textarea' },
    { field: 'linkedinPortfolio', question: 'LinkedIn or Portfolio URL (optional)?', type: 'text', optional: true },
    { field: 'additionalNotes', question: 'Any additional notes or questions? (optional)', type: 'textarea', optional: true },
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
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    addMessage(text, true);
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim() && steps[currentStep].type !== 'file') return;

    const currentField = steps[currentStep].field as keyof ApplicationData;
    
    if (steps[currentStep].type !== 'file') {
      addMessage(inputValue, false);
      setApplicationData(prev => ({ ...prev, [currentField]: inputValue }));
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
      setApplicationData(prev => ({ ...prev, resume: file }));
      addMessage(`Resume uploaded: ${file.name}`, false);
      handleSubmitApplication();
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    addBotMessage("Submitting your application...");

    try {
      const formData = new FormData();
      formData.append('name', applicationData.fullName);
      formData.append('email', applicationData.email);
      formData.append('role', applicationData.role);
      formData.append('motivation', applicationData.motivation);
      formData.append('linkedinPortfolio', applicationData.linkedinPortfolio);
      formData.append('additionalNotes', applicationData.additionalNotes);
      
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
        {currentStep < steps.length && !isSubmitting && (
          <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
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
                  Upload Resume (PDF, DOC, DOCX)
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
