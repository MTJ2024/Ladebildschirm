import React from 'react';

const Background: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* CSS-only dark city gradient background */}
            <div 
                className="w-full h-full"
                style={{
                    background: 'radial-gradient(ellipse at 50% 40%, #0a2e1a 0%, #061a0e 30%, #030d07 60%, #000000 100%)',
                }}
            />

            {/* Green Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
            
            {/* Green Tint */}
            <div className="absolute inset-0 bg-green-900 mix-blend-overlay opacity-20"></div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAE0lEQVQIW2NkYGD4zwABjFAQAwwCQAJ50e41AAAAAElFTkSuQmCC')] opacity-10 pointer-events-none"></div>
            
            {/* Animated glow spots */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Animated Smoke/Fog Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-900/20 to-transparent blur-3xl animate-pulse"></div>
        </div>
    );
};

export default Background;