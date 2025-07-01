
import React from "react";

/** Enhanced AI flow visualization showing intelligent property management pipeline */
export default function AIFlowVisual({ className = "" }: { className?: string }) {
  return (
    <div className={"relative flex justify-center items-center w-full py-8 " + className}>
      <svg width="900" height="300" viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-5xl pointer-events-none select-none">
        <defs>
          <linearGradient id="pipeline-gradient-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="30%" stopColor="#0f766e" />
            <stop offset="70%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id="pipeline-gradient-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <radialGradient id="stage-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="1" />
            <stop offset="70%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.6" />
          </radialGradient>
          <filter id="pipeline-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background pattern */}
        <pattern id="ai-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.2"/>
          <circle cx="15" cy="15" r="1" fill="#14b8a6" opacity="0.3"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#ai-grid)" />
        
        {/* Main processing pipeline */}
        <path d="M50 150 Q200 100, 350 150 Q500 200, 650 150 Q750 100, 850 150" 
              stroke="url(#pipeline-gradient-1)" 
              strokeWidth="6" 
              fill="none" 
              opacity="0.9"
              filter="url(#pipeline-glow)">
          <animate attributeName="stroke-dasharray" values="0,2000;400,1600;0,2000" dur="6s" repeatCount="indefinite" />
        </path>
        
        {/* Secondary data streams */}
        <path d="M50 180 Q300 230, 850 180" 
              stroke="url(#pipeline-gradient-2)" 
              strokeWidth="3" 
              fill="none" 
              opacity="0.7">
          <animate attributeName="stroke-dasharray" values="0,1500;300,1200;0,1500" dur="8s" begin="2s" repeatCount="indefinite" />
        </path>
        
        <path d="M50 120 Q400 70, 850 120" 
              stroke="url(#pipeline-gradient-1)" 
              strokeWidth="4" 
              fill="none" 
              opacity="0.8">
          <animate attributeName="stroke-dasharray" values="0,1800;350,1450;0,1800" dur="7s" begin="1s" repeatCount="indefinite" />
        </path>
        
        {/* Processing stages with labels */}
        
        <!-- Stage 1: Data Ingestion -->
        <g transform="translate(100, 150)">
          <circle cx="0" cy="0" r="30" fill="url(#stage-gradient)" filter="url(#pipeline-glow)">
            <animate attributeName="r" values="30;35;30" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="15" fill="#1e293b" opacity="0.8" />
          
          <!-- Data intake symbol -->
          <g stroke="white" strokeWidth="2" fill="none">
            <rect x="-8" y="-8" width="16" height="16" rx="2" />
            <path d="M-4 -4 L4 -4 M-4 0 L4 0 M-4 4 L4 4" stroke="white" strokeWidth="1" />
          </g>
          
          <text x="0" y="55" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Data Ingestion</text>
          <text x="0" y="70" textAnchor="middle" fill="#64748b" fontSize="10">Guest messages, bookings</text>
        </g>
        
        <!-- Stage 2: AI Analysis -->
        <g transform="translate(300, 120)">
          <circle cx="0" cy="0" r="35" fill="url(#stage-gradient)" filter="url(#pipeline-glow)">
            <animate attributeName="r" values="35;40;35" dur="4.5s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="18" fill="#0f766e" opacity="0.8" />
          
          <!-- AI brain pattern -->
          <g stroke="white" strokeWidth="2" fill="none">
            <path d="M-10 -5 Q0 -12, 10 -5" />
            <path d="M-10 0 Q0 -7, 10 0" />
            <path d="M-10 5 Q0 -2, 10 5" />
            <circle cx="-6" cy="-2" r="1.5" fill="white" />
            <circle cx="6" cy="2" r="1.5" fill="white" />
            <circle cx="0" cy="-6" r="1.5" fill="white" />
          </g>
          
          <text x="0" y="65" textAnchor="middle" fill="#0f766e" fontSize="12" fontWeight="bold">AI Analysis</text>
          <text x="0" y="80" textAnchor="middle" fill="#64748b" fontSize="10">Pattern recognition</text>
        </g>
        
        <!-- Stage 3: Smart Processing -->
        <g transform="translate(500, 180)">
          <circle cx="0" cy="0" r="32" fill="url(#stage-gradient)" filter="url(#pipeline-glow)">
            <animate attributeName="r" values="32;37;32" dur="4.2s" begin="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="16" fill="#14b8a6" opacity="0.8" />
          
          <!-- Processing gears -->
          <g stroke="white" strokeWidth="2" fill="none">
            <circle cx="-5" cy="0" r="6" />
            <circle cx="5" cy="0" r="6" />
            <path d="M-5 -6 L-5 6 M-11 0 L1 0" strokeWidth="1" />
            <path d="M5 -6 L5 6 M-1 0 L11 0" strokeWidth="1" />
          </g>
          
          <text x="0" y="55" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="bold">Smart Processing</text>
          <text x="0" y="70" textAnchor="middle" fill="#64748b" fontSize="10">Dynamic pricing, scheduling</text>
        </g>
        
        <!-- Stage 4: Automated Actions -->
        <g transform="translate(700, 130)">
          <circle cx="0" cy="0" r="33" fill="url(#stage-gradient)" filter="url(#pipeline-glow)">
            <animate attributeName="r" values="33;38;33" dur="4.8s" begin="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="17" fill="#2dd4bf" opacity="0.8" />
          
          <!-- Action symbol -->
          <g stroke="white" strokeWidth="2" fill="white">
            <path d="M-8 0 L8 0 M4 -4 L8 0 L4 4" strokeWidth="2" fill="none" />
            <circle cx="-6" cy="0" r="2" />
          </g>
          
          <text x="0" y="60" textAnchor="middle" fill="#2dd4bf" fontSize="12" fontWeight="bold">Automated Actions</text>
          <text x="0" y="75" textAnchor="middle" fill="#64748b" fontSize="10">Responses, updates</text>
        </g>
        
        {/* Data flow indicators */}
        <g opacity="0.8">
          {[...Array(12)].map((_, i) => (
            <circle key={i} cx={80 + i * 60} cy={150 + Math.sin(i) * 20} r="4" fill="#14b8a6">
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                values={`0,0;${20 + Math.sin(i) * 10},${Math.cos(i) * 8};0,0`}
                dur={`${4 + i * 0.3}s`} 
                repeatCount="indefinite" 
              />
              <animate attributeName="opacity" values="0.8;1;0.8" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        
        {/* Performance metrics flowing upward */}
        <g fill="#5eead4" opacity="0.6">
          <g transform="translate(200, 50)">
            <circle cx="0" cy="0" r="3">
              <animate attributeName="cy" values="0;-20;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="20" textAnchor="middle" fill="#0f766e" fontSize="9">Revenue ↑</text>
          </g>
          
          <g transform="translate(450, 40)">
            <circle cx="0" cy="0" r="3">
              <animate attributeName="cy" values="0;-20;0" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="20" textAnchor="middle" fill="#0f766e" fontSize="9">Efficiency ↑</text>
          </g>
          
          <g transform="translate(750, 45)">
            <circle cx="0" cy="0" r="3">
              <animate attributeName="cy" values="0;-20;0" dur="3s" begin="2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="20" textAnchor="middle" fill="#0f766e" fontSize="9">Satisfaction ↑</text>
          </g>
        </g>
        
        {/* Background energy waves */}
        <g fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.2">
          <ellipse cx="450" cy="150" rx="200" ry="50">
            <animate attributeName="rx" values="200;250;200" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="450" cy="150" rx="200" ry="50">
            <animate attributeName="rx" values="200;250;200" dur="6s" begin="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="6s" begin="3s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
}
