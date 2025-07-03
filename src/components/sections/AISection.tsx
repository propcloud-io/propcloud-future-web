import { Link } from "react-router-dom";
import AbstractAccent from "@/components/AbstractAccent";
import AIFlowVisual from "@/components/AIFlowVisual";

export default function AISection() {
  return (
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
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/about"
              className="inline-block bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold rounded-xl px-8 py-4 text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-fade-up"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}