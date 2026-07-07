
import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../config";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getThematicQuote(stage: string): Promise<string> {
  if (!CONFIG.useAI) return CONFIG.fallbackQuote;
  try {
    const prompt = CONFIG.aiPrompt.replace("{stage}", stage);
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { temperature: 0.8 }
    });
    return response.text?.trim() || CONFIG.fallbackQuote;
  } catch {
    return CONFIG.fallbackQuote;
  }
}
