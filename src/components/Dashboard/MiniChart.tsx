
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: number[];
}

export default function MiniChart({ data: initialData }: MiniChartProps) {
  const [data, setData] = useState(initialData);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setData(prevData => {
          const newData = [...prevData];
          // Simulate realistic fluctuations (±5%)
          const lastValue = newData[newData.length - 1];
          const fluctuation = (Math.random() - 0.5) * 0.1; // ±5%
          const newValue = Math.max(50, Math.min(100, lastValue + (lastValue * fluctuation)));
          
          // Shift array left and add new value
          newData.shift();
          newData.push(Math.round(newValue));
          return newData;
        });
        setIsAnimating(false);
      }, 200);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const chartData = data.map((value, index) => ({
    day: index + 1,
    occupancy: value
  }));

  return (
    <div className="w-full h-64 relative">
      {isAnimating && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
            domain={[40, 100]}
          />
          <Line 
            type="monotone" 
            dataKey="occupancy" 
            stroke="#14b8a6" 
            strokeWidth={3}
            dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#14b8a6', strokeWidth: 2, fill: '#fff' }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="absolute bottom-2 left-2 text-xs text-slate-500">
        Live Data • Updates every 3s
      </div>
    </div>
  );
}
