import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import LoadingBar from './components/LoadingBar';
import MusicPlayer from './components/MusicPlayer';
import AiStatus from './components/AiStatus';
import { FiveMLoadingData, LoadingState } from './types';

const App: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState(LoadingState.CONNECTING);

    useEffect(() => {
        // Listener for FiveM NUI events
        const handleMessage = (event: MessageEvent) => {
            const data: FiveMLoadingData = event.data;

            if (data.eventName === 'loadProgress') {
                const percentage = data.loadFraction * 100;
                setProgress(percentage);

                // Update text based on progress
                if (percentage < 20) setStatusText(LoadingState.CONNECTING);
                else if (percentage < 80) setStatusText(LoadingState.DOWNLOADING);
                else if (percentage < 99) setStatusText(LoadingState.INIT_SESSION);
                else setStatusText(LoadingState.FINALIZING);
            }
        };

        window.addEventListener('message', handleMessage);

        // --- SIMULATION FOR BROWSER TESTING (Remove in Production if desired) ---
        // If not in FiveM, we won't get events, so we simulate loading
        if (!(window as any).invokeNative) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    // Non-linear loading simulation
                    const increment = Math.random() * 2; 
                    const next = prev + increment;
                    
                    if (next < 20) setStatusText(LoadingState.CONNECTING);
                    else if (next < 80) setStatusText(LoadingState.DOWNLOADING);
                    else if (next < 99) setStatusText(LoadingState.INIT_SESSION);
                    else setStatusText(LoadingState.FINALIZING);

                    return next;
                });
            }, 150); // Updates every 150ms
            return () => {
                window.removeEventListener('message', handleMessage);
                clearInterval(interval);
            };
        }

        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className="relative w-full h-screen text-white overflow-hidden bg-black select-none">
            {/* Visuals */}
            <Background />
            
            {/* UI Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-12">
                
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 font-['Orbitron'] drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                            GreenZone<span className="text-white">420</span>
                        </h1>
                        <div className="flex items-center gap-4 text-green-300 font-mono tracking-widest text-sm bg-black/40 inline-block px-4 py-1 rounded border border-green-500/20 backdrop-blur-sm">
                            <span>ROLEPLAY SERVER</span>
                            <span>•</span>
                            <span>VOICE</span>
                            <span>•</span>
                            <span>ECONOMY</span>
                        </div>
                    </div>
                    
                    <MusicPlayer />
                </div>

                {/* Middle Section - Dynamic Content */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full mt-auto mb-16 gap-8">
                    <AiStatus />
                    
                    {/* Additional Static Info or Rules Carousel could go here */}
                    <div className="hidden lg:block text-right">
                        <div className="text-green-500 font-['Orbitron'] text-xl font-bold mb-2">COMMUNITY</div>
                        <div className="text-gray-400 font-light text-sm space-y-1">
                            <p>Discord: discord.gg/greenzone420</p>
                            <p>Regelwerk lesen!</p>
                            <p>Kein OOC im IC</p>
                        </div>
                    </div>
                </div>

                {/* Footer / Loading Bar */}
                <div className="w-full flex justify-center pb-8">
                    <LoadingBar progress={progress} statusText={statusText} />
                </div>
            </div>
            
            {/* Corner Version Tag */}
            <div className="absolute bottom-4 right-4 text-green-900/50 text-xs font-mono">
                v2.5.0 | BUILD 2024
            </div>
        </div>
    );
};

export default App;