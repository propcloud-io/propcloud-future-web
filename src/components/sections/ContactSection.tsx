
import { Phone, MapPin, Mail } from "lucide-react";
import AbstractAccent from "@/components/AbstractAccent";

export default function ContactSection() {
  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 text-white overflow-hidden">
      <AbstractAccent position="bottom" color="green" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-up">
            Get Started with PropCloud
          </h2>
          <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto animate-fade-up" style={{animationDelay: ".15s", animationFillMode: "both"}}>
            Ready to transform your property management? Let's connect and discuss how PropCloud can work for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-up" style={{animationDelay: ".3s", animationFillMode: "both"}}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-teal-600/20 backdrop-blur-sm">
                <Phone size={24} className="text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Book a Free Consultation</h3>
                <p className="text-slate-300">
                  Schedule a personalized demo to see how PropCloud can optimize your properties.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-teal-600/20 backdrop-blur-sm">
                <MapPin size={24} className="text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
                <p className="text-slate-300">
                  Managing properties worldwide with 24/7 support and local expertise.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center lg:text-left animate-fade-up" style={{animationDelay: ".45s", animationFillMode: "both"}}>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-slate-300 mb-6">
                Chat with our AI assistant to get personalized recommendations and connect with our team.
              </p>
              <button
                onClick={openChatBot}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 font-bold py-4 px-8 rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
