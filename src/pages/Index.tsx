
// Main Landing Page — Virtual Property Management
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { Link } from "react-router-dom";
import { CheckCircle, Home, Eye, Contact } from "lucide-react";

const features = [
  { icon: <CheckCircle size={20} className="text-primaryAccent"/>, text: "24/7 Guest Messaging & Support" },
  { icon: <CheckCircle size={20} className="text-primaryAccent"/>, text: "Calendar & Booking Management" },
  { icon: <CheckCircle size={20} className="text-primaryAccent"/>, text: "Dynamic Pricing Optimization" },
  { icon: <CheckCircle size={20} className="text-primaryAccent"/>, text: "Housekeeping & Turnover Coordination" },
  { icon: <CheckCircle size={20} className="text-primaryAccent"/>, text: "Maintenance Request Handling" },
  { icon: <CheckCircle size={20} className="text-primaryAccent"/>, text: "Owner Reports & Revenue Insights" },
];

const whoFor = [
  "Airbnb Hosts",
  "Vacation Rental Owners",
  "Property Managers",
  "International Investors"
];

export default function Index() {
  return (
    <div className="relative min-h-screen bg-neutralBg flex flex-col overflow-x-hidden font-sans">
      <Header />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4">
        <AbstractAccent position="top" color="blue" />
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto tracking-tight text-gray-950 mb-4 animate-fade-in">Virtual Property Management,<br /> <span className="text-primaryAccent">Powered by People&nbsp;+&nbsp;AI</span></h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
          Let PropCloud manage your short-term rentals, guest communication, and operations — so you can focus on growing your portfolio.
        </p>
        <a
          href="https://calendly.com/propcloud/consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primaryAccent text-white font-semibold rounded-lg px-7 py-3 text-lg shadow-soft hover:bg-primaryAccent/90 transition-all duration-150 animate-fade-in"
        >
          Start Managing Today
        </a>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white shadow-soft">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-1 text-gray-900">Everything You Need. Done For You.</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((f, idx) => (
            <div key={idx} className="flex gap-4 items-center bg-neutralBg py-5 px-5 rounded-lg shadow hover:shadow-md transition animate-fade-in">
              {f.icon}
              <span className="text-base md:text-lg text-gray-800">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 container max-w-4xl">
        <h3 className="font-semibold text-xl md:text-2xl mb-6 text-primaryAccent text-center">How It Works</h3>
        <ol className="relative border-l-2 border-primaryAccent/20 pl-6 space-y-6">
          <li>
            <div className="absolute -left-5 top-0 flex justify-center items-center w-10 h-10 bg-primaryAccent text-white rounded-full font-bold shadow-soft">
              1
            </div>
            <div className="ml-6">
              <span className="block font-medium text-lg text-gray-900">Book a free onboarding call</span>
            </div>
          </li>
          <li>
            <div className="absolute -left-5 top-20 flex justify-center items-center w-10 h-10 bg-primaryAccent text-white rounded-full font-bold shadow-soft">2</div>
            <div className="ml-6">
              <span className="block font-medium text-lg text-gray-900">We connect your properties in 24–48&nbsp;hours</span>
            </div>
          </li>
          <li>
            <div className="absolute -left-5 top-40 flex justify-center items-center w-10 h-10 bg-primaryAccent text-white rounded-full font-bold shadow-soft">3</div>
            <div className="ml-6">
              <span className="block font-medium text-lg text-gray-900">Sit back — we handle the rest</span>
            </div>
          </li>
        </ol>
      </section>

      {/* Who It's For / AI Usage */}
      <section className="py-14 px-4 bg-neutralBg">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-6 justify-between">
          {/* Audience */}
          <div className="flex-1">
            <h4 className="text-lg md:text-xl font-semibold mb-2 text-primaryAccentGreen">Who It's For</h4>
            <ul className="list-disc ml-6 text-gray-800 text-base space-y-1">
              {whoFor.map((who, i) => (<li key={i}>{who}</li>))}
            </ul>
          </div>
          {/* Internal AI Usage */}
          <div className="flex-1">
            <h4 className="text-lg md:text-xl font-semibold mb-2 text-primaryAccent">Internal AI Use</h4>
            <p className="text-gray-700 text-base">
              We use proprietary AI tools to power{' '}
              <span className="font-semibold text-primaryAccentGreen">faster response times</span>,{' '}
              <span className="font-semibold text-primaryAccentGreen">smarter pricing strategies</span>, and{' '}
              <span className="font-semibold text-primaryAccentGreen">better guest experiences</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Soft Transition */}
      <section className="py-12 md:py-20 bg-white text-center relative">
        <AbstractAccent position="bottom" color="green" />
        <div className="max-w-2xl mx-auto relative z-10">
          <h5 className="text-xl md:text-2xl text-gray-800 font-semibold mb-4">This is just the beginning.</h5>
          <p className="text-gray-600 mb-6">
            We're working on something truly transformative — a new kind of AI platform that will redefine how property management is done.
          </p>
          <Link
            to="/ai-vision"
            className="inline-block bg-primaryAccentGreen text-white font-semibold rounded-lg px-6 py-3 text-lg shadow-soft hover:bg-primaryAccentGreen/90 transition"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
