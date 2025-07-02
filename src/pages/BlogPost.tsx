
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();

  useEffect(() => {
    if (slug === 'what-is-virtual-property-management') {
      document.title = "What Is Virtual Property Management? | PropCloud Blog";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Discover how virtual property management works, and why it\'s the future of Airbnb, short-term, and vacation rental operations.');
      }
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', 'https://propcloud.io/blog/what-is-virtual-property-management');
      }

      // Add Open Graph meta tags dynamically
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', 'What Is Virtual Property Management? | PropCloud');
      }
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', 'Discover how virtual property management works, and why it\'s the future of Airbnb, short-term, and vacation rental operations.');
      }
    }
  }, [slug]);

  if (slug !== 'what-is-virtual-property-management') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <Link to="/blog" className="text-propcloud-700 hover:text-accent-600 font-semibold">
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-propcloud-700 hover:text-accent-600 font-semibold mb-8 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>

          <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-white/70">
            <header className="mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>July 2, 2025</span>
                <span className="mx-2">•</span>
                <span>By PropCloud Inc.</span>
                <span className="mx-2">•</span>
                <span>5 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What Is Virtual Property Management?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Managing a short-term rental property can be rewarding — but it's also time-consuming, stressful, and filled with surprises.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mt-4">
                That's where <strong>Virtual Property Management</strong> comes in.
              </p>
            </header>

            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">🧠 A Smarter Way to Manage Properties</h2>
              <p className="mb-6">
                Virtual property management means you don't need to be physically present — or even hands-on — to manage your Airbnb or short-term rental.
              </p>
              <p className="mb-4">Instead, everything is handled remotely using:</p>
              <ul className="mb-6 space-y-2">
                <li>Automated guest messaging systems</li>
                <li>Centralized booking calendars</li>
                <li>AI-powered pricing tools</li>
                <li>Cloud-based coordination with cleaning and maintenance teams</li>
                <li>Real-time owner dashboards and reporting</li>
              </ul>
              <p className="mb-6">
                It's the <strong>same result as a full-service manager</strong> — but faster, smarter, and often more affordable.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">🔄 How It Works with PropCloud</h2>
              <p className="mb-4">At PropCloud, we provide <strong>full-service virtual property management</strong> — meaning we handle:</p>
              <ul className="mb-6 space-y-2">
                <li>24/7 guest communication</li>
                <li>Booking and listing optimization</li>
                <li>Dynamic pricing using AI</li>
                <li>Housekeeping and maintenance coordination</li>
                <li>Owner reports and performance insights</li>
                <li>Strategic marketing</li>
              </ul>
              <p className="mb-6">
                And the best part? <strong>You still own. We operate.</strong> Seamlessly.
              </p>
              <p className="mb-8">
                <Link to="/#services" className="text-propcloud-700 hover:text-accent-600 font-semibold underline">
                  Learn more about our services →
                </Link>
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">💡 Why Property Owners Are Switching</h2>
              <p className="mb-4">More Airbnb hosts are leaving traditional agencies behind and switching to virtual management because:</p>
              <ul className="mb-6 space-y-2">
                <li>They're tired of paying 20–30% commissions for poor service</li>
                <li>They want to keep control — without doing the work</li>
                <li>They need tech-first solutions that scale with their portfolio</li>
                <li>They live far from their property, or just want peace of mind</li>
              </ul>
              <p className="mb-4">Virtual property management is ideal for:</p>
              <ul className="mb-6 space-y-2">
                <li>Remote owners</li>
                <li>Busy professionals</li>
                <li>Multi-property hosts</li>
                <li>First-time Airbnb entrepreneurs</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">⚙️ Is It Really "Hands-Off"?</h2>
              <p className="mb-4">Yes — with PropCloud, you don't lift a finger.</p>
              <p className="mb-4">
                We've designed our platform to give you complete control without needing to be involved in the day-to-day. Want to see how it works?
              </p>
              <p className="mb-8">
                <Link to="/app" className="text-propcloud-700 hover:text-accent-600 font-semibold underline">
                  Check out our owner dashboard →
                </Link>
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">🛠️ Why PropCloud?</h2>
              <p className="mb-4">We're not just another agency using WhatsApp to text cleaners.</p>
              <p className="mb-4">
                We're building the future of hospitality — using AI, automation, and human-first design. PropCloud combines high-touch service with cutting-edge tech to give you:
              </p>
              <ul className="mb-6 space-y-2">
                <li>✅ Higher revenue</li>
                <li>✅ Happier guests</li>
                <li>✅ Fewer headaches</li>
              </ul>

              <div className="bg-gradient-to-r from-propcloud-50 to-accent-50 border border-propcloud-200 rounded-xl p-6 my-8">
                <blockquote className="text-xl font-semibold text-propcloud-800 mb-4">
                  Ready to stop managing — and start scaling?
                </blockquote>
                <Link 
                  to="/#contact" 
                  className="inline-block bg-gradient-to-r from-propcloud-700 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:brightness-110 transition"
                >
                  Talk to our team →
                </Link>
              </div>

              <hr className="my-8 border-gray-200" />

              <h2 className="text-3xl font-bold text-gray-900 mb-4">🤖 Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Q: How is this different from a property manager?</h3>
                  <p>A: Traditional managers operate in-person and often charge high fees. PropCloud operates virtually — faster, smarter, and with more visibility.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Q: Can you handle check-ins, cleaners, and repairs?</h3>
                  <p>A: Yes! We coordinate all local tasks remotely through vetted vendors.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Q: How do I get started?</h3>
                  <p>A: Just talk to us through the chat or visit our contact form. We'll learn about your property and handle the rest.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
