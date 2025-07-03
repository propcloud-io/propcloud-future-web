
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import GeneralChatBot from './GeneralChatBot';

export default function ChatBot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Show chatbot after 4 seconds or when user scrolls
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 4000);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    const handleOpenChatBot = () => {
      setIsOpen(true);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('openChatBot', handleOpenChatBot);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('openChatBot', handleOpenChatBot);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-slate-700 via-propcloud-600 to-teal-500 text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <MessageCircle size={24} />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-400 rounded-full animate-pulse"></div>
          </button>
        </div>
      )}

      <GeneralChatBot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
