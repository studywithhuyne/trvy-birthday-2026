/**
 * Web Audio API Rich Music Box Ensemble for "Happy Birthday"
 * Multi-layered synthesis featuring melody, warm chord arpeggios, and resonant bass.
 */

interface Note {
  freq: number;
  duration: number; // in seconds
  step: number;     // in seconds from start
  vol?: number;     // volume multiplier (default 1.0)
  isBass?: boolean;
}

// Frequency constants (Key of G Major)
const G2 = 98.0;
const C3 = 130.81;
const D3 = 146.83;
const G3 = 196.0;
const B3 = 246.94;
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const Fs4 = 369.99;
const G4 = 392.0;
const A4 = 440.0;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;

// Rich Music Box Arrangement: Melody + Arpeggiated Chords + Resonant Bass
const ARRANGEMENT: Note[] = [
  // ── Bar 1 ─────────────────────────────────────────
  // Bass & Chords (G Major)
  { freq: G2, duration: 2.2, step: 0.0, vol: 0.45, isBass: true },
  { freq: B3, duration: 0.8, step: 0.45, vol: 0.25 },
  { freq: D4, duration: 0.8, step: 0.9, vol: 0.25 },
  { freq: G3, duration: 1.2, step: 1.65, vol: 0.3 },

  // Melody: Hap-py Birth-day to you
  { freq: D4, duration: 0.4, step: 0.0, vol: 1.0 },
  { freq: D4, duration: 0.4, step: 0.38, vol: 1.0 },
  { freq: E4, duration: 0.65, step: 0.76, vol: 1.1 },
  { freq: D4, duration: 0.65, step: 1.45, vol: 1.0 },
  { freq: G4, duration: 0.65, step: 2.15, vol: 1.15 },
  { freq: Fs4, duration: 1.1, step: 2.85, vol: 1.0 },

  // ── Bar 2 ─────────────────────────────────────────
  // Bass & Chords (D Major)
  { freq: D3, duration: 2.2, step: 4.0, vol: 0.45, isBass: true },
  { freq: A4 / 2, duration: 0.8, step: 4.45, vol: 0.25 },
  { freq: Fs4 / 2, duration: 0.8, step: 4.9, vol: 0.25 },

  // Melody: Hap-py Birth-day to you
  { freq: D4, duration: 0.4, step: 4.0, vol: 1.0 },
  { freq: D4, duration: 0.4, step: 4.38, vol: 1.0 },
  { freq: E4, duration: 0.65, step: 4.76, vol: 1.1 },
  { freq: D4, duration: 0.65, step: 5.45, vol: 1.0 },
  { freq: A4, duration: 0.65, step: 6.15, vol: 1.15 },
  { freq: G4, duration: 1.1, step: 6.85, vol: 1.0 },

  // ── Bar 3 ─────────────────────────────────────────
  // Bass & Chords (G Major -> C Major)
  { freq: G2, duration: 1.8, step: 8.0, vol: 0.45, isBass: true },
  { freq: B3, duration: 0.8, step: 8.45, vol: 0.25 },
  { freq: C3, duration: 2.0, step: 10.15, vol: 0.45, isBass: true },
  { freq: E4 / 2, duration: 0.8, step: 10.6, vol: 0.25 },

  // Melody: Hap-py Birth-day Dear [Name]
  { freq: D4, duration: 0.4, step: 8.0, vol: 1.0 },
  { freq: D4, duration: 0.4, step: 8.38, vol: 1.0 },
  { freq: D5, duration: 0.65, step: 8.76, vol: 1.2 },
  { freq: B4, duration: 0.65, step: 9.45, vol: 1.1 },
  { freq: G4, duration: 0.65, step: 10.15, vol: 1.05 },
  { freq: Fs4, duration: 0.65, step: 10.85, vol: 1.0 },
  { freq: E4, duration: 1.1, step: 11.55, vol: 1.05 },

  // ── Bar 4 ─────────────────────────────────────────
  // Bass & Chords (C Major -> G Major)
  { freq: C3, duration: 1.8, step: 12.7, vol: 0.45, isBass: true },
  { freq: G3, duration: 0.8, step: 13.15, vol: 0.25 },
  { freq: G2, duration: 2.5, step: 15.2, vol: 0.5, isBass: true },
  { freq: D4 / 2, duration: 1.0, step: 15.65, vol: 0.25 },

  // Melody: Hap-py Birth-day to you
  { freq: C5, duration: 0.4, step: 12.7, vol: 1.15 },
  { freq: C5, duration: 0.4, step: 13.08, vol: 1.15 },
  { freq: B4, duration: 0.65, step: 13.46, vol: 1.1 },
  { freq: G4, duration: 0.65, step: 14.15, vol: 1.05 },
  { freq: A4, duration: 0.65, step: 14.85, vol: 1.1 },
  { freq: G4, duration: 2.2, step: 15.55, vol: 1.25 },
];

const LOOP_DURATION = 18.2; // Smooth 18.2s loop

class ChimePlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private loopTimer: ReturnType<typeof setTimeout> | null = null;
  private activeOscillators: OscillatorNode[] = [];

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public play() {
    this.stop();
    this.initCtx();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.scheduleMelody();
  }

  private scheduleMelody() {
    if (!this.ctx || !this.isPlaying) return;

    const startTime = this.ctx.currentTime + 0.05;
    this.activeOscillators = [];

    ARRANGEMENT.forEach((note) => {
      if (!this.ctx || !this.isPlaying) return;

      const noteStartTime = startTime + note.step;
      const vol = note.vol ?? 1.0;

      if (note.isBass) {
        // Deep Resonant Music Box Bass Note
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note.freq, noteStartTime);

        gain.gain.setValueAtTime(0.0001, noteStartTime);
        gain.gain.linearRampToValueAtTime(0.32 * vol, noteStartTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + note.duration + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStartTime);
        osc.stop(noteStartTime + note.duration + 0.5);

        this.activeOscillators.push(osc);
      } else {
        // Crystalline Music Box Bell Note (Fundamental + 3.8x harmonic sparkle)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        const gain2 = this.ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(note.freq, noteStartTime);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(note.freq * 3.8, noteStartTime);

        // Envelopes
        gain1.gain.setValueAtTime(0.0001, noteStartTime);
        gain1.gain.linearRampToValueAtTime(0.3 * vol, noteStartTime + 0.006);
        gain1.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + note.duration + 0.8);

        gain2.gain.setValueAtTime(0.0001, noteStartTime);
        gain2.gain.linearRampToValueAtTime(0.06 * vol, noteStartTime + 0.004);
        gain2.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + note.duration * 0.4);

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(this.ctx.destination);
        gain2.connect(this.ctx.destination);

        osc1.start(noteStartTime);
        osc2.start(noteStartTime);
        osc1.stop(noteStartTime + note.duration + 0.9);
        osc2.stop(noteStartTime + note.duration * 0.5);

        this.activeOscillators.push(osc1, osc2);
      }
    });

    // Schedule loop
    this.loopTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleMelody();
      }
    }, LOOP_DURATION * 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.activeOscillators = [];
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const chimePlayer = new ChimePlayer();
