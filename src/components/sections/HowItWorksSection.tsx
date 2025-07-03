
import AIFlowVisual from "@/components/AIFlowVisual";
import SystemGraphic from "@/components/SystemGraphic";
import AbstractAccent from "@/components/AbstractAccent";

const steps = [
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
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-24 bg-gradient-to-br from-slate-100 via-slate-50 to-teal-50 relative overflow-hidden"
    >
      <AbstractAccent position="bottom" color="green" className="opacity-50" />
      <div className="absolute inset-0 overflow-hidden opacity-15">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-75">
          <AIFlowVisual />
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-50">
          <SystemGraphic />
        </div>
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-br from-teal-200/60 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-gradient-to-br from-slate-200/60 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
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
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-6 animate-fade-up bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: "both"}}
              >
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white font-bold shadow-2xl text-3xl relative z-10">
                    {idx + 1}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 blur-xl opacity-40 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg lg:text-xl text-slate-800 leading-relaxed mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm lg:text-base max-w-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
