"use client";

import { motion } from "framer-motion";
import { portfolioData, sectionTitles } from "@/lib/portfolio-data";
import { ContactPanel } from "@/components/ContactPanel";
import type { SectionId } from "@/lib/types";
import { CheckCircle2, ExternalLink, Github, FileDown, Terminal } from "lucide-react";

interface SectionPanelProps {
  activeSection: SectionId;
}

export function SectionPanel({ activeSection }: SectionPanelProps) {
  const getSectionNum = () => {
    switch (activeSection) {
      case "profile": return "01";
      case "experience": return "02";
      case "projects": return "03";
      case "certificates": return "04";
      case "skills": return "05";
      case "journey": return "06";
      case "contact": return "07";
    }
  };

  return (
    <motion.aside
      key={activeSection}
      className="flex flex-col min-h-[500px] overflow-hidden rounded-2xl border border-neonBlue/30 bg-black/50 p-4 shadow-neon backdrop-blur-xl sm:p-5 lg:h-[74vh]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neonBlue/20 pb-3">
        <p className="font-display text-[0.7rem] uppercase tracking-[0.24em] text-neonBlue">
          {sectionTitles[activeSection]}
        </p>
        <span className="font-mono text-[0.6rem] text-textMain/50">
          SYS // {getSectionNum()}
        </span>
      </div>

      {/* Main scrollable body */}
      <div className="scrollbar-thin flex-1 min-h-0 overflow-y-auto pr-1 mt-3 space-y-3">
        {/* ========================================================= */}
        {/* PROFILE                                                   */}
        {/* ========================================================= */}
        {activeSection === "profile" && (
          <div className="space-y-3.5">
            <div>
              <p className="font-display text-2xl font-bold uppercase tracking-[0.1em] text-white">
                {portfolioData.profile.name}
              </p>
              <p className="mt-1 font-mono text-xs text-cyberPink">
                {portfolioData.profile.role}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-[0.65rem]">
              <div className="rounded-lg border border-neonBlue/30 bg-black/60 p-2">
                <span className="text-textMain/50">EDUCATION</span>
                <p className="font-semibold text-white">B.Tech CSE (AI & DS)</p>
                <p className="text-neonBlue">SGSU Bhopal · 8.26 CGPA</p>
              </div>
              <div className="rounded-lg border border-aiGreen/30 bg-black/60 p-2">
                <span className="text-textMain/50">NATIONAL WIN</span>
                <p className="font-semibold text-white">1st Place / 100+ Teams</p>
                <p className="text-aiGreen">BGI Hackathon 2026</p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs leading-relaxed text-textMain/85">
              {portfolioData.profile.about}
            </div>

            <div className="rounded-xl border border-aiGreen/20 bg-aiGreen/5 p-3 font-mono text-xs text-aiGreen/90">
              <span className="text-[0.65rem] uppercase tracking-wider text-aiGreen block mb-1">Mission Objective</span>
              {portfolioData.profile.goal}
            </div>

            <a
              href={portfolioData.resumePath}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neonBlue/50 bg-neonBlue/15 px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-neonBlue transition hover:border-neonBlue hover:bg-neonBlue/25 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <FileDown className="h-4 w-4" />
              <span>Download Official Resume PDF</span>
            </a>
          </div>
        )}

        {/* ========================================================= */}
        {/* EXPERIENCE                                                */}
        {/* ========================================================= */}
        {activeSection === "experience" && (
          <div className="space-y-3.5">
            {portfolioData.experience.map((exp) => (
              <div key={exp.company} className="space-y-3">
                <div className="rounded-xl border border-cyberPink/30 bg-cyberPink/5 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-semibold text-white uppercase tracking-wider">
                      {exp.company}
                    </span>
                    <span className="font-mono text-[0.62rem] text-cyberPink">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-neonBlue">{exp.role}</p>
                  <p className="mt-1.5 text-xs text-textMain/80 leading-relaxed">{exp.summary}</p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full badge-neon-green px-2.5 py-0.5 font-mono text-[0.62rem]">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{exp.badge}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="font-display text-[0.66rem] uppercase tracking-[0.16em] text-textMain/60">
                    Flagship Deliverables (3 Systems)
                  </p>
                  {exp.deliverables.map((item) => (
                    <div
                      key={item.title}
                      className="scanline-overlay cyber-card rounded-xl p-3 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-xs font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="font-mono text-[0.62rem] text-neonBlue">
                            {item.subtitle}
                          </p>
                        </div>
                        <span className="badge-neon-green rounded px-1.5 py-0.5 font-mono text-[0.58rem] font-semibold whitespace-nowrap">
                          {item.statusBadge}
                        </span>
                      </div>

                      <p className="text-[0.72rem] text-textMain/75 leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.techStack.map((t) => (
                          <span key={t} className="tech-chip text-[0.58rem]">
                            {t}
                          </span>
                        ))}
                      </div>

                      {item.liveUrl && (
                        <div className="pt-1.5 border-t border-white/5">
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="live-beacon inline-flex items-center gap-1 font-mono text-[0.65rem] text-aiGreen hover:text-white"
                          >
                            <span className="live-beacon-dot" />
                            <span>Live Cloud Dashboard</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* PROJECTS                                                  */}
        {/* ========================================================= */}
        {activeSection === "projects" && (
          <div className="space-y-3">
            <p className="font-mono text-[0.65rem] text-textMain/60">
              Showing {portfolioData.projects.length} verified production systems &amp; hackathons:
            </p>
            {portfolioData.projects.map((project) => {
              const isAward = project.badge?.includes("1st Place") || project.badge?.includes("Finalist");
              return (
                <div
                  key={project.title}
                  className="scanline-overlay cyber-card rounded-xl p-3 space-y-1.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-xs font-semibold text-white">
                        {project.title}
                      </p>
                      <p className="font-mono text-[0.6rem] uppercase tracking-wider text-neonBlue/80">
                        {project.category}
                      </p>
                    </div>
                    {project.badge && (
                      <span
                        className={
                          isAward
                            ? "badge-neon-gold rounded px-1.5 py-0.5 font-mono text-[0.56rem] font-semibold"
                            : "badge-neon-blue rounded px-1.5 py-0.5 font-mono text-[0.56rem]"
                        }
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {project.metrics && (
                    <div className="rounded border border-aiGreen/20 bg-aiGreen/5 px-2 py-0.5 font-mono text-[0.6rem] text-aiGreen">
                      {project.metrics}
                    </div>
                  )}

                  <p className="text-[0.72rem] text-textMain/75 leading-relaxed">
                    {project.overview}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-chip text-[0.58rem]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/5 font-mono text-[0.64rem]">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="live-beacon inline-flex items-center gap-1 text-aiGreen hover:text-white"
                      >
                        <span className="live-beacon-dot" />
                        <span>Launch App</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-neonBlue/85 hover:text-white"
                      >
                        <Github className="h-3 w-3" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.backendLink && (
                      <a
                        href={project.backendLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-cyberPink/85 hover:text-white"
                      >
                        <Terminal className="h-3 w-3" />
                        <span>API</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* CERTIFICATES                                              */}
        {/* ========================================================= */}
        {activeSection === "certificates" && (
          <div className="space-y-3">
            <p className="font-mono text-[0.65rem] text-textMain/60">
              {portfolioData.certificates.length} Verified International &amp; National Credentials:
            </p>
            {portfolioData.certificates.map((cert, index) => {
              const isAward = cert.category === "awards";
              return (
                <div
                  key={cert.title + index}
                  className="scanline-overlay cyber-card rounded-xl p-3 space-y-1.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-xs font-semibold text-white">
                        {cert.title}
                      </p>
                      <p className="font-mono text-[0.6rem] uppercase tracking-wider text-neonBlue/80">
                        {cert.issuer}
                      </p>
                    </div>
                    <span
                      className={
                        isAward
                          ? "badge-neon-gold rounded px-1.5 py-0.5 font-mono text-[0.56rem] font-semibold"
                          : "badge-neon-blue rounded px-1.5 py-0.5 font-mono text-[0.56rem]"
                      }
                    >
                      {cert.badge}
                    </span>
                  </div>

                  {cert.prize && (
                    <div className="inline-flex items-center gap-1 rounded border border-neonBlue/40 bg-neonBlue/15 px-2 py-0.5 font-mono text-[0.6rem] text-neonBlue font-semibold">
                      <span>{cert.prize}</span>
                    </div>
                  )}

                  {cert.verificationCode && (
                    <div className="flex items-center justify-between rounded border border-aiGreen/20 bg-black/60 px-2 py-1 font-mono text-[0.6rem] text-aiGreen">
                      <span>ID: {cert.verificationCode}</span>
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-neonBlue hover:text-white underline underline-offset-2"
                        >
                          <span>Verify</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  )}

                  <p className="text-[0.72rem] text-textMain/75 leading-relaxed">
                    {cert.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="tech-chip text-[0.58rem]">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[0.62rem] text-textMain/50">
                    <span>{cert.date}</span>
                    <span className="text-aiGreen">✓ Authenticated</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* SKILLS                                                    */}
        {/* ========================================================= */}
        {activeSection === "skills" && (
          <div className="space-y-2.5">
            {portfolioData.skills.map((skill) => (
              <div key={skill.name} className="cyber-card rounded-xl p-3">
                <p className="font-display text-[0.68rem] uppercase tracking-[0.16em] text-neonBlue">
                  {skill.name}
                </p>
                <p className="mt-1 text-xs text-textMain/80 font-mono leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* JOURNEY                                                   */}
        {/* ========================================================= */}
        {activeSection === "journey" && (
          <div className="space-y-2.5">
            {portfolioData.journey.map((step, idx) => (
              <div key={step.year + idx} className="cyber-card rounded-xl p-2.5 flex items-start gap-3">
                <span className="font-display text-[0.68rem] uppercase tracking-wider text-neonBlue whitespace-nowrap pt-0.5">
                  {step.year}
                </span>
                <p className="text-xs text-textMain/85 leading-relaxed">{step.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* CONTACT                                                   */}
        {/* ========================================================= */}
        {activeSection === "contact" && (
          <div className="space-y-3">
            <ContactPanel />
            <a
              href={portfolioData.resumePath}
              download
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-neonBlue/40 bg-neonBlue/10 px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-neonBlue transition hover:bg-neonBlue/20"
            >
              <FileDown className="h-4 w-4" />
              <span>Download Official Resume PDF</span>
            </a>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
