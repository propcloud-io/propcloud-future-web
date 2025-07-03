
import React, { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { getDashboardProperties, getDashboardReports, saveConversation } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';

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
  const [properties, setProperties] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load real data from Supabase with enhanced error handling
    const loadDashboardData = async () => {
      try {
        console.log('🤖 ChatAssistant: Loading data...');
        const [propertiesData, reportsData] = await Promise.all([
          getDashboardProperties(),
          getDashboardReports()
        ]);
        setProperties(propertiesData);
        setReports(reportsData);
        setDataLoaded(true);
        console.log('✅ ChatAssistant: Data loaded successfully', {
          properties: propertiesData.length,
          reports: reportsData.length
        });
      } catch (error) {
        console.error('❌ ChatAssistant: Error loading data:', error);
        setDataLoaded(false);
      }
    };

    loadDashboardData();
  }, []);

  const analyzeUserIntent = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // If no real data, use fallback responses
    if (!dataLoaded || (properties.length === 0 && reports.length === 0)) {
      if (lowerInput.includes('submit interest') || lowerInput.includes('get started')) {
        return "Great! I'll connect you with our team to set up your property management dashboard. This will give you real-time insights for your properties.";
      }
      return "I don't have any property data loaded yet. This dashboard shows performance metrics when connected to real properties. Would you like to submit interest to get this set up for your properties?";
    }

    // Enhanced data analysis with proper error handling
    try {
      // Property comparison queries
      if (lowerInput.includes('which') && (lowerInput.includes('better') || lowerInput.includes('best') || lowerInput.includes('top'))) {
        if (reports.length > 0) {
          const topProperty = reports.reduce((prev, current) => 
            (Number(prev.revenue) || 0) > (Number(current.revenue) || 0) ? prev : current
          );
          return `Based on the latest reports, the top performing property has generated $${(Number(topProperty.revenue) || 0).toLocaleString()} in revenue with ${(Number(topProperty.occupancy_rate) || 0).toFixed(1)}% occupancy rate.`;
        }
      }

      // Revenue-focused queries
      if (lowerInput.includes('most money') || lowerInput.includes('highest revenue') || lowerInput.includes('who made')) {
        if (reports.length > 0) {
          const sortedReports = reports.sort((a, b) => (Number(b.revenue) || 0) - (Number(a.revenue) || 0));
          const topEarner = sortedReports[0];
          const secondEarner = sortedReports[1];
          return `The highest revenue this month was $${(Number(topEarner.revenue) || 0).toLocaleString()}${secondEarner ? `, followed by $${(Number(secondEarner.revenue) || 0).toLocaleString()}` : ''}.`;
        }
      }

      // Average occupancy queries
      if (lowerInput.includes('average occupancy') || lowerInput.includes('overall occupancy')) {
        if (reports.length > 0) {
          const avgOccupancy = reports.reduce((sum, report) => sum + (Number(report.occupancy_rate) || 0), 0) / reports.length;
          return `Your portfolio average occupancy is ${avgOccupancy.toFixed(1)}%. The industry benchmark is typically 75-85%.`;
        }
      }

      // Maintenance queries
      if (lowerInput.includes('maintenance') || lowerInput.includes('issues') || lowerInput.includes('repairs')) {
        if (reports.length > 0) {
          const totalIssues = reports.reduce((sum, report) => sum + (Number(report.maintenance_issues) || 0), 0);
          if (totalIssues === 0) {
            return "Great news! No maintenance issues currently reported across your portfolio. All properties are in good condition.";
          }
          return `You have ${totalIssues} maintenance issues reported across your properties. These should be prioritized for resolution.`;
        }
      }

      // Portfolio overview
      if (lowerInput.includes('overview') || lowerInput.includes('summary') || lowerInput.includes('status')) {
        const totalRevenue = reports.reduce((sum, report) => sum + (Number(report.revenue) || 0), 0);
        const avgOccupancy = reports.length > 0 ? reports.reduce((sum, report) => sum + (Number(report.occupancy_rate) || 0), 0) / reports.length : 0;
        const totalMaintenance = reports.reduce((sum, report) => sum + (Number(report.maintenance_issues) || 0), 0);
        
        return `Portfolio Overview: Managing ${properties.length} properties with $${totalRevenue.toLocaleString()} total revenue and ${avgOccupancy.toFixed(1)}% average occupancy. ${totalMaintenance} maintenance items to address.`;
      }

      // Submit interest
      if (lowerInput.includes('submit interest') || lowerInput.includes('get started') || lowerInput.includes('sign up')) {
        return "Excellent! I'll help you get started with PropCloud's property management system. This dashboard shows the kind of insights you'll get for your properties. Would you like me to connect you with our team?";
      }

      // Default intelligent response
      return `I can help you analyze your property performance data. You have ${properties.length} properties and ${reports.length} performance reports to review. Try asking about revenue comparisons, occupancy rates, maintenance issues, or say "submit interest" to get this set up for your properties.`;
    } catch (error) {
      console.error('❌ Error analyzing user intent:', error);
      return "I encountered an issue analyzing your request. Please try asking about your property performance, revenue, or occupancy rates.";
    }
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

    // Save conversation to Supabase
    try {
      await saveConversation({
        message: currentInput,
        is_from_user: true,
        page_context: 'dashboard',
      });
    } catch (error) {
      console.error('⚠️ Error saving user message:', error);
      // Don't block UI for conversation save errors
    }

    // Simulate thinking time
    setTimeout(async () => {
      try {
        const responseText = analyzeUserIntent(currentInput);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);

        // Save assistant response
        try {
          await saveConversation({
            message: responseText,
            is_from_user: false,
            page_context: 'dashboard',
          });
        } catch (error) {
          console.error('⚠️ Error saving assistant message:', error);
          // Don't block UI for conversation save errors
        }
      } catch (error) {
        console.error('❌ Error generating response:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble analyzing your request right now. Please try again in a moment.",
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
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
        <p className="text-xs text-gray-500 mt-1">
          Powered by PropCloud Intelligence • {dataLoaded ? `${properties.length} properties, ${reports.length} reports` : 'Loading data...'}
        </p>
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
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
