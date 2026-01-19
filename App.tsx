
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import SettingsSidebar from './components/SettingsSidebar';
import SearchTopBar from './components/SearchTopBar';
import { useFluidBackgroundSettings } from './hooks/useFluidBackgroundSettings';

const App: React.FC = () => {
  const { settings, updateSetting, resetSettings } = useFluidBackgroundSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen relative bg-flux-midnight text-white font-sans selection:bg-flux-magenta/30 selection:text-white">
      
      {/* Global Overlays */}
      <SettingsSidebar 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdate={updateSetting}
        onReset={resetSettings}
      />
      
      <SearchTopBar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Main Content Layer */}
      <main className="relative z-10 min-h-screen">
        <Dashboard settings={settings} />
      </main>

      {/* Floating Navigation */}
      <Navigation 
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)} 
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
      />
      
      {/* Decorative Overlay Gradients for Screen Edges */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-flux-midnight to-transparent pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-flux-midnight to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default App;
