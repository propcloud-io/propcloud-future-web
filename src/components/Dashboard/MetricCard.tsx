
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  delay?: number;
}

export default function MetricCard({ icon, label, value, subtext, delay = 0 }: MetricCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-fade-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{label}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        <p className="text-sm text-gray-500">{subtext}</p>
      </div>
    </div>
  );
}
