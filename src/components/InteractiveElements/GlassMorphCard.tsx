
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
    light: 'bg-white/90 backdrop-blur-xl border-slate-200/60 shadow-lg',
    medium: 'bg-white/80 backdrop-blur-lg border-slate-300/50 shadow-xl',
    dark: 'bg-slate-900/80 backdrop-blur-md border-slate-700/40 shadow-2xl'
  };

  const hoverEffect = hover ? 'hover:bg-white/95 hover:shadow-xl hover:scale-[1.02]' : '';

  return (
    <div 
      className={`
        ${variants[variant]} 
        ${hoverEffect}
        rounded-2xl border transition-all duration-300 
        relative overflow-hidden group
        ${className}
      `}
    >
      {/* Subtle animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Professional glow effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-teal-500/10 via-slate-400/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
    </div>
  );
}
