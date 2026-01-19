
import React from 'react';
import { motion } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import SidePanel from './SidePanel';

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  setPrompt: (val: string) => void;
  loading: boolean;
  suggestions: string[];
  onSubmit: (e: React.FormEvent) => void;
}

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({
  isOpen,
  onClose,
  prompt,
  setPrompt,
  loading,
  suggestions,
  onSubmit
}) => {
  return (
    <SidePanel isOpen={isOpen} onClose={onClose} side="right">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-light">AI Assistant</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5 text-white/60" />
            </button>
        </div>
        
        <form onSubmit={onSubmit} className="mb-6 relative">
            <input 
                autoFocus={isOpen}
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about materials, codes, or efficiency..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-flux-magenta/50"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:text-flux-magenta text-white/40 transition-colors">
                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
            </button>
        </form>

        <div className="space-y-4">
            {suggestions.map((s, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-white/80"
                >
                    {s}
                </motion.div>
            ))}
            {suggestions.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-10 text-white/30">
                  <p className="text-sm">No recent queries.</p>
                  <p className="text-xs mt-2 text-white/20">Try asking about glazing ratios or local materials.</p>
                </div>
            )}
        </div>
      </div>
    </SidePanel>
  );
};

export default AIAssistantPanel;
