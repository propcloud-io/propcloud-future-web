
import React from "react";

/** Ambient particle background for enhanced visual depth */
export default function ParticleBackground({ className = "", density = "medium" }: { 
  className?: string;
  density?: "light" | "medium" | "heavy";
}) {
  const particleCount = density === "light" ? 15 : density === "medium" ? 25 : 40;
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <radialGradient id="particle-gradient-1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="particle-gradient-2">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {[...Array(particleCount)].map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = Math.random() * 3 + 1;
          const duration = Math.random() * 20 + 15;
          const delay = Math.random() * 10;
          const gradient = Math.random() > 0.5 ? "particle-gradient-1" : "particle-gradient-2";
          
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={size}
              fill={`url(#${gradient})`}
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0,0;${Math.sin(i) * 20},${Math.cos(i) * 15};0,0`}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}
