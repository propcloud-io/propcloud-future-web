
import React from "react";

/** Enhanced system visualization showing human-AI collaboration workflow */
export default function SystemGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-4xl pointer-events-none select-none">
        <defs>
          <linearGradient id="human-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="ai-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="collaboration-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background grid pattern */}
        <pattern id="workflow-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#workflow-grid)" />
        
        {/* Human Manager Section (Left) */}
        <g transform="translate(80, 150)">
          <circle cx="0" cy="0" r="60" fill="url(#human-gradient)" filter="url(#soft-glow)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="30" fill="#1e293b" opacity="0.7" />
          
          {/* Human icon representation */}
          <circle cx="0" cy="-10" r="8" fill="white" />
          <path d="M-15 10 Q0 5, 15 10 L15 25 L-15 25 Z" fill="white" />
          
          <text x="0" y="90" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">Human Manager</text>
          <text x="0" y="110" textAnchor="middle" fill="#64748b" fontSize="12">Strategic Decisions</text>
        </g>
        
        {/* AI System Section (Right) */}
        <g transform="translate(720, 150)">
          <circle cx="0" cy="0" r="60" fill="url(#ai-gradient)" filter="url(#soft-glow)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="30" fill="#14b8a6" opacity="0.7" />
          
          {/* AI brain pattern */}
          <g stroke="white" strokeWidth="2" fill="none">
            <path d="M-15 -5 Q0 -15, 15 -5" />
            <path d="M-15 5 Q0 -5, 15 5" />
            <path d="M-15 15 Q0 5, 15 15" />
            <circle cx="-8" cy="-5" r="2" fill="white" />
            <circle cx="8" cy="5" r="2" fill="white" />
          </g>
          
          <text x="0" y="90" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="bold">AI Engine</text>
          <text x="0" y="110" textAnchor="middle" fill="#64748b" fontSize="12">24/7 Automation</text>
        </g>
        
        {/* Central Collaboration Hub */}
        <g transform="translate(400, 250)">
          <circle cx="0" cy="0" r="80" fill="url(#collaboration-gradient)" filter="url(#soft-glow)">
            <animate attributeName="r" values="80;85;80" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="40" fill="rgba(20, 184, 166, 0.8)" />
          
          {/* Collaboration symbol */}
          <g stroke="white" strokeWidth="3" fill="none">
            <circle cx="-15" cy="0" r="10" />
            <circle cx="15" cy="0" r="10" />
            <path d="M-5 0 L5 0" strokeWidth="4" />
          </g>
          
          <text x="0" y="110" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="bold">Seamless Integration</text>
        </g>
        
        {/* Connection flows */}
        <g stroke="url(#collaboration-gradient)" strokeWidth="3" fill="none" opacity="0.8">
          {/* Human to Center */}
          <path d="M140 150 Q270 120, 320 250" filter="url(#soft-glow)">
            <animate attributeName="stroke-dasharray" values="0,400;80,320;0,400" dur="4s" repeatCount="indefinite" />
          </path>
          
          {/* AI to Center */}
          <path d="M660 150 Q530 120, 480 250" filter="url(#soft-glow)">
            <animate attributeName="stroke-dasharray" values="0,400;80,320;0,400" dur="4s" begin="2s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Task bubbles showing workflow */}
        <g opacity="0.9">
          {/* Guest Messages */}
          <g transform="translate(200, 50)">
            <circle cx="0" cy="0" r="25" fill="#14b8a6" opacity="0.8">
              <animate attributeName="cy" values="0;-10;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Messages</text>
            <text x="0" y="50" textAnchor="middle" fill="#64748b" fontSize="11">AI Responds</text>
          </g>
          
          {/* Pricing */}
          <g transform="translate(600, 50)">
            <circle cx="0" cy="0" r="25" fill="#0f766e" opacity="0.8">
              <animate attributeName="cy" values="0;-10;0" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pricing</text>
            <text x="0" y="50" textAnchor="middle" fill="#64748b" fontSize="11">AI Optimizes</text>
          </g>
          
          {/* Complex Issues */}
          <g transform="translate(150, 400)">
            <circle cx="0" cy="0" r="25" fill="#1e293b" opacity="0.8">
              <animate attributeName="cy" values="0;-10;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Issues</text>
            <text x="0" y="50" textAnchor="middle" fill="#64748b" fontSize="11">Human Resolves</text>
          </g>
          
          {/* Performance */}
          <g transform="translate(650, 400)">
            <circle cx="0" cy="0" r="25" fill="#334155" opacity="0.8">
              <animate attributeName="cy" values="0;-10;0" dur="2s" begin="1.5s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Reports</text>
            <text x="0" y="50" textAnchor="middle" fill="#64748b" fontSize="11">Human Reviews</text>
          </g>
        </g>
        
        {/* Data flow particles */}
        <g fill="#14b8a6" opacity="0.6">
          {[...Array(6)].map((_, i) => (
            <circle key={i} cx={100 + i * 100} cy={300} r="3">
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                values={`0,0;${Math.sin(i) * 20},${Math.cos(i) * 15};0,0`}
                dur={`${3 + i * 0.5}s`} 
                repeatCount="indefinite" 
              />
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
}
