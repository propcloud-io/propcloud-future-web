
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white font-sans overflow-x-hidden">
      <Header />
      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center pt-40 pb-16 px-4 bg-white overflow-hidden"
        id="about-hero"
      >
        <AbstractAccent position="top" color="blue" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl leading-tight bg-gradient-to-r from-propcloud-600 to-propcloud-400 bg-clip-text text-transparent animate-fade-up">
          We’re Building the Future of Property Management
        </h1>
        <p className="text-xl md:text-2xl text-propcloud-900 mb-8 max-w-2xl mx-auto font-medium animate-fade-up" style={{animationDelay: '.13s', animationFillMode: 'both'}}>
          PropCloud isn’t just a service — it’s a new way to run real estate operations: smarter, faster, more intuitive.
        </p>
      </section>

      {/* WHAT WE DO TODAY */}
      <section className="bg-surface px-4 py-14 md:py-20 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-8 text-left">
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-propcloud-600 to-propcloud-400 bg-clip-text text-transparent animate-fade-up">
            What We Do Today
          </h2>
          <p className="text-lg md:text-xl text-propcloud-900 leading-relaxed animate-fade-up" style={{animationDelay:'.06s', animationFillMode:'both'}}>
            Right now, we provide full-service virtual property management for short-term rentals. Our human team handles everything from guest messaging to calendar syncing — powered by internal AI tools that streamline pricing, automate responses, and reduce delays.
            <br /><br />
            We're not waiting for the future — we’re building it in real-time, by managing real properties and learning from every interaction.
          </p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative bg-white">
        <div className="max-w-2xl mx-auto px-4 py-16 md:py-20 text-left flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-propcloud-600 to-propcloud-400 bg-clip-text text-transparent animate-fade-up">
            The Manifesto
          </h2>
          <div className="border-l-4 border-propcloud-500 pl-4 bg-surface/60 py-6 rounded leading-relaxed text-xl md:text-2xl text-propcloud-900 font-medium font-sans shadow-soft animate-fade-up" style={{animationDelay:".10s", animationFillMode:"both"}}>
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
      <section className="bg-surface px-4 py-14 md:py-20 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-8 text-left animate-fade-up">
          <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-propcloud-600 to-propcloud-400 bg-clip-text text-transparent mb-1">
            Our Philosophy
          </h3>
          <ul className="list-disc ml-6 space-y-2 text-lg md:text-xl text-propcloud-900 leading-normal">
            <li>Technology should remove friction</li>
            <li>The best tools feel like intuition</li>
            <li>AI should amplify humans, not replace them</li>
            <li>Real intelligence is earned through real-world operations</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-4 py-16 md:py-20 flex flex-col items-center justify-center relative text-center">
        <AbstractAccent position="bottom" color="blue" />
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold text-propcloud-900 mb-8 animate-fade-up">
            If you believe in a smarter way to run real estate — join us.
          </h3>
          <a
            href="https://calendly.com/propcloud/ai-waitlist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-propcloud-600 to-propcloud-400 text-white font-bold rounded-lg px-8 py-4 text-lg shadow-soft hover:brightness-110 hover:scale-105 transition-all duration-150 animate-fade-up"
          >
            Join the Waitlist
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
