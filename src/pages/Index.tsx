
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { CheckCircle, Calendar, Users, Home as HomeIcon, Contact } from "lucide-react";

const services = [
  { icon: <CheckCircle size={22} className="text-primaryAccentGreen" />, label: "24/7 Guest Messaging & Support" },
  { icon: <Calendar size={22} className="text-primaryAccentGreen" />, label: "Booking & Calendar Management" },
  { icon: <CheckCircle size={22} className="text-primaryAccentGreen" />, label: "Dynamic Pricing Optimization" },
  { icon: <Users size={22} className="text-primaryAccentGreen" />, label: "Turnover & Housekeeping Coordination" },
  { icon: <CheckCircle size={22} className="text-primaryAccentGreen" />, label: "Maintenance Issue Handling" },
  { icon: <HomeIcon size={22} className="text-primaryAccentGreen" />, label: "Owner Dashboards & Reporting" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section id="home" className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-white">
        <AbstractAccent position="top" color="blue" />
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto tracking-tight text-gray-950 mb-4 animate-fade-in">
          Virtual Property Management, <br />
          <span className="text-primaryAccent">Powered by People + AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
          We manage your listings, guests, pricing, and operations — so you can focus on growth.
        </p>
        <a
          href="#contact"
          className="inline-block bg-primaryAccentGreen text-white font-semibold rounded-lg px-7 py-3 text-lg shadow-soft hover:bg-primaryAccentGreen/90 transition-all duration-150 animate-fade-in"
        >
          Start Managing Today
        </a>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-16 md:py-20 bg-neutralBg shadow-soft">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-1 text-gray-900">Everything You Need. Done For You.</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <div key={idx} className="flex gap-4 items-center bg-white py-5 px-5 rounded-lg shadow hover:shadow-md transition animate-fade-in border border-gray-100">
              {service.icon}
              <span className="text-base md:text-lg text-gray-800">{service.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 md:py-20 bg-white">
        <h2 className="font-semibold text-2xl md:text-3xl mb-10 text-primaryAccent text-center">How It Works</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-4 animate-fade-in">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primaryAccent text-white font-bold shadow-soft text-2xl mb-3">1</div>
            <span className="block font-medium text-lg text-gray-900">Schedule your onboarding call</span>
          </div>
          <div className="flex flex-col items-center text-center gap-4 animate-fade-in">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primaryAccent text-white font-bold shadow-soft text-2xl mb-3">2</div>
            <span className="block font-medium text-lg text-gray-900">We connect and configure your listings within 48 hours</span>
          </div>
          <div className="flex flex-col items-center text-center gap-4 animate-fade-in">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primaryAccent text-white font-bold shadow-soft text-2xl mb-3">3</div>
            <span className="block font-medium text-lg text-gray-900">We handle day-to-day operations using people + AI</span>
          </div>
        </div>
      </section>

      {/* AI SUMMARY */}
      <section id="ai" className="py-16 md:py-20 bg-neutralBg">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-primaryAccent mb-2">Built with AI Inside</h2>
          <p className="text-lg md:text-xl text-gray-900 mb-3">
            We use proprietary AI to streamline guest support, pricing, and workflow automation. It's already working behind the scenes — and soon, it will do much more.
          </p>
          <a
            href="/about"
            className="inline-block bg-primaryAccentGreen text-white font-semibold rounded-lg px-7 py-3 text-lg shadow-soft hover:bg-primaryAccentGreen/90 transition-all"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primaryAccent">Get Started Today</h2>
        <p className="text-lg text-gray-800 mb-7">We'd love to help you grow. Schedule a free call or reach us directly:</p>
        <a
          href="https://calendly.com/propcloud/consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primaryAccentGreen text-white font-semibold rounded-lg px-8 py-4 text-lg shadow-soft hover:bg-primaryAccentGreen/90 transition mb-4"
        >
          Book Free Consultation
        </a>
        <div className="text-base text-gray-700 mt-2">
          <a href="mailto:contact@propcloud.io" className="hover:text-primaryAccent transition">contact@propcloud.io</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
