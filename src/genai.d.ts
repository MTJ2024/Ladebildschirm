declare module "@google/genai" {
  export interface GenerateContentConfig {
    temperature?: number;
    thinkingConfig?: { thinkingBudget: number };
  }

  export interface GenerateContentRequest {
    model: string;
    contents: string;
    config?: GenerateContentConfig;
  }

  export interface GenerateContentResponse {
    text: string;
  }

  export interface Models {
    generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse>;
  }

  export class GoogleGenAI {
    constructor(options: { apiKey: string });
    models: Models;
  }
}
