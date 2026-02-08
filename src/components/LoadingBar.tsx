import React from 'react';

interface LoadingBarProps {
    progress: number; // 0 to 100
    statusText: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress, statusText }) => {
    return (
        <div className="w-full max-w-4xl flex flex-col gap-2">
            <div className="flex justify-between items-end text-green-400 font-mono text-sm uppercase tracking-wider mb-1">
                <span>{statusText}</span>
                <span className="font-bold">{Math.round(progress)}%</span>
            </div>
            
            <div className="h-3 w-full bg-gray-900/80 border border-green-900 rounded-full overflow-hidden backdrop-blur-sm relative">
                {/* Glowing Progress Fill */}
                <div 
                    className="h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    {/* Stripes pattern on bar */}
                    <div className="absolute inset-0 opacity-30 bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)]"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingBar;