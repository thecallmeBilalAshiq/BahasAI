'use server';

/**
 * @fileOverview A translation AI agent.
 *
 * - translateText - A function that handles the translation process.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  sourceLanguage: z.enum(['id', 'jv', 'su', 'en']).describe('The source language code (id: Indonesian, jv: Javanese, su: Sundanese, en: English).'),
  targetLanguage: z.enum(['id', 'jv', 'su', 'en']).describe('The target language code (id: Indonesian, jv: Javanese, su: Sundanese, en: English).'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `You are a translation expert specializing in Indonesian languages and English.

You will translate the given text from the source language to the target language.

Source Language Code: {{{sourceLanguage}}}
Target Language Code: {{{targetLanguage}}}

Text to Translate: {{{text}}}

Provide only the translated text in your response.`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
