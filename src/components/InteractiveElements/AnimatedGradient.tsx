
import React from 'react';

interface AnimatedGradientProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'dark';
  className?: string;
  intensity?: 'subtle' | 'medium' | 'bold';
}

export default function AnimatedGradient({ 
  variant = 'primary',
  className = '',
  intensity = 'medium'
}: AnimatedGradientProps) {
  const gradients = {
    primary: {
      subtle: 'bg-gradient-to-br from-slate-50 via-white to-slate-100/50',
      medium: 'bg-gradient-to-br from-slate-100 via-white to-slate-200/70',
      bold: 'bg-gradient-to-br from-slate-200 via-slate-50 to-slate-300'
    },
    secondary: {
      subtle: 'bg-gradient-to-br from-slate-50/30 via-white/80 to-slate-100/30',
      medium: 'bg-gradient-to-br from-slate-100/50 via-white/60 to-slate-200/50',
      bold: 'bg-gradient-to-br from-slate-200/70 via-slate-100/50 to-slate-300/70'
    },
    accent: {
      subtle: 'bg-gradient-to-br from-teal-50/40 via-slate-50/30 to-teal-100/40',
      medium: 'bg-gradient-to-br from-teal-100/60 via-slate-100/40 to-teal-200/60',
      bold: 'bg-gradient-to-br from-teal-200/80 via-slate-200/60 to-teal-300/80'
    },
    dark: {
      subtle: 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800',
      medium: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      bold: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
    }
  };

  return (
    <div 
      className={`absolute inset-0 ${gradients[variant][intensity]} animate-gradient-shift ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'gradientShift 12s ease infinite'
      }}
    />
  );
}
