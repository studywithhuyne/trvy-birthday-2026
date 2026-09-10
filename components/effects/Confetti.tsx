"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";

interface ConfettiPiece {
  id: number;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  sway: number;
  rotate: number;
}

const CONFETTI_COLORS = [
  "hsl(347, 80%, 65%)",
  "hsl(350, 75%, 78%)",
  "hsl(40, 90%, 60%)",
  "hsl(38, 75%, 76%)",
  "hsl(270, 50%, 72%)",
  "hsl(20, 80%, 75%)",
];

export function Confetti() {
  const [visible, setVisible] = useState(true);

  const pieces = useMemo<ConfettiPiece[]>(() => {
    // Only 12 lightweight pieces scattered across screen width
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${4 + Math.random() * 92}%`,
      size: Math.round(6 + Math.random() * 6),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      duration: 3.5 + Math.random() * 2.5,
      delay: Math.random() * 2.5,
      sway: (Math.random() - 0.5) * 50,
      rotate: Math.random() * 360 - 180,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none" aria-hidden="true">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: "-4vh",
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "105vh",
            x: [0, p.sway],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, p.rotate],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute"
          style={{ left: p.left }}
        >
          <div
            style={{
              width: p.size,
              height: Math.round(p.size * 0.6),
              borderRadius: 1,
              backgroundColor: p.color,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

