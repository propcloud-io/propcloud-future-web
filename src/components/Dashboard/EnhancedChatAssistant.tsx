
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '@/types/chatbot';
import { generateId, delay, sanitizeInput } from '@/utils/chatbotUtils';
import { getEnhancedDashboardData, saveEnhancedConversation, createEnhancedLead, testSupabaseConnection } from '@/services/enhancedSupabaseService';
import { useToast } from '@/hooks/use-toast';

export default function EnhancedChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeAssistant();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeAssistant = async () => {
    // Test connection
    const connected = await testSupabaseConnection();
    setIsConnected(connected);
    
    // Load dashboard data
    try {
      const { properties: propertiesData, reports: reportsData } = await getEnhancedDashboardData();
      setProperties(propertiesData);
      setReports(reportsData);
      setDataLoaded(true);
      console.log('📊 Dashboard data loaded:', { properties: propertiesData.length, reports: reportsData.length });
    } catch (error) {
      console.error('❌ Failed to load dashboard data:', error);
      setDataLoaded(false);
    }

    // Add welcome message
    await delay(1000);
    addBotMessage("Ask me about your property performance — I can explain revenue, occupancy, trends, and more.");
  };

  const addMessage = async (text: string, isBot: boolean, isTyping = false) => {
    const message: ChatMessage = {
      id: generateId(),
      text: sanitizeInput(text),
      isBot,
      timestamp: new Date(),
      isTyping
    };
    
    setMessages(prev => [...prev, message]);
    
    // Save to conversations
    if (!isTyping) {
      await saveEnhancedConversation(text, !isBot, 'dashboard');
    }
  };

  const addBotMessage = async (text: string) => {
    setIsTyping(true);
    
    await delay(800 + Math.random() * 800);
    
    setIsTyping(false);
    await addMessage(text, true);
  };

  const analyzeUserQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // If no real data, provide demo context
    if (!dataLoaded || (properties.length === 0 && reports.length === 0)) {
      if (lowerQuery.includes('real data') || lowerQuery.includes('demo')) {
        return "This is a demo dashboard showing sample property management data. The real version would connect to your live property portfolio and show actual performance metrics.";
      }
      
      if (lowerQuery.includes('get started') || lowerQuery.includes('interest') || lowerQuery.includes('sign up')) {
        return "I'd love to help you get this dashboard set up for your properties! This demo shows the kind of insights you'd get. Would you like me to connect you with our team?";
      }
      
      return "This demo dashboard shows sample property performance data. In the real version, I'd analyze your actual properties. Would you like to submit interest to get this set up for your portfolio?";
    }

    try {
      // Property performance queries
      if (lowerQuery.includes('best') || lowerQuery.includes('top') || lowerQuery.includes('which')) {
        if (reports.length > 0) {
          const topProperty = reports.reduce((prev, current) => 
            (Number(prev.revenue) || 0) > (Number(current.revenue) || 0) ? prev : current
          );
          return `Based on the latest data, your top performing property generated $${(Number(topProperty.revenue) || 0).toLocaleString()} in revenue with ${(Number(topProperty.occupancy_rate) || 0).toFixed(1)}% occupancy.`;
        }
      }

      // Revenue queries
      if (lowerQuery.includes('revenue') || lowerQuery.includes('money') || lowerQuery.includes('earning')) {
        if (reports.length > 0) {
          const totalRevenue = reports.reduce((sum, report) => sum + (Number(report.revenue) || 0), 0);
          const avgRevenue = totalRevenue / reports.length;
          return `Your portfolio generated $${totalRevenue.toLocaleString()} total revenue, averaging $${avgRevenue.toLocaleString()} per property.`;
        }
      }

      // Occupancy queries
      if (lowerQuery.includes('occupancy') || lowerQuery.includes('booking')) {
        if (reports.length > 0) {
          const avgOccupancy = reports.reduce((sum, report) => sum + (Number(report.occupancy_rate) || 0), 0) / reports.length;
          return `Your portfolio has an average occupancy rate of ${avgOccupancy.toFixed(1)}%. Industry benchmark is typically 75-85%.`;
        }
      }

      // Maintenance queries
      if (lowerQuery.includes('maintenance') || lowerQuery.includes('issue') || lowerQuery.includes('repair')) {
        if (reports.length > 0) {
          const totalIssues = reports.reduce((sum, report) => sum + (Number(report.maintenance_issues) || 0), 0);
          if (totalIssues === 0) {
            return "Excellent news! No maintenance issues currently reported across your properties.";
          }
          return `You have ${totalIssues} maintenance issues that need attention across your portfolio.`;
        }
      }

      // AI/Technology queries
      if (lowerQuery.includes('ai') || lowerQuery.includes('how') && lowerQuery.includes('work')) {
        return "Our AI analyzes your property data in real-time, optimizes pricing, handles guest communications, and predicts maintenance needs. It's like having a property management expert working 24/7 for your portfolio.";
      }

      // Getting started
      if (lowerQuery.includes('get started') || lowerQuery.includes('interest') || lowerQuery.includes('demo')) {
        return "I can help you get this dashboard set up for your actual properties! You'd get real-time insights, automated reporting, and AI-powered recommendations. Should I connect you with our team?";
      }

      // Portfolio overview
      if (lowerQuery.includes('overview') || lowerQuery.includes('summary') || lowerQuery.includes('status')) {
        const totalRevenue = reports.reduce((sum, report) => sum + (Number(report.revenue) || 0), 0);
        const avgOccupancy = reports.length > 0 ? reports.reduce((sum, report) => sum + (Number(report.occupancy_rate) || 0), 0) / reports.length : 0;
        const totalMaintenance = reports.reduce((sum, report) => sum + (Number(report.maintenance_issues) || 0), 0);
        
        return `Portfolio Summary: ${properties.length} properties, $${totalRevenue.toLocaleString()} total revenue, ${avgOccupancy.toFixed(1)}% avg occupancy, ${totalMaintenance} maintenance items to address.`;
      }

      // Default response
      return `I can help analyze your property performance. You have ${properties.length} properties with ${reports.length} performance reports. Try asking about revenue, occupancy rates, maintenance, or say "submit interest" to get this dashboard for your properties.`;
    } catch (error) {
      console.error('❌ Error analyzing query:', error);
      return "I encountered an issue analyzing your request. Please try asking about revenue, occupancy, or maintenance issues.";
    }
  };

  const handleSubmitInterest = async () => {
    try {
      const leadData = {
        name: 'Dashboard Demo User',
        email: 'demo@example.com',
        numberOfProperties: '1',
        locations: 'Demo Location',
        additionalNotes: 'Submitted interest from dashboard demo'
      };

      if (isConnected) {
        await createEnhancedLead(leadData);
        await addBotMessage("Perfect! I've recorded your interest. Our team will reach out to show you how to get this dashboard set up for your properties. Thanks for your interest in PropCloud!");
      } else {
        await addBotMessage("I'd love to help you get started! Please visit our main website to submit your information, or contact us directly at contact@propcloud.io");
      }
      
      toast({
        title: "Interest Submitted!",
        description: "Our team will be in touch soon.",
      });
    } catch (error) {
      console.error('❌ Failed to submit interest:', error);
      await addBotMessage("Please visit our main website to get started, or contact us at contact@propcloud.io");
    }
  };

  const handleUserMessage = async (message: string) => {
    const sanitized = sanitizeInput(message);
    await addMessage(sanitized, false);

    const lowerMessage = sanitized.toLowerCase();
    
    if (lowerMessage.includes('submit interest') || lowerMessage.includes('get started') || lowerMessage.includes('sign up')) {
      await handleSubmitInterest();
      return;
    }

    const response = analyzeUserQuery(sanitized);
    await addBotMessage(response);

    // Add CTA after relevant queries
    if (lowerMessage.includes('demo') || lowerMessage.includes('real') || lowerMessage.includes('get started')) {
      setTimeout(async () => {
        setMessages(prev => [...prev, {
          id: generateId(),
          text: 'DEMO_ACTIONS',
          isBot: true,
          timestamp: new Date()
        }]);
      }, 2000);
    }
  };

  const handleSend = () => {
    if (inputValue.trim() && !isTyping) {
      handleUserMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
          {isConnected === null ? 'Connecting...' : isConnected ? 'Connected' : 'Demo Mode'} • {properties.length} properties, {reports.length} reports
        </p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{scrollBehavior: 'smooth'}}>
        {messages.map((message) => (
          <div key={message.id}>
            {message.text === 'DEMO_ACTIONS' ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSubmitInterest}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  🚀 Get This Dashboard
                </button>
                <button
                  onClick={() => handleUserMessage("Tell me more about your AI features")}
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  💡 Learn About AI Features
                </button>
              </div>
            ) : (
              <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-teal-600 text-white'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.isBot && (
                      <Bot size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {!message.isBot && (
                      <User size={16} className="text-white mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            )}
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
        <div ref={messagesEndRef} />
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
            onClick={handleSend}
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
