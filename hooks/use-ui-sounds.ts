"use client";

import { useCallback, useRef } from "react";

const clampVolume = (volume: number) => Math.max(0, Math.min(volume, 0.15));

export const useUiSounds = (enabled: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(async () => {
    try {
      if (typeof window === "undefined") return null;

      if (!audioContextRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }

      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      return audioContextRef.current;
    } catch {
      return null;
    }
  }, []);

  const playTone = useCallback(
    async (
      frequency: number,
      durationMs: number,
      type: OscillatorType,
      volume: number,
      rampToFrequency?: number,
      force = false
    ) => {
      try {
        if (!enabled && !force) return;

        const context = await getContext();
        if (!context) return;

        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const filter = context.createBiquadFilter();
        const now = context.currentTime;
        const durationSeconds = durationMs / 1000;

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, now);
        if (rampToFrequency) {
          oscillator.frequency.exponentialRampToValueAtTime(
            rampToFrequency,
            now + durationSeconds
          );
        }

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2200, now);
        filter.Q.setValueAtTime(0.7, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(
          clampVolume(volume),
          now + Math.min(0.08, durationSeconds * 0.3)
        );
        gain.gain.exponentialRampToValueAtTime(
          clampVolume(volume * 0.6),
          now + durationSeconds * 0.6
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

        oscillator.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + durationSeconds);
      } catch {
        // Silently catch audio policy blocks
      }
    },
    [enabled, getContext]
  );

  const playChord = useCallback(
    async (frequencies: number[], durationMs: number, type: OscillatorType, volume: number, force = false) => {
      try {
        if (!enabled && !force) return;

        for (const freq of frequencies) {
          playTone(freq, durationMs, type, volume / frequencies.length, undefined, force);
        }
      } catch {
        // Audio error caught
      }
    },
    [enabled, playTone]
  );

  const playBoot = useCallback(
    async (force = false) => {
      try {
        await playTone(261.6, 300, "sine", 0.04, 329.6, force);
        setTimeout(() => playTone(392, 400, "sine", 0.03, 523.2, force), 200);
        setTimeout(() => playChord([523.2, 659.2], 500, "sine", 0.025, force), 450);
      } catch {
        // Audio error caught
      }
    },
    [playTone, playChord]
  );

  const playClick = useCallback(
    async (force = false) => {
      try {
        await playTone(880, 60, "sine", 0.025, 1100, force);
      } catch {
        // Audio error caught
      }
    },
    [playTone]
  );

  const playAmbient = useCallback(
    async (force = false) => {
      try {
        await playChord([130.8, 196], 2400, "sine", 0.008, force);
      } catch {
        // Audio error caught
      }
    },
    [playChord]
  );

  return {
    playBoot,
    playClick,
    playAmbient
  };
};
