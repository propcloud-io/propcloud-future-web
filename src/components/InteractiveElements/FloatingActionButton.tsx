
import React, { useState, useEffect } from 'react';
import { Plus, MessageCircle, BarChart3, Settings, X } from 'lucide-react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  const actions = [
    { icon: MessageCircle, label: 'Quick Chat', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: BarChart3, label: 'Analytics', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Settings, label: 'Settings', color: 'bg-purple-500 hover:bg-purple-600' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating cursor trail effect when menu is open */}
      {isOpen && (
        <div 
          className="fixed w-2 h-2 bg-teal-400 rounded-full pointer-events-none opacity-60 transition-all duration-100 ease-out z-40"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Action buttons */}
      <div className={`absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className={`${action.color} p-3 rounded-full shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 group`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : ''
            }}
            title={action.label}
          >
            <action.icon className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-200" />
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-600 hover:bg-teal-700'
        } text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden`}
      >
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping" />
        
        {/* Icon with rotation */}
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </div>
      </button>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
