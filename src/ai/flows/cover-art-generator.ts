'use server';
/**
 * @fileOverview A cover art generation AI agent.
 *
 * - generateCoverArt - A function that handles the cover art generation process.
 * - GenerateCoverArtInput - The input type for the generateCoverArt function.
 * - GenerateCoverArtOutput - The return type for the generateCoverArt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverArtInputSchema = z.object({
  prompt: z.string().describe('A detailed description of the cover art to generate.'),
});
export type GenerateCoverArtInput = z.infer<typeof GenerateCoverArtInputSchema>;

const GenerateCoverArtOutputSchema = z.object({
  coverArtUrl: z
    .string()
    .describe("The generated cover art image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateCoverArtOutput = z.infer<typeof GenerateCoverArtOutputSchema>;


export async function generateCoverArt(
  input: GenerateCoverArtInput
): Promise<GenerateCoverArtOutput> {
  return generateCoverArtFlow(input);
}


const generateCoverArtFlow = ai.defineFlow(
  {
    name: 'generateCoverArtFlow',
    inputSchema: GenerateCoverArtInputSchema,
    outputSchema: GenerateCoverArtOutputSchema,
  },
  async ({prompt}) => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Create a square album cover art, without any text, based on the following description: ${prompt}`,
        config: {
          aspectRatio: '1:1',
        },
      });
      
    if (!media.url) {
      throw new Error('Image generation failed to produce an image.');
    }
      
    return { coverArtUrl: media.url };
  }
);
