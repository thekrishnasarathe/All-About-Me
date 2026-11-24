"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050510] px-4 text-center">
      <div className="cyber-card relative max-w-md rounded-2xl border border-cyberPink/50 p-6 shadow-[0_0_40px_rgba(255,47,209,0.3)]">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyberPink/15 text-cyberPink">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="font-display text-lg uppercase tracking-wider text-white">
          System Anomaly Detected
        </h2>
        <p className="mt-2 font-mono text-xs text-textMain/75 leading-relaxed">
          The cognitive interface encountered an unexpected interruption. Telemetry has been logged.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-neonBlue px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] transition hover:bg-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Re-initialize System</span>
        </button>
      </div>
    </div>
  );
}
