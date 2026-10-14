export type ProjectCategory =
  | 'Backend Engineering'
  | 'Full-Stack Development'
  | 'Cloud & Infrastructure'
  | 'AI/ML Engineering'
  | 'Real-Time Systems';

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  role: 'input' | 'process' | 'storage' | 'output';
  technicalSpec: string; // Deep-dive detail shown when node is clicked/hovered
}

export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
}

export interface TechnicalArtifact {
  title: string;
  language: string;
  explanation: string;
  code: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  techStack: string[];
  featured: boolean;
  achievementBadge?: string;
  problemStatement: string;
  goalsAndConstraints: string[];
  contributions: string[];
  architectureSummary: string;
  architectureNodes: ArchitectureNode[];
  technicalArtifact: TechnicalArtifact;
  implementationDetails: string[];
  challengesAndTradeoffs: string[];
  metrics: ProjectMetric[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  arrangement: string;
  domainFocus: string;
  responsibilities: string[];
  technologies: string[];
  architectureNodes: ArchitectureNode[];
  engineeringDeepDive: {
    title: string;
    points: string[];
  };
}

export interface SkillDomain {
  id: string;
  title: string;
  code: string;
  description: string;
  skills: string[];
  connectedDomains: string[];
}