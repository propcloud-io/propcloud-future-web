
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background font-sans overflow-x-hidden">
      <Header />
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center pt-40 pb-16 px-4 bg-background overflow-hidden"
        id="about-hero"
      >
        <AbstractAccent position="top" color="blue" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl leading-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-up lowercase">
          we’re building the future of property management
        </h1>
        <p className="text-xl md:text-2xl text-black mb-8 max-w-2xl mx-auto font-medium animate-fade-up lowercase" style={{animationDelay: '.13s', animationFillMode: 'both'}}>
          propcloud isn’t just a service — it’s a new way to run real estate operations: smarter, faster, more intuitive.
        </p>
      </section>
      {/* WHAT WE DO TODAY */}
      <section className="bg-surface px-4 py-14 md:py-20 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-8 text-left">
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-up lowercase">
            what we do today
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed animate-fade-up lowercase" style={{animationDelay:'.06s', animationFillMode:'both'}}>
            today, propcloud manages short-term rentals through a fully virtual, ai-augmented team. we handle guest communication, calendar syncs, pricing, and operations so property owners don’t have to.<br /><br />
            behind the scenes, we use custom-built ai tools to automate pricing, respond to guests instantly, and predict service needs — making our operations faster and more scalable.
          </p>
        </div>
      </section>
      {/* MANIFESTO */}
      <section className="relative bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16 md:py-20 text-left flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent animate-fade-up lowercase">
            the manifesto
          </h2>
          <div className="border-l-4 border-blue-500 pl-4 bg-surface/60 py-6 rounded leading-relaxed text-xl md:text-2xl text-black font-medium font-sans shadow-soft animate-fade-up lowercase" style={{animationDelay:".10s", animationFillMode:"both"}}>
            <b>the way we manage properties today is fundamentally broken.</b>
            <br /><br />
            it’s reactive. it’s fragmented. it’s human-dependent in all the wrong places — draining time, energy, and opportunity.
            <br /><br />
            <b>at propcloud, we believe real estate deserves better.</b>
            <br /><br />
            we envision a world where property management doesn’t need to be managed.
            <br /><br />
            where systems are intelligent, connected, and quietly handling complexity behind the scenes.
            <br /><br />
            <b>this isn’t just a tool. it’s a new foundation — a shift in what’s possible.</b>
            <br /><br />
            we’re not launching a product. we’re launching a new way of working.
          </div>
        </div>
      </section>
      {/* PHILOSOPHY */}
      <section className="bg-surface px-4 py-14 md:py-20 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-8 text-left animate-fade-up">
          <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-1 lowercase">
            our philosophy
          </h3>
          <ul className="list-disc ml-6 space-y-2 text-lg md:text-xl text-black leading-normal lowercase">
            <li>technology should remove friction</li>
            <li>the best tools feel like intuition</li>
            <li>ai should amplify humans, not replace them</li>
            <li>real intelligence is earned through real-world operations</li>
          </ul>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-background px-4 py-16 md:py-20 flex flex-col items-center justify-center relative text-center">
        <AbstractAccent position="bottom" color="blue" />
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold text-black mb-8 animate-fade-up lowercase">
            want to be part of the future of hospitality? let’s talk.
          </h3>
          <a
            href="mailto:contact@propcloud.io"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg px-8 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition-all duration-150 animate-fade-up lowercase"
          >
            email us to learn more
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
