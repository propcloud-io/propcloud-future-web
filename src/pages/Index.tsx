import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { CheckCircle, Calendar, DollarSign, MessageCircle, Wrench, Clipboard } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import AIFlowVisual from "@/components/AIFlowVisual";
import Logo from "@/components/Logo";

const services = [
  {
    icon: <MessageCircle size={22} className="text-blue-500" />,
    label: "24/7 guest messaging & support",
  },
  {
    icon: <Calendar size={22} className="text-blue-600" />,
    label: "booking & calendar management",
  },
  {
    icon: <DollarSign size={22} className="text-blue-500" />,
    label: "dynamic pricing optimization",
  },
  {
    icon: <Wrench size={22} className="text-blue-600" />,
    label: "turnover & housekeeping coordination",
  },
  {
    icon: <Clipboard size={22} className="text-blue-500" />,
    label: "maintenance issue handling",
  },
  {
    icon: <CheckCircle size={22} className="text-blue-600" />,
    label: "owner dashboards & reporting",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden relative">
      <Header />
      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center text-center pt-40 pb-24 px-4 bg-background overflow-hidden"
        >
          <AbstractAccent position="top" color="blue" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 max-w-4xl mx-auto leading-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-up lowercase">
            virtual property management,<br />
            powered by people + ai
          </h1>
          <p className="text-xl md:text-2xl text-black mb-10 max-w-2xl mx-auto font-medium animate-fade-up lowercase" style={{animationDelay: ".16s", animationFillMode: "both"}}>
            we manage your listings, guests, pricing, and operations — so you can focus on growth.
          </p>
          <a
            href="#contact"
            className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-9 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition duration-150 animate-fade-up lowercase"
            style={{animationDelay: ".27s", animationFillMode: "both"}}
          >
            start managing today
          </a>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          className="py-20 bg-surface shadow-soft"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-up lowercase">
            everything you need. done for you.
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-center bg-white py-7 px-6 rounded-xl shadow hover:shadow-md transition hover:scale-105 duration-200 animate-fade-up"
                style={{animationDelay: `${0.07 + idx * 0.06}s`, animationFillMode: "both"}}
              >
                {service.icon}
                <span className="text-base md:text-lg text-black font-medium lowercase">{service.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="py-20 bg-background"
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-10 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent text-center animate-fade-up lowercase">
            how it works
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              "schedule your onboarding call",
              "we connect and configure your listings within 48 hours",
              "we handle day-to-day operations using people + ai",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-4 animate-fade-up"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: "both"}}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow-soft text-2xl mb-3">
                  {idx + 1}
                </div>
                <span className="block font-medium text-lg text-black lowercase">{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AI SUMMARY */}
        <section
          id="ai"
          className="py-20 bg-surface"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
            <AIFlowVisual />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-up lowercase">
              built with ai inside
            </h2>
            <p className="text-lg md:text-xl text-black mb-2 animate-fade-up lowercase">
              we use proprietary ai to streamline guest support, pricing, and workflow automation. it's already working behind the scenes — and soon, it will do much more.
            </p>
            <a
              href="/about"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-lg px-8 py-3 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition-all animate-fade-up lowercase"
            >
              learn more
            </a>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* CONTACT */}
        <section
          id="contact"
          className="py-20 bg-background flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-up lowercase">
            get started with propcloud
          </h2>
          <p className="text-lg text-black mb-8 animate-fade-up lowercase">
            we’re accepting a limited number of new properties. reach out to begin.
          </p>
          <a
            href="mailto:contact@propcloud.io"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg px-8 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition mb-6 animate-fade-up lowercase"
          >
            email us to book a call
          </a>
          <div className="text-base text-blue-600 mt-2 animate-fade-up lowercase">contact@propcloud.io</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
