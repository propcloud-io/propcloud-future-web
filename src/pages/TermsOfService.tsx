
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  useEffect(() => {
    // Update page-specific metadata
    document.title = "Terms of Service | PropCloud";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'PropCloud Terms of Service - Understanding the terms and conditions for using our AI-powered virtual property management services.');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/terms-of-service');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-white/70">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Effective Date: July 2, 2025</p>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                Welcome to PropCloud.io, operated by PropCloud Inc. By using our website or services, you agree to the following terms:
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">1. Use of Services</h2>
              <p className="mb-4">PropCloud provides AI-assisted virtual property management. By using our site, you agree to:</p>
              <ul className="mb-6 space-y-2">
                <li>Provide accurate information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not misuse or reverse-engineer our website</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">2. Intellectual Property</h2>
              <p className="mb-6">
                All content, logos, and branding on this site are the property of PropCloud Inc. and may not be copied or reproduced without permission.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">3. Lead Submission</h2>
              <p className="mb-4">When you submit your contact or property details:</p>
              <ul className="mb-6 space-y-2">
                <li>You confirm you have the right to share this data</li>
                <li>You agree to be contacted by us via email</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">4. Disclaimer</h2>
              <p className="mb-6">
                Our services are provided "as-is." We do our best to provide accurate information, but we do not guarantee the performance, availability, or accuracy of any specific result.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">5. Limitation of Liability</h2>
              <p className="mb-6">
                PropCloud is not liable for any indirect or consequential damages resulting from use of our site or services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">6. Governing Law</h2>
              <p className="mb-6">
                These terms are governed by the laws of the United States.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">7. Changes to Terms</h2>
              <p className="mb-6">
                We may update these terms as needed. Changes will be posted on this page.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">8. Contact</h2>
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mt-8">
                <p className="text-teal-800">
                  If you have any questions about these Terms, contact us at:<br />
                  <strong>PropCloud Inc.</strong><br />
                  Email: <a href="mailto:contact@propcloud.io" className="text-teal-600 hover:text-teal-700 underline">contact@propcloud.io</a>
                </p>
                
                <div className="mt-4 pt-4 border-t border-teal-200">
                  <p className="text-teal-700 text-sm">
                    <strong>Business Address:</strong><br />
                    PropCloud Inc.<br />
                    1111B S Governors Ave, Suite 34285<br />
                    Dover, DE 19904<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
