"use client";

import { motion } from "motion/react";
import { RECIPIENT_NAME, HERO_SUBTITLE } from "@/lib/constants";

export function BirthdayHero() {
  const subtitleLines = HERO_SUBTITLE.split("\n");

  return (
    <section
      className="w-full flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center"
      aria-label="Birthday greeting"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div
          className="h-[400px] w-[400px] rounded-full opacity-25 blur-[130px] md:h-[600px] md:w-[600px]"
          style={{ background: "hsl(347, 80%, 70%)" }}
        />
      </div>

      <div className="relative">
        {/* Main greeting */}
        <motion.h1
          className="font-display text-romantic text-4xl font-bold leading-tight tracking-wide sm:text-5xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Happy Birthday, {RECIPIENT_NAME} ♡
        </motion.h1>

        {/* Subtitle */}
        <div className="mt-8 space-y-1 md:mt-10">
          {subtitleLines.map((line, i) => (
            <motion.p
              key={i}
              className="font-sans text-lg font-light leading-relaxed md:text-xl lg:text-2xl"
              style={{ color: "hsl(340, 25%, 48%)" }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.0 + i * 0.2,
                ease: "easeOut",
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative hearts */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.0, ease: "backOut" }}
          aria-hidden="true"
        >
          {["♡", "♡", "♡"].map((h, i) => (
            <span
              key={i}
              className="text-xl"
              style={{ color: `hsl(347, ${65 + i * 8}%, ${58 + i * 4}%)`, opacity: 0.6 + i * 0.15 }}
            >
              {h}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
