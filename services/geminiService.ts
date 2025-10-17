import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Checks if a user's thought is appropriate using the Gemini API.
 * @param thoughtText The text of the user's thought.
 * @returns A boolean indicating if the content is safe.
 */
export const moderateConfession = async (thoughtText: string): Promise<boolean> => {
  const model = 'gemini-2.5-flash';
  const prompt = `Analyze the following text for inappropriate content (hate speech, violence, harassment, explicit adult content, bullying, self-harm). Based on your analysis, determine if the text is safe for a general audience.

Text: "${thoughtText}"`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: {
              type: Type.BOOLEAN,
              description: "True if the content is safe for a general audience, false otherwise."
            },
          },
          required: ["isSafe"],
        }
      }
    });
    
    // The model can sometimes wrap the JSON response in markdown backticks.
    // This cleans the string before parsing to prevent errors.
    const cleanedText = response.text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const result = JSON.parse(cleanedText);
    return result.isSafe;
  } catch (error) {
    console.error("Error in moderation:", error);
    // Fail safe: if moderation fails, assume content is unsafe.
    return false;
  }
};

/**
 * Generates creative and supportive suggestions for a user's thought using the Gemini API.
 * @param thoughtText The text of the user's thought.
 * @returns A string containing Soshage's suggestions.
 */
export const getAIThoughts = async (thoughtText: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  const prompt = `You are "Soshage", a creative and insightful AI suggesting partner. Your goal is to help users explore their own thoughts, problems, or ideas by providing novel perspectives, brainstorming prompts, and supportive suggestions. Avoid giving direct advice or solving the problem for them. Instead, empower them to think differently. Your tone is curious, encouraging, and slightly playful. Use emojis to add personality. Keep your response to 2-3 sentences.

Thought: "${thoughtText}"`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating AI thoughts:", error);
    return "The AI is pondering life's great mysteries right now. Please try again later! ✨";
  }
};
