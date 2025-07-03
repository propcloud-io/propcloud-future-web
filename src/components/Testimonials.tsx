
import React from "react";
import AbstractAccent from "@/components/AbstractAccent";

const testimonials = [
  {
    text: "I finally feel like I can breathe — propcloud handles everything, and my revenue is up.",
    author: "Beta Host, Miami",
  },
  {
    text: "I've used other tools before, but this feels like having a team that actually understands hosting.",
    author: "Pilot Partner, Dubai",
  },
  {
    text: "The response times are unreal. I don't know how they do it — I just know it works.",
    author: "Vacation Rental Owner, Austin",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-100 via-white to-teal-50 relative overflow-hidden">
      <AbstractAccent position="bottom" color="blue" className="opacity-40" />
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-br from-teal-200/60 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-gradient-to-br from-slate-200/60 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent mb-12 animate-fade-up">
            What Our Early Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <blockquote key={idx} className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 p-8 flex flex-col items-start gap-3 animate-fade-up" style={{ animationDelay: `${0.1 + idx * 0.05}s`, animationFillMode: "both"}}>
                <span className="text-propcloud-800 text-lg leading-relaxed mb-1">&ldquo;{t.text}&rdquo;</span>
                <span className="text-accent-700 font-semibold mt-2 text-sm italic">— {t.author}</span>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
