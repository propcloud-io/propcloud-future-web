
import React, { useState } from 'react';
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
  'properties': "You're managing 8 active properties. Villa Nova and Ocean View are your top performers, generating $3,420 and $2,890 respectively this month.",
  'best': "Villa Nova is your best performing property with $3,420 in revenue this month and 95% occupancy rate.",
  'worst': "Sunset Cottage is underperforming with only 78% occupancy, but we've identified pricing optimization opportunities.",
  'help': "I can analyze your property performance data including revenue, occupancy rates, guest satisfaction, maintenance issues, and upcoming turnovers. What would you like to know?",
  'overview': "Your portfolio is performing well: 91% average occupancy, $14,800 monthly revenue, 4.8-star guest rating, with 5 upcoming turnovers and 2 minor maintenance items.",
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

  const getIntelligentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Help-related queries
    if (input.includes('help') || input.includes('assist') || input.includes('what can') || input.includes('how can')) {
      return mockResponses.help;
    }
    
    // Overview/summary queries
    if (input.includes('overview') || input.includes('summary') || input.includes('show me') || input.includes('tell me about')) {
      return mockResponses.overview;
    }
    
    // Occupancy queries
    if (input.includes('occupancy') || input.includes('occupied') || input.includes('full') || input.includes('booked')) {
      return mockResponses.occupancy;
    }
    
    // Revenue/money/earnings queries
    if (input.includes('revenue') || input.includes('money') || input.includes('earning') || input.includes('income') || 
        input.includes('profit') || input.includes('making') || input.includes('generated') || input.includes('$')) {
      return mockResponses.revenue;
    }
    
    // Best/top/highest performing queries
    if ((input.includes('best') || input.includes('top') || input.includes('highest') || input.includes('most') || 
         input.includes('which one') || input.includes('what property')) && 
        (input.includes('perform') || input.includes('revenue') || input.includes('money') || input.includes('earning'))) {
      return mockResponses.best;
    }
    
    // Worst/lowest performing queries
    if ((input.includes('worst') || input.includes('lowest') || input.includes('underperform') || input.includes('struggling')) &&
        (input.includes('perform') || input.includes('property'))) {
      return mockResponses.worst;
    }
    
    // Properties/portfolio queries
    if (input.includes('properties') || input.includes('portfolio') || input.includes('units') || input.includes('listings')) {
      return mockResponses.properties;
    }
    
    // Performance queries
    if (input.includes('performance') || input.includes('doing') || input.includes('trend') || input.includes('compared')) {
      return mockResponses.performance;
    }
    
    // Maintenance queries
    if (input.includes('maintenance') || input.includes('issues') || input.includes('problems') || input.includes('repairs')) {
      return mockResponses.maintenance;
    }
    
    // Turnover/cleaning queries
    if (input.includes('turnover') || input.includes('cleaning') || input.includes('checkout') || input.includes('upcoming')) {
      return mockResponses.turnovers;
    }
    
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
        text: getIntelligentResponse(inputValue),
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-96">
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
