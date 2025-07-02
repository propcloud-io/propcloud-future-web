
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { useEffect } from "react";

export default function AIVision() {
  useEffect(() => {
    // Update page-specific metadata
    document.title = "The Future of AI in Hospitality | PropCloud";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'We\'re building the AI Operating System for property managers. Explore our vision for the future.');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/ai-vision');
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white font-sans overflow-x-hidden">
      <Header />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 bg-white overflow-hidden">
        <AbstractAccent position="top" color="blue" />
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-950 max-w-3xl leading-tight animate-fade-in">
          We&apos;re Reimagining <span className="text-primaryAccent">How Real Estate Runs.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto font-medium animate-fade-in">
          Not with more dashboards or disjointed tools—<br className="hidden md:inline" />but with a new kind of intelligence. One that works behind the scenes. One that manages, adapts, and evolves without needing to be told.
        </p>
        <a
          href="https://calendly.com/propcloud/ai-waitlist"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primaryAccent text-white font-semibold rounded-lg px-8 py-4 text-lg shadow-soft hover:bg-primaryAccent/90 transition-all duration-150 animate-fade-in"
        >
          Join the Waitlist
        </a>
      </section>
      
      {/* Manifesto Section */}
      <section className="bg-white px-4 py-20 md:py-28 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-10 text-left">
          <AbstractAccent position="top" color="blue" />
          <h2 className="text-2xl md:text-3xl font-bold text-primaryAccent mb-4 animate-fade-in">Manifesto</h2>
          <p className="text-lg md:text-xl text-gray-900 whitespace-pre-line leading-relaxed animate-fade-in">
            The way we manage properties today is fundamentally broken.

            It&apos;s reactive. It&apos;s fragmented. It&apos;s human-dependent in all the wrong places — draining time, energy, and opportunity from the people building this industry.

            At PropCloud, we believe real estate deserves better.

            We envision a world where property management doesn’t need to be managed.

            Where operations don’t depend on memory, manual input, or morning checklists.

            Where the system itself is intelligent — coordinating tasks, learning preferences, optimizing performance, and communicating with precision.

            We’re not adding more software to the pile. We’re creating a new layer beneath it all — one that makes the business of hospitality feel effortless.

            This is not a feature. It’s not a tool.

            It’s the beginning of an AI Operating System for real estate.

            And we’re building it from the ground up, in the real world, with those who are ready for what’s next.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-neutralBg px-4 py-20 md:py-24 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-10 text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-primaryAccent mb-4 animate-fade-in">Our Philosophy</h3>
          <ul className="list-none space-y-4 text-lg md:text-xl text-gray-900 leading-relaxed animate-fade-in">
            <li>Technology should remove friction, not create it.</li>
            <li>The best systems feel like intuition, not interfaces.</li>
            <li>AI should amplify human potential, not replace it.</li>
            <li>Real intelligence is learned from experience — not just data.</li>
          </ul>
        </div>
      </section>

      {/* The Journey */}
      <section className="bg-white px-4 py-20 md:py-24 flex justify-center">
        <div className="max-w-2xl flex flex-col gap-10 text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-primaryAccent mb-4 animate-fade-in">The Journey</h3>
          <div className="space-y-4 text-lg md:text-xl text-gray-900 leading-relaxed animate-fade-in">
            <div>
              <span className="font-bold text-primaryAccent">Today</span> &rarr; We offer virtual property management powered by real people and internal AI systems.
            </div>
            <div>
              <span className="font-bold text-primaryAccent">Tomorrow</span> &rarr; That intelligence will become the operating layer for an entire category.
            </div>
            <div>
              We don’t just see what’s broken — we see what it could become.
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-neutralBg px-4 py-20 md:py-24 flex flex-col items-center justify-center relative text-center">
        <AbstractAccent position="bottom" color="blue" />
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950 mb-8 animate-fade-in">
            If you believe in a future where real estate manages itself — join us.
          </h3>
          <a
            href="https://calendly.com/propcloud/ai-waitlist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primaryAccent text-white font-semibold rounded-lg px-8 py-4 text-lg shadow-soft hover:bg-primaryAccent/90 transition-all duration-150 animate-fade-in"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
