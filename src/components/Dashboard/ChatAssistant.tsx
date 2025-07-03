
import React, { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  'occupancy': "Based on the demo data, you're seeing 91% occupancy across 8 properties - that's excellent performance! Our AI analyzes booking patterns to optimize pricing and availability.",
  'turnovers': "The dashboard shows 5 upcoming turnovers scheduled for cleaning and inspections. PropCloud automates turnover coordination with smart scheduling.",
  'maintenance': "There are 2 maintenance issues in the demo - our AI prioritizes these by urgency and guest impact, coordinating with your maintenance team automatically.",
  'revenue': "In this demo, Villa Nova generated $3,420 this month, followed by Ocean View at $2,890. Our AI optimizes pricing across all your properties for maximum revenue.",
  'performance': "The demo shows you're up 12% compared to last week. PropCloud's AI provides real-time insights to help you understand what's driving performance changes.",
  'demo': "This is a demo dashboard showing simulated metrics: 92% occupancy, $14,800 monthly revenue across 8 properties, and 4.8-star guest satisfaction. All powered by PropCloud's AI property management system.",
  'services': "PropCloud provides full-service AI property management - from dynamic pricing and guest communication to maintenance coordination and performance analytics. We handle everything so you can focus on growing your portfolio.",
  'default': "I'm your PropCloud AI assistant! I can explain the demo metrics, our AI property management services, or help you understand how this dashboard would work with your actual properties."
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your PropCloud assistant. Ask me anything about your properties.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Handle contextual responses about the demo
    if (input.includes('cool') || input.includes('nice') || input.includes('impressive') || input.includes('wow')) {
      return "Thanks! This demo shows PropCloud's AI in action - 91% occupancy, $14,800 monthly revenue, and 4.8-star satisfaction across 8 properties. Want us to set this up for your actual listings?";
    }
    
    if (input.includes('how') && (input.includes('work') || input.includes('does'))) {
      return "PropCloud's AI connects to your property listings and provides real-time insights. We handle pricing optimization, guest communication, maintenance coordination, and performance analytics. Want a walkthrough of how we'd customize this for you?";
    }
    
    if (input.includes('get this') || input.includes('want this') || input.includes('can i') || input.includes('sign up')) {
      return "Absolutely! PropCloud can set this up for your properties. Just submit your interest via our main chatbot and we'll reach out with a custom demo tailored to your portfolio.";
    }

    if (input.includes('demo') || input.includes('real') || input.includes('fake')) {
      return mockResponses.demo;
    }

    if (input.includes('what') && (input.includes('do') || input.includes('service'))) {
      return mockResponses.services;
    }

    if (input.includes('summary') || input.includes('explain') || input.includes('overview')) {
      return "This demo showcases PropCloud's AI property management platform. The metrics simulate real performance: 91% occupancy, $14,800 monthly revenue, 4.8-star guest satisfaction across 8 properties. Our AI handles everything from pricing to guest communication.";
    }
    
    // Specific metric queries
    if (input.includes('occupancy') || input.includes('booking')) return mockResponses.occupancy;
    if (input.includes('turnover') || input.includes('cleaning')) return mockResponses.turnovers;
    if (input.includes('maintenance') || input.includes('issues') || input.includes('repair')) return mockResponses.maintenance;
    if (input.includes('revenue') || input.includes('money') || input.includes('profit') || input.includes('income')) return mockResponses.revenue;
    if (input.includes('performance') || input.includes('trend') || input.includes('growth')) return mockResponses.performance;
    
    return mockResponses.default;
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-80 md:h-96">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bot size={20} className="text-teal-600" />
          AI Performance Assistant
        </h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'assistant' && (
                  <Bot size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                )}
                <p className="text-sm">{message.text}</p>
                {message.sender === 'user' && (
                  <User size={16} className="text-white mt-1 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-1">
                <Bot size={16} className="text-teal-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your properties..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
