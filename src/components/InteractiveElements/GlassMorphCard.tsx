
import React from 'react';

interface GlassMorphCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'medium' | 'dark';
  hover?: boolean;
}

export default function GlassMorphCard({ 
  children, 
  className = '',
  variant = 'light',
  hover = true
}: GlassMorphCardProps) {
  const variants = {
    light: 'bg-white/80 backdrop-blur-xl border-white/60',
    medium: 'bg-white/60 backdrop-blur-lg border-white/40',
    dark: 'bg-black/20 backdrop-blur-md border-white/20'
  };

  const hoverEffect = hover ? 'hover:bg-white/90 hover:shadow-2xl hover:scale-105' : '';

  return (
    <div 
      className={`
        ${variants[variant]} 
        ${hoverEffect}
        rounded-3xl border shadow-xl transition-all duration-500 
        relative overflow-hidden group
        ${className}
      `}
    >
      {/* Animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
    </div>
  );
}
