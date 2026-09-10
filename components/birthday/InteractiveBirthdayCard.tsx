"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { RECIPIENT_NAME, SENDER_NAME, PORTRAIT_PHOTO } from "@/lib/constants";
import { SideFireworks } from "@/components/effects/SideFireworks";
import { Confetti } from "@/components/effects/Confetti";

/* ════════════════════════════════════════
   Card Balloons Burst Component (Lightweight & Subtle)
   ════════════════════════════════════════ */
function CardBalloonsBurst() {
  const BALLOON_COLORS = [
    "hsl(347, 80%, 65%)",
    "hsl(350, 75%, 78%)",
    "hsl(270, 50%, 72%)",
    "hsl(20, 75%, 76%)",
    "hsl(38, 80%, 72%)",
    "hsl(347, 85%, 70%)",
  ];

  const balloons = useMemo(() => {
    // Only 7 lightweight balloons total, randomly placed around the screen
    return Array.from({ length: 7 }, (_, i) => ({
      id: i,
      left: `${6 + Math.random() * 88}%`,
      size: Math.round(30 + Math.random() * 20),
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      delay: Math.random() * 2.2,
      duration: 4.5 + Math.random() * 2.5,
      sway: (Math.random() - 0.5) * 60,
      rotate: (Math.random() - 0.5) * 20,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none" aria-hidden="true">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "105vh", x: 0, opacity: 0, scale: 0.8 }}
          animate={{
            y: "-20vh",
            x: [0, b.sway],
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.8, 1.0, 0.9],
            rotate: [0, b.rotate],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: "easeOut",
          }}
          className="absolute"
          style={{ left: b.left }}
        >
          <svg width={b.size} height={b.size * 1.3} viewBox="0 0 40 52" fill="none">
            <ellipse cx="20" cy="18" rx="16" ry="18" fill={b.color} opacity="0.9" />
            <ellipse cx="14" cy="12" rx="5" ry="7" fill="white" opacity="0.3" />
            <polygon points="18,36 22,36 20,39" fill={b.color} />
            <path d="M20,39 Q18,45 20,52" stroke={b.color} strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}



/* ════════════════════════════════════════
   Flame component
   ════════════════════════════════════════ */
function Flame({ size = 1, delay = 0 }: { size?: number; delay?: number }) {
  const w = Math.round(10 * size);
  const h = Math.round(16 * size);
  return (
    <div
      className="candle-flame"
      style={{ width: w, height: h, animationDelay: `${delay}s`, position: "relative", flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* outer flame */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: w, height: h,
        borderRadius: "50% 50% 20% 20% / 55% 55% 45% 45%",
        background: `linear-gradient(to top, hsl(20,100%,50%), hsl(38,100%,62%), hsl(50,100%,82%))`,
      }} />
      {/* inner core */}
      <div style={{
        position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
        width: Math.round(w * 0.45), height: Math.round(h * 0.5),
        borderRadius: "50% 50% 20% 20% / 55% 55% 45% 45%",
        background: "hsl(55,100%,92%)",
      }} />
      {/* glow dot */}
      <div
        className="candle-glow"
        style={{
          position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
          width: Math.round(w * 0.6), height: Math.round(w * 0.6),
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════
   Number-candle — renders "1" or "8"
   as a decorative candle body with a flame
   ════════════════════════════════════════ */
function NumberCandle({ digit, color }: { digit: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0" style={{ flexShrink: 0 }}>
      <Flame size={1.3} delay={digit === "8" ? 0.15 : 0} />
      {/* number body */}
      <div
        style={{
          width: 34,
          height: 48,
          borderRadius: "6px 6px 3px 3px",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          fontSize: 26,
          color: "white",
          textShadow: "0 1px 3px rgba(0,0,0,0.25)",
          boxShadow: `0 3px 10px ${color}88, inset 0 1px 0 rgba(255,255,255,0.35)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* shine */}
        <div style={{
          position: "absolute", top: 4, left: 5, width: 9, height: 16,
          background: "rgba(255,255,255,0.22)", borderRadius: "50%",
          transform: "rotate(-20deg)",
        }} />
        {digit}
      </div>
      {/* wick base */}
      <div style={{ width: 3, height: 4, background: "#c8a87a", borderRadius: "0 0 2px 2px" }} />
    </div>
  );
}

/* ════════════════════════════════════════
   Birthday Cake — beautiful 3-tier design
   with number candles "1" & "8"
   ════════════════════════════════════════ */
function BirthdayCake() {
  return (
    <div
      className="flex flex-col items-center select-none"
      aria-label="Birthday cake for the 18th birthday"
      style={{ gap: 0 }}
    >
      {/* ── Number candles "1" and "8" ── */}
      <div className="flex items-end justify-center gap-3 mb-1">
        <NumberCandle digit="1" color="hsl(347,75%,60%)" />
        <NumberCandle digit="8" color="hsl(270,55%,62%)" />
      </div>

      {/* ── Top tier ── */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 0, alignSelf: "stretch", marginBottom: -1 }}>
          {[20, 16, 22, 18, 20, 16].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: h,
              background: "white",
              borderRadius: "0 0 50% 50%",
              opacity: 0.9,
              marginTop: -6,
            }} />
          ))}
        </div>
        <div style={{
          width: "min(105px, 27vw)",
          height: 40,
          background: "linear-gradient(160deg, hsl(350,85%,82%), hsl(340,75%,72%), hsl(347,70%,78%))",
          borderRadius: "4px 4px 0 0",
          boxShadow: "inset 0 -3px 0 hsla(347,60%,55%,0.25), 0 2px 8px hsla(347,60%,50%,0.15)",
          position: "relative",
          overflow: "hidden",
        }}>
          {[20, 40, 60, 80].map((x) => (
            <div key={x} style={{
              position: "absolute", top: "50%", left: `${x}%`,
              transform: "translate(-50%,-50%)",
              width: 5, height: 5, borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
            }} />
          ))}
        </div>
      </div>

      {/* ── Middle tier ── */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {[18, 24, 16, 20, 24, 16, 22, 18].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: h,
              background: "hsl(350,90%,95%)",
              borderRadius: "0 0 50% 50%",
              opacity: 0.85,
              marginTop: -8,
            }} />
          ))}
        </div>
        <div style={{
          width: "min(145px, 38vw)",
          height: 44,
          background: "linear-gradient(160deg, hsl(347,80%,76%), hsl(350,72%,68%), hsl(340,68%,72%))",
          borderRadius: "2px 2px 0 0",
          boxShadow: "inset 0 -3px 0 hsla(347,55%,50%,0.2), 0 2px 8px hsla(347,50%,50%,0.12)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: 8, right: 8,
            height: 2, background: "rgba(255,255,255,0.3)", transform: "translateY(-50%)",
            borderRadius: 1,
          }} />
          {[15, 35, 55, 75, 85].map((x) => (
            <div key={x} style={{
              position: "absolute", bottom: 8, left: `${x}%`,
              transform: "translateX(-50%)",
              width: 5, height: 5, borderRadius: "50%",
              background: "rgba(255,255,255,0.45)",
            }} />
          ))}
        </div>
      </div>

      {/* ── Bottom tier ── */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {[22, 16, 26, 18, 24, 16, 22, 18, 26, 14].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: h,
              background: "hsl(350,90%,95%)",
              borderRadius: "0 0 50% 50%",
              opacity: 0.8,
              marginTop: -10,
            }} />
          ))}
        </div>
        <div style={{
          width: "min(190px, 48vw)",
          height: 50,
          background: "linear-gradient(160deg, hsl(347,78%,72%), hsl(350,68%,65%), hsl(340,65%,68%))",
          borderRadius: "4px 4px 0 0",
          boxShadow: "inset 0 -4px 0 hsla(347,55%,48%,0.2), 0 3px 12px hsla(347,50%,50%,0.15)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 12, left: 8, right: 8,
            height: 2, background: "rgba(255,255,255,0.25)", borderRadius: 1,
          }} />
          <div style={{
            position: "absolute", bottom: 10, left: 8, right: 8,
            height: 2, background: "rgba(255,255,255,0.2)", borderRadius: 1,
          }} />
          {["✿", "★", "✿", "★", "✿"].map((s, i) => (
            <span key={i} style={{
              position: "absolute",
              top: "50%", left: `${15 + i * 17}%`,
              transform: "translate(-50%,-50%)",
              fontSize: 8,
              color: "rgba(255,255,255,0.55)",
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* ── Plate / base ── */}
      <div style={{
        width: "min(214px, 54vw)",
        height: 9,
        background: "linear-gradient(to bottom, hsl(40,55%,88%), hsl(40,40%,80%))",
        borderRadius: "0 0 45px 45px",
        boxShadow: "0 3px 8px hsla(0,0%,0%,0.08)",
        border: "1px solid hsl(40,35%,82%)",
      }} />
    </div>
  );
}

/* ════════════════════════════════════════
   Interactive 3D Flip Birthday Card
   ════════════════════════════════════════ */
export function InteractiveBirthdayCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [effectKey, setEffectKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const closedHeight = isMobile ? 440 : 490;
  const openHeight = isMobile ? 680 : 750;

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setEffectKey((k) => k + 1);
      }
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center px-4 py-10 md:py-16 text-center overflow-visible"
      aria-label="Interactive birthday card"
    >
      {/* Celebration Effects Triggered When Opening Card */}
      {effectKey > 0 && isOpen && (
        <>
          <SideFireworks mode="burst" key={`card-fireworks-${effectKey}`} />
          <Confetti key={`card-confetti-${effectKey}`} />
          <CardBalloonsBurst key={`card-balloons-${effectKey}`} />
        </>
      )}

      {/* Top Status Banner — Only shown when unopened */}
      {!isOpen && (
        <motion.div
          className="mb-6 flex flex-col items-center z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="font-sans text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              color: "hsl(347, 65%, 45%)",
              background: "hsla(347, 80%, 94%, 0.8)",
              border: "1px solid hsla(347, 60%, 82%, 0.6)",
              boxShadow: "0 2px 10px hsla(347, 60%, 50%, 0.08)",
            }}
          >
            💌 NHẤN VÀO ĐỂ MỞ THIỆP
          </span>
        </motion.div>
      )}

      {/* Card Scene — Grand 600px Wide Size */}
      <motion.div
        className="card-scene w-full max-w-[600px] mx-auto px-2"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 3D Flip Container */}
        <div
          className={`card-3d${isOpen ? " is-open" : ""}`}
          onClick={toggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggle();
          }}
          aria-pressed={isOpen}
          aria-label={isOpen ? "Đóng thiệp sinh nhật" : "Mở thiệp sinh nhật"}
          style={{
            height: isOpen ? openHeight : closedHeight,
            transition: "height 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
          }}
        >
          {/* ══ FRONT FACE (Mặt Trước Thiệp) ══════════════════════ */}
          <div
            className={`card-face card-romantic flex flex-col items-center justify-between p-6 sm:p-10 relative select-none overflow-hidden transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{
              background: "linear-gradient(135deg, hsl(350, 85%, 98%) 0%, hsl(340, 65%, 95%) 100%)",
              border: "2px solid hsl(347, 50%, 82%)",
              boxShadow: "0 18px 45px hsla(347, 60%, 50%, 0.16), inset 0 0 40px rgba(255,255,255,0.8)",
            }}
          >
            {/* Elegant Double Border — Spaced safely inside */}
            <div
              className="absolute inset-3 sm:inset-4 rounded-[1.4rem] pointer-events-none"
              style={{ border: "1px solid hsl(347, 45%, 82%)" }}
            />
            <div
              className="absolute inset-4 sm:inset-5 rounded-[1.2rem] pointer-events-none"
              style={{ border: "1px dashed hsl(347, 40%, 86%)" }}
            />

            {/* Top Flourish */}
            <div className="relative z-10 pt-1">
              <svg width="50" height="15" viewBox="0 0 44 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 6.5C17 6.5 14 1 12 1C10 1 7 6.5 2 6.5M42 6.5C37 6.5 34 1 32 1C30 1 27 6.5 22 6.5" stroke="hsl(347, 55%, 72%)" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="22" cy="6.5" r="2.5" fill="hsl(347, 65%, 60%)" />
              </svg>
            </div>

            {/* Card Title */}
            <div className="relative z-10 text-center my-2">
              <span
                className="font-display text-2xl sm:text-3xl font-bold italic tracking-widest block mb-0.5"
                style={{ color: "hsl(347, 70%, 55%)" }}
              >
                ✦ 18 ✦
              </span>
              <h2
                className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-wide"
                style={{ color: "hsl(347, 65%, 45%)" }}
              >
                Happy Birthday
              </h2>
              <p
                className="font-display text-2xl sm:text-3xl italic font-medium mt-1 text-romantic"
              >
                {RECIPIENT_NAME}
              </p>
            </div>

            {/* Cake Section — Scaled up */}
            <div className="relative z-10 my-3 scale-105 sm:scale-115">
              <BirthdayCake />
            </div>

            {/* Subtle Bottom Glow Pulse */}
            <div className="relative z-10 pb-2">
              <span className="text-base opacity-50 text-rose-400">♡</span>
            </div>
          </div>

          {/* ══ BACK FACE (Bên Trong Thiệp Lời Chúc) ══════════════════════ */}
          <div
            className={`card-face card-back flex flex-col items-center justify-between p-1 sm:p-2 relative select-none overflow-hidden transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              background: "linear-gradient(160deg, hsl(38, 70%, 98%) 0%, hsl(347, 50%, 97%) 100%)",
              border: "2px solid hsl(347, 50%, 82%)",
              boxShadow: "0 16px 40px hsla(347, 60%, 50%, 0.14)",
            }}
          >
            {/* Stationery Dashed Inner Border */}
            <div
              className="absolute inset-4 sm:inset-6 pointer-events-none rounded-2xl z-0"
              style={{ border: "1.5px dashed hsl(347, 50%, 80%)" }}
            />

            {/* Corner Hearts */}
            <span className="absolute top-6 left-8 text-xs text-rose-400 opacity-60 z-10">♡</span>
            <span className="absolute top-6 right-8 text-xs text-rose-400 opacity-60 z-10">♡</span>
            <span className="absolute bottom-6 left-8 text-xs text-rose-400 opacity-60 z-10">♡</span>
            <span className="absolute bottom-6 right-8 text-xs text-rose-400 opacity-60 z-10">♡</span>

            {/* Inner Content Area — Deeply padded 100% SAFELY INSIDE the dashed border frame */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-10 pb-8 px-6 sm:pt-14 sm:pb-10 sm:px-10 text-center gap-4 sm:gap-5">
              {/* Inside Header */}
              <div className="flex flex-col items-center">
                <span
                  className="font-display text-xl sm:text-2xl font-bold italic tracking-widest mb-0.5"
                  style={{ color: "hsl(347, 70%, 55%)" }}
                >
                  ✦ 18 ✦
                </span>
                <h3
                  className="font-display text-2xl sm:text-3xl font-bold italic tracking-wide"
                  style={{ color: "hsl(347, 65%, 45%)" }}
                >
                  Happy Birthday ♡
                </h3>
              </div>

              {/* Middle Section: Photo & Personal Wishes with Signature */}
              <div className="flex flex-col items-center w-full max-w-[380px] text-center gap-3">
                {/* Portrait Photo with Washi Tape */}
                <div className="relative mt-1 mb-1">
                  {/* Washi Tape */}
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-24 h-6"
                    style={{
                      background: "rgba(255, 240, 245, 0.92)",
                      backdropFilter: "blur(2px)",
                      border: "1px solid rgba(240, 180, 195, 0.75)",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.07)",
                      transform: "translateX(-50%) rotate(-2deg)",
                    }}
                  />
                  <div
                    className="overflow-hidden rounded-lg bg-white p-1.5 w-[180px] h-[220px] sm:w-[210px] sm:h-[255px]"
                    style={{
                      boxShadow: "0 10px 28px hsla(347, 60%, 50%, 0.18), 0 3px 8px hsla(347, 60%, 50%, 0.1)",
                      border: "4px solid white",
                    }}
                  >
                    <Image
                      src={PORTRAIT_PHOTO.src}
                      alt={PORTRAIT_PHOTO.alt}
                      width={210}
                      height={255}
                      className="h-full w-full object-cover rounded-xs"
                    />
                  </div>
                </div>

                {/* Wishes Text — Justified alignment */}
                <p
                  className="font-sans text-xs sm:text-sm leading-relaxed text-justify"
                  style={{ color: "hsl(340, 30%, 30%)", textJustify: "inter-word" }}
                >
                  Wishing you a special day that opens up a year of warmth, quiet joy, and endless possibilities. Keep your heart light, your smile bright, and walk a journey paved with meaningful moments and fulfilled dreams.
                </p>

                <div>
                  <span
                    className="font-display text-sm sm:text-base italic font-semibold text-center block"
                    style={{ color: "hsl(347, 60%, 52%)" }}
                  >
                    May everything you hope for go smoothly, and the days ahead treat you with endless gentleness. Happy birthday, Vy!
                  </span>
                </div>

                {/* With Love Signature — Included right inside the wishes text content block */}
                <div className="pt-2 flex flex-col items-center">
                  <div className="w-16 h-[1.5px] mx-auto mb-2 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                  <p
                    className="font-display text-base sm:text-lg italic"
                    style={{ color: "hsl(347, 60%, 48%)" }}
                  >
                    With love{SENDER_NAME ? `, ${SENDER_NAME}` : " ♡"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
