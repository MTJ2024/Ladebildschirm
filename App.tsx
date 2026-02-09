
import React, { useState, useEffect, useCallback } from 'react';
import Atmosphere from './components/Atmosphere';
import { RitualCircle, LOADING_STAGES } from './constants';
import { AppState } from './types';
import { getThematicQuote } from './services/geminiService';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [dynamicQuote, setDynamicQuote] = useState("Die brennenden Schwingen Michaels...");
  const [statusText, setStatusText] = useState("Verschmelze Licht und Feuer...");

  const updateQuote = useCallback(async (stageLabel: string) => {
    const quote = await getThematicQuote(`Erzengel Michael, Lucifer, brennendes Licht, ${stageLabel}`);
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
          return prev + 0.45;
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
      setTimeout(() => setAppState(AppState.READY), 1800);
    }
  }, [progress, stageIndex, updateQuote, appState]);

  const currentStage = LOADING_STAGES[stageIndex];

  const getThemeStyles = () => {
    switch (currentStage.theme) {
      case 'awakening': return 'text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]';
      case 'purification': return 'text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]';
      case 'enlightenment': return 'text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]';
      case 'arrival': return 'text-white brightness-150 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]';
      default: return 'text-green-400';
    }
  };

  if (appState === AppState.READY) {
    return (
      <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-[#010201] text-white overflow-hidden p-6 text-center">
        <Atmosphere />
        <div className="z-10 animate-divine">
          <h1 className="font-cinzel text-8xl md:text-[10rem] mb-4 text-green-400 drop-shadow-[0_0_50px_rgba(74,222,128,0.8)] tracking-[0.5em] uppercase font-black">
            GREENZONE420
          </h1>
          <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-8 shadow-[0_0_20px_#ef4444]"></div>
          <p className="text-3xl md:text-4xl font-cinzel tracking-[0.6em] uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-16">
            Der Befreier ist Manifestiert
          </p>
          <div className="text-xs font-cinzel text-green-900/40 uppercase tracking-[1.5em] animate-pulse">
            Willkommen im Reich
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-[#010401] overflow-hidden select-none">
      <Atmosphere />

      {/* Main Visual Symbol */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <RitualCircle theme={currentStage.theme} progress={progress} />
      </div>

      <div className="relative z-20 flex flex-col items-center max-w-6xl px-12 w-full">
        
        {/* Divine Header */}
        <div className="mb-28 text-center">
          <h2 className="font-cinzel text-red-700/50 text-xs md:text-sm tracking-[2em] mb-4 uppercase font-bold">
            Michael • Lucifer • Greenzone420
          </h2>
          <div className="h-[1px] w-80 mx-auto bg-gradient-to-r from-transparent via-green-900/40 to-transparent"></div>
        </div>

        {/* Narrative Section */}
        <div className="text-center min-h-[250px] flex flex-col items-center justify-center">
          <h1 className={`font-cinzel text-6xl md:text-9xl mb-8 transition-all duration-1000 uppercase tracking-[0.2em] font-black ${getThemeStyles()}`}>
            {currentStage.label}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-800 via-green-500 to-red-800 rounded-full mb-10 opacity-70 shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
          <div className="max-w-3xl px-6">
            <p className="text-white/60 font-cinzel text-base md:text-lg tracking-[0.4em] leading-loose uppercase italic drop-shadow-md">
              "{dynamicQuote}"
            </p>
          </div>
        </div>

        {/* The Radiant Loading Interface */}
        <div className="w-full mt-28 relative px-20 max-w-5xl">
          <div className="flex justify-between items-end mb-5 font-cinzel text-[12px] tracking-[0.5em] uppercase font-black">
            <span className="text-red-900/80 animate-pulse">{statusText}</span>
            <span className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">{Math.round(progress)}%</span>
          </div>
          
          <div className="h-[3px] w-full bg-white/5 relative overflow-hidden rounded-full backdrop-blur-md border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-red-700 via-orange-500 via-green-500 to-green-300 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(34,197,94,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
            {/* Heat Pulse on the bar */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shimmer_2s_infinite]"></div>
          </div>
          
          {/* Spiritual Markers */}
          <div className="flex justify-between mt-8 px-2">
            {LOADING_STAGES.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full border transition-all duration-1000 ${
                  stageIndex >= i ? 'bg-green-400 border-green-300 shadow-[0_0_10px_#4ade80] scale-150' : 'bg-transparent border-white/20'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Details */}
      <div className="absolute bottom-12 w-full text-center flex flex-col items-center gap-6">
        <p className="text-[11px] text-green-900/60 uppercase tracking-[1.2em] font-cinzel font-bold drop-shadow-sm">
          Gefallene Engel • Ewiges Licht • GZ420
        </p>
        <div className="flex gap-6 opacity-20">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="w-2 h-2 border border-white/50 rotate-45 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
           ))}
        </div>
      </div>

      {/* Framing Overlay */}
      <div className="fixed inset-0 border-[50px] border-black/60 pointer-events-none"></div>
      <div className="fixed inset-0 border-[1px] border-green-500/10 pointer-events-none m-14 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default App;
