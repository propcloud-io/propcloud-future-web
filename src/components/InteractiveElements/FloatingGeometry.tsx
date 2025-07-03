
import React, { useEffect, useRef } from 'react';

interface FloatingGeometryProps {
  className?: string;
  variant?: 'triangles' | 'hexagons' | 'diamonds' | 'mixed';
}

export default function FloatingGeometry({ 
  className = '',
  variant = 'mixed'
}: FloatingGeometryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapes = [
      { type: 'triangle', size: 40, x: 10, y: 20, rotation: 0, speed: 0.01 },
      { type: 'hexagon', size: 30, x: 80, y: 60, rotation: 0, speed: 0.015 },
      { type: 'diamond', size: 25, x: 60, y: 10, rotation: 0, speed: 0.008 },
      { type: 'triangle', size: 20, x: 30, y: 70, rotation: 0, speed: 0.012 },
      { type: 'hexagon', size: 35, x: 90, y: 30, rotation: 0, speed: 0.009 }
    ];

    const animate = () => {
      shapes.forEach((shape, index) => {
        shape.rotation += shape.speed;
        const element = container.children[index] as HTMLElement;
        if (element) {
          element.style.transform = `rotate(${shape.rotation}rad)`;
        }
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const createShape = (type: string, size: number, x: number, y: number) => {
    const baseClasses = "absolute opacity-20 animate-pulse";
    const style = { 
      left: `${x}%`, 
      top: `${y}%`, 
      width: `${size}px`, 
      height: `${size}px`,
      filter: 'blur(0.5px)'
    };

    switch (type) {
      case 'triangle':
        return (
          <div
            key={`triangle-${x}-${y}`}
            className={`${baseClasses} border-l-[${size/2}px] border-r-[${size/2}px] border-b-[${size}px] border-l-transparent border-r-transparent border-b-teal-400/40`}
            style={style}
          />
        );
      case 'hexagon':
        return (
          <div
            key={`hexagon-${x}-${y}`}
            className={`${baseClasses} bg-gradient-to-br from-blue-400/30 to-teal-400/30`}
            style={{
              ...style,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
            }}
          />
        );
      case 'diamond':
        return (
          <div
            key={`diamond-${x}-${y}`}
            className={`${baseClasses} bg-gradient-to-br from-purple-400/30 to-pink-400/30 rotate-45`}
            style={style}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {createShape('triangle', 40, 10, 20)}
      {createShape('hexagon', 30, 80, 60)}
      {createShape('diamond', 25, 60, 10)}
      {createShape('triangle', 20, 30, 70)}
      {createShape('hexagon', 35, 90, 30)}
    </div>
  );
}
