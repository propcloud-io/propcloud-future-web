
import React from "react";

export default function Logo({ className = "", size = "text-2xl md:text-3xl", span = true }: { className?: string, size?: string, span?: boolean }) {
  return (
    <span
      className={`font-bold tracking-tight font-sans ${size} select-none flex items-baseline gap-1 ${className}`}
      style={{ lineHeight: 1 }}
    >
      <span className="bg-gradient-to-r from-propcloud-600 to-propcloud-400 bg-clip-text text-transparent">PropCloud</span>
      <span className="text-propcloud-400 font-bold text-lg md:text-xl" style={{ letterSpacing: "-0.05em" }}>.io</span>
    </span>
  );
}
