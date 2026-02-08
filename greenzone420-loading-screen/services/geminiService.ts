import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Fallback tips if API fails or key is missing
const FALLBACK_TIPS = [
    "Halte dich an die Verkehrsregeln, auch wenn du high bist.",
    "Respektiere die Medics, sie retten deinen Arsch.",
    "Das Weed-Feld ist nicht die einzige Einnahmequelle. Sei kreativ.",
    "GreenZone420 ist ein Safe Space für gutes RP, kein GTA Online.",
    "Benutze /me und /do für besseres Roleplay."
];

export const generateRpTip = async (): Promise<string> => {
    if (!API_KEY) {
        console.warn("Gemini API Key missing, using fallback tip.");
        return FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        // Using flash model for speed
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Generiere einen kurzen, coolen und nützlichen Tipp (max 20 Wörter) für einen Spieler, der dem GTA V Roleplay Server 'GreenZone420' beitritt. Der Vibe ist 'Stoner/Gangster/Chill'. Sprache: Deutsch.",
            config: {
                temperature: 1.2, // High creativity
                thinkingConfig: { thinkingBudget: 0 } // Disable thinking for speed
            }
        });

        return response.text.trim() || FALLBACK_TIPS[0];
    } catch (error) {
        console.error("Failed to generate tip:", error);
        return FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
    }
};