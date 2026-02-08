import React, { useState, useEffect, useRef } from 'react';

// Using a royalty-free trap beat placeholder. 
// In a real scenario, replace with your hosted file or local assets/music.ogg
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7346b.mp3"; 

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.2);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Auto-play attempt
        if (audioRef.current) {
            audioRef.current.volume = volume;
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch((error) => {
                    console.log("Autoplay prevented by browser:", error);
                    setIsPlaying(false);
                });
            }
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
        }
    };

    return (
        <div className="fixed top-8 right-8 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-green-500/30">
            <audio ref={audioRef} src={MUSIC_URL} loop />
            
            <button 
                onClick={togglePlay}
                className="text-green-400 hover:text-green-300 transition-colors"
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                )}
            </button>

            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-green-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            
            <div className="text-xs text-green-300/70 font-mono hidden sm:block">
                <span className="animate-pulse">●</span> NOW PLAYING
            </div>
        </div>
    );
};

export default MusicPlayer;