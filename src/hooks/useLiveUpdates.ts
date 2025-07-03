import { useState, useEffect } from 'react';

interface LiveMetrics {
  occupancyRate: number;
  monthlyRevenue: number;
  bookingCount: number;
  guestSatisfaction: number;
}

const baseMetrics: LiveMetrics = {
  occupancyRate: 91,
  monthlyRevenue: 14800,
  bookingCount: 8,
  guestSatisfaction: 4.8
};

export function useLiveUpdates() {
  const [metrics, setMetrics] = useState<LiveMetrics>(baseMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        occupancyRate: Math.max(85, Math.min(98, prev.occupancyRate + (Math.random() - 0.5) * 4)),
        monthlyRevenue: Math.max(12000, Math.min(18000, prev.monthlyRevenue + (Math.random() - 0.5) * 800)),
        bookingCount: Math.max(6, Math.min(12, Math.round(prev.bookingCount + (Math.random() - 0.5) * 2))),
        guestSatisfaction: Math.max(4.5, Math.min(5.0, prev.guestSatisfaction + (Math.random() - 0.5) * 0.2))
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return metrics;
}