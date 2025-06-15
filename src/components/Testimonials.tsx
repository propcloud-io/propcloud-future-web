
import React from "react";

const testimonials = [
  {
    text: "i finally feel like i can breathe — propcloud handles everything, and my revenue is up.",
    author: "beta host, miami",
  },
  {
    text: "i’ve used other tools before, but this feels like having a team that actually understands hosting.",
    author: "pilot partner, dubai",
  },
  {
    text: "the response times are unreal. i don’t know how they do it — i just know it works.",
    author: "vacation rental owner, austin",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-12 animate-fade-up lowercase">
          what our early users are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              className="rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-soft p-8 flex flex-col items-start gap-3 animate-fade-up"
              style={{ animationDelay: `${0.1 + idx * 0.05}s`, animationFillMode: "both"}}
            >
              <span className="text-black text-lg leading-relaxed mb-1">&ldquo;{t.text}&rdquo;</span>
              <span className="text-blue-600 font-semibold mt-2 text-sm italic lowercase">— {t.author}</span>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
