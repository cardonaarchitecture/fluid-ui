
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  side: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = ({ 
  isOpen, 
  onClose, 
  side, 
  children, 
  className,
  title
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Optional, but good for focus) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[55]"
          />

          <motion.div
            initial={{ x: side === 'left' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'left' ? '-100%' : '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={clsx(
              "fixed inset-y-0 w-full md:w-[400px] bg-flux-midnight/95 backdrop-blur-xl z-[60] shadow-2xl flex flex-col",
              side === 'left' ? "left-0 border-r border-white/10" : "right-0 border-l border-white/10",
              className
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
