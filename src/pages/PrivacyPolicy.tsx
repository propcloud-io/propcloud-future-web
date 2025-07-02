
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    // Update page-specific metadata
    document.title = "Privacy Policy | PropCloud";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'PropCloud Privacy Policy - Learn how we collect, use, and protect your information when you interact with our website or services.');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/privacy-policy');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-white/70">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Effective Date: July 2, 2025</p>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                At PropCloud Inc., your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you interact with our website or services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">1. Information We Collect</h2>
              <ul className="mb-6 space-y-2">
                <li><strong>Personal Information</strong>: Name, email address, and any details you provide via our chatbot, forms, or communication.</li>
                <li><strong>Usage Data</strong>: Browser type, device information, pages visited, and time spent — via cookies and analytics tools.</li>
                <li><strong>Property Information</strong>: If submitted, we may collect details about your rental property for service personalization.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">2. How We Use Your Information</h2>
              <p className="mb-4">We use the collected data to:</p>
              <ul className="mb-6 space-y-2">
                <li>Respond to your inquiries or demo requests</li>
                <li>Provide and improve our services</li>
                <li>Send occasional updates (opt-in only)</li>
                <li>Analyze website performance and user behavior</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">3. Data Sharing</h2>
              <p className="mb-4">We do not sell or share your data with third parties, except:</p>
              <ul className="mb-6 space-y-2">
                <li>With service providers (e.g., analytics or email tools) strictly to deliver our services</li>
                <li>When required by law</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">4. Data Security</h2>
              <p className="mb-6">
                Your information is stored securely. While we use reasonable safeguards, no system is 100% secure.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">5. Cookies</h2>
              <p className="mb-6">
                We use cookies to enhance your experience. You can disable cookies via your browser settings.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">6. Your Rights</h2>
              <p className="mb-4">You can:</p>
              <ul className="mb-6 space-y-2">
                <li>Request to see or delete your data</li>
                <li>Opt out of any communications at any time</li>
              </ul>
              <p className="mb-6">
                Contact us at <strong>contact@propcloud.io</strong> for any privacy-related concerns.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">7. Updates</h2>
              <p className="mb-6">
                This Privacy Policy may be updated periodically. Check this page for changes.
              </p>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mt-8">
                <p className="text-teal-800">
                  If you have any questions, contact:<br />
                  <strong>PropCloud Inc.</strong><br />
                  Email: <a href="mailto:contact@propcloud.io" className="text-teal-600 hover:text-teal-700 underline">contact@propcloud.io</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
