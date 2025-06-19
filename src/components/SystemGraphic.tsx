
import React from "react";

/** Abstract system visualization representing intelligent automation and connected operations */
export default function SystemGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-2xl pointer-events-none select-none">
        <defs>
          <linearGradient id="system-gradient-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="system-gradient-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <radialGradient id="node-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        
        {/* Background grid pattern */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.3"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Central hub */}
        <circle cx="300" cy="200" r="40" fill="url(#node-gradient)" opacity="0.9">
          <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Connecting lines with animation */}
        <g stroke="url(#system-gradient-1)" strokeWidth="2" fill="none" opacity="0.7">
          <path d="M120 120 Q200 100, 260 160">
            <animate attributeName="stroke-dasharray" values="0,1000;20,980;0,1000" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M480 120 Q400 100, 340 160">
            <animate attributeName="stroke-dasharray" values="0,1000;20,980;0,1000" dur="4s" begin="1s" repeatCount="indefinite" />
          </path>
          <path d="M120 280 Q200 300, 260 240">
            <animate attributeName="stroke-dasharray" values="0,1000;20,980;0,1000" dur="4s" begin="2s" repeatCount="indefinite" />
          </path>
          <path d="M480 280 Q400 300, 340 240">
            <animate attributeName="stroke-dasharray" values="0,1000;20,980;0,1000" dur="4s" begin="3s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Outer nodes */}
        <circle cx="120" cy="120" r="16" fill="#475569" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="480" cy="120" r="16" fill="#14b8a6" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="280" r="16" fill="#14b8a6" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="480" cy="280" r="16" fill="#475569" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Floating data points */}
        <g fill="#0d9488" opacity="0.6">
          <circle cx="200" cy="80" r="4">
            <animateTransform attributeName="transform" type="translate" values="0,0;10,-5;0,0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="80" r="4">
            <animateTransform attributeName="transform" type="translate" values="0,0;-10,5;0,0" dur="3s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="320" r="4">
            <animateTransform attributeName="transform" type="translate" values="0,0;-5,10;0,0" dur="3s" begin="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="320" r="4">
            <animateTransform attributeName="transform" type="translate" values="0,0;5,-10;0,0" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
