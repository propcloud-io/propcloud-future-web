import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { CheckCircle, Calendar, DollarSign, MessageCircle, Wrench, Clipboard } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import AIFlowVisual from "@/components/AIFlowVisual";
import Logo from "@/components/Logo";

const services = [
  {
    icon: <MessageCircle size={22} className="text-mint-500" />,
    label: "24/7 Guest Messaging & Support",
  },
  {
    icon: <Calendar size={22} className="text-propcloud-600" />,
    label: "Booking & Calendar Management",
  },
  {
    icon: <DollarSign size={22} className="text-mint-500" />,
    label: "Dynamic Pricing Optimization",
  },
  {
    icon: <Wrench size={22} className="text-propcloud-600" />,
    label: "Turnover & Housekeeping Coordination",
  },
  {
    icon: <Clipboard size={22} className="text-mint-500" />,
    label: "Maintenance Issue Handling",
  },
  {
    icon: <CheckCircle size={22} className="text-propcloud-600" />,
    label: "Owner Dashboards & Reporting",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden relative">
      <Header />
      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center text-center pt-40 pb-24 px-4 bg-white overflow-hidden"
        >
          <AbstractAccent position="top" color="blue" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 max-w-4xl mx-auto leading-tight bg-gradient-to-r from-propcloud-600 to-mint-500 bg-clip-text text-transparent animate-fade-up">
            Virtual Property Management,<br />
            Powered by People + AI
          </h1>
          <p className="text-xl md:text-2xl text-propcloud-900 mb-10 max-w-2xl mx-auto font-medium animate-fade-up" style={{animationDelay: ".16s", animationFillMode: "both"}}>
            We manage your listings, guests, pricing, and operations — so you can focus on growth.
          </p>
          <a
            href="#contact"
            className="inline-block rounded-lg bg-gradient-to-r from-propcloud-600 to-mint-500 text-white font-bold px-9 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition duration-150 animate-fade-up"
            style={{animationDelay: ".27s", animationFillMode: "both"}}
          >
            Start Managing Today
          </a>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          className="py-20 bg-surface shadow-soft"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-propcloud-600 to-mint-500 bg-clip-text text-transparent animate-fade-up">
            Everything You Need. Done For You.
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-center bg-white py-7 px-6 rounded-xl shadow hover:shadow-md transition hover:scale-105 duration-200 animate-fade-up"
                style={{animationDelay: `${0.07 + idx * 0.06}s`, animationFillMode: "both"}}
              >
                {service.icon}
                <span className="text-base md:text-lg text-propcloud-900 font-medium">{service.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="py-20 bg-white"
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-10 bg-gradient-to-r from-propcloud-600 to-mint-500 bg-clip-text text-transparent text-center animate-fade-up">
            How It Works
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              "Schedule your onboarding call",
              "We connect and configure your listings within 48 hours",
              "We handle day-to-day operations using people + AI",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-4 animate-fade-up"
                style={{animationDelay: `${0.06 + idx * 0.08}s`, animationFillMode: "both"}}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-propcloud-600 to-mint-500 text-white font-bold shadow-soft text-2xl mb-3">
                  {idx + 1}
                </div>
                <span className="block font-medium text-lg text-propcloud-900">{text}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-propcloud-600 to-mint-500 bg-clip-text text-transparent animate-fade-up">
              Built with AI Inside
            </h2>
            <p className="text-lg md:text-xl text-propcloud-900 mb-2 animate-fade-up">
              We use proprietary AI to streamline guest support, pricing, and workflow automation. It's already working behind the scenes — and soon, it will do much more.
            </p>
            <a
              href="/about"
              className="inline-block bg-gradient-to-r from-propcloud-600 to-mint-500 text-white font-bold rounded-lg px-8 py-3 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition-all animate-fade-up"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* CONTACT */}
        <section
          id="contact"
          className="py-20 bg-white flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-propcloud-600 to-mint-500 bg-clip-text text-transparent animate-fade-up">
            Get Started with PropCloud
          </h2>
          <p className="text-lg text-propcloud-900 mb-8 animate-fade-up">
            We’re accepting a limited number of new properties. Reach out to begin.
          </p>
          <a
            href="mailto:contact@propcloud.io"
            className="inline-block bg-gradient-to-r from-mint-500 to-propcloud-600 text-white font-bold rounded-lg px-8 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition mb-6 animate-fade-up"
          >
            Email Us to Book a Call
          </a>
          <div className="text-base text-mint-600 mt-2 animate-fade-up">contact@propcloud.io</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
