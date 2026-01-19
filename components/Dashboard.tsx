
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ChartData } from '../types';
import { FluidBackgroundSettings } from '../types/settings';
import ProjectCard from './ProjectCard';
import AnalyticsPanel from './AnalyticsPanel';
import FluidButton from './FluidButton';
import FluidBackground from './FluidBackground';
import AIAssistantPanel from './AIAssistantPanel';
import { Plus, Sparkles, Wind, X, Send } from 'lucide-react';
import { api } from '../services/api';

interface DashboardProps {
  role?: 'architect' | 'owner';
  settings?: FluidBackgroundSettings;
}

const Dashboard: React.FC<DashboardProps> = ({ role = 'architect', settings }) => {
  // State: Projects & Selection
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // State: Analytics
  const [impactData, setImpactData] = useState<{ efficiency: ChartData[], carbon: ChartData[] } | null>(null);
  const [impactLoading, setImpactLoading] = useState(false);

  // State: AI & Modals
  const [showAi, setShowAi] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);

  // Effect: Fetch Projects on Mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.listProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Effect: Fetch Impact Data when Selection Changes
  useEffect(() => {
    if (!selectedId) {
        setImpactData(null);
        return;
    }
    
    const fetchImpact = async () => {
      setImpactLoading(true);
      try {
        const data = await api.getProjectImpact(selectedId);
        setImpactData(data);
      } catch (err) {
        console.error("Failed to fetch impact data", err);
      } finally {
        setImpactLoading(false);
      }
    };
    fetchImpact();
  }, [selectedId]);

  // Handlers
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle) return;
    
    setCreatingProject(true);
    try {
        const newProj = await api.createProject({ title: newProjectTitle });
        setProjects(prev => [...prev, newProj]);
        setSelectedId(newProj.id); // Auto-focus new project
        setShowNewProject(false);
        setNewProjectTitle('');
    } finally {
        setCreatingProject(false);
    }
  };

  const handleAiAssist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;

    setAiLoading(true);
    try {
        const results = await api.aiAssist({ projectId: selectedId || undefined, prompt: aiPrompt });
        setAiSuggestions(results);
    } finally {
        setAiLoading(false);
    }
  };

  return (
    <>
      {/* Background is controlled by Dashboard state for focus dampening, now using global settings */}
      <FluidBackground isFocused={!!selectedId} settings={settings} />

      {/* AI Assistant Panel */}
      <AIAssistantPanel 
        isOpen={showAi}
        onClose={() => setShowAi(false)}
        prompt={aiPrompt}
        setPrompt={setAiPrompt}
        loading={aiLoading}
        suggestions={aiSuggestions}
        onSubmit={handleAiAssist}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 pb-32" data-zone="main-layout">
        
        {/* ZONE: Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6" data-zone="top-bar">
          <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-flux-magenta animate-pulse" />
              <span className="text-flux-magenta font-medium tracking-wider text-sm uppercase">
                {role === 'owner' ? 'Portfolio View' : 'Live Studio'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-flux-deepBlue to-flux-magenta">Thinking</span>.
            </h1>
            <p className="text-white/40 mt-4 max-w-md text-lg font-light">
              {role === 'owner' 
                ? 'Real-time visibility into your sustainable assets.' 
                : 'Your collaborative surface for organic architectural design.'}
            </p>
          </motion.div>

          <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FluidButton 
              variant="glass" 
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => setShowAi(true)}
            >
              AI Assist
            </FluidButton>
            <FluidButton 
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setShowNewProject(true)}
            >
              New Project
            </FluidButton>
          </motion.div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ZONE: Main Surface (Projects) */}
          <div className="lg:col-span-8 flex flex-col gap-8" data-zone="main-surface">
              <div className="flex justify-between items-center text-white/80">
                  <h2 className="text-2xl font-light">Active Projects</h2>
                  <button className="text-sm text-flux-magenta hover:text-white transition-colors">View All</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      // Loading Skeletons
                      [1, 2].map(i => (
                          <motion.div 
                              key={`skel-${i}`} 
                              className="h-[380px] rounded-[2rem] bg-white/5 animate-pulse"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          />
                      ))
                    ) : projects.length === 0 ? (
                      // Empty State
                      <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="col-span-full border border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-12"
                      >
                          <p className="text-white/40">No active projects.</p>
                      </motion.div>
                    ) : (
                      // Project List
                      projects.map((p) => (
                          <ProjectCard 
                            key={p.id} 
                            project={p} 
                            isSelected={selectedId === p.id}
                            onSelect={(proj) => setSelectedId(proj.id)} 
                          />
                      ))
                    )}
                  </AnimatePresence>

                  {/* Add New Trigger Card */}
                  {!loading && (
                      <motion.div 
                          className="group border border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-white/5 transition-colors h-[380px]"
                          whileHover={{ scale: 0.98 }}
                          onClick={() => setShowNewProject(true)}
                      >
                          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-flux-deepBlue/20 transition-colors mb-4">
                              <Plus className="w-6 h-6 text-white/40 group-hover:text-flux-deepBlue" />
                          </div>
                          <span className="text-white/40 font-light">Start Concept</span>
                      </motion.div>
                  )}
              </div>
          </div>

          {/* ZONE: Right Context Panel (Analytics) */}
          <div className="lg:col-span-4 flex flex-col gap-6" data-zone="right-context-panel">
              <div className="flex items-center gap-2 text-white/80 mb-2">
                  <Wind className="w-5 h-5 text-flux-deepBlue" />
                  <h2 className="text-2xl font-light">Impact</h2>
              </div>
              
              {selectedId ? (
                  <>
                      <div className="h-[280px]">
                          {impactLoading ? (
                              <div className="h-full w-full rounded-[2rem] bg-white/5 animate-pulse" />
                          ) : impactData ? (
                              <AnalyticsPanel 
                                  title="Energy Efficiency" 
                                  subtitle="Performance trend"
                                  data={impactData.efficiency}
                              />
                          ) : null}
                      </div>
                      <div className="h-[280px]">
                          {impactLoading ? (
                              <div className="h-full w-full rounded-[2rem] bg-white/5 animate-pulse" />
                          ) : impactData ? (
                              <AnalyticsPanel 
                                  title="Carbon Reduction" 
                                  subtitle="Lifecycle offset (tons)"
                                  data={impactData.carbon}
                              />
                          ) : null}
                      </div>
                  </>
              ) : (
                  <div className="h-[560px] rounded-[2rem] border border-white/5 flex items-center justify-center bg-white/5 p-6 text-center">
                      <p className="text-white/30 text-sm">Select a project to view real-time impact analysis.</p>
                  </div>
              )}

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
                      {selectedId 
                          ? "Optimizing material selection for current phase could improve carbon score by 12%." 
                          : "Select a project to generate specific insights."}
                  </p>
                  {selectedId && (
                      <button className="mt-4 text-xs font-bold uppercase tracking-wider text-flux-magenta hover:text-white transition-colors">
                          Review Simulation
                      </button>
                  )}
              </motion.div>
          </div>

        </div>

        {/* New Project Modal Overlay */}
        <AnimatePresence>
          {showNewProject && (
              <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
              >
                  <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-flux-midnight border border-white/10 rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
                  >
                      <FluidBackground /> {/* Mini background for modal */}
                      <div className="relative z-10">
                          <div className="flex justify-between items-center mb-6">
                              <h3 className="text-2xl font-light">New Project</h3>
                              <button onClick={() => setShowNewProject(false)} className="p-2 hover:bg-white/10 rounded-full">
                                  <X className="w-5 h-5 text-white/60" />
                              </button>
                          </div>
                          <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                              <div>
                                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Project Title</label>
                                  <input 
                                      autoFocus
                                      type="text" 
                                      value={newProjectTitle}
                                      onChange={(e) => setNewProjectTitle(e.target.value)}
                                      placeholder="e.g. Coastal Retreat"
                                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-flux-magenta/50"
                                  />
                              </div>
                              <FluidButton 
                                  type="submit" 
                                  className="w-full justify-center mt-4" 
                                  disabled={creatingProject}
                              >
                                  {creatingProject ? 'Creating...' : 'Initialize Project'}
                              </FluidButton>
                          </form>
                      </div>
                  </motion.div>
              </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Dashboard;
