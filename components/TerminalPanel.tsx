"use client";

import { FormEvent, useMemo, useState } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import type { SectionId } from "@/lib/types";

interface HistoryItem {
  command: string;
  output: string[];
}

interface TerminalPanelProps {
  onNavigateSection: (section: SectionId) => void;
  onUnlockSecret: () => void;
}

const terminalCommands = [
  "help",
  "about",
  "experience",
  "projects",
  "certificates",
  "skills",
  "journey",
  "resume",
  "contact",
  "clear"
];

export function TerminalPanel({
  onNavigateSection,
  onUnlockSecret
}: TerminalPanelProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "boot",
      output: [
        "Krishna.AI Terminal v3.0 initialized.",
        "Type 'help' to list available commands. Try 'experience', 'projects', or 'certificates'."
      ]
    }
  ]);

  const skillPreview = useMemo(
    () => portfolioData.skills.map((skill) => "- " + skill.name + ": " + skill.description),
    []
  );

  const executeCommand = (rawCommand: string): string[] => {
    const command = rawCommand.toLowerCase().trim();

    if (!command) return [];

    if (command === "help") {
      return [
        "Available commands:",
        ...terminalCommands,
        "unlock secret"
      ];
    }

    if (command === "about") {
      onNavigateSection("profile");
      return [portfolioData.profile.role, portfolioData.profile.about];
    }

    if (command === "experience" || command === "internship") {
      onNavigateSection("experience");
      return [
        "QuantNexa.ai Pvt. Ltd. — Software Development Engineer (SDE) Intern (Oct 2026 – Nov 2026)",
        "Verification: 3 Systems Shipped · 220+ Automated Tests Passed",
        "- SmartEd Studio v3.0: 60/60 Pytest Passed (Multimodal Vision Evaluator)",
        "- Meet Intelligence: 135+ Tests Passed (Zero-Echo Audio Google Meet Bot, Live on Render)",
        "- Sentinelytics v3.0: 27/27 Pytest Passed (Multi-Channel Sentiment & Sarcasm Intelligence)",
        "Active Live URL: https://meet-intelligence-api.onrender.com/dashboard"
      ];
    }

    if (command === "certificates" || command === "certs") {
      onNavigateSection("certificates");
      return [
        "Authenticated Credentials & National Honors (" + portfolioData.certificates.length + " total):",
        ...portfolioData.certificates.map(
          (c) => "- " + c.title + " [" + c.badge + (c.verificationCode ? " · ID: " + c.verificationCode : "") + "]"
        ),
        "Visit verify.certiport.com for official Pearson VUE credential verifications."
      ];
    }

    if (command === "skills") {
      onNavigateSection("skills");
      return ["Technical Skill Groups:", ...skillPreview];
    }

    if (command === "projects") {
      onNavigateSection("projects");
      return [
        "Verified Systems & Hackathons (" + portfolioData.projects.length + " total):",
        ...portfolioData.projects.map((p) => "- " + p.title + " [" + (p.badge || p.category) + "]")
      ];
    }

    if (command === "journey") {
      onNavigateSection("journey");
      return [
        "Education & Leadership Timeline:",
        ...portfolioData.journey.map((item) => "- " + item.year + ": " + item.label)
      ];
    }

    if (command === "resume") {
      return [
        "Official Resume Ready: Krishna Sarathe — B.Tech CSE (AI & DS)",
        "Click the link below or the download button in the profile pane."
      ];
    }

    if (command === "contact") {
      onNavigateSection("contact");
      return [
        "Email: " + portfolioData.contact.email,
        "Phone: " + portfolioData.contact.phone,
        "GitHub: " + portfolioData.contact.github,
        "LinkedIn: " + portfolioData.contact.linkedin
      ];
    }

    if (command === "unlock secret") {
      onUnlockSecret();
      return [
        "Secret AI Visualization Mode unlocked.",
        "Neural signal amplification engaged."
      ];
    }

    if (command === "clear") {
      setHistory([]);
      return [];
    }

    return ["Command not found. Type 'help'."];
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim();
    const output = executeCommand(command);
    if (command && command.toLowerCase() !== "clear") {
      setHistory((current) => [...current, { command, output }]);
    }
    setInput("");
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-aiGreen/40 bg-black/85 p-3 font-mono text-xs text-aiGreen sm:text-sm">
      <div className="mb-2 flex items-center justify-between border-b border-aiGreen/30 pb-2 text-[0.62rem] uppercase tracking-[0.16em] sm:text-[0.7rem]">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-aiGreen animate-pulse shadow-[0_0_6px_#00FF9C]" />
          <span>Terminal.cmd</span>
        </div>
        <span>Status: Online</span>
      </div>
      <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto pr-1">
        {history.map((item, index) => (
          <div key={item.command + "-" + index} className="space-y-1">
            <p>
              <span className="text-neonBlue">krishna@ai:~$</span> {item.command}
            </p>
            {item.output.map((line, lineIndex) => (
              <p key={item.command + "-" + lineIndex} className="text-aiGreen/90">
                {line}
              </p>
            ))}
            {item.command.toLowerCase() === "resume" && (
              <a
                href={portfolioData.resumePath}
                download
                className="inline-flex text-neonBlue underline decoration-neonBlue/50 underline-offset-4 hover:text-aiGreen"
              >
                Download Krishna&apos;s resume
              </a>
            )}
          </div>
        ))}
      </div>
      <form className="mt-3 flex items-center gap-2 border-t border-aiGreen/30 pt-2" onSubmit={onSubmit}>
        <span className="text-neonBlue">{">"}</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="w-full bg-transparent text-aiGreen outline-none placeholder:text-aiGreen/40"
          placeholder="Type command ('help', 'experience', 'projects', 'certificates')..."
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
