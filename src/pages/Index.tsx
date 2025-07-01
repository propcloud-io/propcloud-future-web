
import { ArrowRight, CheckCircle, Users, Clock, Zap, Star, MessageSquare, Calendar, TrendingUp, Wrench, Camera, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import AbstractAccent from "@/components/AbstractAccent";
import VisualDivider from "@/components/VisualDivider";
import SystemGraphic from "@/components/SystemGraphic";
import AIFlowVisual from "@/components/AIFlowVisual";
import Testimonials from "@/components/Testimonials";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";

export default function Index() {
  // Function to open chatbot
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ParticleBackground />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent leading-tight">
              Virtual Property Management Powered by People + AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              PropCloud manages your properties with AI precision and human oversight. Get dedicated property managers, 24/7 guest support, and advanced automation – all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={openChatBot}
                className="bg-gradient-to-r from-propcloud-700 to-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-soft hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-200 flex items-center gap-2 group"
              >
                Get Started 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <SmoothScrollLink 
                to="#how-it-works"
                className="text-propcloud-700 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-propcloud-700 hover:bg-propcloud-700 hover:text-white hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                See How It Works
              </SmoothScrollLink>
            </div>
          </div>
        </div>
        <AbstractAccent />
      </section>

      {/* Value Props Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-propcloud-50/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-propcloud-800">Response Time</h3>
              <p className="text-gray-600">Average 2-minute response to guest inquiries</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-propcloud-800">Revenue Boost</h3>
              <p className="text-gray-600">Average 23% increase in rental income</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Star className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-propcloud-800">Guest Satisfaction</h3>
              <p className="text-gray-600">4.9/5 average guest rating across properties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent">
              Complete Property Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From guest communication to revenue optimization, we handle every aspect of your property management with AI precision and human oversight.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Guest Messaging */}
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-soft">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-propcloud-800">Guest Messaging, 24/7</h3>
                <p className="text-gray-600 flex-grow">
                  Instant, human-like replies to every message—day or night.
                </p>
              </CardContent>
            </Card>

            {/* Calendar Management */}
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-soft">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <Calendar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-propcloud-800">Calendar Management</h3>
                <p className="text-gray-600 flex-grow">
                  Sync calendars across OTAs and eliminate double bookings.
                </p>
              </CardContent>
            </Card>

            {/* Dynamic Pricing */}
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-soft">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-propcloud-800">Dynamic Pricing</h3>
                <p className="text-gray-600 flex-grow">
                  AI-driven price updates to maximize revenue every day.
                </p>
              </CardContent>
            </Card>

            {/* Turnover Coordination */}
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-soft">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-propcloud-800">Turnover Coordination</h3>
                <p className="text-gray-600 flex-grow">
                  Auto-scheduled cleaning and inspections after each stay.
                </p>
              </CardContent>
            </Card>

            {/* Maintenance Tracking */}
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-soft">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <Wrench className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-propcloud-800">Maintenance Tracking</h3>
                <p className="text-gray-600 flex-grow">
                  Track, resolve, and prevent guest-affecting issues.
                </p>
              </CardContent>
            </Card>

            {/* Listing Optimization */}
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-soft">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <Camera className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-propcloud-800">Listing Optimization</h3>
                <p className="text-gray-600 flex-grow">
                  Enhanced titles, photos, and keywords for max visibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-propcloud-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent">
              How PropCloud Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 3-step process combines cutting-edge AI with experienced property managers to deliver exceptional results.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-propcloud-800">Connect & Onboard</h3>
                <p className="text-gray-600 text-lg">
                  We sync your listings, import guest data, and configure AI systems tailored to your properties in under 48 hours.
                </p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-propcloud-800">AI + Human Management</h3>
                <p className="text-gray-600 text-lg">
                  Our AI handles routine tasks while dedicated managers oversee complex decisions and guest relationships.
                </p>
              </div>
              
              <div className="text-center bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-r from-propcloud-700 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-propcloud-800">Monitor & Optimize</h3>
                <p className="text-gray-600 text-lg">
                  Track performance through our dashboard while we continuously optimize pricing, operations, and guest satisfaction.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <SystemGraphic />
          </div>
          
          <div className="text-center mt-12">
            <SmoothScrollLink 
              to="/about"
              className="inline-flex items-center gap-2 text-propcloud-700 px-6 py-3 rounded-lg font-semibold border-2 border-propcloud-700 hover:bg-propcloud-700 hover:text-white hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Learn More About Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </SmoothScrollLink>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent">
              The Future of Property Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience next-generation property management where AI precision meets human expertise to maximize your revenue and guest satisfaction.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <AIFlowVisual />
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-soft max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-propcloud-800 mb-2">Smart Analysis</div>
                <p className="text-gray-600">AI processes guest behavior, market trends, and property performance in real-time</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-propcloud-800 mb-2">Instant Response</div>
                <p className="text-gray-600">Automated guest messaging and dynamic pricing updates happen 24/7</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-propcloud-800 mb-2">Human Oversight</div>
                <p className="text-gray-600">Expert property managers review and optimize all AI decisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VisualDivider />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-propcloud-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent">
              Trusted by Property Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how PropCloud has transformed property management for owners across the country.
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-propcloud-800 to-propcloud-600 bg-clip-text text-transparent">
              Ready to Transform Your Properties?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Join hundreds of property owners who've increased their revenue and reduced their workload with PropCloud's AI-powered management.
            </p>
            
            <div className="bg-white p-8 rounded-2xl shadow-soft max-w-2xl mx-auto hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-propcloud-800 mb-2">23%</div>
                  <div className="text-gray-600">Average Revenue Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-propcloud-800 mb-2">2 min</div>
                  <div className="text-gray-600">Average Response Time</div>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-8">
                Get a free consultation and see how much revenue you could be earning with PropCloud.
              </p>
              
              <Button 
                onClick={openChatBot}
                className="bg-gradient-to-r from-propcloud-700 to-accent-600 text-white px-8 py-6 text-lg font-semibold hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-200 group"
                size="lg"
              >
                Schedule Free Consultation
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
