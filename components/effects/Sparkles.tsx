"use client";

import { useMemo } from "react";
import { SPARKLE_COUNT } from "@/lib/constants";
import { randomBetween } from "@/lib/utils";

interface SparkleData {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  saturation: number;
  lightness: number;
}

export function Sparkles() {
  const sparkles = useMemo<SparkleData[]>(() => {
    return Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: i,
      // Keep sparkles on the sides to not cover content
      left: i % 3 === 0
        ? `${randomBetween(0, 18)}%`
        : i % 3 === 1
        ? `${randomBetween(82, 100)}%`
        : `${randomBetween(20, 80)}%`,
      top: `${randomBetween(5, 95)}%`,
      size: randomBetween(3, 6),
      duration: randomBetween(2, 4.5),
      delay: randomBetween(0, 6),
      saturation: randomBetween(60, 90),
      lightness: randomBetween(52, 72),
    }));
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="pointer-events-none fixed rounded-full"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: `hsl(347, ${sparkle.saturation}%, ${sparkle.lightness}%)`,
            boxShadow: `0 0 ${sparkle.size * 2.5}px hsla(347, 75%, 62%, 0.4)`,
            animation: `sparkle ${sparkle.duration}s ${sparkle.delay}s ease-in-out infinite`,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
