
import React from 'react';

interface MiniChartProps {
  data: number[];
  color?: string;
}

export default function MiniChart({ data, color = "#14b8a6" }: MiniChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : ((max - value) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-12 w-full">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="opacity-80"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        <polygon
          fill="url(#gradient)"
          points={`${points} 100,100 0,100`}
        />
      </svg>
    </div>
  );
}
