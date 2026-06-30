export interface MetricItem {
  label: string;
  value: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  challenge: string;
  strategy: string[];
  impact: string;
  metrics: MetricItem[];
  accentColor: string; // Tailwind class like bg-lime-400
  textColor: string;   // Tailwind class like text-lime-950
  borderColor: string; // Tailwind class like border-lime-500
  emoji: string;
  imageTheme: {
    bg: string;
    accent: string;
    shape: 'circle' | 'square' | 'triangle' | 'dots';
  };
}

export interface ThoughtLeadership {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: 'Strategy' | 'Branding' | 'Growth' | 'German Market';
  summary: string;
  content: string;
  views: number;
  engagement: string; // e.g. "4.8%"
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  deliverables: string[];
  accentColor: string;
  textColor: string;
}

export interface AuditResult {
  growthScore: number;
  marketPotential: string;
  prioritizedInsights: {
    area: string;
    status: 'high' | 'medium' | 'low';
    recommendation: string;
  }[];
  customBlueprint: string;
}
