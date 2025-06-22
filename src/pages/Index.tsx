import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { CheckCircle, Calendar, DollarSign, MessageCircle, Wrench, TrendingUp, Bell, Zap, Target, BarChart3 } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import AIFlowVisual from "@/components/AIFlowVisual";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Bell size={28} className="text-accent-600" />,
    title: "Guest Messaging & Experience",
    subtitle: "24/7 AI-Powered Guest Support",
    description: "We instantly handle every guest question, concern, and request — so you never lose sleep over late-night messages.",
  },
  {
    icon: <Calendar size={28} className="text-propcloud-600" />,
    title: "Booking & Channel Management",
    subtitle: "Seamless Calendar Sync & Listing Control",
    description: "We centralize your calendar, eliminate double bookings, and optimize listing visibility across all platforms.",
  },
  {
    icon: <DollarSign size={28} className="text-accent-600" />,
    title: "Revenue Optimization",
    subtitle: "Dynamic Pricing Engine",
    description: "Our internal AI tracks market demand daily, adjusting your rates to maximize occupancy and income — automatically.",
  },
  {
    icon: <Wrench size={28} className="text-propcloud-600" />,
    title: "Turnover & Property Care",
    subtitle: "Smart Housekeeping & Maintenance Oversight",
    description: "We schedule, track, and verify cleanings, inspections, and repairs — before they become guest complaints.",
  },
  {
    icon: <Target size={28} className="text-accent-600" />,
    title: "Marketing & Visibility",
    subtitle: "Automated Listing Optimization",
    description: "We craft high-converting listings and automate outreach to keep your properties booked and top-ranked.",
  },
  {
    icon: <BarChart3 size={28} className="text-propcloud-600" />,
    title: "Owner Insights",
    subtitle: "Transparent Reporting & Human Support",
    description: "Stay in control with performance dashboards, regular updates, and real people when you need them.",
  },
];

export default function Index() {
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden relative">
      <Header />
      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center text-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
        >
          <AbstractAccent position="top" color="blue" />
          {/* Different visual for homepage - using AIFlowVisual instead of SystemGraphic */}
          <AIFlowVisual className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-20 z-0 scale-150" />
          {/* Enhanced hero background visual */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-accent-200 to-propcloud-200 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-propcloud-200 to-accent-200 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
              Virtual Property Management,<br />
              Powered by People + AI
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-propcloud-700 mb-8 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-up" style={{animationDelay: ".16s", animationFillMode: "both"}}>
              We manage your listings, guests, pricing, and operations — so you can focus on growth.
            </p>
            <button
              onClick={openChatBot}
              className="inline-block rounded-lg bg-gradient-to-r from-propcloud-700 to-accent-600 text-white font-bold px-8 py-4 text-base lg:text-lg shadow-soft hover:brightness-110 hover:scale-105 transition duration-150 animate-fade-up"
              style={{animationDelay: ".27s", animationFillMode: "both"}}
            >
              Start Managing Today
            </button>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          className="py-16 lg:py-24 bg-surface shadow-soft relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="service-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="1" fill="#14b8a6" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#service-grid)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
                You Own. We Operate.
              </h2>
              <p className="text-lg text-propcloud-600 text-center mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{animationDelay: ".1s", animationFillMode: "both"}}>
                End-to-end property management that scales with your portfolio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Bell size={28} className="text-accent-600" />,
                    title: "Guest Messaging & Experience",
                    subtitle: "24/7 AI-Powered Guest Support",
                    description: "We instantly handle every guest question, concern, and request — so you never lose sleep over late-night messages.",
                  },
                  {
                    icon: <Calendar size={28} className="text-propcloud-600" />,
                    title: "Booking & Channel Management",
                    subtitle: "Seamless Calendar Sync & Listing Control",
                    description: "We centralize your calendar, eliminate double bookings, and optimize listing visibility across all platforms.",
                  },
                  {
                    icon: <DollarSign size={28} className="text-accent-600" />,
                    title: "Revenue Optimization",
                    subtitle: "Dynamic Pricing Engine",
                    description: "Our internal AI tracks market demand daily, adjusting your rates to maximize occupancy and income — automatically.",
                  },
                  {
                    icon: <Wrench size={28} className="text-propcloud-600" />,
                    title: "Turnover & Property Care",
                    subtitle: "Smart Housekeeping & Maintenance Oversight",
                    description: "We schedule, track, and verify cleanings, inspections, and repairs — before they become guest complaints.",
                  },
                  {
                    icon: <Target size={28} className="text-accent-600" />,
                    title: "Marketing & Visibility",
                    subtitle: "Automated Listing Optimization",
                    description: "We craft high-converting listings and automate outreach to keep your properties booked and top-ranked.",
                  },
                  {
                    icon: <BarChart3 size={28} className="text-propcloud-600" />,
                    title: "Owner Insights",
                    subtitle: "Transparent Reporting & Human Support",
                    description: "Stay in control with performance dashboards, regular updates, and real people when you need them.",
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-soft hover:shadow-md transition-all hover:scale-105 duration-200 animate-fade-up border border-gray-100/50 h-full"
                    style={{animationDelay: `${0.07 + idx * 0.06}s`, animationFillMode: "both"}}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-surface to-gray-50 group-hover:from-accent-50 group-hover:to-propcloud-50 transition-colors duration-200">
                        {service.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg lg:text-xl text-propcloud-800 font-semibold leading-tight mb-2">
                          {service.title}
                        </h3>
                        <h4 className="text-base font-medium text-accent-700 mb-3">
                          {service.subtitle}
                        </h4>
                      </div>
                    </div>
                    <p className="text-propcloud-600 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="py-16 lg:py-24 bg-background relative"
        >
          {/* Enhanced background visual */}
          <div className="absolute inset-0 overflow-hidden opacity-40">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <AIFlowVisual className="scale-75" />
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-12 bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent text-center animate-fade-up">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  "Schedule your onboarding call",
                  "We connect and configure your listings within 48 hours",
                  "We handle day-to-day operations using people + AI",
                ].map((text, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center gap-6 animate-fade-up"
                    style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: "both"}}
                  >
                    <div className="relative">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-propcloud-700 to-accent-600 text-white font-bold shadow-soft text-2xl relative z-10">
                        {idx + 1}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-propcloud-700 to-accent-600 blur-lg opacity-30 animate-pulse"></div>
                    </div>
                    <span className="block font-medium text-lg lg:text-xl text-propcloud-800 leading-relaxed max-w-xs">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI SUMMARY */}
        <section
          id="ai"
          className="py-16 lg:py-24 bg-surface relative overflow-hidden"
        >
          <AbstractAccent position="top" color="green" className="opacity-50" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-accent-100 to-transparent rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-propcloud-100 to-transparent rounded-full blur-2xl opacity-60"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
              <div className="relative">
                <AIFlowVisual />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
                Built with AI Inside
              </h2>
              <p className="text-lg lg:text-xl text-propcloud-700 leading-relaxed animate-fade-up max-w-3xl">
                We use proprietary AI to streamline guest support, pricing, and workflow automation. It's already working behind the scenes — and soon, it will do much more.
              </p>
              <Link
                to="/about"
                className="inline-block bg-gradient-to-r from-propcloud-700 to-accent-600 text-white font-bold rounded-lg px-8 py-4 text-base lg:text-lg shadow-soft hover:brightness-110 hover:scale-105 transition-all animate-fade-up"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* CONTACT */}
        <section
          id="contact"
          className="py-16 lg:py-24 bg-background flex flex-col items-center justify-center text-center relative"
        >
          <AbstractAccent position="bottom" color="blue" className="opacity-30" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
                Get Started with PropCloud
              </h2>
              <p className="text-lg lg:text-xl text-propcloud-700 mb-8 leading-relaxed animate-fade-up">
                We're accepting a limited number of new properties. Reach out to begin.
              </p>
              <button
                onClick={openChatBot}
                className="inline-block bg-gradient-to-r from-accent-600 to-propcloud-700 text-white font-bold rounded-lg px-8 py-4 text-base lg:text-lg shadow-soft hover:brightness-110 hover:scale-105 transition mb-6 animate-fade-up"
              >
                Chat with PropBot
              </button>
              <div className="text-base lg:text-lg text-accent-700 mt-2 animate-fade-up">
                Or email us at contact@propcloud.io
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
