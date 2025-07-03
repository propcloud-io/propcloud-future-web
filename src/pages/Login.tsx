
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const handleContactUs = () => {
    // Dispatch custom event to open chatbot
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  useEffect(() => {
    // Update page-specific metadata for login page
    document.title = "Login | PropCloud";
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50/30 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-teal-600 mb-6">
              <Lock size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Access Your Dashboard
            </h2>
            <p className="text-slate-600">
              Sign in to view your property performance
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/70">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              
              <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-4 text-center">
                <p className="text-sm text-teal-700 mb-4">
                  Click the demo button below to explore the dashboard with sample data
                </p>
                <Link to="/app">
                  <Button className="w-full bg-gradient-to-r from-slate-900 to-teal-600 hover:brightness-110 text-white font-semibold py-3 h-12">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?{' '}
                  <button 
                    onClick={handleContactUs}
                    className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer bg-transparent border-none underline"
                  >
                    Contact us to get started
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
