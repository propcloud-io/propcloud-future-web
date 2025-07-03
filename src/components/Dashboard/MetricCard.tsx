
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  delay?: number;
  onClick?: () => void;
  clickable?: boolean;
}

export default function MetricCard({ 
  icon, 
  label, 
  value, 
  subtext, 
  delay = 0, 
  onClick, 
  clickable = false 
}: MetricCardProps) {
  const baseClasses = "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-up transition-all duration-300";
  const interactiveClasses = clickable 
    ? "hover:shadow-xl hover:scale-105 cursor-pointer transform" 
    : "hover:shadow-xl";

  return (
    <div 
      className={`${baseClasses} ${interactiveClasses}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
      onClick={clickable ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100">
          {icon}
        </div>
        {clickable && (
          <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Click for details
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{label}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        <p className="text-sm text-gray-500">{subtext}</p>
      </div>
    </div>
  );
}
