"use client";

import { useCallback, useRef } from "react";

const clampVolume = (volume: number) => Math.max(0, Math.min(volume, 0.15));

export const useUiSounds = (enabled: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    return audioContextRef.current;
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
      if (!enabled && !force) return;

      const context = await getContext();
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

      // soft low-pass filter for smooth sound
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(0.7, now);

      // smooth envelope
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
    },
    [enabled, getContext]
  );

  const playChord = useCallback(
    async (frequencies: number[], durationMs: number, type: OscillatorType, volume: number, force = false) => {
      if (!enabled && !force) return;

      for (const freq of frequencies) {
        playTone(freq, durationMs, type, volume / frequencies.length, undefined, force);
      }
    },
    [enabled, playTone]
  );

  const playBoot = useCallback(
    async (force = false) => {
      // pleasant ascending chord: C4 → E4 → G4
      await playTone(261.6, 300, "sine", 0.04, 329.6, force);
      setTimeout(() => playTone(392, 400, "sine", 0.03, 523.2, force), 200);
      setTimeout(() => playChord([523.2, 659.2], 500, "sine", 0.025, force), 450);
    },
    [playTone, playChord]
  );

  const playClick = useCallback(
    async (force = false) => {
      // soft clean tap — high sine with quick decay
      await playTone(880, 60, "sine", 0.025, 1100, force);
    },
    [playTone]
  );

  const playAmbient = useCallback(
    async (force = false) => {
      // very quiet warm pad tone
      await playChord([130.8, 196], 2400, "sine", 0.008, force);
    },
    [playChord]
  );

  return {
    playBoot,
    playClick,
    playAmbient
  };
};
