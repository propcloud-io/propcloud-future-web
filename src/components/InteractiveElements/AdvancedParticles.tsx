import React, { useEffect, useRef } from 'react';

interface AdvancedParticlesProps {
  density?: 'sparse' | 'medium' | 'dense';
  color?: 'blue' | 'teal' | 'gradient' | 'purple';
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = 'rgba(255, 255, 255, 0.5)';
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvasWidth) {
      this.speedX = -this.speedX;
    }

    if (this.y < 0 || this.y > canvasHeight) {
      this.speedY = -this.speedY;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

export default function AdvancedParticles({ 
  density = 'medium',
  color = 'gradient',
  className = ''
}: AdvancedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  let particleCount = 150;
  if (density === 'sparse') particleCount = 75;
  if (density === 'dense') particleCount = 300;

  const createParticles = (count: number, canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
    return particles;
  };

  const getParticleColor = (particle: Particle, colorScheme: string) => {
    // Only white, teal, and dark blue colors
    const colors = {
      blue: ['rgba(15, 23, 42, 0.3)', 'rgba(30, 41, 59, 0.2)', 'rgba(51, 65, 85, 0.15)'], // Dark blue variants
      teal: ['rgba(20, 184, 166, 0.3)', 'rgba(13, 148, 136, 0.2)', 'rgba(15, 118, 110, 0.15)'], // Teal variants
      gradient: ['rgba(255, 255, 255, 0.2)', 'rgba(20, 184, 166, 0.15)', 'rgba(15, 23, 42, 0.1)'], // White to teal to dark blue
      purple: ['rgba(20, 184, 166, 0.3)', 'rgba(255, 255, 255, 0.2)', 'rgba(15, 23, 42, 0.15)'] // Using teal instead of purple
    };
    
    const colorArray = colors[colorScheme as keyof typeof colors] || colors.gradient;
    return colorArray[Math.floor(particle.x / 100) % colorArray.length];
  };

  const drawParticle = (particle: Particle, ctx: CanvasRenderingContext2D, colorScheme: string) => {
    particle.color = getParticleColor(particle, colorScheme);
    particle.draw(ctx);
  };

  const animate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      particle.update(canvas.width, canvas.height);
      drawParticle(particle, ctx, color);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = createParticles(particleCount, canvas);
      animate();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    particlesRef.current = createParticles(particleCount, canvas);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      animationRef.current && cancelAnimationFrame(animationRef.current);
    };
  }, [color, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
