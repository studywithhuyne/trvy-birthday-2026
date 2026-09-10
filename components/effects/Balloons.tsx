"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

interface BalloonData {
  id: number;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  sway: number;
  rotate: number;
}

const BALLOON_COLORS = [
  "hsl(347, 75%, 68%)",
  "hsl(350, 70%, 78%)",
  "hsl(270, 45%, 75%)",
  "hsl(38, 70%, 75%)",
];

export function Balloons() {
  const balloons = useMemo<BalloonData[]>(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const leftVal = 5 + Math.random() * 85;
      return {
        id: i,
        left: `${leftVal}%`,
        size: Math.round(28 + Math.random() * 18),
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        duration: 11 + Math.random() * 7,
        delay: Math.random() * 5,
        sway: (Math.random() - 0.5) * 50,
        rotate: (Math.random() - 0.5) * 25,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none" aria-hidden="true">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: "-20vh",
            x: [0, b.sway],
            opacity: [0, 0.75, 0.75, 0],
            rotate: [0, b.rotate],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="absolute"
          style={{ left: b.left }}
        >
          <svg
            width={b.size}
            height={b.size * 1.3}
            viewBox="0 0 40 52"
            fill="none"
          >
            <ellipse cx="20" cy="18" rx="16" ry="18" fill={b.color} opacity="0.85" />
            <ellipse cx="14" cy="12" rx="5" ry="7" fill="white" opacity="0.25" />
            <polygon points="18,36 22,36 20,39" fill={b.color} opacity="0.9" />
            <path d="M20,39 Q18,45 20,52" stroke={b.color} strokeWidth="0.8" fill="none" opacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

