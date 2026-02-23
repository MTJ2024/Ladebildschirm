
import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * GTA V cinematic background video player.
 * Place your .mp4 files in html/videos/ — they will crossfade and loop endlessly.
 * If no videos load, falls back to the dark atmosphere background.
 */

const VIDEO_SOURCES = [
  'videos/bg1.mp4',
  'videos/bg2.mp4',
  'videos/bg3.mp4',
];

const CROSSFADE_DURATION = 2000;
const MIN_PLAY_DURATION = 8000;

const VideoBackground: React.FC = () => {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAActive, setIsAActive] = useState(true);
  const [hasVideos, setHasVideos] = useState(true);
  const currentSourceIndex = useRef(0);
  const switchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getNextSourceIndex = () => {
    currentSourceIndex.current = (currentSourceIndex.current + 1) % VIDEO_SOURCES.length;
    return currentSourceIndex.current;
  };

  const switchVideo = useCallback(() => {
    const nextIdx = getNextSourceIndex();
    const nextVideo = isAActive ? videoBRef.current : videoARef.current;
    
    if (nextVideo) {
      nextVideo.src = VIDEO_SOURCES[nextIdx];
      nextVideo.load();
      nextVideo.play().catch(e => console.warn('Video preload play failed:', e));
    }

    setIsAActive(prev => !prev);
    setActiveIndex(nextIdx);
  }, [isAActive, getNextSourceIndex]);

  const scheduleSwitch = useCallback(() => {
    if (switchTimeout.current) clearTimeout(switchTimeout.current);
    
    const activeVideo = isAActive ? videoARef.current : videoBRef.current;
    if (!activeVideo) return;

    const waitTime = activeVideo.duration && isFinite(activeVideo.duration)
      ? Math.max(activeVideo.duration * 1000 - CROSSFADE_DURATION, MIN_PLAY_DURATION)
      : MIN_PLAY_DURATION;

    switchTimeout.current = setTimeout(switchVideo, waitTime);
  }, [isAActive, switchVideo]);

  useEffect(() => {
    const videoA = videoARef.current;
    if (!videoA) return;

    videoA.src = VIDEO_SOURCES[0];
    videoA.load();
    
    const handleCanPlay = () => {
      videoA.play().catch(e => console.warn('Video autoplay failed:', e));
      scheduleSwitch();
    };

    const handleError = () => {
      setHasVideos(false);
    };

    videoA.addEventListener('canplay', handleCanPlay, { once: true });
    videoA.addEventListener('error', handleError, { once: true });

    return () => {
      videoA.removeEventListener('canplay', handleCanPlay);
      videoA.removeEventListener('error', handleError);
      if (switchTimeout.current) clearTimeout(switchTimeout.current);
    };
  }, []);

  useEffect(() => {
    const activeVideo = isAActive ? videoARef.current : videoBRef.current;
    if (!activeVideo) return;

    const handlePlaying = () => {
      scheduleSwitch();
    };

    activeVideo.addEventListener('playing', handlePlaying, { once: true });

    // Loop fallback: if only one video or if ended before switch
    const handleEnded = () => {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(e => console.warn('Video loop play failed:', e));
    };
    activeVideo.addEventListener('ended', handleEnded);

    return () => {
      activeVideo.removeEventListener('playing', handlePlaying);
      activeVideo.removeEventListener('ended', handleEnded);
    };
  }, [isAActive, scheduleSwitch]);

  if (!hasVideos) return null;

  const sharedVideoClass = "absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video A */}
      <video
        ref={videoARef}
        className={sharedVideoClass}
        style={{
          opacity: isAActive ? 1 : 0,
          transitionDuration: `${CROSSFADE_DURATION}ms`,
        }}
        muted
        playsInline
        preload="auto"
      />
      {/* Video B */}
      <video
        ref={videoBRef}
        className={sharedVideoClass}
        style={{
          opacity: isAActive ? 0 : 1,
          transitionDuration: `${CROSSFADE_DURATION}ms`,
        }}
        muted
        playsInline
        preload="auto"
      />

      {/* Haze / Mist overlay — dark cinematic fog drifting across the video */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base dark tint */}
        <div className="absolute inset-0 bg-black/50"></div>
        
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

        {/* Slight color tint matching neon theme */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            background: 'linear-gradient(135deg, #00F0FF 0%, transparent 40%, #7B2FBE 70%, transparent 100%)',
          }}
        ></div>
      </div>

      {/* Heavy vignette to frame the video */}
      <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,0.95)] pointer-events-none"></div>
    </div>
  );
};

export default VideoBackground;
