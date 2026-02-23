
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch {
  // API key not available - quotes will use fallbacks
}

export async function getThematicQuote(stage: string): Promise<string> {
  if (!ai) {
    return "Greenzone regiert die Nacht.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Erstelle einen kurzen, harten deutschen Straßen-Spruch (max 10 Wörter) im GTA Online Style zum Thema "${stage}". Der Ton ist brutal ehrlich, streetwise und selbstbewusst. Nutze Slang und Metaphern aus der Unterwelt: Geld, Macht, Straße, Nacht, Neon. Es geht um Michael & Lucifer die in Los Santos (Greenzone420) ihr Imperium aufbauen. Kein Weichgespültes.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text?.trim() || "Die Straße vergisst nie.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Greenzone regiert die Nacht.";
  }
}
