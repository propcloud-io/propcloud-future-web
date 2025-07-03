import { MessageCircle } from "lucide-react";
import AbstractAccent from "@/components/AbstractAccent";
import SystemGraphic from "@/components/SystemGraphic";

export default function ContactSection() {
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
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
  );
}