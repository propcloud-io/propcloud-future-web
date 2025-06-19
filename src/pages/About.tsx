
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import SystemGraphic from "@/components/SystemGraphic";
import { Handshake, Settings, Search, Brain } from "lucide-react";

export default function About() {
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background font-sans overflow-x-hidden">
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-20 px-4 bg-background overflow-hidden">
        <AbstractAccent position="top" color="blue" />
        <SystemGraphic className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-30 z-0" />
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
            We're Reimagining How Real Estate is Managed
          </h1>
          <p className="text-xl md:text-2xl text-propcloud-700 mb-8 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-up" style={{animationDelay: '.13s', animationFillMode: 'both'}}>
            At PropCloud, we believe intelligent systems should do the heavy lifting — not humans chained to spreadsheets and check-in calls.
          </p>
          <button
            onClick={openChatBot}
            className="inline-block bg-gradient-to-r from-propcloud-700 to-accent-600 text-white font-bold rounded-lg px-8 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition-all duration-150 animate-fade-up"
            style={{animationDelay: '.26s', animationFillMode: 'both'}}
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* OUR WHY */}
      <section className="bg-surface px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
            Our Why
          </h2>
          <p className="text-lg md:text-xl text-propcloud-700 leading-relaxed animate-fade-up" style={{animationDelay:'.06s', animationFillMode:'both'}}>
            PropCloud was born from a simple realization: short-term rental operators are stuck between legacy tools, disconnected apps, and overwhelming manual work.
            <br /><br />
            We saw a better way — one that combines intelligent automation, thoughtful service, and deep operational insight.
          </p>
        </div>
      </section>

      {/* WHAT WE DO TODAY */}
      <section className="bg-background px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
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
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-soft hover:shadow-md transition-all duration-200 animate-fade-up"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: 'both'}}
              >
                <div className="flex-shrink-0 w-3 h-3 rounded-full bg-accent-600 mt-2"></div>
                <p className="text-lg text-propcloud-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section className="relative bg-surface">
        <AbstractAccent position="top" color="green" className="opacity-40" />
        <div className="max-w-4xl mx-auto px-4 py-20 md:py-24 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
            Our Vision
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-propcloud-50/50 to-accent-50/50 rounded-2xl transform rotate-1"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-soft-lg border border-gray-100 animate-fade-up" style={{animationDelay:".10s", animationFillMode:"both"}}>
              <div className="text-xl md:text-2xl lg:text-3xl text-propcloud-800 font-medium leading-relaxed space-y-6">
                <p className="font-bold">We're not building just another platform.</p>
                <p>We're building the first AI Operating System for property management —<br />
                where operations orchestrate themselves,<br />
                where decisions happen before problems arise,<br />
                where intelligence replaces routine.</p>
                <p className="font-bold text-accent-700">PropCloud is not a dashboard. It's a new way of working.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="bg-background px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent animate-fade-up">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Handshake size={32} className="text-accent-600" />, text: "Human-first" },
              { icon: <Settings size={32} className="text-propcloud-600" />, text: "Automation with empathy" },
              { icon: <Search size={32} className="text-accent-600" />, text: "Real-world learning > synthetic AI demos" },
              { icon: <Brain size={32} className="text-propcloud-600" />, text: "Intelligence = intuition + experience" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-xl shadow-soft hover:shadow-md hover:scale-105 transition-all duration-200 animate-fade-up"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: 'both'}}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-surface to-gray-50 shadow-sm">
                  {item.icon}
                </div>
                <p className="text-lg font-medium text-propcloud-800 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-surface px-4 py-16 md:py-20 relative">
        <AbstractAccent position="bottom" color="blue" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-propcloud-800 mb-6 animate-fade-up">
            Want to manage your properties the intelligent way?
          </h3>
          <button
            onClick={openChatBot}
            className="inline-block bg-gradient-to-r from-accent-600 to-propcloud-700 text-white font-bold rounded-lg px-8 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition-all duration-150 animate-fade-up"
          >
            Let's Talk
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
