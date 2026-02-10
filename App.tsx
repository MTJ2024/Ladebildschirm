
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
          <h1 className="font-cinzel text-8xl md:text-[12rem] lg:text-[14rem] mb-8 text-red-500 drop-shadow-[0_0_60px_rgba(239,68,68,0.8)] tracking-[0.2em] uppercase font-black leading-none">
            GREENZONE420
          </h1>
          <div className="w-96 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-12"></div>
          <p className="text-2xl md:text-4xl font-cinzel tracking-[0.3em] uppercase text-amber-100/80 mb-16 italic font-semibold">
            Die Blüte ist Erwacht
          </p>
          <div className="text-base md:text-lg font-cinzel text-red-800/70 uppercase tracking-[0.4em] animate-pulse">
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

      <div className="relative z-20 flex flex-col items-center max-w-7xl px-8 w-full">
        
        {/* Poetic Header */}
        <div className="mb-16 text-center">
          <h2 className="font-cinzel text-red-900/60 text-sm md:text-base tracking-[0.3em] mb-4 uppercase font-bold">
            Feuer • Asche • Neubeginn
          </h2>
          <div className="h-[2px] w-80 mx-auto bg-gradient-to-r from-transparent via-red-800/50 to-transparent"></div>
        </div>

        {/* Narrative Section */}
        <div className="text-center min-h-[250px] flex flex-col items-center justify-center">
          <h1 className={`font-cinzel text-7xl md:text-[10rem] lg:text-[12rem] mb-10 transition-all duration-1000 uppercase tracking-wide font-black leading-none ${getThemeStyles()}`}>
            {currentStage.label}
          </h1>
          <div className="h-[2px] w-24 bg-red-800/60 rounded-full mb-12"></div>
          <div className="max-w-3xl px-6">
            <p className="text-red-100/40 font-cinzel text-lg md:text-xl tracking-[0.15em] leading-relaxed uppercase italic">
              "{dynamicQuote}"
            </p>
          </div>
        </div>

        {/* The Fire Loading Interface */}
        <div className="w-full mt-20 relative px-12 max-w-5xl">
          <div className="flex justify-between items-end mb-6 font-cinzel text-base md:text-lg tracking-[0.2em] uppercase font-bold opacity-80">
            <span className="text-red-800">{statusText}</span>
            <span className="text-orange-400 text-2xl md:text-3xl font-black">{Math.round(progress)}%</span>
          </div>
          
          <div className="h-2 w-full bg-red-950/30 relative overflow-hidden rounded-full border-2 border-red-900/20 backdrop-blur-sm shadow-lg">
            <div 
              className="h-full bg-gradient-to-r from-red-900 via-red-600 to-orange-400 transition-all duration-700 ease-out shadow-[0_0_30px_rgba(234,88,12,0.6)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Petal Stage Indicators */}
          <div className="flex justify-between mt-8 px-4 opacity-30">
            {LOADING_STAGES.map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rotate-45 transition-all duration-1000 ${
                  stageIndex >= i ? 'bg-orange-400 scale-150 border-2 border-orange-300 shadow-[0_0_15px_#fb923c]' : 'bg-red-950'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="absolute bottom-12 w-full text-center flex flex-col items-center gap-6">
        <p className="text-sm text-red-900/60 uppercase tracking-[0.4em] font-cinzel font-bold">
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
