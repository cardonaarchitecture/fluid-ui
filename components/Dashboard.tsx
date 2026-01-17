import React from 'react';
import { motion } from 'framer-motion';
import { Project, ChartData } from '../types';
import ProjectCard from './ProjectCard';
import AnalyticsPanel from './AnalyticsPanel';
import FluidButton from './FluidButton';
import { Plus, Sparkles, Wind } from 'lucide-react';

const mockProjects: Project[] = [
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

const efficiencyData: ChartData[] = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 68 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 82 },
  { name: 'Jun', value: 94 },
];

const carbonData: ChartData[] = [
    { name: 'Ph1', value: 100 },
    { name: 'Ph2', value: 80 },
    { name: 'Ph3', value: 60 },
    { name: 'Ph4', value: 45 },
    { name: 'Ph5', value: 30 },
  ];

const Dashboard: React.FC = () => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 pb-32">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-flux-magenta animate-pulse" />
            <span className="text-flux-magenta font-medium tracking-wider text-sm uppercase">Live Studio</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight leading-tight">
            Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-flux-deepBlue to-flux-magenta">Thinking</span>.
          </h1>
          <p className="text-white/40 mt-4 max-w-md text-lg font-light">
            Your collaborative surface for organic architectural design and sustainable analysis.
          </p>
        </motion.div>

        <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FluidButton variant="glass" icon={<Sparkles className="w-4 h-4" />}>
            AI Assist
          </FluidButton>
          <FluidButton icon={<Plus className="w-4 h-4" />}>
            New Project
          </FluidButton>
        </motion.div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Projects */}
        <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex justify-between items-center text-white/80">
                <h2 className="text-2xl font-light">Active Projects</h2>
                <button className="text-sm text-flux-magenta hover:text-white transition-colors">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} onSelect={() => {}} />
                ))}
                 {/* Empty State / Add New Card Placeholder */}
                 <motion.div 
                    className="group border border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 0.98 }}
                 >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-flux-deepBlue/20 transition-colors mb-4">
                        <Plus className="w-6 h-6 text-white/40 group-hover:text-flux-deepBlue" />
                    </div>
                    <span className="text-white/40 font-light">Start Concept</span>
                 </motion.div>
            </div>
        </div>

        {/* Right Column: Analytics & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="flex items-center gap-2 text-white/80 mb-2">
                <Wind className="w-5 h-5 text-flux-deepBlue" />
                <h2 className="text-2xl font-light">Impact</h2>
            </div>
            
            <div className="h-[280px]">
                <AnalyticsPanel 
                    title="Energy Efficiency" 
                    subtitle="Average performance across active sites"
                    data={efficiencyData}
                />
            </div>
            <div className="h-[280px]">
                <AnalyticsPanel 
                    title="Carbon Reduction" 
                    subtitle="Projected lifecycle offset (tons)"
                    data={carbonData}
                />
            </div>

            {/* AI Insight Card */}
            <motion.div 
                className="bg-gradient-to-br from-flux-magenta/20 to-flux-deepBlue/10 backdrop-blur-xl border border-flux-magenta/30 p-6 rounded-[2rem] relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
            >
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <Sparkles className="w-12 h-12 text-white/10" />
                </div>
                <h3 className="text-white font-medium mb-2">AI Suggestion</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                    Based on "Neo-Tokyo Vertical Forest", replacing the glazing specification could reduce thermal load by 14% without affecting light transmission.
                </p>
                <button className="mt-4 text-xs font-bold uppercase tracking-wider text-flux-magenta hover:text-white transition-colors">
                    Review Simulation
                </button>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;