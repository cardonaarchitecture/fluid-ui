
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchTopBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchTopBar: React.FC<SearchTopBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[65]"
          />

          {/* Bar */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-full h-20 bg-flux-midnight/90 backdrop-blur-xl border-b border-white/10 z-[70] flex items-center px-6 md:px-12"
          >
            <div className="w-full max-w-5xl mx-auto flex items-center gap-4">
               <Search className="w-6 h-6 text-white/40" />
               <input
                 autoFocus
                 type="text"
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="Search projects, tenders, messages..."
                 className="flex-1 bg-transparent border-none text-xl md:text-2xl text-white placeholder-white/20 focus:outline-none"
               />
               <button 
                 onClick={onClose}
                 className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchTopBar;
