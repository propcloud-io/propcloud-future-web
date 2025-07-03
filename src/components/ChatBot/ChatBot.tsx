
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ConversationFlows, FlowData } from './ConversationFlows';
import { sendFlowEmail } from './emailService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFlows, setShowFlows] = useState(false);
  const [flowCompleted, setFlowCompleted] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [showIdlePrompt, setShowIdlePrompt] = useState(false);

  // Show chatbot after 4 seconds or when user scrolls
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 4000);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
      setLastActivityTime(Date.now());
    };

    const handleMouseMove = () => {
      setLastActivityTime(Date.now());
    };

    const handleClick = () => {
      setLastActivityTime(Date.now());
    };

    const handleOpenChatBot = () => {
      setIsOpen(true);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('openChatBot', handleOpenChatBot);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('openChatBot', handleOpenChatBot);
    };
  }, []);

  // Idle detection - only show prompt after user has engaged
  useEffect(() => {
    if (!isVisible || isOpen || showIdlePrompt || messages.length === 0) return;

    const checkIdle = () => {
      const timeSinceActivity = Date.now() - lastActivityTime;
      if (timeSinceActivity > 60000) { // 1 minute
        setShowIdlePrompt(true);
      }
    };

    const interval = setInterval(checkIdle, 10000);
    return () => clearInterval(interval);
  }, [isVisible, isOpen, lastActivityTime, showIdlePrompt, messages.length]);

  // Initialize with conversation flows when opened
  useEffect(() => {
    if (isOpen && messages.length === 0 && !showFlows) {
      setTimeout(() => {
        setShowFlows(true);
      }, 500);
    }
  }, [isOpen, messages.length, showFlows]);

  // Reset chat state when closing
  const handleClose = () => {
    setIsOpen(false);
    setShowIdlePrompt(false);
    // Reset all state after a brief delay to allow close animation
    setTimeout(() => {
      setMessages([]);
      setShowFlows(false);
      setFlowCompleted(false);
      setInputText('');
      setIsTyping(false);
    }, 200);
  };

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

  const getCurrentPage = () => {
    const path = window.location.pathname;
    if (path === '/') return 'homepage';
    if (path === '/app') return 'dashboard';
    if (path === '/about') return 'about';
    return 'website';
  };

  const getContextualResponse = (userMessage: string) => {
    const currentPage = getCurrentPage();
    const input = userMessage.toLowerCase();
    
    // Handle unrelated questions
    if (input.includes('weather') || input.includes('news') || input.includes('recipe') || 
        input.includes('movie') || input.includes('sports') || input.includes('politics') ||
        input.includes('who owns') || input.includes('founder') || input.includes('ceo')) {
      return "I'm designed to help with your property management needs. Would you like to see how PropCloud can optimize your rentals?";
    }

    // Context-aware responses based on current page
    if (currentPage === 'dashboard') {
      if (input.includes('cool') || input.includes('nice') || input.includes('impressive') || input.includes('wow')) {
        return "Thanks! This is a demo dashboard showing simulated metrics: 92% occupancy, $14,800 monthly revenue, and 4.8-star satisfaction. Want us to set this up for your actual listings?";
      }
      if (input.includes('how') && (input.includes('work') || input.includes('does'))) {
        return "This dashboard connects to your property listings and provides real-time AI insights. Want a walkthrough of how we'd customize this for your portfolio?";
      }
      if (input.includes('get this') || input.includes('want this') || input.includes('can i') || input.includes('sign up')) {
        return "Absolutely! Just drop your info and we'll reach out with a custom setup for your properties.";
      }
    }

    // General property management responses
    if (input.includes('properties') || input.includes('rental') || input.includes('airbnb') || input.includes('manage')) {
      return "Great! PropCloud provides full-service AI property management. How many properties are you currently managing?";
    }

    if (input.includes('help') || input.includes('support') || input.includes('question')) {
      return "I'd be happy to help you explore PropCloud's AI property management services. What would you like to know?";
    }
    
    return "Thanks for reaching out! I'm here to help you understand how PropCloud can streamline your property management with AI.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || showFlows) return;

    addMessage(inputText, false);
    const response = getContextualResponse(inputText);
    setInputText('');

    addBotMessage(response);
    
    setTimeout(() => {
      setShowFlows(true);
    }, 2000);
  };

  const handleFlowComplete = async (data: FlowData) => {
    setShowFlows(false);
    setFlowCompleted(true);
    
    const flowTypeNames = {
      waitlist: 'AI Waitlist',
      management: 'Property Management',
      connect: 'General Connection'
    };

    addBotMessage(`Perfect! Thank you, ${data.name}. I've collected your information for our ${flowTypeNames[data.flowType]} program.`);
    
    setTimeout(() => {
      addBotMessage("Our team will reach out to you soon. Thanks for your interest in PropCloud! 🚀");
    }, 2000);

    // Send email notification
    try {
      await sendFlowEmail(data, messages);
      console.log('Flow completion email sent successfully');
    } catch (error) {
      console.error('Failed to send flow completion email:', error);
    }
  };

  const handleIdlePromptClick = () => {
    setShowIdlePrompt(false);
    setIsOpen(true);
    setTimeout(() => {
      addMessage("Would you like to see how PropCloud can manage your Airbnb with AI?", true);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Idle Prompt - only shows after user engagement */}
      {showIdlePrompt && !isOpen && (
        <div className="mb-4 bg-white rounded-xl shadow-lg border border-gray-200 p-3 max-w-xs animate-fade-in">
          <p className="text-sm text-gray-700 mb-2">Would you like to see how PropCloud can manage your Airbnb with AI?</p>
          <div className="flex gap-2">
            <button
              onClick={handleIdlePromptClick}
              className="text-xs bg-teal-600 text-white px-3 py-1 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Yes, tell me more
            </button>
            <button
              onClick={() => setShowIdlePrompt(false)}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-400 rounded-full animate-pulse"></div>
        </button>
      )}

      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 w-80 h-96 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-4 flex items-center justify-between">
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
              onClick={handleClose}
              className="hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-slate-50/50 to-teal-50/30">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm">PropBot is typing...</span>
              </div>
            )}

            {showFlows && !flowCompleted && (
              <ConversationFlows onFlowComplete={handleFlowComplete} />
            )}
          </div>

          {/* Input - sticky on mobile */}
          {!showFlows && (
            <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm sticky bottom-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white/90"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-2 rounded-lg hover:brightness-110 transition-all shadow-md"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
