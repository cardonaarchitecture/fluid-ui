
import React from 'react';
import { X, RefreshCcw, Sliders } from 'lucide-react';
import { FluidBackgroundSettings } from '../types/settings';
import SidePanel from './SidePanel';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  settings: FluidBackgroundSettings;
  onUpdate: <K extends keyof FluidBackgroundSettings>(key: K, value: FluidBackgroundSettings[K]) => void;
  onReset: () => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdate, 
  onReset 
}) => {
  return (
    <SidePanel isOpen={isOpen} onClose={onClose} side="left">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-flux-magenta" />
          <h2 className="text-xl font-light text-white">Studio Environment</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        
        {/* A) Color & Blend */}
        <Section title="Color & Blend">
          <ColorInput label="Primary Start" value={settings.primaryColorStart} onChange={v => onUpdate('primaryColorStart', v)} />
          <ColorInput label="Primary End" value={settings.primaryColorEnd} onChange={v => onUpdate('primaryColorEnd', v)} />
          <ColorInput label="Secondary" value={settings.secondaryColor} onChange={v => onUpdate('secondaryColor', v)} />
          <ColorInput label="Accent" value={settings.accentColor} onChange={v => onUpdate('accentColor', v)} />
          <ColorInput label="Background Base" value={settings.backgroundColor} onChange={v => onUpdate('backgroundColor', v)} />
          
          <SelectInput 
            label="Blend Mode" 
            value={settings.blendMode} 
            options={['screen', 'overlay', 'soft-light', 'normal', 'multiply']} 
            onChange={v => onUpdate('blendMode', v as any)} 
          />
        </Section>

        {/* B) Motion Physics */}
        <Section title="Motion Physics">
          <RangeInput label="Damping (Heavy)" value={settings.springDamping} min={10} max={200} onChange={v => onUpdate('springDamping', v)} />
          <RangeInput label="Stiffness (Snap)" value={settings.springStiffness} min={10} max={200} onChange={v => onUpdate('springStiffness', v)} />
          <RangeInput label="Mass (Inertia)" value={settings.springMass} min={0.5} max={10} step={0.5} onChange={v => onUpdate('springMass', v)} />
          <div className="h-px bg-white/5 my-2" />
          <RangeInput label="Parallax: Primary" value={settings.parallaxPrimaryDivisor} min={10} max={200} onChange={v => onUpdate('parallaxPrimaryDivisor', v)} invertLabel="Inverse Scale" />
          <RangeInput label="Parallax: Secondary" value={settings.parallaxSecondaryDivisor} min={10} max={200} onChange={v => onUpdate('parallaxSecondaryDivisor', v)} invertLabel="Inverse Scale" />
          <RangeInput label="Parallax: Accent" value={settings.parallaxAccentDivisor} min={10} max={200} onChange={v => onUpdate('parallaxAccentDivisor', v)} invertLabel="Inverse Scale" />
        </Section>

        {/* C) Shape & Presence */}
        <Section title="Shape & Presence">
          <RangeInput label="Primary Size (vw)" value={settings.primarySize} min={20} max={100} onChange={v => onUpdate('primarySize', v)} />
          <RangeInput label="Secondary Size (vw)" value={settings.secondarySize} min={20} max={100} onChange={v => onUpdate('secondarySize', v)} />
          <RangeInput label="Accent Size (vw)" value={settings.accentSize} min={10} max={80} onChange={v => onUpdate('accentSize', v)} />
          <div className="h-px bg-white/5 my-2" />
          <RangeInput label="Primary Blur (px)" value={settings.primaryBlur} min={0} max={200} onChange={v => onUpdate('primaryBlur', v)} />
          <RangeInput label="Secondary Blur (px)" value={settings.secondaryBlur} min={0} max={200} onChange={v => onUpdate('secondaryBlur', v)} />
          <RangeInput label="Accent Blur (px)" value={settings.accentBlur} min={0} max={200} onChange={v => onUpdate('accentBlur', v)} />
          <div className="flex items-center justify-between mt-3">
            <label className="text-xs text-white/60">Shape Edge</label>
            <button 
              onClick={() => onUpdate('borderRadius', settings.borderRadius === '9999px' ? '40px' : '9999px')}
              className="text-xs px-2 py-1 bg-white/10 rounded border border-white/10 hover:bg-white/20 transition-colors"
            >
              {settings.borderRadius === '9999px' ? 'Circle' : 'Rounded Box'}
            </button>
          </div>
        </Section>

        {/* D) Animation */}
        <Section title="Animation Timing">
           <RangeInput label="Primary Cycle (s)" value={settings.primaryDuration} min={2} max={60} onChange={v => onUpdate('primaryDuration', v)} />
           <RangeInput label="Secondary Cycle (s)" value={settings.secondaryDuration} min={2} max={60} onChange={v => onUpdate('secondaryDuration', v)} />
           <RangeInput label="Accent Cycle (s)" value={settings.accentDuration} min={2} max={60} onChange={v => onUpdate('accentDuration', v)} />
           <div className="h-px bg-white/5 my-2" />
           <RangeInput label="Primary Rotation (°)" value={settings.primaryRotation} min={0} max={180} onChange={v => onUpdate('primaryRotation', v)} />
           <RangeInput label="Secondary Rotation (°)" value={settings.secondaryRotation} min={0} max={180} onChange={v => onUpdate('secondaryRotation', v)} />
           <RangeInput label="Accent Rotation (°)" value={settings.accentRotation} min={0} max={180} onChange={v => onUpdate('accentRotation', v)} />
        </Section>

        {/* E) Contrast */}
        <Section title="Global Contrast">
           <RangeInput label="Global Opacity" value={settings.globalOpacity} min={0} max={1} step={0.05} onChange={v => onUpdate('globalOpacity', v)} />
           <RangeInput label="Focus Dampening" value={settings.focusDampening} min={0} max={2} step={0.1} onChange={v => onUpdate('focusDampening', v)} />
        </Section>

        {/* F) Noise */}
        <Section title="Texture">
          <div className="flex items-center justify-between mb-3">
             <span className="text-xs text-white/60">Noise Overlay</span>
             <input 
                type="checkbox" 
                checked={settings.noiseEnabled} 
                onChange={e => onUpdate('noiseEnabled', e.target.checked)} 
                className="accent-flux-magenta"
             />
          </div>
          {settings.noiseEnabled && (
            <>
              <RangeInput label="Opacity (Idle)" value={settings.noiseOpacityIdle} min={0} max={0.2} step={0.005} onChange={v => onUpdate('noiseOpacityIdle', v)} />
              <RangeInput label="Opacity (Focused)" value={settings.noiseOpacityFocused} min={0} max={0.2} step={0.005} onChange={v => onUpdate('noiseOpacityFocused', v)} />
              <SelectInput 
                label="Noise Scale" 
                value={settings.noiseSize} 
                options={['auto', '50px', '100px', '200px']} 
                onChange={v => onUpdate('noiseSize', v)} 
              />
            </>
          )}
        </Section>

      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 bg-white/5 shrink-0">
        <button 
          onClick={onReset}
          className="w-full py-2 flex items-center justify-center gap-2 text-xs font-medium text-white/40 hover:text-white border border-white/10 hover:bg-white/10 rounded-lg transition-all"
        >
          <RefreshCcw className="w-3 h-3" />
          Reset to Defaults
        </button>
      </div>
    </SidePanel>
  );
};

// UI Components for Sidebar
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-xs font-bold uppercase tracking-wider text-flux-magenta/80">{title}</h3>
    <div className="flex flex-col gap-3">
      {children}
    </div>
  </div>
);

const RangeInput: React.FC<{ label: string; value: number; min: number; max: number; step?: number; onChange: (val: number) => void; invertLabel?: string }> = ({ label, value, min, max, step = 1, onChange }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-[10px] text-white/60">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-flux-magenta"
    />
  </div>
);

const ColorInput: React.FC<{ label: string; value: string; onChange: (val: string) => void }> = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-white/60">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-white/30 uppercase">{value}</span>
      <input 
        type="color" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-6 h-6 rounded bg-transparent border-0 cursor-pointer"
      />
    </div>
  </div>
);

const SelectInput: React.FC<{ label: string; value: string; options: string[]; onChange: (val: string) => void }> = ({ label, value, options, onChange }) => (
  <div className="flex flex-col gap-1">
     <span className="text-xs text-white/60">{label}</span>
     <select 
       value={value} 
       onChange={(e) => onChange(e.target.value)}
       className="w-full bg-white/5 border border-white/10 rounded p-1 text-xs text-white/80 focus:outline-none focus:border-flux-magenta/50"
     >
       {options.map(o => <option key={o} value={o}>{o}</option>)}
     </select>
  </div>
);

export default SettingsSidebar;
