
import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../config";

let _ai: GoogleGenAI | null = null;

function getClient(): GoogleGenAI | null {
  if (!CONFIG.useAI) return null;
  const key = process.env.API_KEY;
  if (!key) return null;
  if (!_ai) _ai = new GoogleGenAI({ apiKey: key });
  return _ai;
}

export async function getThematicQuote(stage: string): Promise<string> {
  const ai = getClient();
  if (!ai) return CONFIG.fallbackQuote;
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
