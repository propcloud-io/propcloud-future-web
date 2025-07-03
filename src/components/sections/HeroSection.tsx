import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AbstractAccent from "@/components/AbstractAccent";
import AIFlowVisual from "@/components/AIFlowVisual";
import StatsGrid from "@/components/StatsGrid";

export default function HeroSection() {
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
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
        
        <StatsGrid />
      </div>
    </section>
  );
}