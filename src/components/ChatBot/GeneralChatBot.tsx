
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage, LeadData } from '@/types/chatbot';
import { validateEmail, sanitizeInput, generateId, delay } from '@/utils/chatbotUtils';
import { submitLead, getKnowledgeBase } from '@/services/simplifiedChatbotService';
import { useToast } from '@/hooks/use-toast';

interface GeneralChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormStep {
  field: keyof LeadData;
  question: string;
  placeholder: string;
  optional?: boolean;
}

const formSteps: FormStep[] = [
  { field: 'name', question: "What's your full name?", placeholder: 'Enter your full name' },
  { field: 'email', question: "What's your email address?", placeholder: 'your@email.com' },
  { field: 'numberOfProperties', question: 'How many properties do you manage?', placeholder: 'e.g., 1, 5, 20+' },
  { field: 'locations', question: 'Where are your properties located?', placeholder: 'e.g., Miami, Dubai, London' },
  { field: 'platforms', question: 'Which platforms do you use? (optional)', placeholder: 'e.g., Airbnb, VRBO, Booking.com', optional: true },
  { field: 'additionalNotes', question: 'Any additional notes or questions?', placeholder: 'Tell us more about your needs...', optional: true }
];

export default function GeneralChatBot({ isOpen, onClose }: GeneralChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInForm, setIsInForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<LeadData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [knowledgeBase] = useState(getKnowledgeBase());
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeBot = async () => {
    await delay(500);
    addBotMessage("Hi! I'm your PropCloud assistant. I help property managers automate their operations with AI. How can I assist you today?");
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
    
    await delay(800 + Math.random() * 800);
    
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
    
    if (lowerQuery.includes('pricing') || lowerQuery.includes('cost') || lowerQuery.includes('price')) {
      response = knowledgeBase.pricing;
    } else if (lowerQuery.includes('platform') || lowerQuery.includes('airbnb') || lowerQuery.includes('vrbo')) {
      response = knowledgeBase.platforms;
    } else if (lowerQuery.includes('how') && lowerQuery.includes('work')) {
      response = knowledgeBase.process;
    } else if (lowerQuery.includes('location') || lowerQuery.includes('where')) {
      response = knowledgeBase.locations;
    } else if (lowerQuery.includes('feature') || lowerQuery.includes('what') && lowerQuery.includes('do')) {
      response = knowledgeBase.features;
    } else if (lowerQuery.includes('benefit') || lowerQuery.includes('save') || lowerQuery.includes('help')) {
      response = knowledgeBase.benefits;
    } else if (lowerQuery.includes('support') || lowerQuery.includes('help')) {
      response = knowledgeBase.support;
    } else {
      response = "I can help you understand how PropCloud's AI automation works for property managers. Would you like to learn about our features or start a quick assessment?";
    }
    
    await addBotMessage(response);
    
    setTimeout(async () => {
      await addBotMessage("Would you like to start a quick property assessment? It takes just 2 minutes and I can show you exactly how PropCloud would work for your portfolio.");
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: generateId(),
          text: 'QUICK_ACTIONS',
          isBot: true,
          timestamp: new Date()
        }]);
      }, 500);
    }, 1500);
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
    await addBotMessage("Processing your information...");
    
    try {
      const leadData = formData as LeadData;
      console.log('🚀 Submitting lead data:', leadData);
      
      const result = await submitLead(leadData);
      
      if (result.success) {
        await addBotMessage(`Perfect! Thank you, ${leadData.name}. I've recorded your information about your ${leadData.numberOfProperties} properties in ${leadData.locations}.`);
        
        await delay(1500);
        await addBotMessage("Our team will reach out within 24 hours with a customized PropCloud setup for your portfolio. Thanks for choosing PropCloud! 🚀");
        
        toast({
          title: "Success!",
          description: "Your information has been submitted successfully.",
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('❌ Form submission failed:', error);
      await addBotMessage("I apologize, but there was an issue submitting your information. Please try again or contact us directly at contact@propcloud.io");
      
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
    setFormData({});
    await addBotMessage("Great! Let's get started with a quick assessment.");
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

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 w-full max-w-md h-96 flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className="font-semibold">PropCloud Assistant</h3>
              <p className="text-xs opacity-90">Ready to help</p>
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
            <div key={message.id}>
              {message.text === 'QUICK_ACTIONS' ? (
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={startForm}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-400 hover:brightness-110"
                    disabled={isSubmitting}
                  >
                    🚀 Start Assessment (2 min)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleUserMessage("Tell me more about your features")}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    💡 Learn More First
                  </Button>
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

        <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isInForm ? formSteps[currentStep]?.placeholder || "Type your answer..." : "Ask me anything..."}
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
