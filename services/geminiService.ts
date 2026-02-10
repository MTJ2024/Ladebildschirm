
import { GoogleGenAI } from "@google/genai";

// Fallback quotes for each stage when API is not available
const FALLBACK_QUOTES: Record<string, string> = {
  "Wurzel im Schatten": "In der Tiefe nährt sich die Stärke.",
  "Keimen der Glut": "Ein warmer Hauch bricht durch das Schweigen.",
  "Blüte des Feuers": "Das Licht Michaels entfaltet seine Pracht.",
  "Der Garten der Freiheit": "Die Stadt empfängt den Duft der Erneuerung.",
  "GZ420 Vollendung": "Das Schicksal ist aufgeblüht."
};

const DEFAULT_QUOTE = "Wo Feuer war, blüht nun die Freiheit.";

let ai: GoogleGenAI | null = null;

// Only initialize AI client if API key is available (server-side)
try {
  const apiKey = typeof process !== 'undefined' ? process.env?.API_KEY : undefined;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  // Silently fail - we'll use fallback quotes
  console.log("Gemini API not available, using fallback quotes");
}

export async function getThematicQuote(stage: string): Promise<string> {
  // If no AI client, use fallback quotes immediately
  if (!ai) {
    return FALLBACK_QUOTES[stage] || DEFAULT_QUOTE;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Erstelle einen poetischen, indirekten deutschen Satz (max 12 Wörter) zum Thema "${stage}". Sprich "durch die Blume": Nutze Metaphern wie Blüten, Wurzeln, Licht, Feuer und Wind. Verbinde das Wesen von Michael & Lucifer (Feuer und Schatten) mit dem Neuanfang in Los Santos (Greenzone420). Der Ton sollte edel, geheimnisvoll und warm sein.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text?.trim() || FALLBACK_QUOTES[stage] || DEFAULT_QUOTE;
  } catch (error) {
    console.error("Gemini Error:", error);
    return FALLBACK_QUOTES[stage] || DEFAULT_QUOTE;
  }
}
