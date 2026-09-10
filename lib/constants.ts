/**
 * Centralized placeholders and configuration for the birthday website.
 *
 * Replace these values with real content when ready.
 */

/** The birthday recipient's name */
export const RECIPIENT_NAME = "CHQI";

/** The sender's / creator's name */
export const SENDER_NAME = "";

/** The personal birthday message — replace with your heartfelt words */
export const PERSONAL_MESSAGE = `There are many things I could wish for you today, but more than anything, I hope you stay happy.

I hope you smile a little more, worry a little less, and find joy in both the big achievements and the small everyday moments. University will bring new experiences, new people, and new challenges, but I believe you'll do wonderfully. You have a way of making things brighter simply by being yourself.

Thank you for being someone so special to me. Meeting you has been one of those unexpected things that quietly made life a little better. I genuinely hope that this year treats you kindly and that every plan, every goal, and every dream you carry in your heart finds its way to reality.

At the end of the day, I just want you to be happy, safe, and truly loved wherever you go. Happy birthday, Vy iu. ❤️`;

/** The intro message shown before the countdown */
export const INTRO_GREETING = "Hey...";
export const INTRO_MESSAGE = "I made something special\njust for my dearest.";

/** The hero subtitle shown under the birthday greeting */
export const HERO_SUBTITLE =
  "I hope today brings you\nas much happiness as you bring\nto the people around you.";

/** The closing message at the end */
export const CLOSING_MESSAGE =
  "I hope this year brings you\nmany beautiful moments.";

/** Photo gallery configuration — add your real photos here */
export const PHOTOS: PhotoItem[] = [
  {
    src: "/images/trvy1.jpg",
    alt: "A cherished memory",
    caption: "Cô bé ngốc nghếchhhh ✨",
    rotation: -3,
  },
  {
    src: "/images/trvy2.jpg",
    alt: "A beautiful moment",
    caption: "Thiếu nữ xinh đẹp đáng iuuu 🌸",
    rotation: 2,
  },
  {
    src: "/images/trvy3.jpg",
    alt: "A special day",
    caption: "Trưởng thành rồiiiii 💖",
    rotation: -1.5,
  },
];

/** The main portrait photo for the birthday card */
export const PORTRAIT_PHOTO = {
  src: "/images/trvy-main.jpg",
  alt: "Birthday portrait of " + RECIPIENT_NAME,
};

export interface PhotoItem {
  src: string;
  alt: string;
  caption?: string;
  rotation: number;
}

/* ── Animation Timing (ms) ────────────────────────── */
export const INTRO_DELAY = 500;
export const INTRO_LINE_STAGGER = 800;
export const COUNTDOWN_STEP_DURATION = 650;
export const TRANSITION_DURATION = 500;
export const HERO_ENTRANCE_DURATION = 800;
export const CARD_ENTRANCE_DELAY = 600;
export const EFFECTS_ENTRANCE_DELAY = 1500;
export const FIREWORKS_DELAY = 2000;

/* ── Effect Counts ────────────────────────────────── */
export const HEART_COUNT = 12;
export const BALLOON_COUNT = 7;
export const SPARKLE_COUNT = 18;
