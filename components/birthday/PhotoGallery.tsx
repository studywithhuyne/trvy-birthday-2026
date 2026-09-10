"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { PHOTOS } from "@/lib/constants";

export function PhotoGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={galleryRef}
      className="w-full max-w-[1050px] mx-auto px-4 py-12 md:py-20 text-center flex flex-col items-center justify-center"
      aria-label="Photo gallery"
    >
      {/* Section heading */}
      <motion.div
        className="flex flex-col items-center text-center max-w-xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <span
          className="font-sans text-xs font-semibold tracking-widest uppercase px-3.5 py-1 rounded-full inline-block mb-2 shadow-xs"
          style={{
            background: "linear-gradient(135deg, hsl(350, 85%, 94%), hsl(38, 80%, 94%))",
            color: "hsl(347, 65%, 45%)",
            border: "1px solid hsl(347, 50%, 84%)",
          }}
        >
          Album kỷ niệm
        </span>
        <h2
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold italic tracking-wide text-center"
          style={{ color: "hsl(347, 65%, 42%)" }}
        >
          Những Khoảnh Khắc Đáng Yêu
        </h2>
        <p
          className="font-sans text-xs sm:text-sm mt-2 text-center"
          style={{ color: "hsl(340, 25%, 52%)" }}
        >
          Mỗi bức ảnh là một khoảnh khắc đầy ý nghĩa
        </p>
      </motion.div>

      <div className="divider-romantic my-6 mx-auto" />

      {/* 3 Photo frames grid — Explicit width & centered across 3 equal columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-6 w-[920px] max-w-[95vw] mx-auto justify-items-center items-center">
        {PHOTOS.slice(0, 3).map((photo, i) => {
          const caption = photo.caption || photo.alt;
          return (
            <motion.div
              key={i}
              className="relative group w-full max-w-[270px]"
              initial={{ opacity: 0, y: 35, rotate: photo.rotation * 2.5 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotate: photo.rotation }
                  : { opacity: 0, y: 35, rotate: photo.rotation * 2.5 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
            >
              {/* Decorative piece of tape on top of the frame */}
              <div
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-20 h-6 pointer-events-none"
                style={{
                  background: "rgba(255, 235, 240, 0.88)",
                  backdropFilter: "blur(3px)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(255, 195, 210, 0.7)",
                  transform: `translateX(-50%) rotate(${i % 2 === 0 ? "-2.5deg" : "3deg"})`,
                }}
              />

              {/* Polaroid Frame Card */}
              <div
                className="p-3 pb-5 rounded-xl text-center select-none mx-auto"
                style={{
                  background: "linear-gradient(175deg, #ffffff 0%, #fffafd 100%)",
                  border: "1px solid hsl(347, 45%, 88%)",
                  boxShadow:
                    "0 12px 32px hsla(347, 60%, 50%, 0.14), 0 2px 8px hsla(347, 50%, 50%, 0.08)",
                }}
              >
                {/* Photo container */}
                <div
                  className="relative overflow-hidden rounded-lg bg-pink-50 mx-auto"
                  style={{
                    aspectRatio: "4 / 5",
                    border: "1px solid hsl(347, 40%, 92%)",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 270px, 270px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle highlight overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-10 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Caption underneath photo */}
                <p
                  className="font-display italic text-sm font-medium mt-3 text-center"
                  style={{ color: "hsl(347, 60%, 45%)" }}
                >
                  {caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

