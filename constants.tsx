
import React from 'react';
import { LoadingStage } from './types';

export const LOADING_STAGES: LoadingStage[] = [
  { id: 1, label: "Michaels Schmerz", subtext: "Das Licht brennt, während die Flügel fallen.", theme: 'awakening' },
  { id: 2, label: "Luzifers Flüstern", subtext: "Zwei Welten vereinen sich im Feuer.", theme: 'purification' },
  { id: 3, label: "Erzengel der Freiheit", subtext: "Weder Sklave des Himmels noch der Hölle.", theme: 'enlightenment' },
  { id: 4, label: "Der Befreier Kommt", subtext: "Michael bringt das Grüne Licht.", theme: 'arrival' },
  { id: 5, label: "Greenzone Manifest", subtext: "Das Reich des Befreiers ist hier.", theme: 'arrival' }
];

export const RitualCircle = ({ theme, progress }: { theme: string, progress: number }) => {
  const getColors = () => {
    switch(theme) {
      case 'awakening': return { stroke: 'stroke-red-600', glow: 'rgba(239, 68, 68, 0.4)', fire: 'text-red-500' };
      case 'purification': return { stroke: 'stroke-orange-500', glow: 'rgba(249, 115, 22, 0.5)', fire: 'text-orange-400' };
      case 'enlightenment': return { stroke: 'stroke-green-500', glow: 'rgba(34, 197, 94, 0.5)', fire: 'text-green-300' };
      case 'arrival': return { stroke: 'stroke-green-400', glow: 'rgba(74, 222, 128, 0.7)', fire: 'text-white' };
      default: return { stroke: 'stroke-green-500', glow: 'rgba(34, 197, 94, 0.5)', fire: 'text-green-500' };
    }
  };

  const colors = getColors();

  return (
    <div className="relative flex items-center justify-center scale-110 md:scale-125">
      {/* Divine Aura Core */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 transition-all duration-2000"
        style={{ backgroundColor: colors.glow }}
      ></div>

      <svg className={`w-80 h-80 md:w-[600px] md:h-[600px] transition-all duration-1000 ${colors.stroke}`} viewBox="0 0 200 200">
        <defs>
          <radialGradient id="fireGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Large Radiant Wings */}
        <path 
          d="M100 60 C50 -20, -20 40, 30 130 C45 160, 80 160, 100 170 M100 60 C150 -20, 220 40, 170 130 C155 160, 120 160, 100 170" 
          fill="none" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          className="opacity-40 animate-divine"
        />
        
        {/* Inner Burning Wings */}
        <path 
          d="M100 70 C70 30, 30 50, 50 110 M100 70 C130 30, 170 50, 150 110" 
          fill="none" 
          strokeWidth="0.8" 
          className={`opacity-60 transition-all duration-1000 ${colors.fire}`}
        />

        {/* Michael's Sword of Light */}
        <path 
          d="M100 30 L100 175" 
          strokeWidth="3" 
          strokeLinecap="round"
          className={`drop-shadow-[0_0_10px_currentColor] transition-all duration-1000 ${colors.fire}`}
        />
        <path d="M80 55 L120 55" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Burning Halo Fragment */}
        <path 
          d="M70 40 A45 45 0 0 1 100 25 A45 45 0 0 1 130 40" 
          fill="none" 
          strokeWidth="1.5" 
          strokeDasharray="5,15"
          className="animate-pulse"
        />

        {/* Sacred Geometry Rays */}
        {[...Array(12)].map((_, i) => (
          <line 
            key={i}
            x1="100" y1="100" 
            x2={100 + Math.cos(i * 30 * Math.PI / 180) * 120} 
            y2={100 + Math.sin(i * 30 * Math.PI / 180) * 120}
            strokeWidth="0.1"
            className="opacity-20"
          />
        ))}

        {/* Progress Circle (Outer) */}
        <circle 
          cx="100" cy="100" r="95" 
          fill="none" 
          strokeWidth="0.5" 
          strokeDasharray={`${progress * 5.97} 597`} 
          className="rotate-[-90deg] origin-center transition-all duration-700 ease-out"
        />
      </svg>
    </div>
  );
};
