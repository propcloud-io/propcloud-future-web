
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
  Bot,
  Moon,
  Sun,
  Bell,
  Settings,
  User,
  LogOut
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';
import { useTheme } from '@/components/ThemeProvider';
import Header from '@/components/Header';

// Enhanced mock data for better UX simulation
const bookingTrendData = [
  { day: 'Mon', occupancy: 88, revenue: 2100, bookings: 12 },
  { day: 'Tue', occupancy: 92, revenue: 2340, bookings: 15 },
  { day: 'Wed', occupancy: 85, revenue: 1950, bookings: 10 },
  { day: 'Thu', occupancy: 94, revenue: 2580, bookings: 18 },
  { day: 'Fri', occupancy: 97, revenue: 2890, bookings: 22 },
  { day: 'Sat', occupancy: 89, revenue: 2200, bookings: 14 },
  { day: 'Sun', occupancy: 91, revenue: 2450, bookings: 16 },
];

const revenueData = [
  { month: 'Jan', revenue: 42000, target: 40000 },
  { month: 'Feb', revenue: 45000, target: 42000 },
  { month: 'Mar', revenue: 48000, target: 45000 },
  { month: 'Apr', revenue: 52000, target: 48000 },
  { month: 'May', revenue: 49000, target: 50000 },
  { month: 'Jun', revenue: 58000, target: 52000 },
];

const chartConfig = {
  occupancy: {
    label: "Occupancy Rate",
    color: "hsl(var(--propcloud-600))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--accent-600))",
  },
};

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const [activeChart, setActiveChart] = useState<'occupancy' | 'revenue'>('occupancy');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your PropCloud assistant. I can help with property insights, performance metrics, and operational questions.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [notifications] = useState(3);
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

    // Enhanced bot responses with more context
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
    }, 1200 + Math.random() * 800);
  };

  const generateBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('occupancy') || lowerQuestion.includes('occupancy rate')) {
      return "Your current occupancy rate is 91% across 8 properties. This is 12% higher than the market average! Villa Nova (97%) and Seaside Retreat (95%) are your top performers.";
    }
    if (lowerQuestion.includes('revenue') || lowerQuestion.includes('income') || lowerQuestion.includes('money')) {
      return "This month you've generated $14,800 in revenue. That's a 15% increase from last month! Your average daily rate is $185, with Villa Nova leading at $285/night.";
    }
    if (lowerQuestion.includes('turnover') || lowerQuestion.includes('cleaning')) {
      return "You have 5 turnovers scheduled this week. All cleaning teams are confirmed and automated check-in instructions have been sent to incoming guests.";
    }
    if (lowerQuestion.includes('maintenance') || lowerQuestion.includes('issues') || lowerQuestion.includes('repair')) {
      return "There are 2 active maintenance requests: AC filter replacement at Ocean View (scheduled for today) and a minor plumbing issue at Mountain Lodge (contractor dispatched).";
    }
    if (lowerQuestion.includes('guest') || lowerQuestion.includes('satisfaction') || lowerQuestion.includes('rating')) {
      return "Your guest satisfaction is excellent at 4.8/5 stars! Recent highlights: 'Amazing communication' (Villa Nova), 'Spotless property' (Seaside Retreat). Only 1 minor complaint this month.";
    }
    if (lowerQuestion.includes('best') || lowerQuestion.includes('top') || lowerQuestion.includes('performing')) {
      return "Villa Nova is your star performer with $3,420 revenue this month, 97% occupancy, and 4.9-star rating. Consider implementing its successful strategies across other properties.";
    }
    if (lowerQuestion.includes('pricing') || lowerQuestion.includes('rates')) {
      return "Dynamic pricing is active across all properties. Current optimization shows 8% revenue increase. Weekend rates are 35% higher, with special event premiums of up to 50%.";
    }
    if (lowerQuestion.includes('calendar') || lowerQuestion.includes('bookings')) {
      return "Your booking calendar shows strong performance: 67% occupancy next month, 23 confirmed bookings this week, and average booking window of 21 days.";
    }

    return "I can help you with occupancy rates, revenue analysis, maintenance tracking, guest satisfaction, pricing optimization, and booking management. What specific insights do you need?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const metrics = [
    { title: "Properties Under Management", value: "8 Properties", change: "+2 this quarter", icon: Home, color: "text-blue-600 dark:text-blue-400" },
    { title: "Monthly Revenue", value: "$14,800", change: "+15% vs last month", icon: TrendingUp, color: "text-green-600 dark:text-green-400" },
    { title: "Occupancy Rate", value: "91%", change: "+12% vs market avg", icon: BarChart3, color: "text-purple-600 dark:text-purple-400" },
    { title: "Guest Satisfaction", value: "4.8 / 5 ⭐️", change: "+0.3 this quarter", icon: Star, color: "text-yellow-600 dark:text-yellow-400" },
    { title: "Upcoming Turnovers", value: "5 Turnovers", change: "All confirmed", icon: Calendar, color: "text-indigo-600 dark:text-indigo-400" },
    { title: "Open Maintenance Issues", value: "2 Issues", change: "Both in progress", icon: Wrench, color: "text-red-600 dark:text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Enhanced Dashboard Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent dark:from-propcloud-300 dark:to-propcloud-500">
                Performance Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Real-time insights into your property performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleThemeToggle}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <Card key={metric.title} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-propcloud-primary">{metric.value}</div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">{metric.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Charts Section with fixed boundaries */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {/* Booking Trend Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-propcloud-primary">
                      Weekly Performance
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Daily occupancy and booking trends</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={activeChart === 'occupancy' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveChart('occupancy')}
                    >
                      Occupancy
                    </Button>
                    <Button
                      variant={activeChart === 'revenue' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveChart('revenue')}
                    >
                      Revenue
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="chart-container">
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={bookingTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey={activeChart}
                        stroke={activeChart === 'occupancy' ? "hsl(var(--propcloud-600))" : "hsl(var(--accent-600))"}
                        fill={activeChart === 'occupancy' ? "hsl(var(--propcloud-600))" : "hsl(var(--accent-600))"}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-propcloud-primary">
                  Revenue vs Target
                </CardTitle>
                <p className="text-sm text-muted-foreground">Monthly performance tracking</p>
              </CardHeader>
              <CardContent className="chart-container">
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--propcloud-600))"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "hsl(var(--propcloud-600))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3, fill: "hsl(var(--muted-foreground))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced AI Assistant */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-propcloud-primary">
                <Bot className="h-5 w-5 text-propcloud-600 dark:text-propcloud-400" />
                AI Performance Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">Get instant insights about your property portfolio</p>
            </CardHeader>
            <CardContent>
              {/* Enhanced Chat Interface */}
              <div className="h-80 overflow-y-auto mb-4 space-y-4 p-4 bg-muted/30 rounded-lg border">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-lg ${
                        message.isBot
                          ? 'bg-card text-card-foreground shadow-sm border'
                          : 'bg-propcloud-600 dark:bg-propcloud-500 text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-card text-card-foreground shadow-sm border max-w-xs px-4 py-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about occupancy, revenue, guest satisfaction..."
                  className="flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-propcloud-500 dark:focus:ring-propcloud-400 bg-background text-foreground"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-propcloud-600 hover:bg-propcloud-700 dark:bg-propcloud-500 dark:hover:bg-propcloud-600 text-white px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("What's my best performing property?")}
                  className="text-xs"
                >
                  Best Property
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Show me this month's revenue breakdown")}
                  className="text-xs"
                >
                  Revenue Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Any maintenance issues to address?")}
                  className="text-xs"
                >
                  Maintenance Status
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
