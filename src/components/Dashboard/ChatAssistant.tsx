
import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

// Mock property data (simulating real dashboard data)
const mockPropertyData = {
  properties: [
    { name: 'Villa Nova', revenue: 3420, occupancy: 95, maintenanceIssues: 0, nextCheckIn: '2025-01-08', status: 'excellent' },
    { name: 'Ocean View', revenue: 2890, occupancy: 88, maintenanceIssues: 1, nextCheckIn: '2025-01-09', status: 'good' },
    { name: 'Sunset Cottage', revenue: 1850, occupancy: 78, maintenanceIssues: 0, nextCheckIn: '2025-01-10', status: 'underperforming' },
    { name: 'Mountain Retreat', revenue: 2340, occupancy: 85, maintenanceIssues: 0, nextCheckIn: '2025-01-11', status: 'good' },
    { name: 'Beach House', revenue: 2100, occupancy: 82, maintenanceIssues: 1, nextCheckIn: '2025-01-12', status: 'good' },
    { name: 'City Loft', revenue: 1950, occupancy: 80, maintenanceIssues: 0, nextCheckIn: '2025-01-13', status: 'fair' },
    { name: 'Garden Suite', revenue: 1740, occupancy: 75, maintenanceIssues: 0, nextCheckIn: '2025-01-14', status: 'fair' },
    { name: 'Lakeside Cabin', revenue: 1620, occupancy: 72, maintenanceIssues: 0, nextCheckIn: '2025-01-15', status: 'underperforming' }
  ],
  totalRevenue: 17910,
  averageOccupancy: 81.9,
  totalMaintenanceIssues: 2,
  upcomingTurnovers: 5
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your PropCloud performance analyst. I can help you understand your property data and performance metrics. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const analyzeUserIntent = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Property comparison queries
    if (lowerInput.includes('which') && (lowerInput.includes('better') || lowerInput.includes('best') || lowerInput.includes('top'))) {
      const topProperty = mockPropertyData.properties.reduce((prev, current) => 
        prev.revenue > current.revenue ? prev : current
      );
      return `Your top performing property is ${topProperty.name} with $${topProperty.revenue.toLocaleString()} in revenue this month and ${topProperty.occupancy}% occupancy rate. It's significantly outperforming your portfolio average.`;
    }

    // Revenue-focused queries
    if (lowerInput.includes('most money') || lowerInput.includes('highest revenue') || lowerInput.includes('who made')) {
      const topEarner = mockPropertyData.properties.reduce((prev, current) => 
        prev.revenue > current.revenue ? prev : current
      );
      return `${topEarner.name} generated the most revenue this month at $${topEarner.revenue.toLocaleString()}, followed by ${mockPropertyData.properties.sort((a, b) => b.revenue - a.revenue)[1].name} at $${mockPropertyData.properties.sort((a, b) => b.revenue - a.revenue)[1].revenue.toLocaleString()}.`;
    }

    // Specific property queries
    const mentionedProperty = mockPropertyData.properties.find(prop => 
      lowerInput.includes(prop.name.toLowerCase())
    );
    if (mentionedProperty) {
      return `${mentionedProperty.name} has generated $${mentionedProperty.revenue.toLocaleString()} this month with ${mentionedProperty.occupancy}% occupancy. ${mentionedProperty.maintenanceIssues > 0 ? `There's ${mentionedProperty.maintenanceIssues} maintenance issue to address.` : 'No maintenance issues currently.'} Next check-in is ${mentionedProperty.nextCheckIn}.`;
    }

    // Average occupancy queries
    if (lowerInput.includes('average occupancy') || lowerInput.includes('overall occupancy')) {
      const avgOccupancy = Math.round(mockPropertyData.properties.reduce((sum, prop) => sum + prop.occupancy, 0) / mockPropertyData.properties.length);
      return `Your portfolio average occupancy is ${avgOccupancy}%. Villa Nova leads at 95%, while Lakeside Cabin needs attention at 72%. The industry benchmark is typically 75-85%.`;
    }

    // Maintenance queries
    if (lowerInput.includes('maintenance') || lowerInput.includes('issues') || lowerInput.includes('repairs')) {
      const propertiesWithIssues = mockPropertyData.properties.filter(prop => prop.maintenanceIssues > 0);
      if (propertiesWithIssues.length === 0) {
        return "Great news! No maintenance issues currently reported across your portfolio. All properties are in good condition.";
      }
      return `You have ${mockPropertyData.totalMaintenanceIssues} maintenance issues: ${propertiesWithIssues.map(prop => prop.name).join(' and ')} each have minor issues that need attention. These are flagged as non-urgent.`;
    }

    // Check-in/booking queries
    if (lowerInput.includes('next check') || lowerInput.includes('upcoming') || lowerInput.includes('booking')) {
      const nextProperty = mockPropertyData.properties.sort((a, b) => new Date(a.nextCheckIn).getTime() - new Date(b.nextCheckIn).getTime())[0];
      return `Your next check-in is at ${nextProperty.name} on ${nextProperty.nextCheckIn}. You have ${mockPropertyData.upcomingTurnovers} turnovers scheduled for cleaning and preparation this week.`;
    }

    // Underperforming queries
    if (lowerInput.includes('underperform') || lowerInput.includes('worst') || lowerInput.includes('lowest') || lowerInput.includes('struggling')) {
      const underPerforming = mockPropertyData.properties.filter(prop => prop.occupancy < 80).sort((a, b) => a.occupancy - b.occupancy);
      if (underPerforming.length === 0) {
        return "All your properties are performing well! No properties are currently underperforming based on occupancy metrics.";
      }
      return `${underPerforming[0].name} needs attention with only ${underPerforming[0].occupancy}% occupancy and $${underPerforming[0].revenue.toLocaleString()} revenue. Consider reviewing pricing strategy or listing optimization.`;
    }

    // Total/summary queries
    if (lowerInput.includes('total') && lowerInput.includes('revenue')) {
      return `Your total portfolio revenue this month is $${mockPropertyData.totalRevenue.toLocaleString()}. That's ${mockPropertyData.totalRevenue > 15000 ? 'excellent performance' : 'solid performance'} across ${mockPropertyData.properties.length} properties.`;
    }

    // Compliments and positive feedback
    if (lowerInput.includes('great') || lowerInput.includes('thanks') || lowerInput.includes('good') || lowerInput.includes('awesome')) {
      return "Thank you! I'm glad the insights are helpful. Your portfolio is performing well overall. Let me know if you need any specific analysis.";
    }

    // How it works queries
    if (lowerInput.includes('how') && (lowerInput.includes('work') || lowerInput.includes('dashboard'))) {
      return "This dashboard is powered by PropCloud's AI management system, showing live performance data from your properties. I analyze booking patterns, revenue trends, and operational metrics to give you actionable insights in real-time.";
    }

    // Portfolio overview
    if (lowerInput.includes('overview') || lowerInput.includes('summary') || lowerInput.includes('status')) {
      const topPerformer = mockPropertyData.properties.reduce((prev, current) => prev.revenue > current.revenue ? prev : current);
      return `Portfolio Overview: Managing ${mockPropertyData.properties.length} properties with $${mockPropertyData.totalRevenue.toLocaleString()} total revenue and ${Math.round(mockPropertyData.averageOccupancy)}% average occupancy. ${topPerformer.name} is your star performer. ${mockPropertyData.totalMaintenanceIssues} minor maintenance items to address.`;
    }

    // Default intelligent response
    return "I can help you analyze your property performance data. Try asking about revenue comparisons, occupancy rates, maintenance issues, or specific properties by name. What would you like to explore?";
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
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: analyzeUserIntent(currentInput),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
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
          AI Performance Analyst
        </h3>
        <p className="text-xs text-gray-500 mt-1">Powered by PropCloud Intelligence</p>
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
                <p className="text-sm leading-relaxed">{message.text}</p>
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
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-teal-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-gray-500">Analyzing...</span>
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
