"use client";

import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import type { SectionId, ProjectGroup, Project, CertificateCategory } from "@/lib/types";
import clsx from "clsx";
import {
  ExternalLink,
  Github,
  Award,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Briefcase,
  Terminal,
  Activity,
  ShieldCheck,
  Medal
} from "lucide-react";
import { useState, useMemo } from "react";

interface CyberpunkCityProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onClickSound: () => void;
}

const districts = [
  { id: "projects", label: "Innovation Lab", hint: "Deployed Systems & Hackathons", icon: Layers },
  { id: "experience", label: "Industrial Sector", hint: "QuantNexa SDE Internship", icon: Briefcase },
  { id: "certificates", label: "Credential Vault", hint: "Pearson & National Awards", icon: Award },
  { id: "skills", label: "Neural Matrix", hint: "Languages, AI & Engineering", icon: Cpu },
  { id: "profile", label: "AI Core Profile", hint: "Identity & Superintelligence Vision", icon: Terminal },
  { id: "journey", label: "Timeline Arena", hint: "Academic & Engineering Evolution", icon: Activity },
  { id: "contact", label: "Signal Gateway", hint: "Direct Comms & Links", icon: Sparkles }
] as const;

const projectFilterTabs: Array<{ id: ProjectGroup; label: string }> = [
  { id: "all", label: "All Projects" },
  { id: "featured", label: "Featured & Awards" },
  { id: "internship", label: "QuantNexa SDE" },
  { id: "ai", label: "Applied AI" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "mobile", label: "Mobile & Offline" }
];

const certFilterTabs: Array<{ id: CertificateCategory; label: string }> = [
  { id: "all", label: "All Credentials" },
  { id: "awards", label: "🏆 Awards & Prizes" },
  { id: "certifications", label: "📜 Pearson VUE" },
  { id: "hackathons", label: "⚡ Hackathons" }
];

export function CyberpunkCity({
  activeSection,
  onSelectSection,
  onClickSound
}: CyberpunkCityProps) {
  const [selectedGroup, setSelectedGroup] = useState<ProjectGroup>("all");
  const [selectedCertCat, setSelectedCertCat] = useState<CertificateCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedGroup === "all") return portfolioData.projects;
    if (selectedGroup === "featured") return portfolioData.projects.filter((p) => p.featured);
    return portfolioData.projects.filter((p) => p.group === selectedGroup);
  }, [selectedGroup]);

  const filteredCertificates = useMemo(() => {
    if (selectedCertCat === "all") return portfolioData.certificates;
    return portfolioData.certificates.filter((c) => c.category === selectedCertCat);
  }, [selectedCertCat]);

  return (
    <motion.section
      key="cyber-city"
      className="relative flex min-h-[540px] flex-col overflow-hidden rounded-2xl border border-cyberPink/40 bg-black/40 p-3.5 shadow-cyber backdrop-blur-xl sm:p-5 lg:h-[74vh]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.42 }}
    >
      <div className="absolute inset-0 bg-cyber-grid bg-[length:36px_36px] opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(255,47,209,0.14),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(0,240,255,0.12),transparent_50%)] pointer-events-none" />

      {/* Top Districts Bar */}
      <div className="relative z-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-4 lg:grid-cols-7">
        {districts.map((district, index) => {
          const isActive = district.id === activeSection;
          const Icon = district.icon;

          return (
            <motion.button
              key={district.id}
              type="button"
              className={clsx(
                "group relative flex shrink-0 sm:shrink min-w-[130px] sm:min-w-0 flex-col justify-between rounded-xl border p-2.5 text-left backdrop-blur-md transition-all duration-300",
                isActive
                  ? "border-cyberPink bg-cyberPink/20 shadow-[0_0_20px_rgba(255,47,209,0.45)]"
                  : "border-cyberPink/30 bg-black/50 hover:border-cyberPink/70 hover:bg-cyberPink/10"
              )}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.28 }}
              onClick={() => {
                onClickSound();
                onSelectSection(district.id);
              }}
            >
              <div className="flex items-center justify-between">
                <Icon
                  className={clsx(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-cyberPink" : "text-neonBlue group-hover:text-cyberPink"
                  )}
                />
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyberPink shadow-[0_0_8px_#FF2FD1]" />
                )}
              </div>
              <div className="mt-1.5">
                <p className="font-display text-xs uppercase tracking-wider text-white font-semibold whitespace-nowrap">
                  {district.label}
                </p>
                <p className="font-body text-[0.62rem] text-textMain/70 truncate">
                  {district.hint}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Content Panel */}
      <div className="relative z-10 mt-3 flex flex-1 flex-col min-h-0 overflow-hidden rounded-xl border border-neonBlue/30 bg-black/60 p-3 sm:p-4">
        {/* ========================================================= */}
        {/* PROJECTS SECTION IN CITY                                  */}
        {/* ========================================================= */}
        {activeSection === "projects" && (
          <div className="flex flex-1 flex-col min-h-0">
            {/* Filter Pills */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-neonBlue/20 pb-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {projectFilterTabs.map((tab) => {
                  const isTabActive = selectedGroup === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={clsx(
                        "rounded-full px-3 py-1 font-display text-[0.64rem] uppercase tracking-wider transition-all",
                        isTabActive
                          ? "border border-neonBlue bg-neonBlue/25 text-neonBlue shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                          : "border border-white/10 bg-white/5 text-textMain/75 hover:border-neonBlue/40 hover:text-white"
                      )}
                      onClick={() => {
                        onClickSound();
                        setSelectedGroup(tab.id);
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-[0.62rem] text-textMain/50">
                {filteredProjects.length} Systems Active
              </span>
            </div>

            {/* Scrollable Project Cards Grid */}
            <div className="scrollbar-thin grid flex-1 min-h-0 grid-cols-1 gap-3.5 overflow-y-auto pr-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => {
                const isAward = project.badge?.includes("1st Place") || project.badge?.includes("Finalist");
                const hasLive = Boolean(project.link);

                return (
                  <motion.div
                    key={project.title}
                    className={clsx(
                      "scanline-overlay group relative flex flex-col justify-between rounded-xl p-3.5 transition-all duration-300",
                      isAward ? "cyber-card-pink" : "cyber-card"
                    )}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-textMain/60">
                          {project.category}
                        </span>
                        {project.badge && (
                          <span
                            className={clsx(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider",
                              isAward ? "badge-neon-gold" : "badge-neon-blue"
                            )}
                          >
                            {isAward && <Award className="h-3 w-3" />}
                            {project.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="mt-1.5 font-display text-sm font-semibold tracking-wide text-white group-hover:text-neonBlue transition-colors sm:text-base">
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="mt-0.5 text-[0.72rem] text-neonBlue/85 font-mono">
                          {project.tagline}
                        </p>
                      )}

                      {/* Metrics Pill if available */}
                      {project.metrics && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-aiGreen/30 bg-aiGreen/10 px-2 py-0.5 font-mono text-[0.62rem] text-aiGreen">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{project.metrics}</span>
                        </div>
                      )}

                      {/* Overview */}
                      <p className="mt-2 text-xs leading-relaxed text-textMain/75 line-clamp-3">
                        {project.overview}
                      </p>

                      {/* Key achievements */}
                      {project.keyAchievements && project.keyAchievements.length > 0 && (
                        <ul className="mt-2 space-y-1 border-t border-white/5 pt-2 font-mono text-[0.66rem] text-textMain/70">
                          {project.keyAchievements.slice(0, 2).map((achievement, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-neonBlue">▹</span>
                              <span className="line-clamp-1">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer: Tech Stack & Actions */}
                    <div className="mt-3.5 border-t border-white/10 pt-2.5">
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="tech-chip">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[0.68rem]">
                        <div className="flex items-center gap-3">
                          {hasLive && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="live-beacon inline-flex items-center gap-1.5 text-aiGreen hover:text-white transition-colors"
                            >
                              <span className="live-beacon-dot" />
                              <span className="font-semibold uppercase tracking-wider">Live Demo</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}

                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-neonBlue/85 hover:text-white transition-colors"
                            >
                              <Github className="h-3 w-3" />
                              <span>Source</span>
                            </a>
                          )}

                          {project.backendLink && (
                            <a
                              href={project.backendLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-cyberPink/85 hover:text-white transition-colors"
                            >
                              <Terminal className="h-3 w-3" />
                              <span>API</span>
                            </a>
                          )}
                        </div>

                        <button
                          type="button"
                          className="text-[0.62rem] uppercase tracking-wider text-textMain/60 hover:text-neonBlue underline underline-offset-2"
                          onClick={() => setSelectedProject(project)}
                        >
                          Deep Dive
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* EXPERIENCE SECTION IN CITY                                */}
        {/* ========================================================= */}
        {activeSection === "experience" && (
          <div className="flex flex-1 flex-col min-h-0">
            {portfolioData.experience.map((exp) => (
              <div key={exp.company} className="flex flex-1 flex-col min-h-0">
                {/* Header banner */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-cyberPink/30 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-md border border-cyberPink/40 bg-cyberPink/15 px-2.5 py-0.5 font-display text-[0.66rem] uppercase tracking-widest text-cyberPink">
                        <Briefcase className="h-3 w-3" />
                        {exp.type}
                      </span>
                      <span className="font-mono text-xs text-textMain/60">{exp.period}</span>
                    </div>
                    <h2 className="mt-1 font-display text-base font-semibold text-white sm:text-lg">
                      {exp.role} <span className="text-cyberPink">@</span> {exp.company}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-aiGreen/40 bg-aiGreen/10 px-3 py-1 font-mono text-xs text-aiGreen shadow-[0_0_15px_rgba(0,255,156,0.25)]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{exp.badge}</span>
                  </div>
                </div>

                <p className="mb-3 text-xs leading-relaxed text-textMain/80">
                  {exp.summary}
                </p>

                {/* 3 Deliverables Cards */}
                <div className="scrollbar-thin grid flex-1 min-h-0 grid-cols-1 gap-3 overflow-y-auto pr-1 lg:grid-cols-3">
                  {exp.deliverables.map((deliv, index) => (
                    <motion.div
                      key={deliv.title}
                      className="scanline-overlay cyber-card-green relative flex flex-col justify-between rounded-xl p-3.5"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                    >
                      <div>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="inline-flex items-center gap-1 rounded-full badge-neon-green px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider">
                            <CheckCircle2 className="h-3 w-3" />
                            {deliv.statusBadge}
                          </span>
                          <span className="font-mono text-[0.58rem] text-textMain/50">
                            System 0{index + 1}
                          </span>
                        </div>

                        <h3 className="mt-2 font-display text-sm font-semibold tracking-wide text-white">
                          {deliv.title}
                        </h3>
                        <p className="mt-0.5 font-mono text-[0.68rem] text-neonBlue">
                          {deliv.subtitle}
                        </p>

                        <div className="mt-2 rounded-md border border-aiGreen/25 bg-black/60 p-2 font-mono text-[0.64rem] text-aiGreen/90">
                          {deliv.metrics}
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-textMain/75">
                          {deliv.summary}
                        </p>

                        <ul className="mt-2.5 space-y-1.5 border-t border-white/10 pt-2 font-mono text-[0.64rem] text-textMain/70">
                          {deliv.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-aiGreen">▹</span>
                              <span className="leading-snug">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3.5 border-t border-white/10 pt-2.5">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {deliv.techStack.map((tech) => (
                            <span key={tech} className="tech-chip text-[0.58rem]">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {deliv.liveUrl && (
                          <a
                            href={deliv.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="live-beacon inline-flex items-center gap-1.5 font-mono text-xs text-aiGreen hover:text-white"
                          >
                            <span className="live-beacon-dot" />
                            <span>Live Dashboard</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* CERTIFICATES SECTION IN CITY                              */}
        {/* ========================================================= */}
        {activeSection === "certificates" && (
          <div className="flex flex-1 flex-col min-h-0">
            {/* Filter Pills */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-neonBlue/20 pb-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {certFilterTabs.map((tab) => {
                  const isTabActive = selectedCertCat === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={clsx(
                        "rounded-full px-3 py-1 font-display text-[0.64rem] uppercase tracking-wider transition-all",
                        isTabActive
                          ? "border border-neonBlue bg-neonBlue/25 text-neonBlue shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                          : "border border-white/10 bg-white/5 text-textMain/75 hover:border-neonBlue/40 hover:text-white"
                      )}
                      onClick={() => {
                        onClickSound();
                        setSelectedCertCat(tab.id);
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-[0.62rem] text-textMain/50">
                {filteredCertificates.length} Verified Credentials
              </span>
            </div>

            {/* Scrollable Certificate Cards Grid */}
            <div className="scrollbar-thin grid flex-1 min-h-0 grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert, index) => {
                const isAward = cert.category === "awards";
                return (
                  <motion.div
                    key={cert.title + index}
                    className={clsx(
                      "scanline-overlay group relative flex flex-col justify-between rounded-xl p-3.5 transition-all duration-300",
                      isAward ? "cyber-card-pink" : "cyber-card"
                    )}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.28 }}
                  >
                    <div>
                      {/* Top Bar: Issuer & Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-textMain/60">
                          {cert.issuer}
                        </span>
                        <span
                          className={clsx(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider",
                            isAward ? "badge-neon-gold" : "badge-neon-blue"
                          )}
                        >
                          {isAward ? <Medal className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                          {cert.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-1.5 font-display text-sm font-semibold tracking-wide text-white group-hover:text-neonBlue transition-colors break-words">
                        {cert.title}
                      </h3>

                      {/* Cash Prize if applicable */}
                      {cert.prize && (
                        <div className="mt-1.5 inline-flex items-center gap-1 rounded-md border border-neonBlue/40 bg-neonBlue/15 px-2 py-0.5 font-display text-[0.68rem] text-neonBlue font-semibold shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                          <span>{cert.prize}</span>
                        </div>
                      )}

                      {/* Verification info if present */}
                      {cert.verificationCode && (
                        <div className="mt-2 flex items-center justify-between rounded-md border border-aiGreen/30 bg-black/60 p-2 font-mono text-[0.64rem] text-aiGreen">
                          <span>Credential ID: <strong>{cert.verificationCode}</strong></span>
                          {cert.verificationUrl && (
                            <a
                              href={cert.verificationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 underline underline-offset-2 text-neonBlue hover:text-white"
                            >
                              <span>Verify</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          )}
                        </div>
                      )}

                      <p className="mt-2 text-xs leading-relaxed text-textMain/75">
                        {cert.summary}
                      </p>
                    </div>

                    <div className="mt-3.5 border-t border-white/10 pt-2.5">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="tech-chip text-[0.58rem]">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between font-mono text-[0.62rem] text-textMain/50">
                        <span>Issued: {cert.date}</span>
                        <span className="text-aiGreen">✓ Authenticated</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SKILLS SECTION IN CITY                                    */}
        {/* ========================================================= */}
        {activeSection === "skills" && (
          <div className="scrollbar-thin grid flex-1 min-h-0 grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {portfolioData.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="cyber-card flex flex-col justify-between rounded-xl p-3.5"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xs uppercase tracking-[0.18em] text-neonBlue">
                      {skill.name}
                    </p>
                    <span className="font-mono text-[0.62rem] text-textMain/40">
                      Module 0{index + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-textMain/85 font-mono">
                    {skill.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-neonBlue via-cyberPink to-aiGreen opacity-60" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* OTHER SECTIONS (PROFILE / JOURNEY / CONTACT)             */}
        {/* ========================================================= */}
        {activeSection !== "skills" && activeSection !== "projects" && activeSection !== "experience" && activeSection !== "certificates" && (
          <motion.div
            className="flex flex-1 flex-col items-center justify-center p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="max-w-md text-sm text-textMain/80">
              District active: <span className="text-neonBlue font-semibold uppercase">{activeSection}</span>.
              Explore interactive telemetry cards in the side panel or switch back to{" "}
              <span className="text-cyberPink font-semibold">Innovation Lab (Projects)</span>,{" "}
              <span className="text-aiGreen font-semibold">Industrial Sector (Experience)</span>, or{" "}
              <span className="text-neonBlue font-semibold">Credential Vault (Certificates)</span>.
            </p>
          </motion.div>
        )}
      </div>

      {/* ========================================================= */}
      {/* PROJECT DEEP DIVE MODAL                                   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="cyber-card relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-2 border-neonBlue/60 bg-[#080d1a] p-5 shadow-[0_0_60px_rgba(0,240,255,0.35)] sm:p-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-neonBlue/30 pb-3">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-neonBlue">
                    {selectedProject.category}
                  </span>
                  <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.tagline && (
                    <p className="mt-0.5 font-mono text-xs text-textMain/70">
                      {selectedProject.tagline}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1 font-mono text-xs text-textMain hover:bg-white/10"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕ Close
                </button>
              </div>

              {selectedProject.badge && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full badge-neon-gold px-3 py-1 font-mono text-xs font-semibold">
                  <Award className="h-3.5 w-3.5" />
                  <span>{selectedProject.badge}</span>
                </div>
              )}

              {selectedProject.metrics && (
                <div className="mt-3 rounded-lg border border-aiGreen/30 bg-aiGreen/10 p-2.5 font-mono text-xs text-aiGreen">
                  <strong>Verification & Metrics:</strong> {selectedProject.metrics}
                </div>
              )}

              <div className="mt-4">
                <h4 className="font-display text-xs uppercase tracking-wider text-white">System Architecture & Overview</h4>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-textMain/80">
                  {selectedProject.overview}
                </p>
              </div>

              {selectedProject.keyAchievements && (
                <div className="mt-4">
                  <h4 className="font-display text-xs uppercase tracking-wider text-neonBlue">Key Technical Highlights</h4>
                  <ul className="mt-2 space-y-1.5 font-mono text-xs text-textMain/80">
                    {selectedProject.keyAchievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-aiGreen">✓</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4">
                <h4 className="font-display text-xs uppercase tracking-wider text-white">Technologies & Tools</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="tech-chip text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-neonBlue px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] transition hover:bg-white"
                  >
                    <span>Launch Live System</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-white hover:border-neonBlue hover:bg-neonBlue/10"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                )}
                {selectedProject.backendLink && (
                  <a
                    href={selectedProject.backendLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-cyberPink/40 bg-cyberPink/10 px-4 py-2 font-mono text-xs font-semibold text-cyberPink hover:bg-cyberPink/20"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Backend Endpoint</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
