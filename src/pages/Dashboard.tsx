
import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  TrendingUp, 
  Users, 
  Star, 
  Calendar, 
  Wrench, 
  BarChart3,
  Send,
  Bot
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';

// Mock data for the booking trend chart
const bookingTrendData = [
  { day: 'Mon', occupancy: 88 },
  { day: 'Tue', occupancy: 92 },
  { day: 'Wed', occupancy: 85 },
  { day: 'Thu', occupancy: 94 },
  { day: 'Fri', occupancy: 97 },
  { day: 'Sat', occupancy: 89 },
  { day: 'Sun', occupancy: 91 },
];

const chartConfig = {
  occupancy: {
    label: "Occupancy Rate",
    color: "hsl(var(--primary))",
  },
};

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your PropCloud assistant. Ask me anything about your properties.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('occupancy') || lowerQuestion.includes('occupancy rate')) {
      return "Your occupancy rate is currently 91% across 8 properties. That's excellent performance!";
    }
    if (lowerQuestion.includes('revenue') || lowerQuestion.includes('income') || lowerQuestion.includes('money')) {
      return "This month you've generated $14,800 in revenue across your 8 properties. Villa Nova is your top performer with $3,420.";
    }
    if (lowerQuestion.includes('turnover') || lowerQuestion.includes('cleaning')) {
      return "You have 5 turnovers scheduled this week. All cleaning and inspections are coordinated automatically.";
    }
    if (lowerQuestion.includes('maintenance') || lowerQuestion.includes('issues') || lowerQuestion.includes('repair')) {
      return "There are 2 maintenance issues currently being resolved. Both are non-critical and won't affect guest experience.";
    }
    if (lowerQuestion.includes('guest') || lowerQuestion.includes('satisfaction') || lowerQuestion.includes('rating')) {
      return "Your guest satisfaction is outstanding at 4.8/5 stars based on recent feedback. Guests particularly love the quick communication!";
    }
    if (lowerQuestion.includes('property') || lowerQuestion.includes('properties')) {
      return "You currently have 8 active properties under management. All are performing well with Villa Nova leading in revenue generation.";
    }
    if (lowerQuestion.includes('last week') || lowerQuestion.includes('compared') || lowerQuestion.includes('performance')) {
      return "Compared to last week, your occupancy increased by 3% and revenue grew by 8%. The dynamic pricing adjustments are working well!";
    }
    if (lowerQuestion.includes('booking') || lowerQuestion.includes('trend')) {
      return "Your booking trend shows strong performance this week, with Friday being your peak day at 97% occupancy.";
    }

    return "I can help you with questions about your occupancy rates, revenue, maintenance issues, guest satisfaction, turnovers, and property performance. What would you like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent">
              Performance Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time insights into your property performance
            </p>
          </div>

          {/* Performance Overview Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Properties Under Management */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Properties Under Management</CardTitle>
                <Home className="h-4 w-4 text-propcloud-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-propcloud-800">8 Properties</div>
                <p className="text-xs text-gray-600 mt-1">Active listings</p>
              </CardContent>
            </Card>

            {/* Monthly Revenue */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-propcloud-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-propcloud-800">$14,800</div>
                <p className="text-xs text-gray-600 mt-1">Revenue this month</p>
              </CardContent>
            </Card>

            {/* Occupancy Rate */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Occupancy Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-propcloud-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-propcloud-800">91%</div>
                <p className="text-xs text-gray-600 mt-1">Across all units</p>
              </CardContent>
            </Card>

            {/* Guest Satisfaction */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Guest Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-propcloud-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-propcloud-800">4.8 / 5 ⭐️</div>
                <p className="text-xs text-gray-600 mt-1">Based on guest feedback</p>
              </CardContent>
            </Card>

            {/* Upcoming Turnovers */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming Turnovers</CardTitle>
                <Calendar className="h-4 w-4 text-propcloud-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-propcloud-800">5 Turnovers</div>
                <p className="text-xs text-gray-600 mt-1">Scheduled cleanings</p>
              </CardContent>
            </Card>

            {/* Open Maintenance Issues */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Open Maintenance Issues</CardTitle>
                <Wrench className="h-4 w-4 text-propcloud-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-propcloud-800">2 Issues</div>
                <p className="text-xs text-gray-600 mt-1">Pending resolution</p>
              </CardContent>
            </Card>
          </div>

          {/* Booking Trend Chart */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-propcloud-800">Booking Trend (Last 7 Days)</CardTitle>
              <p className="text-sm text-gray-600">Daily occupancy percentage</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <AreaChart data={bookingTrendData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* AI Performance Chat Assistant */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-propcloud-800">
                <Bot className="h-5 w-5" />
                AI Performance Assistant
              </CardTitle>
              <p className="text-sm text-gray-600">Ask me anything about your property performance metrics</p>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.isBot
                          ? 'bg-white text-gray-800 shadow-sm'
                          : 'bg-gradient-to-r from-propcloud-700 to-accent-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 shadow-sm max-w-xs px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your properties..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-propcloud-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-propcloud-700 to-accent-600 text-white px-4 py-2 rounded-lg hover:brightness-110 transition duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
