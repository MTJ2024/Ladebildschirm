
import React, { useState, useEffect, useCallback } from 'react';
import Atmosphere from './components/Atmosphere';
import { HexGrid, LOADING_STAGES } from './constants';
import { AppState } from './types';
import { getThematicQuote } from './services/geminiService';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [dynamicQuote, setDynamicQuote] = useState("Die Straße vergisst nie...");
  const [statusText, setStatusText] = useState("Verbindung wird hergestellt...");

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
      const stage = LOADING_STAGES[currentStageIdx];
      if (stage) {
        updateQuote(stage.label);
      }
    }

    if (progress >= 100 && appState === AppState.LOADING) {
      setTimeout(() => setAppState(AppState.READY), 2000);
    }
  }, [progress, stageIndex, updateQuote, appState]);

  const currentStage = LOADING_STAGES[stageIndex] ?? LOADING_STAGES[0];

  const getThemeColor = () => {
    switch (currentStage.theme) {
      case 'heist': return '#00F0FF';
      case 'chase': return '#FF0066';
      case 'empire': return '#FFB800';
      case 'takeover': return '#7B2FBE';
      case 'reign': return '#00F0FF';
      default: return '#00F0FF';
    }
  };

  if (appState === AppState.READY) {
    return (
      <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white overflow-hidden p-6 text-center">
        <Atmosphere />
        <div className="z-10 animate-slide-in">
          {/* Main title */}
          <h1 className="font-bebas text-8xl md:text-[12rem] leading-none mb-2 tracking-[0.15em] uppercase animate-pulse-glow"
              style={{ color: '#00F0FF' }}>
            GREENZONE420
          </h1>
          {/* Accent line */}
          <div className="w-80 h-[2px] mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #FF0066, #7B2FBE, transparent)' }}></div>
          {/* Names */}
          <div className="flex items-center justify-center gap-8 mb-10">
            <span className="font-oswald text-2xl md:text-3xl font-light tracking-[0.4em] uppercase" style={{ color: '#FF0066' }}>MICHAEL</span>
            <span className="text-white/20 text-3xl">×</span>
            <span className="font-oswald text-2xl md:text-3xl font-light tracking-[0.4em] uppercase" style={{ color: '#7B2FBE' }}>LUCIFER</span>
          </div>
          {/* Enter text */}
          <div className="font-oswald tracking-[1em] uppercase animate-neon-flicker" style={{ color: '#00F0FF80', fontSize: '18px' }}>
            Zutritt gewährt — Willkommen in der Zone
          </div>
        </div>
        {/* Scanline overlay */}
        <div className="fixed inset-0 scanlines opacity-[0.02] pointer-events-none"></div>
      </div>
    );
  }

  const themeColor = getThemeColor();

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-[#0a0a0f] overflow-hidden select-none">
      <Atmosphere />

      {/* Central Visual Component */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <HexGrid theme={currentStage.theme} progress={progress} />
      </div>

      <div className="relative z-20 flex flex-col items-center max-w-5xl px-12 w-full">
        
        {/* Top branded header */}
        <div className="mb-20 text-center">
          <h2 className="font-bebas text-4xl md:text-6xl tracking-[0.2em] mb-2 animate-glitch" style={{ color: themeColor, textShadow: `0 0 30px ${themeColor}40` }}>
            GREENZONE420
          </h2>
          <div className="h-[1px] w-48 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${themeColor}60, transparent)` }}></div>
        </div>

        {/* Stage label */}
        <div className="text-center min-h-[180px] flex flex-col items-center justify-center">
          <div className="font-oswald tracking-[0.8em] uppercase mb-4" style={{ color: themeColor, fontSize: '16px', opacity: 0.5 }}>
            // PHASE {currentStage.id} VON {LOADING_STAGES.length}
          </div>
          <h1 
            className="font-bebas text-6xl md:text-9xl mb-6 transition-all duration-700 uppercase tracking-[0.1em]"
            style={{ color: themeColor, textShadow: `0 0 40px ${themeColor}30, 0 0 80px ${themeColor}10` }}
          >
            {currentStage.label}
          </h1>
          <div className="h-[2px] w-12 rounded-full mb-8" style={{ backgroundColor: `${themeColor}40` }}></div>
          <div className="max-w-xl px-4">
            <p className="font-oswald tracking-[0.3em] leading-relaxed uppercase font-light" style={{ color: `${themeColor}50`, fontSize: '16px' }}>
              "{dynamicQuote}"
            </p>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-full mt-20 relative px-8 max-w-3xl">
          <div className="flex justify-between items-end mb-3 font-oswald tracking-[0.5em] uppercase font-medium" style={{ fontSize: '14px' }}>
            <span style={{ color: `${themeColor}80` }}>{statusText}</span>
            <span className="font-bebas" style={{ color: themeColor, fontSize: '28px' }}>{Math.round(progress)}%</span>
          </div>
          
          {/* Progress bar container */}
          <div className="h-[3px] w-full relative overflow-hidden rounded-full" style={{ backgroundColor: `${themeColor}10` }}>
            <div 
              className="h-full transition-all duration-500 ease-out relative"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${themeColor}40, ${themeColor})`,
                boxShadow: `0 0 20px ${themeColor}60, 0 0 40px ${themeColor}20`
              }}
            >
              {/* Animated stripes on bar */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, ${themeColor}40 10px, ${themeColor}40 20px)`,
                  backgroundSize: '40px 100%',
                  animation: 'stripe-move 1s linear infinite'
                }}
              ></div>
            </div>
          </div>
          
          {/* Stage indicators */}
          <div className="flex justify-between mt-8 px-1">
            {LOADING_STAGES.map((stage, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-2 h-2 transition-all duration-500 ${stageIndex >= i ? 'scale-125' : 'opacity-20'}`}
                  style={{ 
                    backgroundColor: stageIndex >= i ? themeColor : '#ffffff20',
                    boxShadow: stageIndex >= i ? `0 0 8px ${themeColor}` : 'none',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                ></div>
                <span 
                  className="font-oswald tracking-[0.2em] uppercase hidden md:block"
                  style={{ color: stageIndex >= i ? `${themeColor}60` : '#ffffff10', fontSize: '13px' }}
                >
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom footer with names */}
      <div className="absolute bottom-10 w-full text-center flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <span className="font-oswald tracking-[0.6em] uppercase font-medium" style={{ color: '#FF006680', fontSize: '16px' }}>MICHAEL</span>
          <span className="font-bebas" style={{ color: '#00F0FF30', fontSize: '22px' }}>×</span>
          <span className="font-oswald tracking-[0.6em] uppercase font-medium" style={{ color: '#7B2FBE80', fontSize: '16px' }}>LUCIFER</span>
        </div>
        <div className="font-oswald tracking-[1em] uppercase" style={{ color: '#ffffff15', fontSize: '14px' }}>
          GREENZONE420 • LOS SANTOS • FSK 18+
        </div>
      </div>

      {/* Cinematic borders - sleek neon */}
      <div className="fixed inset-0 border-[1px] pointer-events-none m-6" style={{ borderColor: `${themeColor}08` }}></div>
      {/* Corner accents */}
      <div className="fixed top-6 left-6 w-8 h-8 pointer-events-none" style={{ borderTop: `1px solid ${themeColor}20`, borderLeft: `1px solid ${themeColor}20` }}></div>
      <div className="fixed top-6 right-6 w-8 h-8 pointer-events-none" style={{ borderTop: `1px solid ${themeColor}20`, borderRight: `1px solid ${themeColor}20` }}></div>
      <div className="fixed bottom-6 left-6 w-8 h-8 pointer-events-none" style={{ borderBottom: `1px solid ${themeColor}20`, borderLeft: `1px solid ${themeColor}20` }}></div>
      <div className="fixed bottom-6 right-6 w-8 h-8 pointer-events-none" style={{ borderBottom: `1px solid ${themeColor}20`, borderRight: `1px solid ${themeColor}20` }}></div>
    </div>
  );
};

export default App;
