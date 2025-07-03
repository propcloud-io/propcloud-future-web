
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage, JobApplicationData } from '@/types/chatbot';
import { validateEmail, validateLinkedInUrl, validateFileUpload, sanitizeInput, generateId, delay } from '@/utils/chatbotUtils';
import { createEnhancedJobApplication, saveEnhancedConversation, testSupabaseConnection, getMockKnowledgeBase } from '@/services/enhancedSupabaseService';
import { submitJobApplicationToFormspree } from '@/services/formspreeService';
import { useToast } from '@/hooks/use-toast';

interface CareersChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

interface FormStep {
  field: keyof JobApplicationData;
  question: string;
  placeholder?: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'file';
  options?: string[];
  optional?: boolean;
}

const jobRoles = [
  'Product Designer',
  'AI Engineer', 
  'Operations Intern'
];

const formSteps: FormStep[] = [
  { field: 'name', question: "What's your full name?", placeholder: 'Enter your full name', type: 'text' },
  { field: 'email', question: "What's your email address?", placeholder: 'your@email.com', type: 'email' },
  { field: 'role', question: 'Which role are you applying for?', type: 'select', options: jobRoles },
  { field: 'linkedinUrl', question: 'What\'s your LinkedIn URL? (optional)', placeholder: 'https://linkedin.com/in/yourname', type: 'text', optional: true },
  { field: 'motivation', question: 'Why do you want to join PropCloud?', placeholder: 'Tell us what excites you about this opportunity...', type: 'textarea' },
  { field: 'resume', question: 'Please upload your resume (PDF, DOC, DOCX)', type: 'file' }
];

export default function CareersChatBot({ isOpen, onClose, initialRole = '' }: CareersChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInForm, setIsInForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<JobApplicationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<any>({});
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeBot();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialRole && jobRoles.includes(initialRole)) {
      setFormData(prev => ({ ...prev, role: initialRole }));
    }
  }, [initialRole]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeBot = async () => {
    // Test connection
    const connected = await testSupabaseConnection();
    setIsConnected(connected);
    
    // Load knowledge base
    const kb = await getMockKnowledgeBase();
    setKnowledgeBase(kb);
    
    // Add welcome message
    await delay(500);
    addBotMessage("Excited to join PropCloud? Let's walk through your application.");
  };

  const addMessage = async (text: string, isBot: boolean, isTyping = false) => {
    const message: ChatMessage = {
      id: generateId(),
      text: sanitizeInput(text),
      isBot,
      timestamp: new Date(),
      isTyping
    };
    
    setMessages(prev => [...prev, message]);
    
    // Save to conversations
    if (!isTyping) {
      await saveEnhancedConversation(text, !isBot, 'careers');
    }
  };

  const addBotMessage = async (text: string) => {
    // Add typing indicator
    const typingId = generateId();
    setMessages(prev => [...prev, {
      id: typingId,
      text: 'Thinking...',
      isBot: true,
      timestamp: new Date(),
      isTyping: true
    }]);
    
    await delay(800 + Math.random() * 800);
    
    // Remove typing indicator and add real message
    setMessages(prev => prev.filter(msg => msg.id !== typingId));
    await addMessage(text, true);
  };

  const handleUserMessage = async (message: string) => {
    const sanitized = sanitizeInput(message);
    await addMessage(sanitized, false);
    
    if (isInForm) {
      await handleFormInput(sanitized);
    } else {
      await handleGeneralQuery(sanitized);
    }
  };

  const handleGeneralQuery = async (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = '';
    
    // Intelligent responses based on query
    if (lowerQuery.includes('remote') || lowerQuery.includes('location') || lowerQuery.includes('where')) {
      response = knowledgeBase.remote || "Yes, we're a fully remote team with members across different time zones.";
    } else if (lowerQuery.includes('team') || lowerQuery.includes('based') || lowerQuery.includes('office')) {
      response = knowledgeBase.team || "Our team is distributed globally with members in multiple countries.";
    } else if (lowerQuery.includes('interview') || lowerQuery.includes('process') || lowerQuery.includes('next')) {
      response = knowledgeBase.interview || "Our interview process includes a skills assessment, team fit interview, and final discussion with founders.";
    } else if (lowerQuery.includes('apply') || lowerQuery.includes('start') || lowerQuery.includes('application')) {
      response = "Perfect! I'll guide you through our application process. It takes about 5 minutes and covers everything we need to know.";
    } else {
      response = "I can answer questions about working at PropCloud, our remote culture, or help you apply. What would you like to know?";
    }
    
    await addBotMessage(response);
    
    // Suggest starting application
    setTimeout(async () => {
      await addBotMessage("Ready to apply? I can walk you through the application process step by step.");
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: generateId(),
          text: 'CAREER_ACTIONS',
          isBot: true,
          timestamp: new Date()
        }]);
      }, 500);
    }, 2000);
  };

  const handleFormInput = async (input: string) => {
    const currentField = formSteps[currentStep];
    
    // Skip validation for file uploads (handled separately)
    if (currentField.type === 'file') return;
    
    // Validate input
    if (currentField.field === 'email' && !validateEmail(input)) {
      await addBotMessage("Please enter a valid email address.");
      return;
    }
    
    if (currentField.field === 'linkedinUrl' && input && !validateLinkedInUrl(input)) {
      await addBotMessage("Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname)");
      return;
    }
    
    if (!currentField.optional && !input.trim()) {
      await addBotMessage("This field is required. Please provide an answer.");
      return;
    }
    
    // Save form data
    setFormData(prev => ({
      ...prev,
      [currentField.field]: input
    }));
    
    // Move to next step or complete
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      await delay(500);
      
      const nextStep = formSteps[currentStep + 1];
      if (nextStep.type === 'file') {
        await addBotMessage(nextStep.question);
        // Add file upload component
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: generateId(),
            text: 'FILE_UPLOAD',
            isBot: true,
            timestamp: new Date()
          }]);
        }, 500);
      } else {
        await addBotMessage(nextStep.question);
      }
    } else {
      await completeApplication();
    }
  };

  const handleFileUpload = async (file: File) => {
    const validation = validateFileUpload(file);
    
    if (!validation.isValid) {
      await addBotMessage(`File upload error: ${validation.errors.join(', ')}`);
      return;
    }
    
    setFormData(prev => ({ ...prev, resume: file }));
    await addMessage(`Resume uploaded: ${file.name}`, false);
    await delay(500);
    await addBotMessage("Great! I've received your resume. Let me process your application...");
    await completeApplication();
  };

  const completeApplication = async () => {
    setIsSubmitting(true);
    await addBotMessage("Uploading resume and submitting application...");
    
    try {
      const appData = formData as JobApplicationData;
      
      // Primary submission to Supabase
      let supabaseSuccess = false;
      
      if (isConnected) {
        try {
          await createEnhancedJobApplication(appData);
          supabaseSuccess = true;
          console.log('✅ Supabase job application submission successful');
        } catch (supabaseError) {
          console.error('❌ Supabase job application submission failed:', supabaseError);
        }
      }
      
      // Backup submission to Formspree
      const formspreeSuccess = await submitJobApplicationToFormspree(appData);
      
      if (supabaseSuccess || formspreeSuccess) {
        await addBotMessage(`Application submitted! Thank you, ${appData.name}. We've received your application for the ${appData.role} position.`);
        
        await delay(1500);
        await addBotMessage("Our team will review your application and reach out if there's a fit. We typically respond within 3-5 business days. Thanks for your interest in PropCloud! 🎉");
        
        toast({
          title: "Application Submitted!",
          description: "Thank you for your application. We'll be in touch soon.",
        });
      } else {
        throw new Error('Both Supabase and Formspree submissions failed');
      }
    } catch (error) {
      console.error('❌ Application submission failed:', error);
      await addBotMessage("I apologize, but there was an issue submitting your application. Please try again or email us directly at contact@propcloud.io");
      
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsInForm(false);
    }
  };

  const startApplication = async () => {
    setIsInForm(true);
    setCurrentStep(0);
    setFormData(initialRole ? { role: initialRole } : {});
    await addBotMessage("Perfect! Let's start with your application.");
    await delay(500);
    await addBotMessage(formSteps[0].question);
  };

  const handleSend = () => {
    if (inputValue.trim() && !isSubmitting) {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setIsInForm(false);
    setCurrentStep(0);
    setFormData({});
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  const currentStep_data = formSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 w-full max-w-md h-96 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className="font-semibold">PropCloud Careers</h3>
              <p className="text-xs opacity-90">
                {isConnected === null ? 'Connecting...' : isConnected ? 'Connected' : 'Backup Mode'}
              </p>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            disabled={isSubmitting}
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-slate-50/50 to-teal-50/30">
          {messages.map((message) => (
            <div key={message.id}>
              {message.text === 'CAREER_ACTIONS' ? (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={startApplication}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-400 hover:brightness-110"
                    disabled={isSubmitting}
                  >
                    📝 Start Application
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleUserMessage("Tell me about the interview process")}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    ❓ Ask More Questions
                  </Button>
                </div>
              ) : message.text === 'FILE_UPLOAD' ? (
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX files only (max 10MB)</p>
                </div>
              ) : (
                <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-gradient-to-r from-propcloud-700 to-teal-600 text-white'
                    } ${message.isTyping ? 'animate-pulse' : ''}`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {isInForm && currentStep_data?.type !== 'file' && (
          <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
            {currentStep_data?.type === 'select' ? (
              <div className="flex gap-2">
                <select
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                  disabled={isSubmitting}
                >
                  <option value="">Select a role...</option>
                  {currentStep_data.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <Button 
                  onClick={handleSend} 
                  disabled={!inputValue || isSubmitting}
                  size="sm"
                >
                  <Send size={16} />
                </Button>
              </div>
            ) : currentStep_data?.type === 'textarea' ? (
              <div className="space-y-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentStep_data.placeholder}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90 resize-none"
                  rows={3}
                  disabled={isSubmitting}
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isSubmitting}
                  className="w-full"
                >
                  <Send size={16} className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type={currentStep_data?.type || 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={currentStep_data?.placeholder || "Type your answer..."}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                  disabled={isSubmitting}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isSubmitting}
                  className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-2 rounded-lg hover:brightness-110 transition-all shadow-md disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {!isInForm && (
          <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about careers or start your application..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                disabled={isSubmitting}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isSubmitting}
                className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-2 rounded-lg hover:brightness-110 transition-all shadow-md disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
