
import React, { useEffect, useRef } from 'react';

interface GlowingOrbProps {
  size?: number;
  color?: string;
  intensity?: number;
  animate?: boolean;
  className?: string;
}

export default function GlowingOrb({ 
  size = 100, 
  color = '#14b8a6', 
  intensity = 0.8,
  animate = true,
  className = '' 
}: GlowingOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !orbRef.current) return;

    const orb = orbRef.current;
    let animationId: number;

    const animateOrb = () => {
      const time = Date.now() * 0.002;
      const x = Math.sin(time) * 10;
      const y = Math.cos(time * 0.7) * 8;
      const scale = 1 + Math.sin(time * 1.5) * 0.1;
      
      orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      animationId = requestAnimationFrame(animateOrb);
    };

    animateOrb();
    return () => cancelAnimationFrame(animationId);
  }, [animate]);

  // Convert hex to rgba for better control
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      ref={orbRef}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${hexToRgba(color, intensity)} 0%, ${hexToRgba(color, intensity * 0.3)} 40%, transparent 70%)`,
        boxShadow: `0 0 ${size * 0.8}px ${hexToRgba(color, intensity * 0.6)}, 0 0 ${size * 1.2}px ${hexToRgba(color, intensity * 0.3)}`,
        filter: 'blur(0.5px)',
      }}
    />
  );
}
