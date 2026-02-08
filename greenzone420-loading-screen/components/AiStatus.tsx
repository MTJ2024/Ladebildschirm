import React, { useEffect, useState } from 'react';
import { generateRpTip } from '../services/geminiService';

const AiStatus: React.FC = () => {
    const [tip, setTip] = useState<string>("Lade GreenZone Intelligence...");

    useEffect(() => {
        // Fetch a tip when component mounts
        const fetchTip = async () => {
            const newTip = await generateRpTip();
            setTip(newTip);
        };
        fetchTip();

        // Optional: Rotate tips every 15 seconds
        const interval = setInterval(fetchTip, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black/50 backdrop-blur-md border-l-4 border-green-500 p-6 max-w-lg rounded-r-lg shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <h3 className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest text-sm mb-2 font-['Orbitron']">
                <svg className="w-5 h-5 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                GreenZone AI
            </h3>
            <p className="text-gray-200 text-lg font-light leading-relaxed italic">
                "{tip}"
            </p>
        </div>
    );
};

export default AiStatus;