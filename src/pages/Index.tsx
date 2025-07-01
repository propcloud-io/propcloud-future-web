
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { CheckCircle, Calendar, DollarSign, MessageCircle, Wrench, TrendingUp, Bell, Zap, Target, BarChart3 } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import AIFlowVisual from "@/components/AIFlowVisual";
import SystemGraphic from "@/components/SystemGraphic";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Bell size={28} className="text-accent-500" />,
    title: "24/7 Guest Messaging & Support",
    description: "We instantly handle every guest message with accuracy and care — day or night.",
  },
  {
    icon: <Calendar size={28} className="text-propcloud-500" />,
    title: "Booking & Calendar Management",
    description: "We sync all your listings and prevent double bookings across every platform.",
  },
  {
    icon: <DollarSign size={28} className="text-accent-500" />,
    title: "Dynamic Pricing Optimization",
    description: "Our AI updates your rates daily to maximize both occupancy and revenue streams.",
  },
  {
    icon: <Wrench size={28} className="text-propcloud-500" />,
    title: "Turnover & Housekeeping",
    description: "We coordinate cleanings so every check-in is spotless and on time.",
  },
  {
    icon: <Target size={28} className="text-accent-500" />,
    title: "Proactive Maintenance",
    description: "We monitor, report, and resolve issues before guests even notice.",
  },
  {
    icon: <BarChart3 size={28} className="text-propcloud-500" />,
    title: "Marketing & Visibility",
    description: "We enhance your listings and boost visibility through smart outreach campaigns.",
  },
];

const stats = [
  { number: "99.8%", label: "Guest Satisfaction", color: "text-accent-500" },
  { number: "24/7", label: "Response Time", color: "text-propcloud-500" },
  { number: "15%+", label: "Revenue Increase", color: "text-accent-500" },
  { number: "500+", label: "Properties Managed", color: "text-propcloud-500" },
];

export default function Index() {
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col font-sans overflow-x-hidden relative">
      <Header />
      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center text-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 overflow-hidden"
        >
          <AbstractAccent position="top" color="blue" />
          <AIFlowVisual className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-15 z-0 scale-150" />
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-teal-200/60 to-slate-200/60 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-slate-200/60 to-teal-200/60 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
              Virtual Property Management,<br />
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Powered by People + AI</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-up" style={{animationDelay: ".16s", animationFillMode: "both"}}>
              We manage your listings, guests, pricing, and operations — so you can focus on <span className="font-semibold text-teal-600">growth</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
              <button
                onClick={openChatBot}
                className="inline-block rounded-xl bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold px-8 py-4 text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{animationDelay: ".27s", animationFillMode: "both"}}
              >
                <span className="flex items-center gap-2">
                  <Zap size={20} />
                  Start Managing Today
                </span>
              </button>
              <Link
                to="/about"
                className="inline-block rounded-xl border-2 border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700 font-bold px-8 py-4 text-base lg:text-lg hover:bg-white hover:border-teal-300 hover:scale-105 transition-all duration-300 animate-fade-up shadow-lg"
                style={{animationDelay: ".35s", animationFillMode: "both"}}
              >
                Learn Our Story
              </Link>
            </div>
            
            {/* STATS SECTION */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-up bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/70 shadow-xl" style={{animationDelay: ".45s", animationFillMode: "both"}}>
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-slate-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          className="py-16 lg:py-24 bg-gradient-to-br from-white via-slate-50/50 to-teal-50/30 shadow-soft relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="service-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="1.5" fill="#14b8a6" opacity="0.4"/>
                  <circle cx="15" cy="15" r="0.8" fill="#1e293b" opacity="0.3"/>
                  <circle cx="45" cy="45" r="0.8" fill="#0f766e" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#service-grid)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
                You Own. We Operate.
              </h2>
              <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{animationDelay: ".1s", animationFillMode: "both"}}>
                End-to-end property management that scales with your portfolio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {services.map((service, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300 animate-fade-up border border-white/70"
                    style={{animationDelay: `${0.07 + idx * 0.06}s`, animationFillMode: "both"}}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-white to-slate-50 group-hover:from-teal-50 group-hover:to-teal-50 transition-colors duration-300 shadow-md border border-white/60">
                        {service.icon}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg lg:text-xl text-slate-800 font-semibold leading-tight mb-3">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-grow flex items-start">
                      <p className="text-slate-600 leading-relaxed text-sm lg:text-base min-h-[2.5rem] flex items-center">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden opacity-15">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-75">
              <AIFlowVisual />
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-50">
              <SystemGraphic />
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent text-center animate-fade-up">
                How It Works
              </h2>
              <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{animationDelay: ".1s", animationFillMode: "both"}}>
                Get started in minutes, not months. Our streamlined onboarding gets you operational fast.
              </p>
              <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    title: "Schedule your onboarding call",
                    description: "30-minute consultation to understand your properties and goals"
                  },
                  {
                    title: "We connect and configure your listings within 48 hours",
                    description: "Seamless integration with all major booking platforms"
                  },
                  {
                    title: "We handle day-to-day operations using people + AI",
                    description: "Sit back and watch your revenue grow while we handle everything"
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center gap-6 animate-fade-up bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/70 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: "both"}}
                  >
                    <div className="relative">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white font-bold shadow-xl text-2xl relative z-10">
                        {idx + 1}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 blur-lg opacity-30 animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg lg:text-xl text-slate-800 leading-relaxed mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm lg:text-base max-w-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI SUMMARY */}
        <section
          id="ai"
          className="py-16 lg:py-24 bg-gradient-to-br from-white via-slate-50/50 to-teal-50/40 relative overflow-hidden"
        >
          <AbstractAccent position="top" color="green" className="opacity-40" />
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-teal-100/60 to-transparent rounded-full blur-3xl opacity-80 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-slate-100/60 to-transparent rounded-full blur-2xl opacity-80 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
              <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/70 shadow-xl">
                <AIFlowVisual />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm rounded-3xl"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
                Built with AI Inside
              </h2>
              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed animate-fade-up max-w-3xl">
                We use proprietary AI to streamline guest support, pricing, and workflow automation. It's already working behind the scenes — and soon, it will do <span className="font-semibold text-teal-600">much more</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link
                  to="/about"
                  className="inline-block bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold rounded-xl px-8 py-4 text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-fade-up"
                >
                  Learn More
                </Link>
                <Link
                  to="/ai-vision"
                  className="inline-block border-2 border-teal-400 bg-white/80 backdrop-blur-sm text-teal-700 font-bold rounded-xl px-8 py-4 text-base lg:text-lg hover:bg-white hover:border-teal-500 hover:scale-105 transition-all animate-fade-up shadow-lg"
                >
                  See AI Vision
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-16 lg:py-24">
          <Testimonials />
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <AbstractAccent position="bottom" color="blue" className="opacity-30" />
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-50">
              <SystemGraphic />
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/70 shadow-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
                Get Started with PropCloud
              </h2>
              <p className="text-lg lg:text-xl text-slate-700 mb-8 leading-relaxed animate-fade-up">
                We're accepting a <span className="font-semibold text-teal-600">limited number</span> of new properties. Reach out to begin your journey to effortless property management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
                <button
                  onClick={openChatBot}
                  className="inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-slate-700 text-white font-bold rounded-xl px-8 py-4 text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-fade-up"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle size={20} />
                    Chat with PropBot
                  </span>
                </button>
                <a
                  href="mailto:contact@propcloud.io"
                  className="inline-block border-2 border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700 font-bold rounded-xl px-8 py-4 text-base lg:text-lg hover:bg-white hover:border-teal-300 hover:scale-105 transition-all animate-fade-up shadow-lg"
                >
                  Email Us Directly
                </a>
              </div>
              <div className="text-base lg:text-lg text-teal-700 animate-fade-up bg-teal-50/80 rounded-xl p-4 border border-teal-200/60">
                <span className="font-semibold">⚡ Quick Response:</span> We typically respond within 2 hours during business hours
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
