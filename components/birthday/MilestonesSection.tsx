"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface MilestoneCard {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  delay: number;
}

const MILESTONES: MilestoneCard[] = [
  {
    icon: "🎓",
    title: "Tốt nghiệp rực rỡ",
    subtitle:
      "Những năm tháng học trò đầy kỷ niệm — giờ đây cánh cửa đã mở ra trước bạn.",
    color: "hsl(347, 65%, 48%)",
    bgColor: "hsl(350, 80%, 96%)",
    delay: 0.1,
  },
  {
    icon: "🏫",
    title: "Tân sinh viên",
    subtitle:
      "Chào mừng đến một chương mới — đại học, những người bạn mới, những trải nghiệm chưa từng có.",
    color: "hsl(270, 45%, 50%)",
    bgColor: "hsl(270, 40%, 96%)",
    delay: 0.2,
  },
  {
    icon: "✨",
    title: "Tuổi 18",
    subtitle:
      "Một mốc son đặc biệt. Tự do hơn, trưởng thành hơn — và vẫn thật xinh đẹp như vậy.",
    color: "hsl(38, 70%, 48%)",
    bgColor: "hsl(38, 70%, 96%)",
    delay: 0.3,
  },
  {
    icon: "🌸",
    title: "Tương lai rộng mở",
    subtitle:
      "Phía trước là cả một bầu trời — hãy bay xa theo cách bạn chọn.",
    color: "hsl(20, 70%, 50%)",
    bgColor: "hsl(20, 70%, 96%)",
    delay: 0.4,
  },
  {
    icon: "💫",
    title: "Những điều bất ngờ",
    subtitle:
      "Cuộc sống sẽ còn tặng bạn nhiều điều thú vị — hãy luôn rộng mở để đón nhận.",
    color: "hsl(347, 65%, 52%)",
    bgColor: "hsl(347, 60%, 96%)",
    delay: 0.5,
  },
  {
    icon: "🌟",
    title: "Luôn tỏa sáng",
    subtitle:
      "Dù ở đâu hay làm gì — hãy cứ là phiên bản rực rỡ nhất của chính mình.",
    color: "hsl(270, 40%, 52%)",
    bgColor: "hsl(270, 35%, 96%)",
    delay: 0.6,
  },
];

export function MilestonesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="mx-auto px-6 py-16 md:py-24 text-center"
      style={{ maxWidth: "900px" }}
      aria-label="Milestones and wishes"
    >
      {/* Heading */}
      <motion.h2
        className="font-display text-2xl md:text-3xl font-semibold italic"
        style={{ color: "hsl(347, 65%, 48%)" }}
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8 }}
      >
        Dấu mốc & Lời chúc ✨
      </motion.h2>

      <motion.p
        className="font-sans mt-3 text-sm"
        style={{ color: "hsl(347, 35%, 60%)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Năm 18 — tốt nghiệp, tân sinh viên, và một chương đời mới bắt đầu
      </motion.p>

      <div className="divider-romantic" />

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MILESTONES.map((m) => (
          <motion.div
            key={m.title}
            className="flex flex-col items-center gap-3 rounded-2xl p-6 text-center"
            style={{
              background: m.bgColor,
              border: `1.5px solid ${m.color}22`,
              boxShadow: `0 4px 20px ${m.color}14`,
            }}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.94 }
            }
            transition={{
              duration: 0.65,
              delay: m.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <span className="text-4xl" role="img" aria-hidden="true">
              {m.icon}
            </span>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: m.color }}
            >
              {m.title}
            </h3>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: "hsl(340, 20%, 42%)" }}
            >
              {m.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
