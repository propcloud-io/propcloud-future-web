
import React, { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  'occupancy': "Your occupancy rate is currently 91% across 8 properties. This is excellent performance!",
  'turnovers': "There are 5 turnovers scheduled for cleaning and inspections in the coming days.",
  'maintenance': "There are 2 maintenance issues still being resolved - both are minor and won't affect guest experience.",
  'revenue': "Villa Nova generated the highest revenue this month with $3,420, followed by Ocean View at $2,890.",
  'performance': "This week you're up 12% compared to last week, with particularly strong performance from your beachfront properties.",
  'default': "I can help you understand your property performance. Try asking about occupancy rates, turnovers, maintenance issues, or revenue by property."
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
  const [hasShownProactiveMessage, setHasShownProactiveMessage] = useState(false);

  // Proactive nudge after user activity
  useEffect(() => {
    if (hasShownProactiveMessage) return;

    const handleActivity = () => {
      if (hasShownProactiveMessage) return;
      
      setTimeout(() => {
        if (!hasShownProactiveMessage) {
          const proactiveMessage: Message = {
            id: 'proactive-' + Date.now(),
            text: "Quick question — does this kind of insight look useful to you? We can set this up for your listings. Want a walkthrough?",
            sender: 'assistant',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, proactiveMessage]);
          setHasShownProactiveMessage(true);
        }
      }, 5000); // 5 seconds after activity
    };

    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [hasShownProactiveMessage]);

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Handle contextual responses
    if (input.includes('cool') || input.includes('nice') || input.includes('impressive')) {
      return "Thanks! This is a demo dashboard showing simulated metrics: 92% occupancy, $3,400 net this month, and 45% repeat guests. Want us to set this up for your listings? Just drop your info and we'll reach out.";
    }
    
    if (input.includes('how') && input.includes('work')) {
      return "This dashboard connects to your property listings and provides real-time AI insights. We track everything from occupancy to guest satisfaction. Want a walkthrough of how we'd customize this for you?";
    }
    
    if (input.includes('get this') || input.includes('want this') || input.includes('can i')) {
      return "Absolutely! We can set this up for your property. Just submit your interest via our chatbot and we'll reach out with a custom demo for your listings.";
    }

    if (input.includes('summary') || input.includes('explain')) {
      return "This is a demo dashboard. The metrics are simulated to show 92% occupancy, $3,400 net this month, and 45% repeat guests. Want us to set this up for your listings?";
    }
    
    if (input.includes('occupancy')) return mockResponses.occupancy;
    if (input.includes('turnover')) return mockResponses.turnovers;
    if (input.includes('maintenance') || input.includes('issues')) return mockResponses.maintenance;
    if (input.includes('revenue') || input.includes('property') || input.includes('most')) return mockResponses.revenue;
    if (input.includes('performance') || input.includes('week') || input.includes('compared')) return mockResponses.performance;
    
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
