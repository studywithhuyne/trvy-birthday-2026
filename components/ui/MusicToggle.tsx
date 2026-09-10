"use client";

import { useState, useCallback, useEffect } from "react";
import { audioPlayer } from "@/lib/audio";

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioPlayer.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const toggleMusic = useCallback(() => {
    audioPlayer.toggle();
  }, []);

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 select-none"
      style={{
        background: "hsl(350, 85%, 97%)",
        backdropFilter: "blur(12px)",
        border: `1.5px solid hsl(347, 60%, ${isPlaying ? "68%" : "84%"})`,
        boxShadow: `0 4px 16px hsla(347, 70%, 60%, ${isPlaying ? "0.25" : "0.1"})`,
        color: isPlaying ? "hsl(347, 75%, 52%)" : "hsl(347, 40%, 65%)",
      }}
      aria-label={isPlaying ? "Dừng nhạc sinh nhật" : "Phát nhạc sinh nhật"}
      title={isPlaying ? "Dừng nhạc sinh nhật" : "Phát nhạc sinh nhật"}
      type="button"
    >
      <span className="text-xl" aria-hidden="true">
        {isPlaying ? "♫" : "♪"}
      </span>
    </button>
  );
}


