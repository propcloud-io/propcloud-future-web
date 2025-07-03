
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage, JobApplicationData } from '@/types/chatbot';
import { validateEmail, sanitizeInput, generateId, delay } from '@/utils/chatbotUtils';
import { testSupabaseConnection, submitWithFallback, saveConversation } from '@/services/unifiedChatbotService';
import { useToast } from '@/hooks/use-toast';

interface CareersChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

interface FormStep {
  field: keyof JobApplicationData;
  question: string;
  placeholder: string;
  optional?: boolean;
}

const formSteps: FormStep[] = [
  { field: 'name', question: "What's your full name?", placeholder: 'Enter your full name' },
  { field: 'email', question: "What's your email address?", placeholder: 'your@email.com' },
  { field: 'role', question: 'Which role are you applying for?', placeholder: 'e.g., Full-Stack Developer' },
  { field: 'linkedinUrl', question: "What's your LinkedIn profile URL? (optional)", placeholder: 'https://linkedin.com/in/yourprofile', optional: true },
  { field: 'motivation', question: 'Why do you want to join PropCloud?', placeholder: 'Tell us what excites you about this opportunity...' }
];

export default function CareersChatBot({ isOpen, onClose, initialRole }: CareersChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInForm, setIsInForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<JobApplicationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeBot();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialRole && isInForm) {
      setFormData(prev => ({ ...prev, role: initialRole }));
    }
  }, [initialRole, isInForm]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeBot = async () => {
    const connected = await testSupabaseConnection();
    setIsConnected(connected);
    
    await delay(500);
    const welcomeMessage = initialRole 
      ? `Hi! I'm here to help you apply for the ${initialRole} position at PropCloud. Ready to get started?`
      : "Hi! I'm here to help you apply for a position at PropCloud. Which role interests you?";
    
    addBotMessage(welcomeMessage);
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
    
    if (!isTyping) {
      await saveConversation(text, !isBot, 'careers');
    }
  };

  const addBotMessage = async (text: string) => {
    const typingId = generateId();
    setMessages(prev => [...prev, {
      id: typingId,
      text: 'Thinking...',
      isBot: true,
      timestamp: new Date(),
      isTyping: true
    }]);
    
    await delay(1000 + Math.random() * 1000);
    
    setMessages(prev => prev.filter(msg => msg.id !== typingId));
    await addMessage(text, true);
  };

  const handleUserMessage = async (message: string) => {
    const sanitized = sanitizeInput(message);
    await addMessage(sanitized, false);
    
    if (isInForm) {
      await handleFormInput(sanitized);
    } else {
      if (initialRole) {
        await startForm();
      } else {
        setFormData(prev => ({ ...prev, role: sanitized }));
        await addBotMessage(`Great! You're interested in ${sanitized}. Let's start your application.`);
        await delay(500);
        await startForm();
      }
    }
  };

  const handleFormInput = async (input: string) => {
    const currentField = formSteps[currentStep];
    
    if (currentField.field === 'email' && !validateEmail(input)) {
      await addBotMessage("Please enter a valid email address.");
      return;
    }
    
    if (!currentField.optional && !input.trim()) {
      await addBotMessage("This field is required. Please provide an answer.");
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [currentField.field]: input
    }));
    
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      await delay(500);
      await addBotMessage(formSteps[currentStep + 1].question);
    } else {
      await completeForm();
    }
  };

  const completeForm = async () => {
    setIsSubmitting(true);
    await addBotMessage("Processing your application...");
    
    try {
      const applicationData = formData as JobApplicationData;
      console.log('🚀 Submitting application data:', applicationData);
      
      const result = await submitWithFallback(applicationData, 'job_application');
      
      if (result.success) {
        await addBotMessage(`Thank you, ${applicationData.name}! Your application for ${applicationData.role} has been submitted successfully.`);
        
        await delay(1500);
        await addBotMessage("Our team will review your application and get back to you within 48 hours. We're excited to potentially have you join our mission-driven team! 🚀");
        
        toast({
          title: "Application Submitted!",
          description: `Your application has been submitted successfully via ${result.method}.`,
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

  const startForm = async () => {
    setIsInForm(true);
    setCurrentStep(0);
    
    const startingStep = initialRole ? 1 : 0;
    setCurrentStep(startingStep);
    await delay(500);
    await addBotMessage(formSteps[startingStep].question);
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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 w-full max-w-md h-96 flex flex-col overflow-hidden">
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

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-slate-50/50 to-teal-50/30">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
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
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isInForm ? formSteps[currentStep]?.placeholder || "Type your answer..." : "Tell me about your interest..."}
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
      </div>
    </div>
  );
}
