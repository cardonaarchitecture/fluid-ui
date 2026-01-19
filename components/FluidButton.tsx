import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FluidButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'glass';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FluidButton: React.FC<FluidButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  icon,
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 rounded-2xl font-medium flex items-center gap-2 overflow-hidden group backdrop-blur-md transition-colors duration-300";
  
  const variants = {
    primary: "bg-flux-deepBlue/80 text-white shadow-lg shadow-flux-deepBlue/20 hover:bg-flux-deepBlue/90 border border-white/10",
    secondary: "bg-flux-magenta/80 text-white shadow-lg shadow-flux-magenta/20 hover:bg-flux-magenta/90 border border-white/10",
    glass: "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20",
  };

  return (
    <motion.button
      className={twMerge(baseStyles, variants[variant], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Fluid Ripple Background on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"
        style={{ skewX: -20 }}
      />
      
      {/* Content */}
      <motion.span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </motion.span>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-flux-magenta/20 to-flux-deepBlue/20 blur-md -z-10" />
    </motion.button>
  );
};

export default FluidButton;