export type SectionId = "profile" | "experience" | "projects" | "certificates" | "skills" | "journey" | "contact";

export interface Skill {
  name: string;
  description: string;
}

export type ProjectGroup = "all" | "featured" | "ai" | "fullstack" | "mobile" | "internship";

export interface Project {
  title: string;
  tagline?: string;
  category: string;
  badge?: string;
  metrics?: string;
  overview: string;
  keyAchievements?: string[];
  link?: string;
  github?: string;
  backendLink?: string;
  techStack: string[];
  featured?: boolean;
  group: ProjectGroup;
}

export interface ExperienceDeliverable {
  title: string;
  subtitle: string;
  statusBadge: string;
  metrics: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  badge: string;
  summary: string;
  deliverables: ExperienceDeliverable[];
}

export type CertificateCategory = "all" | "awards" | "certifications" | "hackathons";

export interface Certificate {
  title: string;
  issuer: string;
  category: "awards" | "certifications" | "hackathons";
  badge: string;
  date: string;
  verificationCode?: string;
  verificationUrl?: string;
  prize?: string;
  summary: string;
  skills: string[];
}

export interface JourneyItem {
  year: string;
  label: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    about: string;
    goal: string;
  };
  experience: ExperienceItem[];
  projects: Project[];
  certificates: Certificate[];
  skills: Skill[];
  journey: JourneyItem[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    phone: string;
  };
  resumePath: string;
}
