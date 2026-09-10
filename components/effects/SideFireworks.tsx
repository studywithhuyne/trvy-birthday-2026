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
  particles: Particle[];
}

const COLORS = [
  "hsl(347, 85%, 65%)",
  "hsl(350, 80%, 78%)",
  "hsl(40, 95%, 62%)",
  "hsl(38, 85%, 76%)",
  "hsl(270, 55%, 72%)",
];

function toHsla(hsl: string, alpha: number): string {
  return hsl.replace("hsl(", "hsla(").replace(")", `, ${alpha})`);
}

interface SideFireworksProps {
  /** "burst" = subtle celebration; "continuous" = rare periodic side bursts */
  mode: "burst" | "continuous";
}

export function SideFireworks({ mode }: SideFireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const burstsRef = useRef<Burst[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const createBurst = useCallback((x: number, y: number) => {
    // Only 18 lightweight particles per burst for maximum performance
    const particles: Particle[] = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
      const speed = 1.2 + Math.random() * 2.8;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 40 + Math.floor(Math.random() * 25),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 1.5 + Math.random() * 1.5,
      });
    }

    burstsRef.current.push({ particles });
  }, []);

  const scheduleBursts = useCallback(
    (canvas: HTMLCanvasElement) => {
      const clear = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
      };
      clear();

      if (mode === "burst") {
        // Only 3 gentle, elegant bursts staggered across top area
        const locations = [
          { rx: 0.12, ry: 0.22, delay: 0 },
          { rx: 0.88, ry: 0.25, delay: 280 },
          { rx: 0.5, ry: 0.16, delay: 550 },
        ];
        locations.forEach((loc) => {
          const t = setTimeout(() => {
            createBurst(canvas.width * loc.rx, canvas.height * loc.ry);
          }, loc.delay);
          timersRef.current.push(t);
        });
        return;
      }

      // Continuous mode: periodic single side burst every 4 seconds
      const launchNext = () => {
        const sideLeft = Math.random() < 0.5;
        const rx = sideLeft ? 0.08 + Math.random() * 0.1 : 0.82 + Math.random() * 0.1;
        const ry = 0.15 + Math.random() * 0.25;
        createBurst(canvas.width * rx, canvas.height * ry);

        const delay = 3500 + Math.random() * 2000;
        const t = setTimeout(launchNext, delay);
        timersRef.current.push(t);
      };

      const t1 = setTimeout(launchNext, 1200);
      timersRef.current.push(t1);
    },
    [mode, createBurst]
  );

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

    scheduleBursts(canvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      burstsRef.current = burstsRef.current.filter((burst) => {
        let alive = false;
        for (const p of burst.particles) {
          if (p.life <= 0) continue;
          alive = true;

          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04;
          p.vx *= 0.97;
          p.life -= 1 / p.maxLife;

          const alpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, p.size * alpha), 0, Math.PI * 2);
          ctx.fillStyle = toHsla(p.color, alpha);
          ctx.fill();
        }
        return alive;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
      timersRef.current.forEach(clearTimeout);
    };
  }, [mode, scheduleBursts]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: mode === "burst" ? 20 : 1 }}
      aria-hidden="true"
    />
  );
}

