import { services } from "@/data/services";
import { ServiceCardSkeleton } from "@/components/ui/SkeletonLoader";
import { useState, useEffect } from "react";

export default function ServicesSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
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
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <ServiceCardSkeleton key={idx} />
              ))
            ) : (
              services.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300 animate-fade-up border border-white/70 min-h-[180px]"
                    style={{animationDelay: `${0.07 + idx * 0.06}s`, animationFillMode: "both"}}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-white to-slate-50 group-hover:from-teal-50 group-hover:to-teal-50 transition-colors duration-300 shadow-md border border-white/60">
                        <IconComponent size={28} className={idx % 2 === 0 ? "text-accent-500" : "text-propcloud-500"} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg lg:text-xl text-slate-800 font-semibold leading-tight mb-3">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-grow flex items-start">
                      <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}