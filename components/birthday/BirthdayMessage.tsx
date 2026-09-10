"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PERSONAL_MESSAGE, SENDER_NAME } from "@/lib/constants";

export function BirthdayMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const paragraphs = PERSONAL_MESSAGE.split("\n\n").filter(
    (p) => p.trim().length > 0
  );

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center px-6 py-16 md:py-24 text-center mx-auto"
      style={{ maxWidth: "var(--content-max-width)" }}
      aria-label="Personal message"
    >
      {/* Section heading */}
      <motion.h2
        className="font-display text-2xl font-medium italic tracking-wide md:text-3xl"
        style={{ color: "hsl(347, 65%, 48%)" }}
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8 }}
      >
        From my heart, just to yours
      </motion.h2>

      <div className="divider-romantic" />

      {/* Message paragraphs — justified alignment for clean margins */}
      <div className="w-full max-w-lg space-y-5 text-center">
        {paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            className="font-sans text-sm md:text-base font-light leading-[1.9] text-justify"
            style={{ color: "hsl(340, 20%, 40%)", textJustify: "inter-word" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.7,
              delay: 0.3 + i * 0.2,
              ease: "easeOut",
            }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Signature */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 + paragraphs.length * 0.2 }}
      >
        <p
          className="font-display text-lg italic md:text-xl"
          style={{ color: "hsl(347, 45%, 55%)" }}
        >
          — {SENDER_NAME}
        </p>
      </motion.div>
    </section>
  );
}
