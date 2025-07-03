
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
      subtle: 'bg-gradient-to-br from-slate-50 via-white to-teal-50/30',
      medium: 'bg-gradient-to-br from-slate-100 via-white to-teal-100/50',
      bold: 'bg-gradient-to-br from-slate-200 via-teal-50 to-blue-50'
    },
    secondary: {
      subtle: 'bg-gradient-to-br from-teal-50/20 via-transparent to-blue-50/20',
      medium: 'bg-gradient-to-br from-teal-100/40 via-white/20 to-blue-100/40',
      bold: 'bg-gradient-to-br from-teal-200/60 via-blue-50/40 to-purple-100/60'
    },
    accent: {
      subtle: 'bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-orange-50/30',
      medium: 'bg-gradient-to-br from-purple-100/50 via-pink-100/30 to-orange-100/50',
      bold: 'bg-gradient-to-br from-purple-200/70 via-pink-200/50 to-orange-200/70'
    },
    dark: {
      subtle: 'bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800',
      medium: 'bg-gradient-to-br from-slate-900 via-propcloud-900 to-teal-900',
      bold: 'bg-gradient-to-br from-black via-slate-900 to-teal-900'
    }
  };

  return (
    <div 
      className={`absolute inset-0 ${gradients[variant][intensity]} animate-gradient-shift ${className}`}
      style={{
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}
    />
  );
}
