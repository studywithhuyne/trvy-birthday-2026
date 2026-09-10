"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

interface HeartData {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  icon: string;
  sway: number;
  rotate: number;
}

const HEART_ICONS = ["♡", "💕", "💖", "🌸", "✨", "💓", "💗"];

const HEART_COLORS = [
  "hsl(347, 85%, 65%)",
  "hsl(340, 85%, 72%)",
  "hsl(350, 80%, 78%)",
  "hsl(270, 55%, 75%)",
  "hsl(38, 85%, 72%)",
  "hsl(20, 80%, 75%)",
];

export function FloatingHearts() {
  const hearts = useMemo<HeartData[]>(() => {
    // 10 romantic hearts randomly floating across the full screen width
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${4 + Math.random() * 92}%`,
      size: Math.round(14 + Math.random() * 18),
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 8,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      icon: HEART_ICONS[Math.floor(Math.random() * HEART_ICONS.length)],
      sway: (Math.random() - 0.5) * 45,
      rotate: (Math.random() - 0.5) * 35,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          initial={{ y: "105vh", x: 0, opacity: 0, scale: 0.8 }}
          animate={{
            y: "-15vh",
            x: [0, heart.sway],
            opacity: [0, 0.75, 0.75, 0],
            scale: [0.8, 1.05, 0.85],
            rotate: [0, heart.rotate],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="absolute"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            color: heart.color,
          }}
        >
          {heart.icon}
        </motion.span>
      ))}
    </div>
  );
}


