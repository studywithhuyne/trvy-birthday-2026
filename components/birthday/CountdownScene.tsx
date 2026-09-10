"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COUNTDOWN_STEP_DURATION } from "@/lib/constants";

interface CountdownSceneProps {
  onComplete: () => void;
}

export function CountdownScene({ onComplete }: CountdownSceneProps) {
  const [count, setCount] = useState(3);

  const advanceCount = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (count <= 0) {
      const timer = setTimeout(onComplete, 300);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(advanceCount, COUNTDOWN_STEP_DURATION);
    return () => clearTimeout(timer);
  }, [count, advanceCount, onComplete]);

  return (
    <section
      className="flex min-h-dvh items-center justify-center"
      style={{ background: "linear-gradient(160deg, hsl(350,70%,96%), hsl(30,70%,97%))" }}
      aria-label="Countdown"
      aria-live="polite"
    >
      {/* Ambient glow intensifies */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <motion.div
          className="h-[400px] w-[400px] rounded-full blur-[120px] md:h-[600px] md:w-[600px]"
          style={{ background: "hsl(347, 80%, 72%)" }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 2 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {count > 0 && (
          <motion.span
            key={count}
            className="font-display relative text-8xl font-bold md:text-[10rem]"
            style={{ color: "hsl(347, 65%, 48%)" }}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.4, filter: "blur(18px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </section>
  );
}
