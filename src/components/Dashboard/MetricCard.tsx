
import React, { useState, useEffect } from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  delay?: number;
  onClick?: () => void;
  clickable?: boolean;
  isLive?: boolean;
}

export default function MetricCard({ 
  icon, 
  label, 
  value: initialValue, 
  subtext, 
  delay = 0, 
  onClick, 
  clickable = false,
  isLive = false
}: MetricCardProps) {
  const [value, setValue] = useState(initialValue);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setValue(prevValue => {
          // Simulate live updates for revenue and occupancy
          if (prevValue.includes('$')) {
            const currentAmount = parseInt(prevValue.replace(/[$,]/g, ''));
            const fluctuation = Math.floor((Math.random() - 0.5) * 200); // ±$100
            const newAmount = Math.max(10000, currentAmount + fluctuation);
            return `$${newAmount.toLocaleString()}`;
          } else if (prevValue.includes('%')) {
            const currentPercent = parseInt(prevValue);
            const fluctuation = Math.floor((Math.random() - 0.5) * 4); // ±2%
            const newPercent = Math.max(80, Math.min(98, currentPercent + fluctuation));
            return `${newPercent}%`;
          }
          return prevValue;
        });
        setIsUpdating(false);
      }, 300);
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const baseClasses = "bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/80 animate-fade-up transition-all duration-300";
  const interactiveClasses = clickable 
    ? "hover:shadow-2xl hover:scale-105 cursor-pointer transform" 
    : "hover:shadow-2xl";

  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${isUpdating ? 'ring-2 ring-teal-300 ring-opacity-50' : ''}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
      onClick={clickable ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg">
          {icon}
        </div>
        {isLive && (
          <div className="flex items-center gap-1 text-xs text-teal-600">
            <div className={`w-2 h-2 rounded-full bg-teal-500 ${isUpdating ? 'animate-pulse' : ''}`}></div>
            <span>Live</span>
          </div>
        )}
        {clickable && !isLive && (
          <div className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Click for details
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-600 mb-1">{label}</h3>
        <p className={`text-2xl font-bold text-slate-900 mb-2 transition-all duration-300 ${isUpdating ? 'text-teal-600' : ''}`}>
          {value}
        </p>
        <p className="text-sm text-slate-500">{subtext}</p>
      </div>
    </div>
  );
}
