
import React from "react";

/** Decorative visual divider between sections */
export default function VisualDivider({ variant = "flow", className = "" }: {
  variant?: "flow" | "geometric" | "minimal";
  className?: string;
}) {
  if (variant === "geometric") {
    return (
      <div className={`relative h-24 flex items-center justify-center overflow-hidden ${className}`}>
        <svg width="200" height="60" viewBox="0 0 200 60" className="opacity-20">
          <defs>
            <linearGradient id="geo-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <polygon points="100,10 120,30 100,50 80,30" fill="url(#geo-gradient)">
            <animateTransform attributeName="transform" type="rotate" values="0 100 30;360 100 30" dur="20s" repeatCount="indefinite" />
          </polygon>
          <polygon points="50,20 60,30 50,40 40,30" fill="#14b8a6" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0 50 30;-360 50 30" dur="15s" repeatCount="indefinite" />
          </polygon>
          <polygon points="150,20 160,30 150,40 140,30" fill="#0f766e" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" values="0 150 30;360 150 30" dur="18s" repeatCount="indefinite" />
          </polygon>
        </svg>
      </div>
    );
  }
  
  if (variant === "minimal") {
    return (
      <div className={`relative h-16 flex items-center justify-center ${className}`}>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute w-2 h-2 rounded-full bg-teal-500 opacity-60"></div>
      </div>
    );
  }
  
  // Default flow variant
  return (
    <div className={`relative h-20 flex items-center justify-center overflow-hidden ${className}`}>
      <svg width="300" height="40" viewBox="0 0 300 40" className="opacity-30">
        <defs>
          <linearGradient id="divider-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#0f766e" />
            <stop offset="80%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M0 20 Q75 10, 150 20 T300 20" stroke="url(#divider-gradient)" strokeWidth="2" fill="none">
          <animate attributeName="stroke-dasharray" values="0,600;150,450;0,600" dur="4s" repeatCount="indefinite" />
        </path>
        <circle cx="150" cy="20" r="4" fill="#14b8a6" opacity="0.7">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
