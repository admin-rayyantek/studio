'use server';
/**
 * @fileOverview AI agent that recommends meals to students based on their order history,
 * dietary preferences, and popular choices.
 *
 * - recommendMealsToStudents - A function that recommends meals to students.
 * - RecommendMealsToStudentsInput - The input type for the recommendMealsToStudents function.
 * - RecommendMealsToStudentsOutput - The return type for the recommendMealsToStudents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendMealsToStudentsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  orderHistory: z
    .array(z.string())
    .describe('The student\'s order history, as a list of meal names.'),
  dietaryPreferences: z
    .array(z.string())
    .describe('The student\'s dietary preferences, as a list of strings.'),
  popularChoices: z
    .array(z.string())
    .describe('The list of most popular meal choices.'),
});
export type RecommendMealsToStudentsInput = z.infer<
  typeof RecommendMealsToStudentsInputSchema
>;

const RecommendMealsToStudentsOutputSchema = z.object({
  recommendedMeals: z
    .array(z.string())
    .describe('The list of recommended meals for the student.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the meal recommendations.'),
});
export type RecommendMealsToStudentsOutput = z.infer<
  typeof RecommendMealsToStudentsOutputSchema
>;

export async function recommendMealsToStudents(
  input: RecommendMealsToStudentsInput
): Promise<RecommendMealsToStudentsOutput> {
  return recommendMealsToStudentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMealsToStudentsPrompt',
  input: {schema: RecommendMealsToStudentsInputSchema},
  output: {schema: RecommendMealsToStudentsOutputSchema},
  prompt: `You are a meal recommendation expert.

You will use the student's order history, dietary preferences, and popular choices to recommend meals to the student.

Student ID: {{{studentId}}}
Order History: {{#if orderHistory}}{{#each orderHistory}}- {{{this}}}\n{{/each}}{{else}}No order history available.{{/if}}
Dietary Preferences: {{#if dietaryPreferences}}{{#each dietaryPreferences}}- {{{this}}}\n{{/each}}{{else}}No dietary preferences available.{{/if}}
Popular Choices: {{#if popularChoices}}{{#each popularChoices}}- {{{this}}}\n{{/each}}{{else}}No popular choices available.{{/if}}

Based on this information, recommend a list of meals to the student, and explain your reasoning.  Be concise and do not be conversational, instead be direct.
`,
});

const recommendMealsToStudentsFlow = ai.defineFlow(
  {
    name: 'recommendMealsToStudentsFlow',
    inputSchema: RecommendMealsToStudentsInputSchema,
    outputSchema: RecommendMealsToStudentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
