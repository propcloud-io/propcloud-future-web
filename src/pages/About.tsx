
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import SystemGraphic from "@/components/SystemGraphic";
import { Handshake, Settings, Search, Brain } from "lucide-react";
import { useEffect } from "react";

export default function About() {
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  // Always scroll to top when component mounts and update page metadata
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update page-specific metadata
    document.title = "About PropCloud | Vision & Operations";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how PropCloud operates today and our future vision for AI-powered hospitality.');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/about');
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background font-sans overflow-x-hidden">
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-20 px-4 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 overflow-hidden">
        <AbstractAccent position="top" color="blue" />
        <SystemGraphic className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-20 z-0 scale-150" />
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
            We're Reimagining How Real Estate is Managed
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-up" style={{animationDelay: '.13s', animationFillMode: 'both'}}>
            At PropCloud, we believe intelligent systems should do the heavy lifting — not humans chained to spreadsheets and check-in calls.
          </p>
          <button
            onClick={openChatBot}
            className="inline-block bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold rounded-xl px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-up"
            style={{animationDelay: '.26s', animationFillMode: 'both'}}
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* OUR WHY */}
      <section className="bg-gradient-to-br from-white via-slate-50/50 to-teal-50/30 px-4 py-16 md:py-20 relative">
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#14b8a6" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-dots)" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto text-left relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
            Our Why
          </h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-lg">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed animate-fade-up" style={{animationDelay:'.06s', animationFillMode:'both'}}>
              PropCloud was born from a simple realization: short-term rental operators are stuck between legacy tools, disconnected apps, and overwhelming manual work.
              <br /><br />
              We saw a better way — one that combines intelligent automation, thoughtful service, and deep operational insight.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO TODAY */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-teal-50/40 px-4 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <SystemGraphic />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
            What We Do (Today)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Virtual property management, fully remote",
              "Internal AI tools support all operational tasks", 
              "Real-time guest support, pricing automation, calendar sync",
              "Active clients in the U.S. and UAE"
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-up border border-white/60"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: 'both'}}
              >
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 mt-2 shadow-sm">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-500 animate-pulse"></div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section className="relative bg-gradient-to-br from-white via-slate-50/50 to-teal-50/30 overflow-hidden">
        <AbstractAccent position="top" color="green" className="opacity-40" />
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-teal-200/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-slate-200/60 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 md:py-24 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
            Our Vision
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50/50 to-slate-50/50 rounded-3xl transform rotate-1 shadow-lg"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-white/80 animate-fade-up" style={{animationDelay:".10s", animationFillMode:"both"}}>
              <div className="text-xl md:text-2xl lg:text-3xl text-slate-800 font-medium leading-relaxed space-y-6">
                <p className="font-bold bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent">We're not building just another platform.</p>
                <p>We're building the first AI Operating System for property management —<br />
                where operations orchestrate themselves,<br />
                where decisions happen before problems arise,<br />
                where intelligence replaces routine.</p>
                <p className="font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">PropCloud is not a dashboard. It's a new way of working.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-teal-50/40 px-4 py-16 md:py-20 relative">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="philosophy-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#14b8a6" opacity="0.4"/>
                <circle cx="15" cy="15" r="1" fill="#1e293b" opacity="0.3"/>
                <circle cx="45" cy="45" r="1" fill="#0f766e" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#philosophy-pattern)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Handshake size={32} className="text-teal-600" />, text: "Human-first" },
              { icon: <Settings size={32} className="text-slate-600" />, text: "Automation with empathy" },
              { icon: <Search size={32} className="text-teal-600" />, text: "Real-world learning > synthetic AI demos" },
              { icon: <Brain size={32} className="text-slate-600" />, text: "Intelligence = intuition + experience" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-up border border-white/60"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: 'both'}}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-slate-50 shadow-md border border-white/60">
                  {item.icon}
                </div>
                <p className="text-lg font-medium text-slate-800 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gradient-to-br from-white via-slate-50/50 to-teal-50/30 px-4 py-16 md:py-20 relative overflow-hidden">
        <AbstractAccent position="bottom" color="blue" />
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-75">
            <SystemGraphic />
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/60 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 animate-fade-up bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent">
              Want to manage your properties the intelligent way?
            </h3>
            <button
              onClick={openChatBot}
              className="inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-slate-700 text-white font-bold rounded-xl px-8 py-4 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-up"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
