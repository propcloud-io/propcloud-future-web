
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

  return (
    <div
      ref={orbRef}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}${Math.floor(intensity * 255).toString(16)} 0%, transparent 70%)`,
        boxShadow: `0 0 ${size * 0.5}px ${color}${Math.floor(intensity * 127).toString(16)}`,
        filter: 'blur(1px)',
      }}
    />
  );
}
