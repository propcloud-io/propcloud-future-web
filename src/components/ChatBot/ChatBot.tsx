
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
  const [hasShownIdleMessage, setHasShownIdleMessage] = useState(false);

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

  // Idle detection and proactive messages
  useEffect(() => {
    if (!isVisible || isOpen || hasShownIdleMessage) return;

    const checkIdle = () => {
      const timeSinceActivity = Date.now() - lastActivityTime;
      if (timeSinceActivity > 30000) { // 30 seconds
        setIsOpen(true);
        setHasShownIdleMessage(true);
        setTimeout(() => {
          addMessage("Need help deciding if this is right for you?", true);
        }, 500);
      }
    };

    const interval = setInterval(checkIdle, 5000);
    return () => clearInterval(interval);
  }, [isVisible, isOpen, lastActivityTime, hasShownIdleMessage]);

  // Initialize with welcome message when opened
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
    
    // Out-of-context handling
    if (userMessage.includes('weather') || userMessage.includes('news') || userMessage.includes('recipe') || userMessage.includes('movie')) {
      return "That's outside our core service, but we focus on full-service property management using AI. Want to explore how it works?";
    }

    if (currentPage === 'dashboard') {
      if (userMessage.includes('cool') || userMessage.includes('nice') || userMessage.includes('impressive')) {
        return "Thanks! This is a demo dashboard. The metrics are simulated to show 92% occupancy, $3,400 net this month, and 45% repeat guests. Want us to set this up for your listings?";
      }
      if (userMessage.includes('how') && userMessage.includes('work')) {
        return "This dashboard shows real-time property performance. We connect to your listings and provide AI-powered insights. Want a walkthrough of how we'd set this up for you?";
      }
      if (userMessage.includes('get this') || userMessage.includes('want this') || userMessage.includes('can i')) {
        return "Absolutely! Just drop your info and we'll reach out with a custom setup for your property.";
      }
    }

    // Default responses based on keywords
    if (userMessage.includes('help') || userMessage.includes('support')) {
      return "I'd be happy to help! Would you like to start a new conversation to tell me more about what you need?";
    }
    
    return "Thanks for your message! Let me help you get connected with the right information.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || showFlows) return;

    addMessage(inputText, false);
    const userMessage = inputText.toLowerCase();
    setInputText('');

    const response = getContextualResponse(userMessage);
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
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

          {/* Input */}
          {!showFlows && (
            <div className="p-4 border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
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
