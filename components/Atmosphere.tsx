
import React, { useEffect, useState } from 'react';

const Atmosphere: React.FC = () => {
  const [petals, setPetals] = useState<{id: number, left: number, size: number, dur: number, color: string, rot: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetals(prev => [
        ...prev.slice(-40), 
        { 
          id: Date.now(), 
          left: Math.random() * 100,
          size: Math.random() * 6 + 4,
          dur: Math.random() * 6 + 6,
          color: Math.random() > 0.5 ? '#991b1b' : '#ea580c',
          rot: Math.random() * 360
        }
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080202]">
      {/* Deep Rooted Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] opacity-20 bg-[radial-gradient(ellipse_at_50%_100%,#450a0a_0%,transparent_80%)]"></div>
      
      {/* Rising Fire-Petals */}
      {petals.map(p => (
        <div
          key={p.id}
          className="fire-petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 15px ${p.color}66`,
            animationDuration: `${p.dur}s`,
            transform: `rotate(${p.rot}deg)`,
            opacity: 0.5
          }}
        />
      ))}

      {/* Heavy Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)]"></div>
      
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
    </div>
  );
};

export default Atmosphere;
