import { Project, ChartData } from '../types';

// Mock Data Generators
const generateId = () => Math.random().toString(36).substr(2, 9);

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neo-Tokyo Vertical Forest',
    location: 'Shibuya, Tokyo',
    status: 'In Progress',
    progress: 75,
    thumbnail: 'https://picsum.photos/600/800?random=1',
    stats: { carbon: 450, efficiency: 92, timeline: '2025' },
    collaborators: ['https://picsum.photos/50/50?random=10', 'https://picsum.photos/50/50?random=11']
  },
  {
    id: '2',
    title: 'Nordic Sea Museum',
    location: 'Oslo, Norway',
    status: 'Concept',
    progress: 30,
    thumbnail: 'https://picsum.photos/600/800?random=2',
    stats: { carbon: 120, efficiency: 88, timeline: '2026' },
    collaborators: ['https://picsum.photos/50/50?random=12']
  },
  {
    id: '3',
    title: 'Desert Bloom Pavilion',
    location: 'Dubai, UAE',
    status: 'Review',
    progress: 90,
    thumbnail: 'https://picsum.photos/600/800?random=3',
    stats: { carbon: 850, efficiency: 95, timeline: '2024' },
    collaborators: ['https://picsum.photos/50/50?random=13', 'https://picsum.photos/50/50?random=14', 'https://picsum.photos/50/50?random=15']
  }
];

export const api = {
  listProjects: async (): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_PROJECTS]), 800);
    });
  },

  getProjectImpact: async (projectId: string): Promise<{ efficiency: ChartData[], carbon: ChartData[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return slightly different data based on ID to simulate real backend
        const multiplier = projectId.charCodeAt(0) % 10 * 0.1 + 0.5;
        resolve({
          efficiency: [
            { name: 'Jan', value: 65 * multiplier },
            { name: 'Feb', value: 72 * multiplier },
            { name: 'Mar', value: 68 * multiplier },
            { name: 'Apr', value: 85 * multiplier },
            { name: 'May', value: 82 * multiplier },
            { name: 'Jun', value: 94 * multiplier },
          ],
          carbon: [
            { name: 'Ph1', value: 100 * multiplier },
            { name: 'Ph2', value: 80 * multiplier },
            { name: 'Ph3', value: 60 * multiplier },
            { name: 'Ph4', value: 45 * multiplier },
            { name: 'Ph5', value: 30 * multiplier },
          ]
        });
      }, 600);
    });
  },

  createProject: async (data: { title: string }): Promise<Project> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject: Project = {
          id: generateId(),
          title: data.title,
          location: 'New Site (Pending)',
          status: 'Concept',
          progress: 5,
          thumbnail: `https://picsum.photos/600/800?random=${Math.floor(Math.random() * 100)}`,
          stats: { carbon: 0, efficiency: 0, timeline: 'TBD' },
          collaborators: []
        };
        MOCK_PROJECTS.push(newProject);
        resolve(newProject);
      }, 1000);
    });
  },

  aiAssist: async (params: { projectId?: string, prompt: string }): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          `Optimize glazing ratios for ${params.projectId ? 'this site' : 'new projects'} to reduce thermal gain.`,
          "Consider hempcrete blocks for non-load bearing partitions.",
          "Integrate passive ventilation stacks in the north quadrant."
        ]);
      }, 1200);
    });
  }
};