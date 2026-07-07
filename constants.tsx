
import React from 'react';
import { LoadingStage } from './types';
import { CONFIG } from './config';

export const LOADING_STAGES: LoadingStage[] = CONFIG.loadingStages;

export const RitualCircle = ({ theme, progress }: { theme: string, progress: number }) => {
  const getColors = () => {
    switch(theme) {
      case 'awakening':    return { stroke: 'stroke-red-950',  glow: 'rgba(69, 10, 10, 0.3)',    secondary: 'text-red-900'   };
      case 'purification': return { stroke: 'stroke-red-800',  glow: 'rgba(153, 27, 27, 0.4)',   secondary: 'text-red-700'   };
      case 'enlightenment':return { stroke: 'stroke-orange-600',glow: 'rgba(234, 88, 12, 0.5)',  secondary: 'text-orange-500'};
      case 'arrival':      return { stroke: 'stroke-amber-400',glow: 'rgba(251, 191, 36, 0.6)', secondary: 'text-white'     };
      default:             return { stroke: 'stroke-red-600',  glow: 'rgba(153, 27, 27, 0.5)',   secondary: 'text-red-500'   };
    }
  };

  const colors = getColors();

  return (
    <div className="relative flex items-center justify-center">
      <div 
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] opacity-20 animate-heartbeat transition-all duration-2000"
        style={{ backgroundColor: colors.glow }}
      ></div>

      <svg className={`crimson-glow w-64 h-64 md:w-[450px] md:h-[450px] transition-all duration-1000 ${colors.stroke}`} viewBox="0 0 200 200">
        <g className="animate-pulse">
          <path d="M100 100 Q100 40, 140 20 Q110 60, 100 100" fill="none" strokeWidth="1" className="opacity-40" />
          <path d="M100 100 Q100 40, 60 20 Q90 60, 100 100"  fill="none" strokeWidth="1" className="opacity-40" />
          <path d="M100 100 Q160 100, 180 60 Q140 90, 100 100" fill="none" strokeWidth="1" className="opacity-40" />
          <path d="M100 100 Q40 100, 20 60 Q60 90, 100 100"  fill="none" strokeWidth="1" className="opacity-40" />
        </g>

        <path 
          d="M100 35 L100 165" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          className={`transition-all duration-1000 ${colors.secondary} drop-shadow-[0_0_10px_currentColor]`}
        />

        <path d="M85 100 L115 100 M100 85 L100 115" strokeWidth="0.5" className="opacity-20" />
        <circle cx="100" cy="100" r="88" fill="none" strokeWidth="0.2" strokeDasharray="1,6" />

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
