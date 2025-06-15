
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { faqResponses } from './faqData';
import { LeadForm } from './LeadForm';
import { sendLeadEmail } from './emailService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface LeadData {
  name: string;
  email: string;
  properties: string;
  location: string;
  propertyType: string;
  currentManagement: string;
  wantsConsultation: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});

  // Show chatbot after 4 seconds or when user scrolls
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 4000);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize with welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hi, I'm PropBot — your AI assistant at PropCloud. Looking to manage your properties or curious about our platform?");
      }, 500);
    }
  }, [isOpen, messages.length]);

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
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, true);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addMessage(inputText, false);
    const userMessage = inputText.toLowerCase();
    setInputText('');

    // Check for FAQ responses
    const faqResponse = findFAQResponse(userMessage);
    if (faqResponse) {
      addBotMessage(faqResponse);
      
      // After FAQ, offer to help further
      setTimeout(() => {
        addBotMessage("Is there anything else you'd like to know? Or would you like me to help you get started with PropCloud?");
      }, 2000);
      return;
    }

    // Check for interest indicators
    if (isShowingInterest(userMessage)) {
      setShowLeadForm(true);
      addBotMessage("Great! I'd love to help you get started. Let me gather some quick details about your properties.");
      return;
    }

    // Default response
    addBotMessage("I'd be happy to help! You can ask me about our services, pricing, how we use AI, or anything else about PropCloud. Or if you're ready to get started, just let me know!");
  };

  const findFAQResponse = (message: string): string | null => {
    for (const [keywordString, response] of Object.entries(faqResponses)) {
      const keywords = keywordString.split(',');
      if (keywords.some(keyword => message.includes(keyword.trim()))) {
        return response;
      }
    }
    return null;
  };

  const isShowingInterest = (message: string): boolean => {
    const interestKeywords = [
      'get started', 'sign up', 'interested', 'want to try', 'help me',
      'contact', 'consultation', 'demo', 'schedule', 'properties to manage'
    ];
    return interestKeywords.some(keyword => message.includes(keyword));
  };

  const handleLeadSubmit = async (data: LeadData) => {
    setLeadData(data);
    setShowLeadForm(false);
    
    addBotMessage(`Thank you, ${data.name}! I've collected your information and our team will reach out to you at ${data.email} soon.`);
    
    if (data.wantsConsultation) {
      addBotMessage("Since you're interested in a consultation, we'll prioritize scheduling that for you. Expect to hear from us within 24 hours!");
    }

    // Send email notification
    try {
      await sendLeadEmail(data, messages);
      console.log('Lead email sent successfully');
    } catch (error) {
      console.error('Failed to send lead email:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-propcloud-700 to-accent-600 text-white p-4 rounded-full shadow-soft-lg hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-soft-lg border border-gray-200 w-80 h-96 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-propcloud-700 to-accent-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <h3 className="font-semibold">PropBot</h3>
                <p className="text-xs opacity-90">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-accent-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-accent-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm">PropBot is typing...</span>
              </div>
            )}

            {showLeadForm && (
              <LeadForm onSubmit={handleLeadSubmit} />
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-propcloud-700 to-accent-600 text-white p-2 rounded-lg hover:brightness-110 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
