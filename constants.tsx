
import React from 'react';
import { LoadingStage } from './types';

export const LOADING_STAGES: LoadingStage[] = [
  { id: 1, label: "CONNECT", subtext: "Verbindung wird hergestellt...", theme: 'heist' },
  { id: 2, label: "STREETS", subtext: "Die Straßen laden nach...", theme: 'chase' },
  { id: 3, label: "EMPIRE", subtext: "Das Imperium erwacht...", theme: 'empire' },
  { id: 4, label: "TAKEOVER", subtext: "Übernahme läuft...", theme: 'takeover' },
  { id: 5, label: "GREENZONE", subtext: "Willkommen in der Zone.", theme: 'reign' }
];

export const HexGrid = ({ theme, progress }: { theme: string, progress: number }) => {
  const getColors = () => {
    switch(theme) {
      case 'heist': return { primary: '#00F0FF', glow: 'rgba(0, 240, 255, 0.15)', accent: '#7B2FBE' };
      case 'chase': return { primary: '#FF0066', glow: 'rgba(255, 0, 102, 0.2)', accent: '#00F0FF' };
      case 'empire': return { primary: '#FFB800', glow: 'rgba(255, 184, 0, 0.2)', accent: '#FF0066' };
      case 'takeover': return { primary: '#7B2FBE', glow: 'rgba(123, 47, 190, 0.25)', accent: '#FFB800' };
      case 'reign': return { primary: '#00F0FF', glow: 'rgba(0, 240, 255, 0.3)', accent: '#7B2FBE' };
      default: return { primary: '#00F0FF', glow: 'rgba(0, 240, 255, 0.2)', accent: '#FF0066' };
    }
  };

  const colors = getColors();
  const dashLen = progress * 5.96;

  return (
    <div className="relative flex items-center justify-center">
      {/* Neon Glow Pulse */}
      <div 
        className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full blur-[120px] opacity-30 animate-neon-breathe transition-all duration-2000"
        style={{ backgroundColor: colors.glow }}
      ></div>

      <svg className="w-64 h-64 md:w-[420px] md:h-[420px] transition-all duration-700" viewBox="0 0 200 200">
        {/* Outer ring - dashed */}
        <circle cx="100" cy="100" r="95" fill="none" stroke={colors.primary} strokeWidth="0.3" strokeDasharray="2,8" opacity="0.3" />
        
        {/* Inner crosshair lines */}
        <line x1="100" y1="10" x2="100" y2="40" stroke={colors.primary} strokeWidth="0.5" opacity="0.2" />
        <line x1="100" y1="160" x2="100" y2="190" stroke={colors.primary} strokeWidth="0.5" opacity="0.2" />
        <line x1="10" y1="100" x2="40" y2="100" stroke={colors.primary} strokeWidth="0.5" opacity="0.2" />
        <line x1="160" y1="100" x2="190" y2="100" stroke={colors.primary} strokeWidth="0.5" opacity="0.2" />

        {/* Diagonal tick marks */}
        <line x1="30" y1="30" x2="42" y2="42" stroke={colors.accent} strokeWidth="0.4" opacity="0.15" />
        <line x1="170" y1="30" x2="158" y2="42" stroke={colors.accent} strokeWidth="0.4" opacity="0.15" />
        <line x1="30" y1="170" x2="42" y2="158" stroke={colors.accent} strokeWidth="0.4" opacity="0.15" />
        <line x1="170" y1="170" x2="158" y2="158" stroke={colors.accent} strokeWidth="0.4" opacity="0.15" />
        
        {/* Hexagonal shape */}
        <polygon 
          points="100,30 155,65 155,135 100,170 45,135 45,65" 
          fill="none" 
          stroke={colors.primary} 
          strokeWidth="0.6" 
          opacity="0.15"
        />
        
        {/* Inner hexagon */}
        <polygon 
          points="100,55 130,72 130,128 100,145 70,128 70,72" 
          fill="none" 
          stroke={colors.accent} 
          strokeWidth="0.4" 
          opacity="0.1"
          className="animate-pulse"
        />

        {/* Center diamond */}
        <polygon 
          points="100,88 112,100 100,112 88,100" 
          fill="none" 
          stroke={colors.primary} 
          strokeWidth="0.8" 
          opacity="0.4"
        />

        {/* Progress Ring */}
        <circle 
          cx="100" cy="100" r="90" 
          fill="none" 
          stroke={colors.primary}
          strokeWidth="2" 
          strokeDasharray={`${dashLen} 596`} 
          strokeLinecap="round"
          className="rotate-[-90deg] origin-center transition-all duration-700 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${colors.primary})` }}
        />
        
        {/* Secondary progress ring (accent) */}
        <circle 
          cx="100" cy="100" r="86" 
          fill="none" 
          stroke={colors.accent}
          strokeWidth="0.5" 
          strokeDasharray={`${dashLen * 0.8} 596`} 
          strokeLinecap="round"
          className="rotate-[-90deg] origin-center transition-all duration-1000 ease-out"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};
