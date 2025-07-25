'use server';

/**
 * @fileOverview AI-powered response generation in Indonesian languages.
 *
 * - generateAIResponse - A function to generate AI responses in Bahasa Indonesia, Javanese, or Sundanese.
 * - GenerateAIResponseInput - The input type for the generateAIResponse function.
 * - GenerateAIResponseOutput - The return type for the generateAIResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAIResponseInputSchema = z.object({
  language: z.enum(['Bahasa Indonesia', 'Javanese', 'Sundanese']).describe('The Indonesian language to use for the response.'),
  question: z.string().describe('The user question to be answered by the AI tutor.'),
});
export type GenerateAIResponseInput = z.infer<typeof GenerateAIResponseInputSchema>;

const GenerateAIResponseOutputSchema = z.object({
  response: z.string().describe('The AI-generated response in the specified Indonesian language.'),
  englishResponse: z.string().describe('The English translation of the response.'),
});
export type GenerateAIResponseOutput = z.infer<typeof GenerateAIResponseOutputSchema>;

export async function generateAIResponse(input: GenerateAIResponseInput): Promise<GenerateAIResponseOutput> {
  return generateAIResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAIResponsePrompt',
  input: {schema: GenerateAIResponseInputSchema},
  output: {schema: GenerateAIResponseOutputSchema},
  prompt: `You are a helpful AI tutor specializing in Indonesian languages. You will respond to the user's question in the specified language, and also provide an English translation of your response.

Language: {{{language}}}
Question: {{{question}}}

Respond with a JSON object containing two fields: 'response' for the answer in the requested language, and 'englishResponse' for the English translation.`,
});

const generateAIResponseFlow = ai.defineFlow(
  {
    name: 'generateAIResponseFlow',
    inputSchema: GenerateAIResponseInputSchema,
    outputSchema: GenerateAIResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
