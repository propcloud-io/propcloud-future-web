
import React from "react";

/** Abstract SVG visual representing a flowing, AI-driven, connected system */
export default function AIFlowVisual({ className = "" }: { className?: string }) {
  return (
    <div className={"relative flex justify-center items-center w-full py-6 " + className}>
      <svg width="380" height="92" viewBox="0 0 380 92" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-20 md:h-24 max-w-xl pointer-events-none select-none">
        <defs>
          <linearGradient id="pc-ai-system-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        {/* flowing lines */}
        <path d="M10 46 Q110 15, 190 46 T370 46" stroke="url(#pc-ai-system-gradient)" strokeWidth="3" fill="none" opacity="0.8"/>
        <path d="M10 62 Q150 100, 370 62" stroke="url(#pc-ai-system-gradient)" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M10 30 Q80 -10, 370 30" stroke="url(#pc-ai-system-gradient)" strokeWidth="2" fill="none" opacity="0.6"/>
        {/* connected "nodes" */}
        <circle cx="45" cy="36" r="6" fill="#475569" opacity="0.8"/>
        <circle cx="190" cy="46" r="8" fill="#14b8a6" opacity="0.9" />
        <circle cx="315" cy="55" r="5" fill="#334155" opacity="0.8"/>
        <circle cx="130" cy="77" r="4" fill="#475569" opacity="0.6"/>
        <circle cx="255" cy="22" r="7" fill="#14b8a6" opacity="0.8"/>
      </svg>
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
