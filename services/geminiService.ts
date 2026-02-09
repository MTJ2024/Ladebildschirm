
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getThematicQuote(stage: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Erstelle einen epischen, kraftvollen, deutschen Satz (max 12 Wörter) zum Thema "${stage}" im Kontext vom gefallenen Erzengel Michael, Lucifer, göttlichem Feuer und der Ankunft des Befreiers für die Marke Greenzone420. Mystisch, gewaltig, aber erleuchtet. Keine reine Finsternis, sondern das Licht des Feuers.`,
      config: {
        temperature: 0.85,
      }
    });
    return response.text?.trim() || "Das Feuer des Befreiers brennt ewig.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Das Schicksal Michaels wird erfüllt.";
  }
}
