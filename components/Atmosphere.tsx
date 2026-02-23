
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  dur: number;
  color: string;
  delay: number;
}

const Atmosphere: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const neonColors = ['#00F0FF', '#FF0066', '#7B2FBE', '#FFB800', '#00F0FF'];
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-50), 
        { 
          id: Date.now(), 
          left: Math.random() * 100,
          size: Math.random() * 3 + 1,
          dur: Math.random() * 8 + 5,
          color: neonColors[Math.floor(Math.random() * neonColors.length)],
          delay: Math.random() * 2
        }
      ]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0a0f]">
      {/* City gradient base */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] opacity-30 bg-[radial-gradient(ellipse_at_50%_100%,#1a0030_0%,transparent_70%)]"></div>
      
      {/* Top neon bleed */}
      <div className="absolute inset-x-0 top-0 h-[30vh] opacity-10 bg-[radial-gradient(ellipse_at_50%_0%,#00F0FF_0%,transparent_60%)]"></div>

      {/* Floating neon particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="neon-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}88`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6
          }}
        />
      ))}

      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines opacity-[0.03]"></div>

      {/* Heavy vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_250px_rgba(0,0,0,1)]"></div>
      
      {/* Noise grain texture */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
    </div>
  );
};

export default Atmosphere;
