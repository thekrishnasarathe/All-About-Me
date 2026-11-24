"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BrainInterface } from "@/components/BrainInterface";
import { BootSequence } from "@/components/BootSequence";
import { KrishnaOS } from "@/components/KrishnaOS";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";
import { CinematicHero } from "@/components/CinematicHero";
import { CyberpunkCity } from "@/components/CyberpunkCity";
import { SectionPanel } from "@/components/SectionPanel";
import { useUiSounds } from "@/hooks/use-ui-sounds";
import type { SectionId } from "@/lib/types";
import clsx from "clsx";
import { Bot, Cpu, Keyboard, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Mode = "brain" | "city" | "os";

const sectionOrder: SectionId[] = [
  "profile",
  "experience",
  "projects",
  "certificates",
  "skills",
  "journey",
  "contact"
];

const sectionShortLabel: Record<SectionId, string> = {
  profile: "Profile",
  experience: "Experience",
  projects: "Projects",
  certificates: "Certificates",
  skills: "Skills",
  journey: "Journey",
  contact: "Contact"
};

const konamiSequence = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a"
];

export default function HomePage() {
  const [isBooted, setIsBooted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("profile");
  const [mode, setMode] = useState<Mode>("brain");
  const [secretMode, setSecretMode] = useState(false);
  const [hackerTheme, setHackerTheme] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [, setTypedKeys] = useState<string[]>([]);

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        x: (index * 37) % 100,
        y: (index * 53) % 100,
        delay: (index % 8) * 0.4,
        duration: 8 + (index % 5)
      })),
    []
  );

  const { playBoot, playClick, playAmbient } = useUiSounds(soundEnabled);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("has_booted") === "true") {
      setIsBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("has_booted", "true");
    }
    setIsBooted(true);
  };

  const selectSection = (section: SectionId) => {
    setActiveSection(section);
    if (mode === "os") return;

    if (
      section === "skills" ||
      section === "projects" ||
      section === "experience" ||
      section === "certificates"
    ) {
      setMode("city");
    } else {
      setMode("brain");
    }

    setTimeout(() => {
      const el = document.getElementById("interactive-workspace");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const normalizedKey = event.key.toLowerCase();

      if (normalizedKey === "0" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        setMode("os");
      }

      setTypedKeys((current) => {
        const next = [...current, normalizedKey].slice(-konamiSequence.length);
        if (next.join("|") === konamiSequence.join("|")) {
          setHackerTheme(true);
          setSecretMode(true);
        }
        return next;
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!soundEnabled || !isBooted) return;

    playAmbient();
    const ambientInterval = window.setInterval(() => {
      playAmbient();
    }, 6400);

    return () => window.clearInterval(ambientInterval);
  }, [isBooted, playAmbient, soundEnabled]);

  return (
    <main
      className={clsx(
        "relative min-h-screen overflow-x-hidden px-4 pb-6 pt-4 sm:px-8 sm:pt-6",
        hackerTheme ? "theme-hacker" : "theme-cyber"
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,240,255,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(255,47,209,0.16),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(123,46,255,0.2),transparent_32%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.35),rgba(5,5,16,0.86))] pointer-events-none" />

      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={clsx(
              "floating-particle absolute h-1 w-1 rounded-full bg-neonBlue/75",
              secretMode && "bg-aiGreen/85"
            )}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mb-4 rounded-xl border border-neonBlue/25 bg-black/50 p-3 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-neonBlue font-semibold">
                SARATHE.AI // V3.0
              </p>
              <p className="text-xs text-textMain/70">
                Cognitive System Interface | Press <span className="font-mono text-neonBlue font-bold">0</span> for SaratheOS
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-neonBlue/40 bg-black/45 px-3 py-1 text-xs text-neonBlue transition hover:bg-neonBlue/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                onClick={() => {
                  setMode("brain");
                  playClick();
                }}
              >
                Brain
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-cyberPink/40 bg-black/45 px-3 py-1 text-xs text-cyberPink transition hover:bg-cyberPink/20 shadow-[0_0_10px_rgba(255,47,209,0.2)]"
                onClick={() => {
                  setMode("city");
                  playClick();
                }}
              >
                City
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-md border border-aiGreen/40 bg-black/45 px-3 py-1 text-xs text-aiGreen transition hover:bg-aiGreen/20 shadow-[0_0_10px_rgba(0,255,156,0.2)]"
                onClick={() => {
                  setMode("os");
                  playClick();
                }}
              >
                SaratheOS
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-aiGreen/40 bg-black/45 px-3 py-1 text-xs text-aiGreen transition hover:bg-aiGreen/20"
                onClick={() => {
                  setIsAssistantOpen((current) => !current);
                  playClick();
                }}
              >
                <Bot className="h-3.5 w-3.5" />
                <span>AI Guide</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-neonBlue/35 bg-black/45 px-3 py-1 text-xs text-textMain transition hover:bg-neonBlue/15"
                onClick={() => {
                  setSoundEnabled((current) => {
                    const next = !current;
                    if (next) {
                      playBoot(true);
                    }
                    return next;
                  });
                }}
              >
                {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-neonBlue" /> : <VolumeX className="h-3.5 w-3.5 text-textMain/50" />}
                <span>{soundEnabled ? "Sound On" : "Sound Off"}</span>
              </button>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap">
            {sectionOrder.map((section) => (
              <button
                key={section}
                type="button"
                className={clsx(
                  "flex shrink-0 items-center justify-center rounded-full border px-3 py-1 font-display text-xs uppercase tracking-wider transition-all",
                  section === activeSection
                    ? "border-neonBlue bg-neonBlue/25 text-neonBlue shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "border-neonBlue/35 bg-black/45 text-textMain/80 hover:bg-neonBlue/15 hover:text-white"
                )}
                onClick={() => {
                  playClick();
                  selectSection(section);
                }}
              >
                {sectionShortLabel[section]}
              </button>
            ))}
          </div>
        </header>

        <CinematicHero
          onExplore={() => {
            setMode("brain");
            setActiveSection("profile");
            setTimeout(() => {
              const el = document.getElementById("interactive-workspace");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 80);
          }}
          onViewProjects={() => {
            selectSection("projects");
          }}
          onViewExperience={() => {
            selectSection("experience");
          }}
        />

        {isAssistantOpen && <PortfolioAssistant onClose={() => setIsAssistantOpen(false)} />}

        {mode === "os" ? (
          <div id="interactive-workspace" className="scroll-mt-6">
            <KrishnaOS
              activeSection={activeSection}
              onSectionChange={selectSection}
              onUnlockSecret={() => setSecretMode(true)}
              onClickSound={playClick}
            />
          </div>
        ) : mode === "city" ? (
          <div id="interactive-workspace" className="scroll-mt-6">
            <CyberpunkCity
              key="city-scene"
              activeSection={activeSection}
              onSelectSection={selectSection}
              onClickSound={playClick}
            />
          </div>
        ) : (
          <div id="interactive-workspace" className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr] scroll-mt-6">
            <BrainInterface
              key="brain-scene"
              activeSection={activeSection}
              onSelectSection={selectSection}
              onClickSound={playClick}
              secretMode={secretMode}
            />
            <SectionPanel activeSection={activeSection} />
          </div>
        )}

        <motion.footer
          className="mt-4 grid gap-3 rounded-xl border border-neonBlue/25 bg-black/50 p-3 text-xs text-textMain/80 backdrop-blur-md sm:grid-cols-3 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isBooted ? 1 : 0, y: isBooted ? 0 : 8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-neonBlue" />
            <span>Active HUD Mode: <strong className="text-neonBlue">{mode.toUpperCase()}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-cyberPink" />
            <span>Konami code enables Secret Hacker Theme</span>
          </div>
          <div className="text-aiGreen flex items-center gap-1.5 font-mono">
            <span className="live-beacon-dot" />
            <span>7 Verified Credentials // 220+ Tests</span>
          </div>
        </motion.footer>
      </div>

      <AnimatePresence>
        {!isBooted && (
          <BootSequence
            onStart={() => {
              setSoundEnabled(true);
              playBoot(true);
            }}
            onComplete={handleBootComplete}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
