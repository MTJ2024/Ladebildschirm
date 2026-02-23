
import React, { useState, useEffect } from 'react';

/**
 * GTA V Online cinematic image slideshow with Ken Burns camera effect.
 * Pure CSS animations — no video decoding, minimal performance impact.
 * Images crossfade with slow pan/zoom to simulate camera rotation.
 */

const IMAGES = [
  'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=80',
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80',
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
];

const SLIDE_DURATION = 6000;

const ImageBackground: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Image slides with Ken Burns camera pan/zoom */}
      {IMAGES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover kenburns-${(i % 4) + 1}`}
            style={{ willChange: i === currentIndex ? 'transform' : 'auto' }}
          />
        </div>
      ))}

      {/* Haze / Mist overlay — dark cinematic fog drifting across the images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base dark tint */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Animated mist layer 1 — slow drift right */}
        <div
          className="absolute inset-0 opacity-30 animate-haze-drift-1"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 20% 50%, rgba(10,10,15,0.8) 0%, transparent 70%)',
          }}
        ></div>

        {/* Animated mist layer 2 — slow drift left */}
        <div
          className="absolute inset-0 opacity-25 animate-haze-drift-2"
          style={{
            background: 'radial-gradient(ellipse 100% 60% at 80% 60%, rgba(10,10,15,0.7) 0%, transparent 60%)',
          }}
        ></div>

        {/* Animated mist layer 3 — vertical drift */}
        <div
          className="absolute inset-0 opacity-20 animate-haze-drift-3"
          style={{
            background: 'radial-gradient(ellipse 80% 120% at 50% 80%, rgba(10,10,15,0.6) 0%, transparent 50%)',
          }}
        ></div>

        {/* Neon color tint */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            background: 'linear-gradient(135deg, #00F0FF 0%, transparent 40%, #7B2FBE 70%, transparent 100%)',
          }}
        ></div>
      </div>

      {/* Heavy vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.95)] pointer-events-none"></div>
    </div>
  );
};

export default ImageBackground;
