"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CLOSING_MESSAGE, SENDER_NAME } from "@/lib/constants";

export function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const lines = CLOSING_MESSAGE.split("\n");

  return (
    <section
      ref={sectionRef}
      className="w-full flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center mx-auto"
      aria-label="Closing message"
    >
      <div>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="font-sans text-lg font-light leading-relaxed md:text-xl lg:text-2xl"
            style={{ color: "hsl(340, 25%, 45%)" }}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: i * 0.25, ease: "easeOut" }}
          >
            {line}
          </motion.p>
        ))}

        {/* Final birthday greeting */}
        <motion.p
          className="font-display text-romantic mt-10 text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.8,
            delay: lines.length * 0.25 + 0.3,
            ease: "backOut",
          }}
        >
          Happy Birthday ♡
        </motion.p>

        {/* Signature */}
        <motion.p
          className="font-display mt-8 text-xl italic md:text-2xl"
          style={{ color: "hsl(347, 45%, 55%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: lines.length * 0.25 + 0.8 }}
        >
          — {SENDER_NAME}
        </motion.p>
      </div>

      <div className="mt-20" aria-hidden="true" />
    </section>
  );
}
