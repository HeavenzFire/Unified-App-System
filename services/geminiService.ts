
import { GoogleGenAI, Type } from "@google/genai";
import { Plan } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("No text generated.");
    }
    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error: Could not generate a response.";
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: prompt },
                ],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                const base64EncodeString: string = part.inlineData.data;
                return `data:image/png;base64,${base64EncodeString}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};

export const generatePlan = async (request: string): Promise<Plan | null> => {
    const systemInstruction = `You are the control plane for a multi-purpose AI system. Your task is to analyze a user request and create an execution plan.
The available modules are: "TaskManager", "IdeaGenerator", "CodeAssistant", "TextSummarizer", "ImageInspirer".
Analyze the user's request and determine the user's intent, a risk level, and the best module to handle the request with a refined prompt for that module.
Respond with a JSON object that adheres to the provided schema.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `User Request: "${request}"`,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        intent: { type: Type.STRING, description: "A short description of the user's goal." },
                        risk: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                        action: {
                            type: Type.OBJECT,
                            properties: {
                                module: { type: Type.STRING, enum: ['TaskManager', 'IdeaGenerator', 'CodeAssistant', 'TextSummarizer', 'ImageInspirer'] },
                                prompt: { type: Type.STRING, description: "The refined prompt to send to that module." }
                            },
                            required: ['module', 'prompt']
                        }
                    },
                    required: ['intent', 'risk', 'action']
                },
            },
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as Plan;

    } catch (error) {
        console.error("Error generating plan:", error);
        return null;
    }
};
