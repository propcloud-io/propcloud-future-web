
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white font-sans overflow-x-hidden">
      <Header />
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 bg-white overflow-hidden" id="about-hero">
        <AbstractAccent position="top" color="blue" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950 mb-3 max-w-3xl leading-tight animate-fade-in">
          We’re Building the Future of Property Management
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium animate-fade-in">
          PropCloud isn’t just a service — it’s a new way to run real estate operations: smarter, faster, more intuitive.
        </p>
      </section>

      {/* WHAT WE DO TODAY */}
      <section className="bg-neutralBg px-4 py-12 md:py-16 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-8 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-primaryAccent mb-2 animate-fade-in">What We Do Today</h2>
          <p className="text-lg md:text-xl text-gray-900 leading-relaxed animate-fade-in">
            Right now, we provide full-service virtual property management for short-term rentals. Our human team handles everything from guest messaging to calendar syncing — powered by internal AI tools that streamline pricing, automate responses, and reduce delays.
            <br /><br />
            We're not waiting for the future — we’re building it in real-time, by managing real properties and learning from every interaction.
          </p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative bg-white">
        <div className="max-w-2xl mx-auto px-4 py-16 md:py-20 text-left flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-semibold text-primaryAccent mb-2 animate-fade-in">The Manifesto</h2>
          <div className="border-l-4 border-primaryAccent pl-4 bg-neutralBg/60 py-6 rounded leading-relaxed text-xl md:text-2xl text-gray-900 font-medium font-sans shadow-soft animate-fade-in">
            <b>The way we manage properties today is fundamentally broken.</b>
            <br /><br />
            It’s reactive. It’s fragmented. It’s human-dependent in all the wrong places — draining time, energy, and opportunity.
            <br /><br />
            <b>At PropCloud, we believe real estate deserves better.</b>
            <br /><br />
            We envision a world where property management doesn’t need to be managed.
            <br /><br />
            Where systems are intelligent, connected, and quietly handling complexity behind the scenes.
            <br /><br />
            <b>This isn’t just a tool. It’s a new foundation — a shift in what’s possible.</b>
            <br /><br />
            We’re not launching a product. We’re launching a new way of working.
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-neutralBg px-4 py-12 md:py-16 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-8 text-left animate-fade-in">
          <h3 className="text-xl md:text-2xl font-semibold text-primaryAccent mb-2">Our Philosophy</h3>
          <ul className="list-disc ml-6 space-y-2 text-lg md:text-xl text-gray-950 leading-normal">
            <li>Technology should remove friction</li>
            <li>The best tools feel like intuition</li>
            <li>AI should amplify humans, not replace them</li>
            <li>Real intelligence is earned through real-world operations</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-16 md:py-20 flex flex-col items-center justify-center relative text-center">
        <AbstractAccent position="bottom" color="green" />
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950 mb-8 animate-fade-in">
            If you believe in a smarter way to run real estate — join us.
          </h3>
          <a
            href="https://calendly.com/propcloud/ai-waitlist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primaryAccentGreen text-white font-semibold rounded-lg px-8 py-4 text-lg shadow-soft hover:bg-primaryAccentGreen/90 transition-all duration-150 animate-fade-in"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
