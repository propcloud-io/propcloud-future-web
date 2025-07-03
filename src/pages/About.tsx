
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import SystemGraphic from "@/components/SystemGraphic";
import ParticleBackground from "@/components/ParticleBackground";
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
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 font-sans overflow-x-hidden">
      <Header />
      
      {/* ENHANCED HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-24 px-4 overflow-hidden">
        <AbstractAccent position="top" color="blue" className="opacity-70" />
        <ParticleBackground density="heavy" className="opacity-40" />
        <SystemGraphic className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-20 z-0 scale-150" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-300/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-300/50 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/60 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl mx-auto leading-tight bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
              We're Reimagining How Real Estate is Managed
            </h1>
            <p className="text-2xl md:text-3xl text-slate-700 mb-10 max-w-4xl mx-auto font-medium leading-relaxed animate-fade-up" style={{animationDelay: '.13s', animationFillMode: 'both'}}>
              At PropCloud, we believe intelligent systems should do the heavy lifting — not humans chained to spreadsheets and check-in calls.
            </p>
            <button
              onClick={openChatBot}
              className="inline-block bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold rounded-2xl px-12 py-6 text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{animationDelay: '.26s', animationFillMode: 'both'}}
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* ENHANCED OUR WHY */}
      <section className="bg-gradient-to-br from-white/95 via-slate-50/90 to-teal-50/80 backdrop-blur-md px-4 py-24 relative overflow-hidden">
        <AbstractAccent position="top" color="green" className="opacity-40" />
        <ParticleBackground density="medium" className="opacity-25" />
        
        {/* Enhanced decorative pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-dots-enhanced" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="2.5" fill="#14b8a6" opacity="0.5"/>
                <circle cx="20" cy="20" r="1.5" fill="#1e293b" opacity="0.4"/>
                <circle cx="60" cy="60" r="1.5" fill="#0f766e" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-dots-enhanced)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-left relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up text-center">
            Our Why
          </h2>
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 border border-white/60 shadow-2xl">
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed animate-fade-up" style={{animationDelay:'.06s', animationFillMode:'both'}}>
              PropCloud was born from a simple realization: short-term rental operators are stuck between legacy tools, disconnected apps, and overwhelming manual work.
              <br /><br />
              We saw a better way — one that combines intelligent automation, thoughtful service, and deep operational insight.
            </p>
          </div>
        </div>
      </section>

      {/* ENHANCED WHAT WE DO TODAY */}
      <section className="bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 px-4 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-15">
          <SystemGraphic />
        </div>
        <ParticleBackground density="light" className="opacity-20" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/3 left-1/5 w-48 h-48 bg-gradient-to-br from-teal-200/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/5 w-56 h-56 bg-gradient-to-br from-slate-200/60 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent animate-fade-up">
            What We Do (Today)
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              "Virtual property management, fully remote",
              "Internal AI tools support all operational tasks", 
              "Real-time guest support, pricing automation, calendar sync",
              "Active clients in the U.S. and UAE"
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-6 p-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-up border border-white/60"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: 'both'}}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 mt-3 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-500 animate-pulse"></div>
                </div>
                <p className="text-xl text-slate-700 leading-relaxed font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED MANIFESTO SECTION */}
      <section className="relative bg-gradient-to-br from-white/95 via-slate-50/90 to-teal-50/80 backdrop-blur-md overflow-hidden">
        <AbstractAccent position="top" color="green" className="opacity-60" />
        <ParticleBackground density="medium" className="opacity-30" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-teal-200/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-slate-200/60 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-28 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
            Our Vision
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-100/50 to-slate-100/50 rounded-3xl transform rotate-1 shadow-2xl"></div>
            <div className="relative bg-white/95 backdrop-blur-md p-16 rounded-3xl shadow-2xl border border-white/80 animate-fade-up" style={{animationDelay:".10s", animationFillMode:"both"}}>
              <div className="text-2xl md:text-3xl lg:text-4xl text-slate-800 font-medium leading-relaxed space-y-10">
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

      {/* ENHANCED OUR PHILOSOPHY */}
      <section className="bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 px-4 py-24 relative overflow-hidden">
        <ParticleBackground density="light" className="opacity-25" />
        
        {/* Enhanced decorative pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="philosophy-pattern-enhanced" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="3" fill="#14b8a6" opacity="0.6"/>
                <circle cx="25" cy="25" r="2" fill="#1e293b" opacity="0.5"/>
                <circle cx="75" cy="75" r="2" fill="#0f766e" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#philosophy-pattern-enhanced)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent animate-fade-up">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <Handshake size={40} className="text-teal-400" />, text: "Human-first" },
              { icon: <Settings size={40} className="text-slate-300" />, text: "Automation with empathy" },
              { icon: <Search size={40} className="text-teal-400" />, text: "Real-world learning > synthetic AI demos" },
              { icon: <Brain size={40} className="text-slate-300" />, text: "Intelligence = intuition + experience" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-8 p-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-up border border-white/60"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: 'both'}}
              >
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-white to-slate-50 shadow-xl border border-white/60">
                  {item.icon}
                </div>
                <p className="text-xl font-semibold text-slate-800 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED CALL TO ACTION */}
      <section className="bg-gradient-to-br from-white/95 via-slate-50/90 to-teal-50/80 backdrop-blur-md px-4 py-24 relative overflow-hidden">
        <AbstractAccent position="bottom" color="blue" className="opacity-50" />
        <ParticleBackground density="medium" className="opacity-20" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-125">
            <SystemGraphic />
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-16 border border-white/60 shadow-2xl">
            <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-10 animate-fade-up bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent">
              Want to manage your properties the intelligent way?
            </h3>
            <button
              onClick={openChatBot}
              className="inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-slate-700 text-white font-bold rounded-2xl px-12 py-6 text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-up"
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
