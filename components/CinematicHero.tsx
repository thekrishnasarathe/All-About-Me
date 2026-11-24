"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Cpu, Orbit, Briefcase } from "lucide-react";

interface CinematicHeroProps {
  onExplore: () => void;
  onViewProjects: () => void;
  onViewExperience?: () => void;
}

const orbitNodes = ["AI SYSTEMS", "QUANTNEXA SDE", "FIRMWRE & IOT", "FINTECH"];

export function CinematicHero({ onExplore, onViewProjects, onViewExperience }: CinematicHeroProps) {
  return (
    <motion.section
      className="cinematic-hero relative mb-5 overflow-hidden rounded-[1.75rem] border border-neonBlue/25 px-5 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.42)] sm:px-9 sm:py-10 lg:px-12 lg:py-12"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.75, 0.25, 1] }}
    >
      <div className="hero-grain pointer-events-none absolute inset-0" />
      <div className="hero-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[0.63rem] uppercase tracking-[0.2em] text-textMain/65">
            <span className="inline-flex items-center gap-2 rounded-full border border-aiGreen/35 bg-aiGreen/5 px-3 py-1.5 text-aiGreen shadow-[0_0_12px_rgba(0,255,156,0.2)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aiGreen" />
              Applied AI Engineer // Online
            </span>
            <span className="rounded-full border border-cyberPink/30 bg-cyberPink/5 px-3 py-1.5 text-cyberPink">
              🏆 BGI National Winner
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              QuantNexa SDE Intern
            </span>
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.26em] text-neonBlue sm:text-sm">
            Krishna Sarathe <span className="text-textMain/35">/</span> Applied AI &amp; Full-Stack Systems
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold uppercase leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl xl:text-7xl">
            Deterministic AI.
            <span className="hero-title-accent block">Production Code.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-textMain/75 sm:text-base">
            B.Tech CSE (AI &amp; Data Science) engineer building deterministic AI grading platforms, zero-echo meeting bots, offline-first mobile apps, and autonomous agents backed by 220+ automated tests.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onViewProjects}
              className="hero-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#031013] transition hover:-translate-y-0.5"
            >
              Explore 12+ Projects <ArrowUpRight className="h-4 w-4" />
            </button>
            {onViewExperience && (
              <button
                type="button"
                onClick={onViewExperience}
                className="inline-flex items-center gap-2 rounded-lg border border-cyberPink/40 bg-cyberPink/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-cyberPink transition hover:border-cyberPink hover:bg-cyberPink/20 hover:-translate-y-0.5"
              >
                <Briefcase className="h-4 w-4" />
                <span>SDE Experience</span>
              </button>
            )}
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.035] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-neonBlue/45 hover:bg-neonBlue/10"
            >
              Enter Cognitive Core <ArrowDown className="h-4 w-4 text-neonBlue" />
            </button>
          </div>

          {/* 4 Quantitative Telemetry Badges */}
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 border-t border-white/10 pt-5">
            <div className="border-r border-white/10 pr-3">
              <p className="font-display text-2xl text-white sm:text-3xl font-bold">12+</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.15em] text-textMain/50 sm:text-xs">Deployed Systems</p>
            </div>
            <div className="border-r border-white/10 pr-3">
              <p className="font-display text-2xl text-cyberPink sm:text-3xl font-bold">1st</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.15em] text-textMain/50 sm:text-xs">National Winner</p>
            </div>
            <div className="border-r border-white/10 pr-3">
              <p className="font-display text-2xl text-aiGreen sm:text-3xl font-bold">220+</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.15em] text-textMain/50 sm:text-xs">Verified Tests</p>
            </div>
            <div>
              <p className="font-display text-2xl text-neonBlue sm:text-3xl font-bold">97%</p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.15em] text-textMain/50 sm:text-xs">LOOCV Accuracy</p>
            </div>
          </div>
        </div>

        <div className="hero-core-wrap relative mx-auto flex aspect-square w-full max-w-[24rem] items-center justify-center lg:max-w-[27rem]">
          <div className="hero-core-grid absolute inset-0 rounded-full" />
          <motion.div
            className="hero-orbit hero-orbit-one absolute h-[78%] w-[78%] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-orbit hero-orbit-two absolute h-[62%] w-[62%] rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-core relative flex h-[42%] w-[42%] items-center justify-center rounded-full"
            animate={{ scale: [1, 1.045, 1], filter: ["brightness(.9)", "brightness(1.2)", "brightness(.9)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="hero-core-inner flex h-[78%] w-[78%] items-center justify-center rounded-full">
              <Orbit className="h-10 w-10 text-neonBlue sm:h-14 sm:w-14" strokeWidth={1} />
            </div>
          </motion.div>
          <div className="absolute left-[6%] top-[18%] rounded-lg border border-neonBlue/30 bg-black/75 px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.15em] text-neonBlue backdrop-blur shadow-[0_0_12px_rgba(0,240,255,0.25)]">
            NEURAL CORE <span className="ml-2 text-aiGreen">ONLINE</span>
          </div>
          <div className="absolute bottom-[14%] right-[1%] rounded-lg border border-cyberPink/30 bg-black/75 px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.15em] text-textMain/75 backdrop-blur shadow-[0_0_12px_rgba(255,47,209,0.25)]">
            <Cpu className="mr-2 inline h-3.5 w-3.5 text-cyberPink" />
            QUANTNEXA SDE // DELIVERED
          </div>
          {orbitNodes.map((node, index) => (
            <motion.span
              key={node}
              className="absolute rounded-full border border-white/10 bg-[#080b16]/90 px-3 py-1.5 font-mono text-[0.56rem] tracking-[0.14em] text-textMain/70 shadow-lg backdrop-blur"
              style={{
                top: index === 0 ? "10%" : index === 1 ? "75%" : index === 2 ? "45%" : "88%",
                left: index === 0 ? "62%" : index === 1 ? "10%" : index === 2 ? "76%" : "48%"
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + index, repeat: Infinity, delay: index * 0.3 }}
            >
              {node}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-7 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-textMain/40">
        <span>Architected by Krishna Sarathe // 2026</span>
        <span>Cognitive AI Interface v3.0</span>
      </div>
    </motion.section>
  );
}
