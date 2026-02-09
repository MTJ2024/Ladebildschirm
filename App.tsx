
import React, { useState, useEffect, useCallback } from 'react';
import Atmosphere from './components/Atmosphere';
import { RitualCircle, LOADING_STAGES } from './constants';
import { AppState } from './types';
import { getThematicQuote } from './services/geminiService';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [dynamicQuote, setDynamicQuote] = useState("In der Asche ruht die Pracht...");
  const [statusText, setStatusText] = useState("Wurzeln schlagen...");

  const updateQuote = useCallback(async (stageLabel: string) => {
    const quote = await getThematicQuote(stageLabel);
    setDynamicQuote(quote);
  }, []);

  useEffect(() => {
    const handleFiveMEvents = (event: MessageEvent) => {
      const data = event.data;
      if (data.eventName === 'loadProgress') setProgress(data.loadFraction * 100);
      if (data.eventName === 'onStatusLine') setStatusText(data.statusText);
    };

    window.addEventListener('message', handleFiveMEvents);
    return () => window.removeEventListener('message', handleFiveMEvents);
  }, []);

  useEffect(() => {
    const isFiveM = (window as any).invokeNative !== undefined;
    if (!isFiveM) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 0.35;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const currentStageIdx = Math.min(
      Math.floor((progress / 100) * LOADING_STAGES.length),
      LOADING_STAGES.length - 1
    );
    
    if (currentStageIdx !== stageIndex) {
      setStageIndex(currentStageIdx);
      updateQuote(LOADING_STAGES[currentStageIdx].label);
    }

    if (progress >= 100 && appState === AppState.LOADING) {
      setTimeout(() => setAppState(AppState.READY), 2000);
    }
  }, [progress, stageIndex, updateQuote, appState]);

  const currentStage = LOADING_STAGES[stageIndex];

  const getThemeStyles = () => {
    switch (currentStage.theme) {
      case 'awakening': return 'text-red-900';
      case 'purification': return 'text-red-700';
      case 'enlightenment': return 'text-orange-600 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]';
      case 'arrival': return 'text-amber-100 brightness-125';
      default: return 'text-red-500';
    }
  };

  if (appState === AppState.READY) {
    return (
      <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-[#050101] text-white overflow-hidden p-6 text-center">
        <Atmosphere />
        <div className="z-10 animate-heartbeat">
          <h1 className="font-cinzel text-7xl md:text-9xl mb-4 text-red-600 drop-shadow-[0_0_50px_rgba(153,27,27,0.6)] tracking-[0.4em] uppercase font-bold">
            GREENZONE420
          </h1>
          <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-cinzel tracking-[0.5em] uppercase text-amber-50/70 mb-12 italic">
            Die Blüte ist Erwacht
          </p>
          <div className="text-[10px] font-cinzel text-red-950 uppercase tracking-[1em] animate-pulse">
            Eintritt Gewährt
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-[#080202] overflow-hidden select-none">
      <Atmosphere />

      {/* Central Visual Component */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <RitualCircle theme={currentStage.theme} progress={progress} />
      </div>

      <div className="relative z-20 flex flex-col items-center max-w-5xl px-12 w-full">
        
        {/* Poetic Header */}
        <div className="mb-24 text-center">
          <h2 className="font-cinzel text-red-950 text-[10px] md:text-xs tracking-[1.8em] mb-4 uppercase font-bold">
            Feuer • Asche • Neubeginn
          </h2>
          <div className="h-[1px] w-64 mx-auto bg-gradient-to-r from-transparent via-red-900/30 to-transparent"></div>
        </div>

        {/* Narrative Section */}
        <div className="text-center min-h-[200px] flex flex-col items-center justify-center">
          <h1 className={`font-cinzel text-5xl md:text-8xl mb-8 transition-all duration-1000 uppercase tracking-[0.2em] font-black ${getThemeStyles()}`}>
            {currentStage.label}
          </h1>
          <div className="h-[1px] w-16 bg-red-900/40 rounded-full mb-10"></div>
          <div className="max-w-2xl px-6">
            <p className="text-red-100/30 font-cinzel text-sm md:text-base tracking-[0.4em] leading-relaxed uppercase italic">
              "{dynamicQuote}"
            </p>
          </div>
        </div>

        {/* The Fire Loading Interface */}
        <div className="w-full mt-24 relative px-16 max-w-4xl">
          <div className="flex justify-between items-end mb-4 font-cinzel text-[10px] tracking-[0.5em] uppercase font-bold opacity-60">
            <span className="text-red-900">{statusText}</span>
            <span className="text-orange-500">{Math.round(progress)}%</span>
          </div>
          
          <div className="h-[2px] w-full bg-red-950/20 relative overflow-hidden rounded-full border border-red-900/10 backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-red-950 via-red-700 to-orange-500 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(153,27,27,0.4)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Petal Stage Indicators */}
          <div className="flex justify-between mt-10 px-2 opacity-20">
            {LOADING_STAGES.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rotate-45 transition-all duration-1000 ${
                  stageIndex >= i ? 'bg-orange-500 scale-125 border border-orange-400 shadow-[0_0_8px_#f97316]' : 'bg-red-950'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="absolute bottom-12 w-full text-center flex flex-col items-center gap-6">
        <p className="text-[10px] text-red-950 uppercase tracking-[1.2em] font-cinzel font-bold">
          Greenzone420 • Michael • Lucifer
        </p>
      </div>

      {/* Cinematic Bordering */}
      <div className="fixed inset-0 border-[50px] border-black/50 pointer-events-none"></div>
      <div className="fixed inset-0 border-[1px] border-red-900/10 pointer-events-none m-14 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>
    </div>
  );
};

export default App;
