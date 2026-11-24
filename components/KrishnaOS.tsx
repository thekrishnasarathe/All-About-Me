"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TerminalPanel } from "@/components/TerminalPanel";
import { portfolioData, sectionTitles } from "@/lib/portfolio-data";
import type { SectionId } from "@/lib/types";
import clsx from "clsx";
import {
  Binary,
  Bot,
  FileCode2,
  FolderKanban,
  PhoneCall,
  Terminal,
  UserRound,
  Briefcase,
  ExternalLink,
  Github,
  CheckCircle2,
  FileDown,
  Award,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType } from "react";

type WindowId = SectionId | "terminal";

interface KrishnaOSProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  onUnlockSecret: () => void;
  onClickSound: () => void;
}

const desktopApps: Array<{
  id: WindowId;
  title: string;
  icon: ComponentType<{ className?: string }>;
}> = [
    { id: "profile", title: "Profile.sys", icon: UserRound },
    { id: "experience", title: "Experience.exe", icon: Briefcase },
    { id: "projects", title: "Projects.exe", icon: FolderKanban },
    { id: "certificates", title: "Certs.key", icon: Award },
    { id: "skills", title: "Skills.ai", icon: Binary },
    { id: "journey", title: "Timeline.mem", icon: Bot },
    { id: "contact", title: "Contact.sys", icon: PhoneCall },
    { id: "terminal", title: "Terminal.cmd", icon: Terminal }
  ];

export function KrishnaOS({
  activeSection,
  onSectionChange,
  onUnlockSecret,
  onClickSound
}: KrishnaOSProps) {
  const [openWindows, setOpenWindows] = useState<WindowId[]>(["terminal", activeSection]);

  const handleAppClick = (appId: WindowId) => {
    onClickSound();
    if (appId === "terminal") {
      setOpenWindows((current) =>
        current.includes("terminal")
          ? current.filter((item) => item !== "terminal")
          : [...current, "terminal"]
      );
    } else {
      onSectionChange(appId);
      setOpenWindows((current) => {
        const hasTerm = current.includes("terminal");
        return hasTerm ? ["terminal", appId] : [appId];
      });
    }
  };

  const activeData = useMemo(() => {
    if (activeSection === "profile") {
      return (
        <div className="space-y-3">
          <div>
            <p className="font-display text-base font-bold text-white uppercase">{portfolioData.profile.name}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-cyberPink">{portfolioData.profile.role}</p>
          </div>
          <p className="text-xs sm:text-sm text-textMain/85 leading-relaxed">{portfolioData.profile.about}</p>
          <div className="rounded-lg border border-aiGreen/30 bg-aiGreen/5 p-2.5 font-mono text-xs text-aiGreen">
            {portfolioData.profile.goal}
          </div>
          <a
            href={portfolioData.resumePath}
            download
            className="inline-flex items-center gap-1.5 rounded-md border border-neonBlue/50 bg-neonBlue/15 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-neonBlue hover:bg-neonBlue/25"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Download Official Resume</span>
          </a>
        </div>
      );
    }

    if (activeSection === "experience") {
      return (
        <div className="space-y-3">
          {portfolioData.experience.map((exp) => (
            <div key={exp.company} className="space-y-3">
              <div className="rounded-lg border border-cyberPink/40 bg-cyberPink/10 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-white">{exp.company}</span>
                  <span className="font-mono text-[0.62rem] text-cyberPink">{exp.period}</span>
                </div>
                <p className="font-mono text-xs text-neonBlue">{exp.role}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 rounded badge-neon-green px-2 py-0.5 font-mono text-[0.6rem]">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{exp.badge}</span>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-1">
                {exp.deliverables.map((d) => (
                  <div key={d.title} className="cyber-card rounded-lg p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xs text-white font-semibold">{d.title}</p>
                      <span className="badge-neon-green rounded px-1.5 py-0.5 font-mono text-[0.58rem]">
                        {d.statusBadge}
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-textMain/75 leading-relaxed">{d.summary}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {d.techStack.map((tech) => (
                        <span key={tech} className="tech-chip text-[0.55rem]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {d.liveUrl && (
                      <a
                        href={d.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-aiGreen hover:text-white pt-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Launch Live Dashboard</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === "projects") {
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {portfolioData.projects.map((project) => {
            const isAward = project.badge?.includes("1st Place") || project.badge?.includes("Finalist");
            return (
              <div
                key={project.title}
                className={clsx(
                  "rounded-lg p-2.5 flex flex-col justify-between transition-all",
                  isAward ? "cyber-card-pink" : "cyber-card"
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-display text-xs font-semibold text-white">
                      {project.title}
                    </p>
                    {project.badge && (
                      <span
                        className={clsx(
                          "rounded px-1.5 py-0.5 font-mono text-[0.55rem] font-semibold",
                          isAward ? "badge-neon-gold" : "badge-neon-blue"
                        )}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>
                  {project.tagline && (
                    <p className="text-[0.62rem] text-neonBlue/80 font-mono mt-0.5">
                      {project.tagline}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-textMain/75 line-clamp-3 leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-white/10">
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-chip text-[0.55rem]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[0.64rem]">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-aiGreen hover:text-white"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Live</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-neonBlue hover:text-white"
                      >
                        <Github className="h-3 w-3" />
                        <span>Repo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (activeSection === "certificates") {
      return (
        <div className="space-y-2">
          {portfolioData.certificates.map((cert, index) => {
            const isAward = cert.category === "awards";
            return (
              <div
                key={cert.title + index}
                className={clsx(
                  "cyber-card rounded-lg p-2.5 space-y-1",
                  isAward && "border-cyberPink/40"
                )}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="font-display text-xs text-white font-semibold">{cert.title}</p>
                  <span className={isAward ? "badge-neon-gold rounded px-1.5 py-0.5 font-mono text-[0.55rem]" : "badge-neon-blue rounded px-1.5 py-0.5 font-mono text-[0.55rem]"}>
                    {cert.badge}
                  </span>
                </div>
                <p className="font-mono text-[0.6rem] text-neonBlue">{cert.issuer} · {cert.date}</p>
                {cert.prize && (
                  <span className="inline-block rounded bg-neonBlue/10 border border-neonBlue/30 px-1.5 py-0.5 font-mono text-[0.58rem] text-neonBlue font-semibold">
                    {cert.prize}
                  </span>
                )}
                {cert.verificationCode && (
                  <div className="flex items-center justify-between rounded bg-black/60 p-1.5 font-mono text-[0.58rem] text-aiGreen">
                    <span>ID: {cert.verificationCode}</span>
                    {cert.verificationUrl && (
                      <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="text-neonBlue underline">
                        Verify Credential
                      </a>
                    )}
                  </div>
                )}
                <p className="text-[0.68rem] text-textMain/75 leading-relaxed">{cert.summary}</p>
              </div>
            );
          })}
        </div>
      );
    }

    if (activeSection === "skills") {
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {portfolioData.skills.map((skill) => (
            <div key={skill.name} className="cyber-card rounded-lg p-2.5">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.18em] text-neonBlue">
                {skill.name}
              </p>
              <p className="mt-1 font-mono text-xs text-textMain/75 leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === "journey") {
      return (
        <div className="space-y-2">
          {portfolioData.journey.map((item, idx) => (
            <div key={item.year + idx} className="cyber-card rounded-md p-2 flex items-start gap-2.5">
              <span className="font-display text-[0.66rem] uppercase tracking-[0.16em] text-neonBlue whitespace-nowrap">
                {item.year}
              </span>
              <p className="text-xs text-textMain/80 leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2.5 text-sm text-textMain">
        <p className="font-mono text-xs">Email: <span className="text-white">{portfolioData.contact.email}</span></p>
        <p className="font-mono text-xs">Phone: <span className="text-white">{portfolioData.contact.phone}</span></p>
        <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="block font-mono text-xs text-neonBlue hover:underline">
          GitHub: {portfolioData.contact.github}
        </a>
        <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="block font-mono text-xs text-cyberPink hover:underline">
          LinkedIn: {portfolioData.contact.linkedin}
        </a>
        <a
          href={portfolioData.resumePath}
          download
          className="inline-flex items-center gap-1.5 rounded-md border border-neonBlue/40 bg-neonBlue/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-neonBlue hover:bg-neonBlue/20"
        >
          <FileDown className="h-3.5 w-3.5" />
          <span>Download Resume PDF</span>
        </a>
      </div>
    );
  }, [activeSection]);

  return (
    <motion.section
      key="boss-os"
      className="relative flex min-h-[540px] flex-col overflow-hidden rounded-2xl border border-neonBlue/30 bg-black/40 p-3.5 shadow-neon backdrop-blur-xl sm:p-5 lg:h-[74vh]"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,240,255,0.12),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(255,47,209,0.12),transparent_35%)] pointer-events-none" />

      {/* OS Top Bar */}
      <div className="relative z-10 mb-3 flex items-center justify-between rounded-lg border border-neonBlue/25 bg-black/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-aiGreen animate-pulse shadow-[0_0_8px_#00FF9C]" />
          <p className="font-display text-xs uppercase tracking-[0.18em] text-neonBlue">SaratheOS Desktop v3.0</p>
        </div>
        <p className="font-mono text-xs text-textMain/75 hidden sm:block">Open apps &amp; run terminal commands</p>
      </div>

      {/* Desktop App Icons */}
      <div className="relative z-10 flex gap-2 overflow-x-auto pb-1.5 scrollbar-none sm:grid sm:grid-cols-4 lg:grid-cols-8">
        {desktopApps.map((app) => {
          const Icon = app.icon;
          const isOpen = openWindows.includes(app.id);
          return (
            <button
              key={app.id}
              type="button"
              className={clsx(
                "flex shrink-0 sm:shrink min-w-[90px] sm:min-w-0 flex-col items-center justify-center rounded-lg border px-2 py-2 transition",
                isOpen
                  ? "border-neonBlue bg-neonBlue/20 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  : "border-neonBlue/30 bg-black/50 hover:border-neonBlue/70 hover:bg-neonBlue/15"
              )}
              onClick={() => handleAppClick(app.id)}
            >
              <Icon className="h-4 w-4 text-neonBlue sm:h-5 sm:w-5" />
              <p className="mt-1.5 text-center font-mono text-[0.62rem] text-textMain truncate w-full">
                {app.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Windows Grid */}
      <div
        className={clsx(
          "relative z-10 mt-3 flex-1 min-h-0",
          openWindows.includes("terminal") && openWindows.some((id) => id !== "terminal")
            ? "grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_0.9fr]"
            : "grid grid-cols-1 gap-3"
        )}
      >
        <AnimatePresence>
          {openWindows.includes("terminal") && (
            <motion.div
              key="terminal-window"
              className="rounded-xl border border-aiGreen/30 bg-black/60 p-2 shadow-[0_0_20px_rgba(0,255,156,0.15)] flex flex-col min-h-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <TerminalPanel onNavigateSection={onSectionChange} onUnlockSecret={onUnlockSecret} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {openWindows.some((windowId) => windowId !== "terminal") && (
            <motion.div
              key="content-window"
              className="scrollbar-thin min-h-0 overflow-y-auto rounded-xl border border-neonBlue/30 bg-black/65 p-3 sm:p-4 shadow-[0_0_20px_rgba(0,240,255,0.15)] flex flex-col"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
            >
              <div className="mb-3 flex items-center justify-between border-b border-neonBlue/25 pb-2">
                <p className="font-display text-xs uppercase tracking-[0.18em] text-neonBlue font-semibold">
                  {sectionTitles[activeSection]}
                </p>
                <div className="flex items-center gap-2">
                  <FileCode2 className="h-4 w-4 text-neonBlue" />
                  <button
                    type="button"
                    onClick={() => setOpenWindows((cur) => cur.filter((id) => id === "terminal"))}
                    className="rounded p-0.5 text-textMain/50 hover:bg-white/10 hover:text-white transition-colors"
                    title="Close Window"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {activeData}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
