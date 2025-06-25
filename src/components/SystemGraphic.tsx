
import React from "react";

/** Enhanced system visualization with sophisticated animations and depth */
export default function SystemGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-2xl pointer-events-none select-none">
        <defs>
          <linearGradient id="system-gradient-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="system-gradient-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <radialGradient id="node-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0f766e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.5" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Enhanced background grid with depth */}
        <pattern id="enhanced-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.4"/>
          <circle cx="15" cy="15" r="0.5" fill="#14b8a6" opacity="0.3"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#enhanced-grid)" />
        
        {/* Animated background waves */}
        <g opacity="0.1">
          <path d="M0 200 Q150 150, 300 200 T600 200 V400 H0 Z" fill="url(#system-gradient-1)">
            <animateTransform attributeName="transform" type="translate" values="0,0;20,10;0,0" dur="8s" repeatCount="indefinite" />
          </path>
          <path d="M0 250 Q200 200, 400 250 T600 250 V400 H0 Z" fill="url(#system-gradient-2)" opacity="0.7">
            <animateTransform attributeName="transform" type="translate" values="0,0;-15,5;0,0" dur="10s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Central AI hub with enhanced glow */}
        <circle cx="300" cy="200" r="50" fill="url(#node-gradient)" filter="url(#glow)">
          <animate attributeName="r" values="50;55;50" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Inner core */}
        <circle cx="300" cy="200" r="25" fill="#14b8a6" opacity="0.6">
          <animate attributeName="r" values="25;30;25" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Enhanced connecting pathways with flow animation */}
        <g stroke="url(#system-gradient-1)" strokeWidth="3" fill="none" opacity="0.8">
          <path d="M100 100 Q200 80, 250 150" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,300;60,240;0,300" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M500 100 Q400 80, 350 150" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,300;60,240;0,300" dur="5s" begin="1s" repeatCount="indefinite" />
          </path>
          <path d="M100 300 Q200 320, 250 250" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,300;60,240;0,300" dur="5s" begin="2s" repeatCount="indefinite" />
          </path>
          <path d="M500 300 Q400 320, 350 250" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,300;60,240;0,300" dur="5s" begin="3s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Secondary network lines */}
        <g stroke="#0d9488" strokeWidth="1.5" fill="none" opacity="0.5">
          <path d="M150 150 Q300 100, 450 150">
            <animate attributeName="stroke-dasharray" values="0,500;100,400;0,500" dur="6s" repeatCount="indefinite" />
          </path>
          <path d="M150 250 Q300 300, 450 250">
            <animate attributeName="stroke-dasharray" values="0,500;100,400;0,500" dur="6s" begin="2s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Enhanced peripheral nodes with glow */}
        <g filter="url(#glow)">
          <circle cx="100" cy="100" r="20" fill="#1e293b" opacity="0.9">
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="20;24;20" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="100" r="20" fill="#14b8a6" opacity="0.9">
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="20;24;20" dur="4s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="300" r="20" fill="#0f766e" opacity="0.9">
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" begin="1.6s" repeatCount="indefinite" />
            <animate attributeName="r" values="20;24;20" dur="4s" begin="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="300" r="20" fill="#334155" opacity="0.9">
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" begin="2.4s" repeatCount="indefinite" />
            <animate attributeName="r" values="20;24;20" dur="4s" begin="3s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Floating data streams */}
        <g fill="#14b8a6" opacity="0.7">
          {[...Array(12)].map((_, i) => (
            <circle key={i} cx={80 + i * 40} cy={50} r="3">
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                values={`0,0;${Math.sin(i) * 20},${Math.cos(i) * 15};0,0`}
                dur={`${3 + i * 0.3}s`} 
                repeatCount="indefinite" 
              />
              <animate attributeName="opacity" values="0.7;1;0.7" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        
        {/* Energy pulses from center */}
        <g fill="none" stroke="#14b8a6" strokeWidth="2" opacity="0.6">
          <circle cx="300" cy="200" r="70">
            <animate attributeName="r" values="70;120;70" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="200" r="70">
            <animate attributeName="r" values="70;120;70" dur="3s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
