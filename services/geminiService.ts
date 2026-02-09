
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getThematicQuote(stage: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Erstelle einen poetischen, indirekten deutschen Satz (max 12 Wörter) zum Thema "${stage}". Sprich "durch die Blume": Nutze Metaphern wie Blüten, Wurzeln, Licht, Feuer und Wind. Verbinde das Wesen von Michael & Lucifer (Feuer und Schatten) mit dem Neuanfang in Los Santos (Greenzone420). Der Ton sollte edel, geheimnisvoll und warm sein.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text?.trim() || "Wo Feuer war, blüht nun die Freiheit.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Die Knospe des Lichts öffnet sich.";
  }
}
