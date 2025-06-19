
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

  // Show chatbot after 4 seconds or when user scrolls
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 4000);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    const handleOpenChatBot = () => {
      setIsOpen(true);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('openChatBot', handleOpenChatBot);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('openChatBot', handleOpenChatBot);
    };
  }, []);

  // Initialize with welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0 && !showFlows) {
      setTimeout(() => {
        setShowFlows(true);
      }, 500);
    }
  }, [isOpen, messages.length, showFlows]);

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
    if (!inputText.trim() || showFlows) return;

    addMessage(inputText, false);
    const userMessage = inputText.toLowerCase();
    setInputText('');

    // Simple responses for general chat
    if (userMessage.includes('help') || userMessage.includes('support')) {
      addBotMessage("I'd be happy to help! Would you like to start a new conversation to tell me more about what you need?");
      setTimeout(() => {
        setShowFlows(true);
      }, 2000);
    } else {
      addBotMessage("Thanks for your message! Let me help you get connected with the right information.");
      setTimeout(() => {
        setShowFlows(true);
      }, 2000);
    }
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
      addBotMessage("Our team will reach out to you soon. In the meantime, feel free to explore our website or ask me any questions!");
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
          className="bg-gradient-to-r from-propcloud-700 to-accent-600 text-white p-4 rounded-full shadow-soft-lg hover:scale-110 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-500 rounded-full animate-pulse"></div>
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

            {showFlows && !flowCompleted && (
              <ConversationFlows onFlowComplete={handleFlowComplete} />
            )}
          </div>

          {/* Input */}
          {!showFlows && (
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
          )}
        </div>
      )}
    </div>
  );
}
