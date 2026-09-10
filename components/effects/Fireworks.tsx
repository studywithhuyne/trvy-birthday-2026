"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Burst {
  x: number;
  y: number;
  particles: Particle[];
}

/**
 * Convert an `hsl(...)` color string to `hsla(...)` with the given alpha.
 */
function toHsla(hsl: string, alpha: number): string {
  return hsl.replace("hsl(", "hsla(").replace(")", `, ${alpha})`);
}

const COLORS = [
  "hsl(347, 77%, 60%)", // rose
  "hsl(40, 65%, 65%)",  // gold
  "hsl(38, 50%, 85%)",  // champagne
  "hsl(347, 80%, 75%)", // light rose
  "hsl(270, 30%, 70%)", // lavender
  "hsl(20, 70%, 80%)",  // peach
];

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const burstsRef = useRef<Burst[]>([]);

  const createBurst = useCallback((x: number, y: number) => {
    const particleCount = 30 + Math.floor(Math.random() * 20);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.3;
      const speed = 1.5 + Math.random() * 3;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 60 + Math.floor(Math.random() * 40),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 1.5 + Math.random() * 2,
      });
    }

    burstsRef.current.push({ x, y, particles });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Schedule 3 bursts at different positions
    const burstTimers = [
      setTimeout(() => {
        createBurst(
          canvas.width * (0.3 + Math.random() * 0.1),
          canvas.height * (0.2 + Math.random() * 0.15)
        );
      }, 200),
      setTimeout(() => {
        createBurst(
          canvas.width * (0.6 + Math.random() * 0.1),
          canvas.height * (0.15 + Math.random() * 0.15)
        );
      }, 800),
      setTimeout(() => {
        createBurst(
          canvas.width * (0.45 + Math.random() * 0.1),
          canvas.height * (0.25 + Math.random() * 0.1)
        );
      }, 1400),
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let hasActiveParticles = false;

      for (const burst of burstsRef.current) {
        for (const p of burst.particles) {
          if (p.life <= 0) continue;
          hasActiveParticles = true;

          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.03; // gravity
          p.vx *= 0.99; // friction
          p.life -= 1 / p.maxLife;

          const alpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
          ctx.fillStyle = toHsla(p.color, alpha);
          ctx.fill();

          // Trail
          if (alpha > 0.3) {
            ctx.beginPath();
            ctx.arc(p.x - p.vx, p.y - p.vy, p.size * alpha * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = toHsla(p.color, alpha * 0.3);
            ctx.fill();
          }
        }
      }

      if (hasActiveParticles) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
      burstTimers.forEach(clearTimeout);
    };
  }, [createBurst]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    />
  );
}
