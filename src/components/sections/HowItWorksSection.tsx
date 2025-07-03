import AIFlowVisual from "@/components/AIFlowVisual";
import SystemGraphic from "@/components/SystemGraphic";

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
            {steps.map((step, idx) => (
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
  );
}