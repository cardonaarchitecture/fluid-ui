import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    // ZONE: Ambient Background Surface
    <div 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none" 
      data-zone="ambient-background"
    >
      <div className="absolute inset-0 bg-flux-midnight" />
      
      {/* Primary Blob - Magenta/Blue mix */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-40 mix-blend-screen"
        style={{
          background: 'linear-gradient(135deg, #D434FE 0%, #4B50E6 100%)',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Secondary Blob - Deep Blue */}
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-30 mix-blend-screen"
        style={{
          background: '#4B50E6',
        }}
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Accent Blob - Cyan/Teal hint for depth */}
      <motion.div 
        className="absolute top-[40%] right-[20%] w-[30vw] h-[30vw] rounded-full blur-[80px] opacity-20 mix-blend-screen"
        style={{
          background: '#00C2FF',
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -100, 100, 0],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")' }}></div>
    </div>
  );
};

export default FluidBackground;