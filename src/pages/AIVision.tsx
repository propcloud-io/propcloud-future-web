
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AbstractAccent from "@/components/AbstractAccent";
import { CheckCircle, Wrench, Loader, Eye, Home } from "lucide-react";

function statusIcon(status: "done" | "progress" | "soon") {
  return status === "done"
    ? <CheckCircle size={20} className="text-primaryAccentGreen" title="Complete" />
    : status === "progress"
    ? <Wrench size={20} className="text-yellow-700 animate-spin-slow" title="In Progress" />
    : <Loader size={20} className="text-primaryAccent animate-pulse" title="Coming Soon" />;
}

export default function AIVision() {
  return (
    <div className="relative min-h-screen bg-neutralBg flex flex-col overflow-x-hidden font-sans">
      <Header />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4">
        <AbstractAccent position="top" color="green" />
        <h1 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto tracking-tight text-gray-950 mb-4 animate-fade-in">We&rsquo;re Building the <span className="text-primaryAccentGreen">AI Operating System</span> for Modern Property Management</h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
          A seamless platform that combines intelligent automation with real-world operational expertise — purpose-built for the future of real estate.
        </p>
        <a
          href="https://calendly.com/propcloud/ai-waitlist"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primaryAccentGreen text-white font-semibold rounded-lg px-7 py-3 text-lg shadow-soft hover:bg-primaryAccentGreen/90 transition-all duration-150 animate-fade-in"
        >
          Join the Waitlist
        </a>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-20 bg-white shadow-soft">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3 text-center">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primaryAccent">The Problem</h4>
            <ul className="list-disc list-inside text-gray-700 text-base space-y-2 text-left mx-auto max-w-xs">
              <li>Hosts are overwhelmed with manual work</li>
              <li>Property managers rely on too many disconnected tools</li>
              <li>Guests expect 24/7 attention and consistency</li>
            </ul>
          </div>
          <div className="hidden md:block border-l border-gray-200"></div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-primaryAccentGreen">Our Vision</h4>
            <ul className="list-disc list-inside text-gray-700 text-base space-y-2 text-left mx-auto max-w-xs">
              <li>AI agents that handle guest communication, pricing, bookings, and maintenance</li>
              <li>All-in-one platform with modular tools for automation and insight</li>
              <li>Human-in-the-loop approach during early stages to ensure quality</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-14 px-4 bg-neutralBg">
        <div className="max-w-xl mx-auto">
          <h4 className="text-lg md:text-xl font-semibold mb-6 text-primaryAccent text-center">Roadmap Preview</h4>
          <div className="overflow-x-auto rounded-lg shadow-soft bg-white">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 font-semibold text-gray-800">Phase</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">Focus</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-neutralBg/60 transition">
                  <td className="px-4 py-3">MVP</td>
                  <td className="px-4 py-3">Guest AI, Webhook, CRM Sheets</td>
                  <td className="px-4 py-3">{statusIcon("done")} <span className="ml-2 text-green-700 align-middle">Complete</span></td>
                </tr>
                <tr className="border-b hover:bg-neutralBg/60 transition">
                  <td className="px-4 py-3">Phase 1</td>
                  <td className="px-4 py-3">Dashboard, Calendar, CRM</td>
                  <td className="px-4 py-3">{statusIcon("progress")} <span className="ml-2 text-yellow-700 align-middle">In Progress</span></td>
                </tr>
                <tr className="hover:bg-neutralBg/60 transition">
                  <td className="px-4 py-3">Phase 2</td>
                  <td className="px-4 py-3">Fully Automated AI Assistant</td>
                  <td className="px-4 py-3">{statusIcon("soon")} <span className="ml-2 text-primaryAccent align-middle">Coming Soon</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-lg md:text-xl font-semibold mb-6 text-primaryAccentGreen text-center">Our Differentiators</h4>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-900 text-center">
            <li className="bg-neutralBg rounded-lg py-6 px-4 shadow">
              <span className="font-semibold text-primaryAccent">Human-assisted → AI-automated transition</span>
            </li>
            <li className="bg-neutralBg rounded-lg py-6 px-4 shadow">
              <span className="font-semibold text-primaryAccentGreen">Built on real-world operational data</span>
            </li>
            <li className="bg-neutralBg rounded-lg py-6 px-4 shadow">
              <span className="font-semibold text-primaryAccent">Open, integratable system (not a closed app)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="py-16 md:py-20 flex flex-col justify-center items-center text-center bg-neutralBg">
        <AbstractAccent position="bottom" color="blue" />
        <h2 className="text-2xl md:text-3xl font-bold mb-5 max-w-xl mx-auto text-gray-900">Be the First to Experience the Future</h2>
        <a
          href="https://calendly.com/propcloud/ai-waitlist"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primaryAccent text-white font-semibold rounded-lg px-7 py-3 text-lg shadow-soft hover:bg-primaryAccent/90 transition"
        >
          Join the Waitlist
        </a>
      </section>

      <Footer />
    </div>
  );
}
