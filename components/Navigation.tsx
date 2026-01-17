import React from 'react';
import { motion } from 'framer-motion';
import { Home, Layers, Box, Settings, Search } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'assets', label: 'Assets', icon: Box },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Navigation: React.FC = () => {
  const [active, setActive] = React.useState('dashboard');

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        className="flex items-center gap-2 p-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-flux-deepBlue/20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="relative px-6 py-3 rounded-full flex flex-col items-center justify-center gap-1 group transition-all duration-300"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon 
                  className={`w-5 h-5 relative z-10 transition-colors duration-300 ${isActive ? 'text-flux-magenta' : 'text-white/60 group-hover:text-white'}`} 
                />
                {isActive && (
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-1 right-2 w-1.5 h-1.5 bg-flux-magenta rounded-full shadow-[0_0_10px_#D434FE]"
                    />
                )}
              </button>
            )
        })}

        <div className="w-px h-6 bg-white/10 mx-2" />

        <button className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default Navigation;