"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PERSONAL_MESSAGE, SENDER_NAME } from "@/lib/constants";

export function BirthdayMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const paragraphs = PERSONAL_MESSAGE.split("\n\n").filter(
    (p) => p.trim().length > 0
  );

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center px-5 py-14 md:py-24 text-center mx-auto"
      style={{ maxWidth: "680px" }}
      aria-label="Personal message"
    >
      {/* Section heading */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xl text-rose-400/80 mb-2 select-none">💌</span>
        <h2
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold italic tracking-wide text-center"
          style={{ color: "hsl(347, 65%, 42%)" }}
        >
          From my heart, just to yours
        </h2>
      </motion.div>

      <div className="divider-romantic my-6" />

      {/* Message paragraphs — Justified alignment with safe side margins */}
      <div className="w-[88vw] max-w-lg space-y-5 mx-auto px-3 sm:px-6">
        {paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            className="font-sans text-sm sm:text-base md:text-lg font-normal leading-[1.85] text-justify tracking-normal"
            style={{ color: "hsl(340, 45%, 18%)", textJustify: "inter-word" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              delay: 0.2 + i * 0.18,
              ease: "easeOut",
            }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Signature — Only shown if SENDER_NAME exists */}
      {Boolean(SENDER_NAME && String(SENDER_NAME).trim()) && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + paragraphs.length * 0.18 }}
        >
          <p
            className="font-display text-lg italic md:text-xl font-semibold"
            style={{ color: "hsl(347, 60%, 48%)" }}
          >
            — {SENDER_NAME}
          </p>
        </motion.div>
      )}

      {/* Bottom Heart Flourish */}
      <motion.div
        className="mt-8 text-rose-400/60 text-lg select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.4 + paragraphs.length * 0.18 }}
      >
        ── ♡ ──
      </motion.div>
    </section>
  );
}
