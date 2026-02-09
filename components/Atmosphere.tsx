
import React, { useEffect, useState } from 'react';

const Atmosphere: React.FC = () => {
  const [embers, setEmbers] = useState<{id: number, left: number, size: number, dur: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmbers(prev => [
        ...prev.slice(-50), 
        { 
          id: Date.now(), 
          left: Math.random() * 100,
          size: Math.random() * 4 + 2,
          dur: Math.random() * 2 + 3
        }
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010401]">
      <div className="god-ray-overlay"></div>
      
      {/* Bottom Infernal Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] opacity-40 bg-[radial-gradient(ellipse_at_50%_100%,#991b1b_0%,#450a0a_30%,transparent_80%)]"></div>
      
      {/* Top Angelic Bloom */}
      <div className="absolute inset-x-0 top-0 h-[50vh] opacity-30 bg-[radial-gradient(ellipse_at_50%_0%,#166534_0%,#064e3b_40%,transparent_80%)]"></div>
      
      {/* Embers Rising */}
      {embers.map(e => (
        <div
          key={e.id}
          className="ember-particle"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            backgroundColor: Math.random() > 0.5 ? '#ef4444' : '#f59e0b',
            boxShadow: `0 0 ${e.size * 2}px ${Math.random() > 0.5 ? '#991b1b' : '#d97706'}`,
            animationDuration: `${e.dur}s`,
            opacity: 0.8
          }}
        />
      ))}

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)]"></div>
      
      {/* Horizontal Light Flares */}
      <div className="flare top-1/4"></div>
      <div className="flare top-1/2"></div>
      <div className="flare top-3/4"></div>
      
      {/* Grain / Dust */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
};

export default Atmosphere;
