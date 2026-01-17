import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { MapPin, Users, Activity } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      className="group relative bg-flux-surface backdrop-blur-lg border border-flux-border rounded-[2rem] overflow-hidden cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 scale-105 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-flux-midnight via-flux-midnight/50 to-transparent" />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-[320px] justify-between">
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white/80 border border-white/5">
            {project.status}
          </span>
          <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <Activity className="w-4 h-4 text-flux-magenta" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-light text-white mb-1 group-hover:text-flux-magenta transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>Sustainability Impact</span>
              <span>{project.stats.efficiency}% Eff.</span>
            </div>
            {/* Liquid Progress Bar */}
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-flux-deepBlue to-flux-magenta relative"
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                 <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
              </motion.div>
            </div>
          </div>
          
          <div className="mt-4 flex -space-x-2">
             {project.collaborators.map((url, i) => (
               <img key={i} src={url} alt="User" className="w-8 h-8 rounded-full border-2 border-flux-midnight" />
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-flux-midnight bg-flux-deepBlue flex items-center justify-center text-[10px] text-white">
                <Users className="w-3 h-3" />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;