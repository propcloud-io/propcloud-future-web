
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AbstractAccent from '@/components/AbstractAccent';
import ParticleBackground from '@/components/ParticleBackground';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Brain, Building, Bot, Wrench, DollarSign, TrendingUp, MessageCircle, Zap, Shield, HelpCircle } from 'lucide-react';

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ | PropCloud - Frequently Asked Questions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get answers to frequently asked questions about PropCloud\'s AI-powered property management services, pricing, features, and more.');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/faq');
    }
  }, []);

  const faqSections = [
    {
      title: "About PropCloud",
      icon: <Building size={24} className="text-teal-600" />,
      questions: [
        {
          question: "What is PropCloud?",
          answer: "PropCloud is an AI-powered virtual property management platform designed for short-term rental owners and operators. We manage your property end-to-end — from guest communication and booking optimization to maintenance coordination and real-time reporting — so you don't have to."
        },
        {
          question: "How is PropCloud different from traditional property managers?",
          answer: "Unlike traditional firms, PropCloud uses intelligent automation to deliver faster responses, more transparent reporting, and smarter pricing decisions — all while keeping you fully in control. Our hybrid model blends AI with human oversight, giving you the best of both worlds at a fraction of the cost."
        },
        {
          question: "Who is PropCloud built for?",
          answer: "We work with property owners, investors, and small management companies who want to automate operations without sacrificing guest satisfaction. Whether you have one Airbnb or a growing portfolio, PropCloud adapts to your needs."
        }
      ]
    },
    {
      title: "AI Management & Technology",
      icon: <Bot size={24} className="text-teal-600" />,
      questions: [
        {
          question: "What tasks does your AI handle?",
          answer: "Our AI automates guest messaging, calendar syncing, pricing updates, performance tracking, and issue detection. It works 24/7 to resolve inquiries instantly, suggest optimal nightly rates, flag urgent maintenance, and keep your operations smooth."
        },
        {
          question: "Is there human involvement too?",
          answer: "Yes. While AI handles repetitive and time-sensitive tasks, our operations team oversees edge cases, escalations, and anything that requires local coordination or judgment. We're never fully \"hands-off\" — we're intelligently assisted."
        },
        {
          question: "Will your system integrate with Airbnb, Booking.com, or other OTAs?",
          answer: "Yes, we integrate with major platforms to centralize bookings, sync calendars, and eliminate double bookings. We're also compatible with most PMS (Property Management Systems) if you already use one."
        }
      ]
    },
    {
      title: "Services & Features",
      icon: <Wrench size={24} className="text-teal-600" />,
      questions: [
        {
          question: "What services do you offer?",
          answer: "• 24/7 Guest Messaging\n• Calendar & Booking Management\n• Dynamic Pricing Optimization\n• Housekeeping & Turnover Coordination\n• Maintenance Issue Tracking\n• Real-Time Owner Dashboard\n• Reporting & Insights\n• Listing Optimization & Marketing\n• Optional Onboarding Support"
        },
        {
          question: "How do you coordinate cleaning and maintenance?",
          answer: "We integrate with local vendors (or your existing teams) and coordinate everything via automation and AI alerts. Cleanings are synced with bookings, and maintenance issues are logged, prioritized, and followed up on without you needing to intervene."
        },
        {
          question: "Do you support properties in [my city]?",
          answer: "We operate virtually, so we can manage properties anywhere — as long as there are reliable local service providers. Let us know your location and we'll confirm availability or onboard vendors if needed."
        }
      ]
    },
    {
      title: "Pricing & Billing",
      icon: <DollarSign size={24} className="text-teal-600" />,
      questions: [
        {
          question: "How much does PropCloud cost?",
          answer: "Our pricing starts as low as 10% of monthly revenue, with custom packages based on your needs and scale. We're flexible — reach out for a tailored quote."
        },
        {
          question: "Are there setup or hidden fees?",
          answer: "No hidden fees. Some onboarding costs may apply for complex properties or if we're onboarding multiple listings, but you'll always see full transparency."
        },
        {
          question: "How do I get billed?",
          answer: "We bill monthly based on your revenue, or on a flat-fee basis if you prefer. You'll receive automated invoices with breakdowns of activity, performance, and ROI."
        }
      ]
    },
    {
      title: "Owner Experience",
      icon: <TrendingUp size={24} className="text-teal-600" />,
      questions: [
        {
          question: "Can I track performance in real time?",
          answer: "Yes! Our Owner Dashboard gives you live stats on revenue, occupancy, bookings, and more — with AI insights to help you understand what's working."
        },
        {
          question: "Will I still have access to my Airbnb account?",
          answer: "Yes. You retain full ownership of your listings — we manage them on your behalf with delegated access."
        },
        {
          question: "Can I exit anytime?",
          answer: "Absolutely. We don't believe in lock-in contracts. If you're not happy, you're free to walk away — no strings attached."
        }
      ]
    },
    {
      title: "Marketing & Visibility",
      icon: <MessageCircle size={24} className="text-teal-600" />,
      questions: [
        {
          question: "Will you help improve my listing performance?",
          answer: "Yes — we audit, optimize, and enhance your listings across platforms. We also adjust pricing daily using AI-driven demand forecasting to improve visibility and revenue."
        },
        {
          question: "Do you run paid ads for my property?",
          answer: "Not by default. But we can assist with digital marketing strategy and partnerships to expand your reach."
        }
      ]
    },
    {
      title: "Onboarding & Support",
      icon: <Zap size={24} className="text-teal-600" />,
      questions: [
        {
          question: "How do I get started?",
          answer: "Just click \"Get Started\" or contact us through the chatbot — we'll learn about your property, confirm your needs, and onboard you in a few easy steps."
        },
        {
          question: "How long does onboarding take?",
          answer: "Onboarding typically takes 48–72 hours depending on your current setup. We aim to make it seamless and fast."
        },
        {
          question: "What support is available?",
          answer: "Our team is always reachable by email or through the live dashboard assistant. Critical issues are flagged and responded to immediately."
        }
      ]
    },
    {
      title: "Integrations & Add-Ons",
      icon: <Zap size={24} className="text-teal-600" />,
      questions: [
        {
          question: "Can I keep using my own cleaners or vendors?",
          answer: "Yes. We're happy to coordinate with your existing vendors — or provide you with new vetted options."
        },
        {
          question: "What if I use another PMS or channel manager?",
          answer: "We can work with many popular systems or take over full management via direct OTA access. Let's discuss your current tools and the best way to connect."
        }
      ]
    },
    {
      title: "Other Common Questions",
      icon: <HelpCircle size={24} className="text-teal-600" />,
      questions: [
        {
          question: "Is PropCloud safe and secure?",
          answer: "We use encrypted access, secure authentication, and never share your data with third parties. Your data stays your data — period."
        },
        {
          question: "Can I just use parts of your service?",
          answer: "In some cases, yes. We offer modular services and can adapt our offering depending on your needs. If you only want pricing help or messaging automation — we've got you."
        },
        {
          question: "How do I get help if something goes wrong?",
          answer: "You can contact us any time at contact@propcloud.io or through the dashboard assistant. We monitor all activity closely and escalate issues fast."
        }
      ]
    }
  ];

  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 flex flex-col relative overflow-hidden">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 relative">
        <AbstractAccent position="top" color="blue" className="opacity-60" />
        <ParticleBackground density="medium" className="opacity-30" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-gradient-to-br from-teal-300/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-56 h-56 bg-gradient-to-br from-slate-300/50 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-br from-teal-200/40 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="faq-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#14b8a6" strokeWidth="1.5" opacity="0.4"/>
                <circle cx="40" cy="40" r="2" fill="#14b8a6" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#faq-grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/60 max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-xl">
                  <Brain size={48} className="text-teal-700" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent animate-fade-up">
                  FAQ
                </h1>
              </div>
              <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto animate-fade-up leading-relaxed" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                Frequently Asked Questions about PropCloud
              </p>
            </div>
          </div>

          {/* FAQ Sections */}
          {faqSections.map((section, sectionIdx) => (
            <div 
              key={section.title}
              className="mb-16 animate-fade-up"
              style={{animationDelay: `${0.1 + sectionIdx * 0.05}s`, animationFillMode: 'both'}}
            >
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/60">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 shadow-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, faqIdx) => (
                    <AccordionItem key={faqIdx} value={`${sectionIdx}-${faqIdx}`} className="border-b border-gray-200">
                      <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-propcloud-700 py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-base leading-relaxed pb-6">
                        {faq.answer.includes('\n') ? (
                          <div className="space-y-2">
                            {faq.answer.split('\n').map((line, lineIdx) => (
                              <div key={lineIdx}>{line}</div>
                            ))}
                          </div>
                        ) : (
                          faq.answer
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}

          {/* Enhanced CTA Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-br from-white/95 via-teal-50/90 to-slate-50/95 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl border border-white/60 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100/30 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent">
                  Still Have Questions?
                </h3>
                <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Chat with our AI assistant or contact our team directly for personalized answers.
                </p>
                <button
                  onClick={openChatBot}
                  className="inline-block rounded-2xl bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-4">
                    <MessageCircle size={28} />
                    Get Instant Answers
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
