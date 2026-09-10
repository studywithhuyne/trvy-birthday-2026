"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  RECIPIENT_NAME,
  SENDER_NAME,
  PORTRAIT_PHOTO,
  CARD_ENTRANCE_DELAY,
} from "@/lib/constants";

export function BirthdayCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <section
      className="flex justify-center px-4 py-16 md:py-24"
      aria-label="Birthday card"
    >
      <motion.div
        ref={cardRef}
        className="card-romantic glow-soft w-full p-8 sm:p-10 md:p-14"
        style={{ maxWidth: "var(--card-max-width)" }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 40, scale: 0.95 }
        }
        transition={{
          duration: 1,
          delay: CARD_ENTRANCE_DELAY / 1000,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Card Header */}
        <motion.h2
          className="font-display text-romantic text-center text-3xl font-semibold tracking-wide md:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Happy Birthday ♡
        </motion.h2>

        {/* Photo */}
        <motion.div
          className="mx-auto mt-8 overflow-hidden rounded-xl md:mt-10"
          style={{
            maxWidth: "320px",
            boxShadow: "0 8px 30px hsla(0, 0%, 0%, 0.4)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Image
            src={PORTRAIT_PHOTO.src}
            alt={PORTRAIT_PHOTO.alt}
            width={320}
            height={400}
            className="h-auto w-full object-cover"
            priority={false}
          />
        </motion.div>

        {/* Card Message */}
        <motion.p
          className="font-sans mx-auto mt-8 max-w-sm text-center text-base font-light leading-relaxed md:mt-10 md:text-lg"
          style={{ color: "hsl(40, 15%, 70%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Every moment with you is a gift I never want to stop unwrapping.
          <br />
          Today is all about you.
        </motion.p>

        {/* Decorative divider */}
        <div className="divider-romantic" />

        {/* Signature */}
        <motion.p
          className="font-display text-center text-lg italic md:text-xl"
          style={{ color: "hsl(347, 80%, 65%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          With love,
          <br />
          <span className="mt-1 inline-block text-xl md:text-2xl">
            {SENDER_NAME}
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}
