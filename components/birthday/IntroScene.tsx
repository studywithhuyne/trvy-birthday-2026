"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import {
  INTRO_GREETING,
  INTRO_MESSAGE,
  INTRO_DELAY,
  INTRO_LINE_STAGGER,
} from "@/lib/constants";

interface IntroSceneProps {
  onComplete: () => void;
}

export function IntroScene({ onComplete }: IntroSceneProps) {
  const messageLines = INTRO_MESSAGE.split("\n");

  useEffect(() => {
    // 5.8 second auto transition if user doesn't tap
    const timer = setTimeout(onComplete, 5800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section
      onClick={onComplete}
      className="flex min-h-dvh flex-col items-center justify-center px-6 cursor-pointer select-none relative"
      style={{ background: "linear-gradient(160deg, hsl(350,70%,96%), hsl(30,70%,97%))" }}
      aria-label="Introduction - Tap anywhere to skip"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div
          className="h-[300px] w-[300px] rounded-full opacity-30 blur-[100px] md:h-[480px] md:w-[480px]"
          style={{ background: "hsl(347, 80%, 72%)" }}
        />
      </div>

      <div className="relative text-center">
        {/* "Hey..." */}
        <motion.p
          className="font-display text-2xl italic md:text-3xl"
          style={{ color: "hsl(347, 40%, 60%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: INTRO_DELAY / 1000,
            ease: "easeOut",
          }}
        >
          {INTRO_GREETING}
        </motion.p>

        <div className="mt-8 space-y-2">
          {messageLines.map((line, i) => (
            <motion.p
              key={i}
              className="font-display text-3xl font-semibold tracking-wide md:text-5xl"
              style={{ color: "hsl(340, 35%, 28%)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay:
                  (INTRO_DELAY + INTRO_LINE_STAGGER + i * INTRO_LINE_STAGGER) /
                  1000,
                ease: "easeOut",
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Tap hint */}
      <motion.p
        className="absolute bottom-8 font-sans text-xs italic tracking-wider"
        style={{ color: "hsl(340, 25%, 60%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        (Chạm nhẹ màn hình để tiếp tục ✨)
      </motion.p>
    </section>
  );
}
