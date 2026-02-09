
import React from 'react';
import { LoadingStage } from './types';

export const LOADING_STAGES: LoadingStage[] = [
  { id: 1, label: "Wurzel im Schatten", subtext: "In der Tiefe nährt sich die Stärke.", theme: 'awakening' },
  { id: 2, label: "Keimen der Glut", subtext: "Ein warmer Hauch bricht durch das Schweigen.", theme: 'purification' },
  { id: 3, label: "Blüte des Feuers", subtext: "Das Licht Michaels entfaltet seine Pracht.", theme: 'enlightenment' },
  { id: 4, label: "Der Garten der Freiheit", subtext: "Die Stadt empfängt den Duft der Erneuerung.", theme: 'arrival' },
  { id: 5, label: "GZ420 Vollendung", subtext: "Das Schicksal ist aufgeblüht.", theme: 'arrival' }
];

export const RitualCircle = ({ theme, progress }: { theme: string, progress: number }) => {
  const getColors = () => {
    switch(theme) {
      case 'awakening': return { stroke: 'stroke-red-950', glow: 'rgba(69, 10, 10, 0.3)', secondary: 'text-red-900' };
      case 'purification': return { stroke: 'stroke-red-800', glow: 'rgba(153, 27, 27, 0.4)', secondary: 'text-red-700' };
      case 'enlightenment': return { stroke: 'stroke-orange-600', glow: 'rgba(234, 88, 12, 0.5)', secondary: 'text-orange-500' };
      case 'arrival': return { stroke: 'stroke-amber-400', glow: 'rgba(251, 191, 36, 0.6)', secondary: 'text-white' };
      default: return { stroke: 'stroke-red-600', glow: 'rgba(153, 27, 27, 0.5)', secondary: 'text-red-500' };
    }
  };

  const colors = getColors();

  return (
    <div className="relative flex items-center justify-center">
      {/* Warm Heartbeat Glow */}
      <div 
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] opacity-20 animate-heartbeat transition-all duration-2000"
        style={{ backgroundColor: colors.glow }}
      ></div>

      <svg className={`crimson-glow w-64 h-64 md:w-[450px] md:h-[450px] transition-all duration-1000 ${colors.stroke}`} viewBox="0 0 200 200">
        {/* Abstract Floral / Wing Petals */}
        <g className="animate-pulse">
          <path 
            d="M100 100 Q100 40, 140 20 Q110 60, 100 100" 
            fill="none" strokeWidth="1" className="opacity-40"
          />
          <path 
            d="M100 100 Q100 40, 60 20 Q90 60, 100 100" 
            fill="none" strokeWidth="1" className="opacity-40"
          />
          <path 
            d="M100 100 Q160 100, 180 60 Q140 90, 100 100" 
            fill="none" strokeWidth="1" className="opacity-40"
          />
          <path 
            d="M100 100 Q40 100, 20 60 Q60 90, 100 100" 
            fill="none" strokeWidth="1" className="opacity-40"
          />
        </g>
        
        {/* The Central Flame-Spire (Michael's Essence) */}
        <path 
          d="M100 35 L100 165" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          className={`transition-all duration-1000 ${colors.secondary} drop-shadow-[0_0_10px_currentColor]`}
        />
        
        {/* Decorative Compass Petals */}
        <path d="M85 100 L115 100 M100 85 L100 115" strokeWidth="0.5" className="opacity-20" />

        {/* Outer Halo */}
        <circle cx="100" cy="100" r="88" fill="none" strokeWidth="0.2" strokeDasharray="1,6" />
        
        {/* Blooming Progress Ring */}
        <circle 
          cx="100" cy="100" r="95" 
          fill="none" 
          strokeWidth="1.2" 
          strokeDasharray={`${progress * 5.96} 596`} 
          strokeLinecap="round"
          className="rotate-[-90deg] origin-center transition-all duration-1000 ease-in-out"
        />
      </svg>
    </div>
  );
};
