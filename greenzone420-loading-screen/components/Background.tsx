import React from 'react';

const Background: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Image - Urban Night Scene */}
            <img 
                src="https://picsum.photos/seed/greenzone420/1920/1080" 
                alt="GreenZone City" 
                className="w-full h-full object-cover scale-110 animate-pulse-slow"
                style={{ filter: 'brightness(0.4) contrast(1.2)' }}
            />

            {/* Green Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
            
            {/* Green Tint */}
            <div className="absolute inset-0 bg-green-900 mix-blend-overlay opacity-20"></div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAE0lEQVQIW2NkYGD4zwABjFAQAwwCQAJ50e41AAAAAElFTkSuQmCC')] opacity-10 pointer-events-none"></div>
            
            {/* Animated Smoke/Fog Effect (Simulated with gradients) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-900/20 to-transparent blur-3xl animate-pulse"></div>
        </div>
    );
};

export default Background;