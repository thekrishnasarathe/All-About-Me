"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import type { ComponentType } from "react";

interface ContactCard {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
  color: string;
  hoverGlow: string;
}

const contactCards: ContactCard[] = [
  {
    icon: Phone,
    label: "Mobile",
    href: "tel:+919109483355",
    color: "text-aiGreen",
    hoverGlow: "hover:shadow-[0_0_25px_rgba(0,255,156,0.4)]"
  },
  {
    icon: Mail,
    label: "Gmail",
    href: "mailto:thekrishnasarathe000@gmail.com",
    color: "text-cyberPink",
    hoverGlow: "hover:shadow-[0_0_25px_rgba(255,47,209,0.4)]"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/krishna-sarathe-9a749a297",
    color: "text-neonBlue",
    hoverGlow: "hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/thekrishnasarathe",
    color: "text-electricPurple",
    hoverGlow: "hover:shadow-[0_0_25px_rgba(123,46,255,0.4)]"
  }
];

export function ContactPanel() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {contactCards.map((card, index) => {
        const Icon = card.icon;
        const isPhone = card.href.startsWith("tel:");

        return (
          <motion.a
            key={card.label}
            href={card.href}
            target={isPhone ? undefined : "_blank"}
            rel={isPhone ? undefined : "noreferrer"}
            className={`group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-neonBlue/25 bg-black/50 px-3 py-4 backdrop-blur-md transition-all duration-300 ${card.hoverGlow} hover:border-neonBlue/50 hover:bg-neonBlue/8`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Click ripple bg */}
            <motion.div
              className="absolute inset-0 bg-neonBlue/5 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />

            <Icon className={`relative z-10 h-6 w-6 ${card.color} transition-transform duration-300 group-hover:scale-110`} />

            <span className="relative z-10 font-display text-[0.65rem] uppercase tracking-[0.18em] text-textMain/90">
              {card.label}
            </span>

            {/* Subtle glow dot */}
            <motion.span
              className={`absolute bottom-2 h-0.5 w-4 rounded-full ${card.color === "text-aiGreen" ? "bg-aiGreen/40" : card.color === "text-cyberPink" ? "bg-cyberPink/40" : card.color === "text-neonBlue" ? "bg-neonBlue/40" : "bg-electricPurple/40"}`}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
            />
          </motion.a>
        );
      })}
    </div>
  );
}
