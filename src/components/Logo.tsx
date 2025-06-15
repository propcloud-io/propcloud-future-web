
import React from "react";

export default function Logo({ className = "", size = "text-2xl md:text-3xl", span = true }: { className?: string, size?: string, span?: boolean }) {
  return (
    <span
      className={`font-bold tracking-tight font-sans ${size} select-none flex items-baseline gap-1 lowercase ${className}`}
      style={{ lineHeight: 1 }}
    >
      <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">propcloud</span>
      {span && (
        <span className="text-blue-400 font-bold text-lg md:text-xl" style={{ letterSpacing: "-0.05em" }}>.io</span>
      )}
    </span>
  );
}
