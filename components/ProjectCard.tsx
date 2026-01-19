import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { MapPin, Users, Activity } from 'lucide-react';
import { clsx } from 'clsx';

interface ProjectCardProps {
  project: Project;
  isSelected?: boolean;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, isSelected }) => {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      className={clsx(
        "group relative bg-flux-surface backdrop-blur-lg border rounded-[2rem] overflow-hidden cursor-pointer",
        isSelected 
          ? "border-flux-magenta/50 shadow-[0_0_30px_rgba(212,52,254,0.15)] bg-white/5" 
          : "border-flux-border hover:border-white/20"
      )}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={() => onSelect(project)}
      variants={{
        initial: { opacity: 0, scale: 0.9, y: 0 },
        animate: { opacity: 1, scale: 1, y: 0 },
        hover: { 
          y: -12,
          transition: { type: "spring", stiffness: 300, damping: 15, mass: 0.8 }
        }
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Selection Glow Background */}
      {isSelected && (
        <motion.div 
          layoutId="selection-glow"
          className="absolute inset-0 bg-flux-magenta/5 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Image Background with Gradient Overlay & Physics Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover"
          variants={{
            initial: { scale: 1.05, opacity: 0.6, filter: 'blur(0px)' },
            hover: { 
              scale: 1.15, 
              opacity: 0.5,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-flux-midnight via-flux-midnight/50 to-transparent" />
        
        {/* Enhanced Liquid Ripple Effect */}
        {/* Layer 1: Broad fluid sheen */}
        <motion.div 
            className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]"
            variants={{
                initial: { x: '-100%', opacity: 0 },
                hover: { 
                  x: '100%', 
                  opacity: 1,
                  transition: {
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.2
                  }
                }
            }}
            style={{ pointerEvents: 'none', filter: 'blur(20px)' }}
        />

        {/* Layer 2: Sharp, caustic-like highlight */}
        <motion.div 
            className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-flux-magenta/10 to-transparent skew-x-[-15deg]"
            variants={{
                initial: { x: '-100%', opacity: 0 },
                hover: { 
                  x: '100%', 
                  opacity: 1,
                  transition: {
                    duration: 2.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.1,
                    delay: 0.2
                  }
                }
            }}
            style={{ pointerEvents: 'none', filter: 'blur(5px)', mixBlendMode: 'overlay' }}
        />

        {/* Layer 3: Subtle surface distortion/wobble overlay */}
        <motion.div
           className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/5 to-white/0"
           variants={{
             initial: { opacity: 0, scale: 1 },
             hover: {
               opacity: 0.3,
               scale: [1, 1.05, 1],
               transition: {
                 scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                 opacity: { duration: 0.3 }
               }
             }
           }}
           style={{ pointerEvents: 'none', mixBlendMode: 'soft-light' }}
        />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-[320px] justify-between">
        <div className="flex justify-between items-start">
          <span className={clsx(
            "px-3 py-1 backdrop-blur-md rounded-full text-xs font-medium border transition-colors",
            isSelected ? "bg-flux-magenta/20 border-flux-magenta/30 text-white" : "bg-white/10 text-white/80 border-white/5"
          )}>
            {project.status}
          </span>
          <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <Activity className={clsx("w-4 h-4", isSelected ? "text-white" : "text-flux-magenta")} />
          </div>
        </div>

        <div>
          <h3 className={clsx(
            "text-2xl font-light mb-1 transition-colors duration-300",
            isSelected ? "text-flux-magenta" : "text-white group-hover:text-flux-magenta"
          )}>
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