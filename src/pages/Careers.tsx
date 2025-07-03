
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AbstractAccent from '@/components/AbstractAccent';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgressBar from '@/components/InteractiveElements/ScrollProgressBar';
import MagneticButton from '@/components/InteractiveElements/MagneticButton';
import GlowingOrb from '@/components/InteractiveElements/GlowingOrb';
import { 
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Target,
  Code,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  Rocket,
  Brain,
  Globe
} from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  location: string;
  type: string;
  overview: string;
  responsibilities: string[];
  expanded?: boolean;
}

export default function Careers() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Careers | PropCloud - Join Our Mission-Driven Team";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join PropCloud\'s mission-driven team. We\'re reimagining the future of hospitality with AI-first solutions. Remote-first, purpose-driven careers available.');
    }
  }, []);

  const jobPositions: JobPosition[] = [
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Developer (AI-Enabled SaaS)',
      location: 'Remote',
      type: 'Full-time',
      overview: 'Help us build the AI infrastructure powering modern property management.',
      responsibilities: [
        'Develop and maintain React + Supabase applications',
        'Integrate GPT and real-time data workflows',
        'Collaborate on architecture, product thinking, and execution',
        'Build scalable, user-friendly interfaces',
        'Work with AI/ML integrations and automation'
      ]
    },
    {
      id: 'customer-success',
      title: 'Customer Success & Onboarding Lead',
      location: 'Remote (preferred timezone: GMT+2 to GMT+6)',
      type: 'Part-time, Contract-to-Hire',
      overview: 'Support property managers and hosts adopting our systems.',
      responsibilities: [
        'Handle new client onboarding',
        'Manage live communications and support',
        'Work with product to improve user journeys',
        'Create documentation and training materials',
        'Build relationships with key clients'
      ]
    },
    {
      id: 'ai-product-manager',
      title: 'AI Product Manager',
      location: 'Remote',
      type: 'Full-time',
      overview: 'Shape the future of AI-powered property management tools.',
      responsibilities: [
        'Define product roadmap for AI features',
        'Work closely with engineering on AI integration',
        'Analyze user feedback and market trends',
        'Coordinate between technical and business teams',
        'Drive product strategy and execution'
      ]
    }
  ];

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const scrollToJobs = () => {
    document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openChatBot = () => {
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 text-white relative overflow-hidden">
      <ScrollProgressBar />
      <Header />
      
      <main className="pt-24 pb-16 relative">
        <AbstractAccent position="top" color="green" className="opacity-60" />
        <ParticleBackground density="medium" className="opacity-20" />
        
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <GlowingOrb 
            size={180} 
            color="#14b8a6" 
            intensity={0.3}
            className="top-1/4 left-1/6"
          />
          <GlowingOrb 
            size={120} 
            color="#0f766e" 
            intensity={0.4}
            className="bottom-1/3 right-1/4"
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Rocket className="w-16 h-16 text-teal-400 mx-auto mb-6 animate-pulse" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent animate-fade-up">
                Join Our Mission-Driven Team
              </h1>
              <p className="text-xl sm:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto animate-fade-up [animation-delay:0.2s] [animation-fill-mode:both]">
                We're reimagining the future of hospitality — one intelligent system at a time.
              </p>
              <MagneticButton
                onClick={scrollToJobs}
                className="inline-block rounded-2xl bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 font-bold px-10 py-5 text-lg shadow-2xl hover:shadow-3xl animate-fade-up [animation-delay:0.4s] [animation-fill-mode:both]"
                magneticStrength={0.15}
              >
                <span className="flex items-center gap-3">
                  <Target size={24} />
                  View Open Roles
                </span>
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Why Work at PropCloud */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-up">
                Why Work at PropCloud?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Heart size={32} className="text-teal-400" />,
                  title: 'Purpose-Driven Work',
                  description: 'Every day, we build tools that improve how real people live, travel, and do business.'
                },
                {
                  icon: <Globe size={32} className="text-teal-400" />,
                  title: 'Remote-First Flexibility',
                  description: 'Work from anywhere, with asynchronous collaboration and clear accountability.'
                },
                {
                  icon: <Brain size={32} className="text-teal-400" />,
                  title: 'AI at the Core',
                  description: 'Build alongside cutting-edge technology that\'s redefining property management.'
                },
                {
                  icon: <Users size={32} className="text-teal-400" />,
                  title: 'Small Team, Big Impact',
                  description: 'Your voice matters. We move fast, build together, and celebrate wins.'
                },
                {
                  icon: <Zap size={32} className="text-teal-400" />,
                  title: 'Founders Who Care',
                  description: 'We\'re intentional about culture, communication, and long-term vision.'
                }
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-fade-up [animation-delay:${0.1 * index}s] [animation-fill-mode:both]`}
                >
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-200 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-up">
                Open Positions
              </h2>
              <p className="text-xl text-slate-200 animate-fade-up [animation-delay:0.1s] [animation-fill-mode:both]">
                Join us in building the future of property management
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {jobPositions.map((job, index) => (
                <div
                  key={job.id}
                  className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden animate-fade-up [animation-delay:${0.1 * index}s] [animation-fill-mode:both]`}
                >
                  <div 
                    className="p-8 cursor-pointer hover:bg-white/5 transition-all duration-300"
                    onClick={() => toggleJobExpansion(job.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <span className="flex items-center gap-2 bg-teal-500/20 px-3 py-1 rounded-full">
                            <MapPin size={16} />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-2 bg-slate-500/20 px-3 py-1 rounded-full">
                            <Clock size={16} />
                            {job.type}
                          </span>
                        </div>
                        <p className="text-slate-200 text-lg leading-relaxed">
                          {job.overview}
                        </p>
                      </div>
                      <div className="ml-6">
                        {expandedJob === job.id ? (
                          <ChevronUp size={24} className="text-teal-400" />
                        ) : (
                          <ChevronDown size={24} className="text-teal-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedJob === job.id && (
                    <div className="px-8 pb-8 border-t border-white/10">
                      <div className="pt-6">
                        <h4 className="text-lg font-semibold mb-4">Key Responsibilities:</h4>
                        <ul className="space-y-2 mb-8">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-200">
                              <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="mailto:contact@propcloud.io?subject=Application for PropCloud Position"
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <Mail size={20} />
                          Apply Now
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture & Values */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 animate-fade-up">
                We're serious — with soul.
              </h2>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 animate-fade-up [animation-delay:0.2s] [animation-fill-mode:both]">
                <p className="text-xl text-slate-200 leading-relaxed">
                  At PropCloud, we believe in intelligent systems guided by human empathy. 
                  Our team blends discipline with curiosity, structure with innovation, 
                  and responsibility with freedom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Look For */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-up">
                What We Look For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                'Purpose-first thinkers',
                'Self-starters and collaborators',
                'People who care deeply about meaningful work',
                'Bias to action, hunger to learn, and clarity in communication'
              ].map((trait, index) => (
                <div
                  key={trait}
                  className={`bg-gradient-to-br from-teal-500/20 to-slate-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-all duration-300 animate-fade-up [animation-delay:${0.1 * index}s] [animation-fill-mode:both]`}
                >
                  <p className="text-lg font-semibold">{trait}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Don't See the Right Role */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 animate-fade-up">
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  Don't See the Right Role?
                </h2>
                <p className="text-xl text-slate-200 leading-relaxed mb-10">
                  We're always open to brilliant people. If you resonate with our mission, 
                  send us a message at{' '}
                  <a 
                    href="mailto:contact@propcloud.io" 
                    className="text-teal-300 hover:text-teal-200 underline transition-colors duration-300"
                  >
                    contact@propcloud.io
                  </a>
                  {' '}and tell us how you'd like to help shape the future of PropCloud.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:contact@propcloud.io?subject=Interest in PropCloud Opportunities"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Mail size={20} />
                    Get in Touch
                  </a>
                  <MagneticButton
                    onClick={openChatBot}
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300"
                    magneticStrength={0.1}
                  >
                    <MessageCircle size={20} />
                    Chat with Us
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
