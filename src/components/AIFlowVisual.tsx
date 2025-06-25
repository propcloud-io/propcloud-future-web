
import React from "react";

/** Enhanced AI flow visualization with sophisticated gradients and animations */
export default function AIFlowVisual({ className = "" }: { className?: string }) {
  return (
    <div className={"relative flex justify-center items-center w-full py-6 " + className}>
      <svg width="420" height="120" viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-24 md:h-28 max-w-2xl pointer-events-none select-none">
        <defs>
          <linearGradient id="ai-flow-gradient-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="30%" stopColor="#0f766e" />
            <stop offset="70%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id="ai-flow-gradient-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <radialGradient id="ai-node-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="1" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.6" />
          </radialGradient>
          <filter id="ai-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Enhanced flowing neural pathways */}
        <path d="M20 60 Q120 20, 210 60 T400 60" 
              stroke="url(#ai-flow-gradient-1)" 
              strokeWidth="4" 
              fill="none" 
              opacity="0.9"
              filter="url(#ai-glow)">
          <animate attributeName="stroke-dasharray" values="0,1000;200,800;0,1000" dur="4s" repeatCount="indefinite" />
        </path>
        
        <path d="M20 80 Q160 110, 400 80" 
              stroke="url(#ai-flow-gradient-2)" 
              strokeWidth="2.5" 
              fill="none" 
              opacity="0.7">
          <animate attributeName="stroke-dasharray" values="0,1000;150,850;0,1000" dur="5s" begin="1s" repeatCount="indefinite" />
        </path>
        
        <path d="M20 40 Q100 10, 400 40" 
              stroke="url(#ai-flow-gradient-1)" 
              strokeWidth="3" 
              fill="none" 
              opacity="0.8">
          <animate attributeName="stroke-dasharray" values="0,1000;180,820;0,1000" dur="4.5s" begin="2s" repeatCount="indefinite" />
        </path>
        
        {/* Secondary connection webs */}
        <g stroke="#0d9488" strokeWidth="1" fill="none" opacity="0.4">
          <path d="M80 30 Q150 45, 220 30">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M180 90 Q250 75, 320 90">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Enhanced neural nodes with pulsing effects */}
        <circle cx="60" cy="50" r="8" fill="url(#ai-node-gradient)" filter="url(#ai-glow)">
          <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="210" cy="60" r="12" fill="url(#ai-node-gradient)" filter="url(#ai-glow)">
          <animate attributeName="r" values="12;16;12" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="350" cy="70" r="7" fill="#0f766e" opacity="0.9">
          <animate attributeName="r" values="7;10;7" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;1;0.9" dur="2.2s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="140" cy="85" r="6" fill="#14b8a6" opacity="0.8">
          <animate attributeName="r" values="6;9;6" dur="3.2s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="280" cy="35" r="9" fill="url(#ai-node-gradient)" opacity="0.9">
          <animate attributeName="r" values="9;13;9" dur="3.8s" repeatCount="indefinite" />
        </circle>
        
        {/* Data flow particles */}
        <g fill="#5eead4" opacity="0.6">
          {[...Array(8)].map((_, i) => (
            <circle key={i} cx={40 + i * 45} cy={60} r="2">
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                values={`0,0;${Math.sin(i * 0.8) * 15},${Math.cos(i * 0.8) * 10};0,0`}
                dur={`${2.5 + i * 0.3}s`} 
                repeatCount="indefinite" 
              />
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        
        {/* Energy waves */}
        <g fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.3">
          <ellipse cx="210" cy="60" rx="50" ry="20">
            <animate attributeName="rx" values="50;80;50" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="210" cy="60" rx="50" ry="20">
            <animate attributeName="rx" values="50;80;50" dur="4s" begin="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" begin="2s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
}
