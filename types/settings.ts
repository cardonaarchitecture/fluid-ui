
export interface FluidBackgroundSettings {
  // A) Color + Blend
  primaryColorStart: string;
  primaryColorEnd: string;
  secondaryColor: string;
  accentColor: string;
  blendMode: 'screen' | 'overlay' | 'soft-light' | 'normal' | 'multiply';

  // B) Motion / Parallax
  parallaxPrimaryDivisor: number;
  parallaxSecondaryDivisor: number;
  parallaxAccentDivisor: number;
  springDamping: number;
  springStiffness: number;
  springMass: number;

  // C) Blob Shape / Presence
  primarySize: number; // vw
  secondarySize: number; // vw
  accentSize: number; // vw
  primaryBlur: number; // px
  secondaryBlur: number; // px
  accentBlur: number; // px
  borderRadius: string; // "9999px" or "40px"

  // D) Animation Timing
  primaryDuration: number; // s
  secondaryDuration: number; // s
  accentDuration: number; // s
  primaryRotation: number; // deg
  secondaryRotation: number; // deg
  accentRotation: number; // deg

  // E) Contrast / Brightness
  globalOpacity: number;
  focusDampening: number;
  backgroundColor: string;

  // F) Noise / Texture
  noiseOpacityIdle: number;
  noiseOpacityFocused: number;
  noiseEnabled: boolean;
  noiseSize: string;
}

export const defaultSettings: FluidBackgroundSettings = {
  // A
  primaryColorStart: '#D434FE',
  primaryColorEnd: '#4B50E6',
  secondaryColor: '#4B50E6',
  accentColor: '#00C2FF',
  blendMode: 'screen',
  // B
  parallaxPrimaryDivisor: 80,
  parallaxSecondaryDivisor: 50,
  parallaxAccentDivisor: 30,
  springDamping: 100,
  springStiffness: 30,
  springMass: 3,
  // C
  primarySize: 65,
  secondarySize: 75,
  accentSize: 35,
  primaryBlur: 100,
  secondaryBlur: 120,
  accentBlur: 80,
  borderRadius: '9999px',
  // D
  primaryDuration: 18,
  secondaryDuration: 23,
  accentDuration: 25,
  primaryRotation: 5,
  secondaryRotation: 8,
  accentRotation: 15,
  // E
  globalOpacity: 1.0,
  focusDampening: 1.0,
  backgroundColor: '#050511',
  // F
  noiseOpacityIdle: 0.035,
  noiseOpacityFocused: 0.015,
  noiseEnabled: true,
  noiseSize: 'auto',
};
