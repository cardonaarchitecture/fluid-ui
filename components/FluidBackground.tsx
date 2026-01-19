
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { clsx } from 'clsx';
import { FluidBackgroundSettings, defaultSettings } from '../types/settings';

interface FluidBackgroundProps {
  isFocused?: boolean;
  className?: string;
  settings?: FluidBackgroundSettings;
}

const FluidBackground: React.FC<FluidBackgroundProps> = ({ 
  isFocused = false, 
  className,
  settings = defaultSettings 
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic spring config from settings
  const springConfig: SpringOptions = { 
    damping: settings.springDamping, 
    stiffness: settings.springStiffness, 
    mass: settings.springMass 
  };
  
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, settings.springMass, settings.springDamping, settings.springStiffness]);

  // Dynamic Parallax divisors
  const xPrimary = useTransform(x, (val) => val / settings.parallaxPrimaryDivisor);
  const yPrimary = useTransform(y, (val) => val / settings.parallaxPrimaryDivisor);
  
  const xSecondary = useTransform(x, (val) => val / settings.parallaxSecondaryDivisor);
  const ySecondary = useTransform(y, (val) => val / settings.parallaxSecondaryDivisor);

  const xAccent = useTransform(x, (val) => val / settings.parallaxAccentDivisor);
  const yAccent = useTransform(y, (val) => val / settings.parallaxAccentDivisor);

  // Dynamic Variants
  const primaryVariants = {
    idle: {
      scale: [1, 1.05, 0.98, 1],
      opacity: [0.35 * settings.globalOpacity, 0.45 * settings.globalOpacity, 0.35 * settings.globalOpacity],
      rotate: [0, settings.primaryRotation, -settings.primaryRotation, 0],
      transition: { duration: settings.primaryDuration, repeat: Infinity, ease: "easeInOut" as const }
    },
    focused: {
      scale: 0.95,
      opacity: 0.15 * settings.globalOpacity * settings.focusDampening, 
      rotate: 0,
      transition: { duration: 2, ease: "easeInOut" as const } 
    }
  };

  const secondaryVariants = {
    idle: {
      scale: [1, 1.1, 0.9, 1],
      opacity: [0.25 * settings.globalOpacity, 0.35 * settings.globalOpacity, 0.25 * settings.globalOpacity],
      rotate: [0, -settings.secondaryRotation, settings.secondaryRotation, 0],
      transition: { duration: settings.secondaryDuration, repeat: Infinity, ease: "easeInOut" as const }
    },
    focused: {
      scale: 0.9,
      opacity: 0.1 * settings.globalOpacity * settings.focusDampening,
      rotate: 0,
      transition: { duration: 2, ease: "easeInOut" as const }
    }
  };

  const accentVariants = {
    idle: {
        opacity: [0.15 * settings.globalOpacity, 0.1 * settings.globalOpacity, 0.15 * settings.globalOpacity],
        scale: [1, 1.2, 0.9, 1],
        rotate: [0, settings.accentRotation, -settings.accentRotation, 0],
        transition: { duration: settings.accentDuration, repeat: Infinity, ease: "easeInOut" as const }
    },
    focused: {
        opacity: 0.05 * settings.globalOpacity * settings.focusDampening,
        scale: 0.8,
        rotate: 0,
        transition: { duration: 2, ease: "easeInOut" as const }
    }
  };

  return (
    <div 
      className={clsx("fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000", className)}
      style={{ backgroundColor: settings.backgroundColor }}
      data-zone="ambient-background"
    >
      <div className="absolute inset-0" style={{ backgroundColor: settings.backgroundColor }} />
      
      {/* Primary Blob */}
      <motion.div 
        className="absolute top-[-15%] left-[-15%] mix-blend-screen"
        style={{
          width: `${settings.primarySize}vw`,
          height: `${settings.primarySize}vw`,
          filter: `blur(${settings.primaryBlur}px)`,
          borderRadius: settings.borderRadius,
          background: `linear-gradient(135deg, ${settings.primaryColorStart} 0%, ${settings.primaryColorEnd} 100%)`,
          mixBlendMode: settings.blendMode as any,
          x: xPrimary,
          y: yPrimary
        }}
        variants={primaryVariants}
        animate={isFocused ? "focused" : "idle"}
      />

      {/* Secondary Blob */}
      <motion.div 
        className="absolute bottom-[-15%] right-[-15%] mix-blend-screen"
        style={{
          width: `${settings.secondarySize}vw`,
          height: `${settings.secondarySize}vw`,
          filter: `blur(${settings.secondaryBlur}px)`,
          borderRadius: settings.borderRadius,
          background: settings.secondaryColor,
          mixBlendMode: settings.blendMode as any,
          x: xSecondary,
          y: ySecondary
        }}
        variants={secondaryVariants}
        animate={isFocused ? "focused" : "idle"}
      />

      {/* Accent Blob */}
      <motion.div 
        className="absolute top-[35%] right-[15%] mix-blend-screen"
        style={{
          width: `${settings.accentSize}vw`,
          height: `${settings.accentSize}vw`,
          filter: `blur(${settings.accentBlur}px)`,
          borderRadius: settings.borderRadius,
          background: settings.accentColor,
          mixBlendMode: settings.blendMode as any,
          x: xAccent,
          y: yAccent
        }}
        variants={accentVariants}
        animate={isFocused ? "focused" : "idle"}
      />
      
      {/* Noise overlay */}
      {settings.noiseEnabled && (
        <motion.div 
          className="absolute inset-0 mix-blend-overlay" 
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")',
            backgroundSize: settings.noiseSize
          }}
          animate={{ opacity: isFocused ? settings.noiseOpacityFocused : settings.noiseOpacityIdle }}
          transition={{ duration: 1.5 }}
        />
      )}
    </div>
  );
};

export default React.memo(FluidBackground);
