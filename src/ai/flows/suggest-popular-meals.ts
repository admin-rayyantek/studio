'use server';

/**
 * @fileOverview A flow to suggest popular meal items based on current trends and student preferences.
 *
 * - suggestPopularMeals - A function that suggests popular meal items.
 * - SuggestPopularMealsInput - The input type for the suggestPopularMeals function.
 * - SuggestPopularMealsOutput - The return type for the suggestPopularMeals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPopularMealsInputSchema = z.object({
  studentPreferences: z
    .array(z.string())
    .describe('List of student food preferences.'),
  currentTrends: z
    .array(z.string())
    .describe('List of current food trends.'),
  menuHistory: z.string().describe('The history of the menu items.'),
});
export type SuggestPopularMealsInput = z.infer<typeof SuggestPopularMealsInputSchema>;

const SuggestPopularMealsOutputSchema = z.object({
  suggestedMeals: z
    .array(z.string())
    .describe('List of suggested popular meal items.'),
});
export type SuggestPopularMealsOutput = z.infer<typeof SuggestPopularMealsOutputSchema>;

export async function suggestPopularMeals(
  input: SuggestPopularMealsInput
): Promise<SuggestPopularMealsOutput> {
  return suggestPopularMealsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPopularMealsPrompt',
  input: {schema: SuggestPopularMealsInputSchema},
  output: {schema: SuggestPopularMealsOutputSchema},
  prompt: `You are a meal planning expert. You are tasked with suggesting popular meal items based on student preferences and current trends.

Student Preferences: {{studentPreferences}}
Current Trends: {{currentTrends}}
Menu History: {{menuHistory}}

Based on the above information, suggest a list of popular meal items. Be specific.
`,
});

const suggestPopularMealsFlow = ai.defineFlow(
  {
    name: 'suggestPopularMealsFlow',
    inputSchema: SuggestPopularMealsInputSchema,
    outputSchema: SuggestPopularMealsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
