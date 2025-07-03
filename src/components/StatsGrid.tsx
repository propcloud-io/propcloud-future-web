
import { stats } from "@/data/stats";
import { StatSkeleton } from "./ui/SkeletonLoader";
import { useState, useEffect } from "react";

export default function StatsGrid() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
        {Array.from({ length: 4 }).map((_, idx) => (
          <StatSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-up bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl" style={{animationDelay: ".45s", animationFillMode: "both"}}>
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <div className={`text-2xl lg:text-3xl font-bold text-white mb-1`}>
            {stat.number}
          </div>
          <div className="text-sm lg:text-base text-slate-200 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
