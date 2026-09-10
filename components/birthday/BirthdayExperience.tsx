"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IntroScene } from "@/components/birthday/IntroScene";
import { CountdownScene } from "@/components/birthday/CountdownScene";
import { BirthdayHero } from "@/components/birthday/BirthdayHero";
import { InteractiveBirthdayCard } from "@/components/birthday/InteractiveBirthdayCard";
import { BirthdayMessage } from "@/components/birthday/BirthdayMessage";
import { PhotoGallery } from "@/components/birthday/PhotoGallery";
import { ClosingSection } from "@/components/birthday/ClosingSection";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { Balloons } from "@/components/effects/Balloons";
import { Sparkles } from "@/components/effects/Sparkles";
import { SideFireworks } from "@/components/effects/SideFireworks";
import { Confetti } from "@/components/effects/Confetti";

import { audioPlayer } from "@/lib/audio";

type Phase = "intro" | "countdown" | "fireworks-burst" | "birthday";

export function BirthdayExperience() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [showSideEffects, setShowSideEffects] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setPhase("countdown");
  }, []);

  const handleCountdownComplete = useCallback(() => {
    // Play custom /audio/birthday.mp3 immediately
    audioPlayer.play();
    setPhase("fireworks-burst");
    setShowConfetti(true);

    // Fast transition to main birthday scene in 600ms
    setTimeout(() => {
      setPhase("birthday");
      setTimeout(() => setShowSideEffects(true), 400);
    }, 600);
  }, []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            <IntroScene onComplete={handleIntroComplete} />
          </motion.div>
        )}

        {phase === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.5 }}
          >
            <CountdownScene onComplete={handleCountdownComplete} />
          </motion.div>
        )}

        {phase === "fireworks-burst" && (
          <motion.div
            key="fireworks-burst"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0"
            style={{ background: "hsl(340, 60%, 97%)" }}
          >
            {/* Pure fireworks — no emoji overlay */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <SideFireworks mode="burst" />
              <Confetti />
            </div>
          </motion.div>
        )}

        {phase === "birthday" && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full min-h-screen"
          >
            {/* Continuous side effects layer */}
            {showSideEffects && (
              <div
                className="pointer-events-none fixed inset-0 z-0"
                aria-hidden="true"
              >
                <FloatingHearts />
                <Balloons />
                <Sparkles />
                <SideFireworks mode="continuous" />
              </div>
            )}

            {/* Confetti on arrival */}
            {showConfetti && (
              <div
                className="pointer-events-none fixed inset-0 z-10"
                aria-hidden="true"
              >
                <Confetti />
              </div>
            )}

            {/* Content Layer — Centered layout container for 100% screen centering */}
            <div className="relative z-[5] w-full flex flex-col items-center justify-center text-center">
              <BirthdayHero />

              <div className="divider-romantic" />

              <InteractiveBirthdayCard />

              <div className="divider-romantic" />

              <BirthdayMessage />

              <div className="divider-romantic" />

              <PhotoGallery />

              <div className="divider-romantic" />

              <ClosingSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
