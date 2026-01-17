import React from 'react';
import FluidBackground from './components/FluidBackground';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-flux-midnight text-white font-sans selection:bg-flux-magenta/30 selection:text-white">
      {/* Organic Background Layer */}
      <FluidBackground />
      
      {/* Main Content Layer - Glass effect handled in components */}
      <main className="relative z-10 min-h-screen">
        <Dashboard />
      </main>

      {/* Floating Navigation */}
      <Navigation />
      
      {/* Decorative Overlay Gradients for Screen Edges */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-flux-midnight to-transparent pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-flux-midnight to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default App;