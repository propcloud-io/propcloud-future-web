
import React from "react";

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
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-propcloud-800 to-accent-600 bg-clip-text text-transparent mb-12 animate-fade-up">
            What Our Early Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <blockquote key={idx} className="rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-soft p-8 flex flex-col items-start gap-3 animate-fade-up" style={{ animationDelay: `${0.1 + idx * 0.05}s`, animationFillMode: "both"}}>
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
