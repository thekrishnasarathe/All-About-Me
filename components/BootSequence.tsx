"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const bootLines = [
  "Initializing Cognitive System...",
  "Loading Neural Architecture...",
  "Booting Intelligence Engine...",
  "Starting Krishna.AI Core...",
  "Access Granted."
];

interface BootSequenceProps {
  onStart: () => void;
  onComplete: () => void;
}

export function BootSequence({ onStart, onComplete }: BootSequenceProps) {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!started) return;

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return current + 2;
      });
    }, 55);

    return () => window.clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (progress < 100) return;
    const timeout = window.setTimeout(onComplete, 900);
    return () => window.clearTimeout(timeout);
  }, [onComplete, progress]);

  const visibleLines = useMemo(() => {
    const count = Math.max(1, Math.ceil((progress / 100) * bootLines.length));
    return bootLines.slice(0, count);
  }, [progress]);

  return (
    <motion.section
      className="boot-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_52%)]" />
      <div className="relative w-[92%] max-w-4xl rounded-xl border border-neonBlue/30 bg-black/80 p-6 shadow-neon backdrop-blur-md">
        {!started ? (
          <div className="space-y-4 text-center">
            <h1 className="font-display text-3xl tracking-[0.3em] text-neonBlue sm:text-4xl">
              KRISHNA.AI
            </h1>
            <p className="font-mono text-sm text-textMain/70 sm:text-base">
              Enter the Cognitive System Interface
            </p>
            <button
              type="button"
              className="mx-auto flex w-fit items-center justify-center rounded-md border border-neonBlue/60 px-5 py-2 font-mono text-sm uppercase tracking-[0.2em] text-neonBlue transition hover:bg-neonBlue/20"
              onClick={() => {
                setStarted(true);
                onStart();
              }}
            >
              Start System
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <h2 className="font-display text-xl uppercase tracking-[0.2em] text-neonBlue sm:text-2xl">
              System Boot Sequence
            </h2>
            <div className="space-y-2 font-mono text-xs text-textMain sm:text-sm">
              {visibleLines.map((line) => (
                <motion.p
                  key={line}
                  className="glitch-text"
                  data-text={line}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full overflow-hidden rounded-full border border-neonBlue/40 bg-black">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-neonBlue via-cyberPink to-aiGreen"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neonBlue">
                Loading {progress}%
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
