export type PageTab = 'home' | 'portfolio' | 'resume' | 'skills' | 'contact';

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'web' | 'social' | 'ads' | 'seo' | 'creative';
  categoryLabel: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
  url?: string;
  displayUrl?: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  highlightText?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  focus: string;
  responsibilities: string[];
  tags: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level?: string; icon?: string }[];
}
