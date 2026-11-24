"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/lib/types";
import { NeuralBackground } from "@/components/NeuralBackground";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";

const BrainModel = dynamic(() => import("@/components/BrainModel").then(m => ({ default: m.BrainModel })), { ssr: false });

interface BrainNode {
  id: SectionId;
  label: string;
  col: number;
  row: number;
  x2: string;
  y2: string;
}

const brainNodes: BrainNode[] = [
  { id: "profile", label: "Prefrontal Cortex", col: 2, row: 1, x2: "50%", y2: "14%" },
  { id: "experience", label: "Industrial Matrix", col: 1, row: 1, x2: "16.66%", y2: "14%" },
  { id: "certificates", label: "Credential Vault", col: 3, row: 1, x2: "83.33%", y2: "14%" },
  { id: "skills", label: "Neural Network Layer", col: 1, row: 2, x2: "16.66%", y2: "50%" },
  { id: "projects", label: "Innovation Cortex", col: 3, row: 2, x2: "83.33%", y2: "50%" },
  { id: "journey", label: "Memory Cortex", col: 1, row: 3, x2: "16.66%", y2: "86%" },
  { id: "contact", label: "Signal Hub", col: 3, row: 3, x2: "83.33%", y2: "86%" }
];

interface BrainInterfaceProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onClickSound: () => void;
  secretMode: boolean;
}

export function BrainInterface({
  activeSection,
  onSelectSection,
  onClickSound,
  secretMode
}: BrainInterfaceProps) {
  const [hoveredNode, setHoveredNode] = useState<SectionId | null>(null);
  const [coreHovered, setCoreHovered] = useState(false);
  const [clickedNode, setClickedNode] = useState<SectionId | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleNodeClick = useCallback((id: SectionId) => {
    setClickedNode(id);
    onClickSound();
    setTimeout(() => {
      onSelectSection(id);
      setClickedNode(null);
    }, 400);
  }, [onClickSound, onSelectSection]);

  return (
    <motion.section
      ref={containerRef}
      key="brain-interface"
      className="brain-interface relative h-[72vh] min-h-[500px] overflow-hidden rounded-2xl border border-neonBlue/30 bg-black/25 shadow-neon backdrop-blur-xl"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,46,255,0.2),transparent_55%)] pointer-events-none" />

      {/* Scanning grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[length:28px_28px] opacity-[0.06] pointer-events-none" />

      {/* Ambient outer glow */}
      <div className="ambient-glow absolute inset-0 rounded-2xl pointer-events-none" />

      {/* Neural background canvas */}
      <NeuralBackground />

      {/* 3D Holographic Brain */}
      <BrainModel />

      {/* Connection lines SVG */}
      <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full">
        <defs>
          <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7B2EFF" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="lineGradIdle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {brainNodes.map((node) => {
          const isActive = node.id === activeSection;
          const isHovered = node.id === hoveredNode;
          const isClicked = node.id === clickedNode;

          return (
            <g key={`line-group-${node.id}`}>
              {/* Main connection line */}
              <line
                x1="50%"
                y1="50%"
                x2={node.x2}
                y2={node.y2}
                stroke={isActive || isHovered ? "url(#lineGradActive)" : "url(#lineGradIdle)"}
                strokeWidth={isActive ? 2 : isHovered ? 1.6 : 0.8}
                strokeDasharray={isActive ? "0" : "6 8"}
                className="transition-all duration-300"
              />
              {/* Data packet dot traveling along line */}
              {(isActive || isClicked) && (
                <circle r="3" fill="#00F0FF" opacity="0.9">
                  <animateMotion
                    dur={isClicked ? "0.4s" : "2.5s"}
                    repeatCount={isClicked ? "1" : "indefinite"}
                    path={`M ${50},${50} L ${parseFloat(node.x2)},${parseFloat(node.y2)}`}
                  />
                </circle>
              )}
              {/* Second faint packet on active lines */}
              {isActive && !isClicked && (
                <circle r="2" fill="#7B2EFF" opacity="0.6">
                  <animateMotion
                    dur="3.5s"
                    repeatCount="indefinite"
                    begin="1.2s"
                    path={`M ${parseFloat(node.x2)},${parseFloat(node.y2)} L ${50},${50}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Grid layout for nodes + brain core */}
      <div className="relative z-10 grid h-full w-full grid-cols-3 grid-rows-3 gap-2 p-4">
        {/* === Central BRAIN core === */}
        <div className="col-start-2 row-start-2 flex items-center justify-center">
          <motion.div
            className="relative flex items-center justify-center"
            onHoverStart={() => setCoreHovered(true)}
            onHoverEnd={() => setCoreHovered(false)}
          >
            {/* Energy ripple rings */}
            <div className={clsx(
              "brain-ripple absolute h-36 w-36 rounded-full sm:h-40 sm:w-40",
              coreHovered && "brain-ripple-intense"
            )} />
            <div className={clsx(
              "brain-ripple brain-ripple-delay absolute h-44 w-44 rounded-full sm:h-48 sm:w-48"
            )} />

            {/* Holographic rotating ring */}
            <div className={clsx(
              "holo-ring absolute h-32 w-32 rounded-full sm:h-36 sm:w-36",
              coreHovered && "holo-ring-fast"
            )} />

            {/* Core sphere */}
            <motion.div
              className={clsx(
                "relative z-20 flex h-24 w-24 items-center justify-center rounded-full border-2 sm:h-28 sm:w-28",
                secretMode
                  ? "border-aiGreen/60 shadow-[0_0_50px_rgba(0,255,156,0.5)]"
                  : "border-neonBlue/50 shadow-[0_0_50px_rgba(0,240,255,0.45)]",
                coreHovered && !secretMode && "shadow-[0_0_70px_rgba(0,240,255,0.7)]",
                coreHovered && secretMode && "shadow-[0_0_70px_rgba(0,255,156,0.7)]"
              )}
              style={{ background: "radial-gradient(circle at 40% 35%, rgba(0,240,255,0.12), rgba(0,0,0,0.7))" }}
              animate={{
                scale: [1, 1.04, 0.98, 1],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="absolute inset-2 rounded-full border border-neonBlue/25" />
              <div className="absolute inset-4 rounded-full border border-neonBlue/15" />
              <p className={clsx(
                "font-display text-sm tracking-[0.22em]",
                secretMode ? "text-aiGreen" : "text-neonBlue"
              )}>
                BRAIN
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* === Navigation nodes === */}
        {brainNodes.map((node, index) => {
          const isActive = activeSection === node.id;
          const isHovered = hoveredNode === node.id;

          return (
            <div
              key={node.id}
              className="relative z-30 flex items-center justify-center"
              style={{ gridColumn: node.col, gridRow: node.row }}
            >
              <motion.button
                type="button"
                className={clsx(
                  "group relative mx-auto flex min-w-[95px] flex-col items-center justify-center overflow-hidden rounded-xl border px-2 py-2 text-center backdrop-blur-md transition-all duration-300 sm:min-w-[115px] sm:px-2.5",
                  isActive
                    ? "border-neonBlue/70 bg-neonBlue/20 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                    : "border-neonBlue/30 bg-black/50 hover:border-neonBlue/60 hover:bg-neonBlue/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.06 * index, duration: 0.35 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node.id)}
              >
                {/* Node pulse effect on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-neonBlue/8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}

                <span className={clsx(
                  "block font-display text-[0.58rem] uppercase tracking-[0.18em] transition-colors duration-300 sm:text-[0.64rem]",
                  isActive ? "text-neonBlue font-semibold" : "text-neonBlue/80"
                )}>
                  {node.id}
                </span>
                <span className="mt-0.5 block font-body text-xs text-textMain/90 truncate max-w-[110px]">
                  {node.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    className="mt-1 block h-1 w-1 rounded-full bg-neonBlue shadow-[0_0_6px_#00F0FF]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
