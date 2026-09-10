/**
 * Centralized Audio Player for /audio/birthday.mp3
 */

class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private init() {
    if (!this.audio && typeof window !== "undefined") {
      const a = new Audio("/audio/birthday.mp3");
      a.loop = true;
      a.volume = 0.6;

      a.addEventListener("play", () => {
        this.isPlaying = true;
        this.notify();
      });

      a.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      a.addEventListener("ended", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio = a;
    }
  }

  public play() {
    this.init();
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.notify();
    }).catch((err) => {
      console.warn("Audio playback issue:", err);
    });
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }
}

export const audioPlayer = new AudioPlayer();
