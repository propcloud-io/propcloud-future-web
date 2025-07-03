import React, { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { getPropertyReports, getDashboardMetrics, type PropertyReport } from './DashboardService';
import { createConversation } from '../ChatBot/supabaseService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

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
  const [propertyData, setPropertyData] = useState<PropertyReport[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<any>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [reports, metrics] = await Promise.all([
        getPropertyReports(),
        getDashboardMetrics()
      ]);
      
      setPropertyData(reports);
      setDashboardMetrics(metrics);
      console.log('Dashboard data loaded:', { reports, metrics });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const analyzeUserIntent = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (!propertyData.length || !dashboardMetrics) {
      return "I'm still loading your property data. Please try again in a moment.";
    }

    // Property comparison queries
    if (lowerInput.includes('which') && (lowerInput.includes('better') || lowerInput.includes('best') || lowerInput.includes('top'))) {
      const topProperty = propertyData.reduce((prev, current) => 
        prev.revenue > current.revenue ? prev : current
      );
      return `Your top performing property is ${topProperty.property_name} with $${topProperty.revenue.toLocaleString()} in revenue and ${topProperty.occupancy_rate}% occupancy rate.`;
    }

    // Revenue-focused queries
    if (lowerInput.includes('most money') || lowerInput.includes('highest revenue') || lowerInput.includes('who made')) {
      const topEarner = propertyData.reduce((prev, current) => 
        prev.revenue > current.revenue ? prev : current
      );
      const secondTop = propertyData.sort((a, b) => b.revenue - a.revenue)[1];
      return `${topEarner.property_name} generated the most revenue at $${topEarner.revenue.toLocaleString()}${secondTop ? `, followed by ${secondTop.property_name} at $${secondTop.revenue.toLocaleString()}` : ''}.`;
    }

    // Specific property queries
    const mentionedProperty = propertyData.find(prop => 
      lowerInput.includes(prop.property_name.toLowerCase())
    );
    if (mentionedProperty) {
      return `${mentionedProperty.property_name} has generated $${mentionedProperty.revenue.toLocaleString()} with ${mentionedProperty.occupancy_rate}% occupancy and ${mentionedProperty.number_of_bookings} bookings. ${mentionedProperty.maintenance_issues > 0 ? `There are ${mentionedProperty.maintenance_issues} maintenance issues to address.` : 'No maintenance issues currently.'} Guest rating: ${mentionedProperty.guest_rating}/5.`;
    }

    // Average occupancy queries
    if (lowerInput.includes('average occupancy') || lowerInput.includes('overall occupancy')) {
      return `Your portfolio average occupancy is ${dashboardMetrics.averageOccupancy}%. The industry benchmark is typically 75-85%.`;
    }

    // Maintenance queries
    if (lowerInput.includes('maintenance') || lowerInput.includes('issues') || lowerInput.includes('repairs')) {
      const propertiesWithIssues = propertyData.filter(prop => prop.maintenance_issues > 0);
      if (propertiesWithIssues.length === 0) {
        return "Great news! No maintenance issues currently reported across your portfolio.";
      }
      return `You have ${dashboardMetrics.maintenanceIssues} maintenance issues across ${propertiesWithIssues.length} properties: ${propertiesWithIssues.map(prop => prop.property_name).join(', ')}.`;
    }

    // Total revenue queries
    if (lowerInput.includes('total') && lowerInput.includes('revenue')) {
      return `Your total portfolio revenue is $${dashboardMetrics.totalRevenue.toLocaleString()} across ${dashboardMetrics.totalProperties} properties. That's ${dashboardMetrics.totalRevenue > 15000 ? 'excellent performance' : 'solid performance'}.`;
    }

    // Portfolio overview
    if (lowerInput.includes('overview') || lowerInput.includes('summary') || lowerInput.includes('status')) {
      const topPerformer = propertyData.length > 0 ? propertyData.reduce((prev, current) => prev.revenue > current.revenue ? prev : current) : null;
      return `Portfolio Overview: Managing ${dashboardMetrics.totalProperties} properties with $${dashboardMetrics.totalRevenue.toLocaleString()} total revenue and ${dashboardMetrics.averageOccupancy}% average occupancy. ${topPerformer ? `${topPerformer.property_name} is your star performer.` : ''} ${dashboardMetrics.maintenanceIssues} maintenance items to address.`;
    }

    // Default response
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

    // Store conversation in Supabase
    try {
      await createConversation({
        message: currentInput,
        is_from_user: true,
        page_context: '/app'
      });
    } catch (error) {
      console.error('Error storing user message:', error);
    }

    // Simulate thinking time
    setTimeout(async () => {
      const response = analyzeUserIntent(currentInput);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Store assistant response
      try {
        await createConversation({
          message: response,
          is_from_user: false,
          page_context: '/app'
        });
      } catch (error) {
        console.error('Error storing assistant message:', error);
      }
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
