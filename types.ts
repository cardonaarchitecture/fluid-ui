import { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  location: string;
  status: 'Concept' | 'In Progress' | 'Review' | 'Complete';
  progress: number;
  thumbnail: string;
  stats: {
    carbon: number; // kgCO2e
    efficiency: number; // %
    timeline: string;
  };
  collaborators: string[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface ChartData {
  name: string;
  value: number;
  target?: number;
}
