import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateInkPainting = async (poem: string): Promise<string> => {
  const ai = getClient();

  // Constructing a specific prompt for Ink Wash Painting style (Shuimo)
  const prompt = `
    Create a traditional Chinese ink wash painting (Shui-mo hua) that captures the essence, imagery, and mood of the following poem:
    
    "${poem}"
    
    Artistic Direction:
    - Style: Traditional Chinese Ink Wash (Shuimo).
    - Format: Horizontal Handscroll (long landscape format).
    - Technique: Expressive brush strokes, varying ink density (dry vs. wet), minimalist composition, negative space (Liubai).
    - Colors: Primarily monochrome (black ink on white paper), possibly with very subtle, muted touches of color if necessary to convey the season or emotion (e.g., faint pink for blossoms, muted green for bamboo), but stick mostly to black and white.
    - Atmosphere: Ethereal, poetic, contemplative, and zen.
    - Substrate: The image should look like it is painted on Xuan paper.
  `;

  try {
    // Using gemini-2.5-flash-image as it is efficient and capable of following style instructions
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9", // Landscape orientation for scroll
        }
      }
    });

    // Extract image from response
    // The response structure for image generation contains parts.
    // We iterate to find the inlineData.
    let imageUrl = '';
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                break;
            }
        }
    }

    if (!imageUrl) {
      throw new Error("No image data received from the model.");
    }

    return imageUrl;

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    throw new Error(error.message || "Failed to generate painting.");
  }
};