
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
    light: 'bg-white/90 backdrop-blur-xl border-white/30 shadow-lg',
    medium: 'bg-white/70 backdrop-blur-lg border-teal-200/40 shadow-xl',
    dark: 'bg-slate-900/80 backdrop-blur-md border-teal-500/20 shadow-2xl'
  };

  const hoverEffect = hover ? 'hover:bg-slate-900/90 hover:shadow-2xl hover:scale-[1.01] hover:border-teal-400/30' : '';

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
      {/* Subtle teal accent overlay - no more white */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Teal glow effect instead of mixed colors */}
      <div className="absolute -inset-px bg-gradient-to-r from-teal-500/10 via-teal-400/5 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
    </div>
  );
}
