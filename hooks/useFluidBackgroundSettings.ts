
import { useState, useEffect } from 'react';
import { FluidBackgroundSettings, defaultSettings } from '../types/settings';

const STORAGE_KEY = 'flux_fluid_bg_settings_v1';

export const useFluidBackgroundSettings = () => {
  const [settings, setSettings] = useState<FluidBackgroundSettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage on change (debounced slightly by nature of React updates, 
  // but explicit debounce could be added if performance issues arise)
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to localStorage', e);
    }
  }, [settings, isInitialized]);

  const updateSetting = <K extends keyof FluidBackgroundSettings>(
    key: K,
    value: FluidBackgroundSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return { settings, updateSetting, resetSettings };
};
