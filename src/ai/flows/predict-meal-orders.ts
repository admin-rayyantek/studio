'use server';

/**
 * @fileOverview Predicts the number of meal orders for upcoming days based on historical data and menu items.
 *
 * - predictMealOrders - A function that predicts meal orders.
 * - PredictMealOrdersInput - The input type for the predictMealOrders function.
 * - PredictMealOrdersOutput - The return type for the predictMealOrders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictMealOrdersInputSchema = z.object({
  historicalData: z.string().describe('Historical data of meal orders, including dates and quantities.'),
  menuItems: z.string().describe('List of menu items available for the upcoming days.'),
  daysToPredict: z.number().describe('Number of days to predict meal orders for.'),
});
export type PredictMealOrdersInput = z.infer<typeof PredictMealOrdersInputSchema>;

const PredictMealOrdersOutputSchema = z.object({
  predictedOrders: z.string().describe('Predicted number of meal orders for each upcoming day, along with confidence intervals.'),
  suggestedMenuItems: z.string().describe('Suggested popular meal items for the upcoming days.'),
  recommendedMeals: z.string().describe('Recommended meals to students based on their order history.'),
});
export type PredictMealOrdersOutput = z.infer<typeof PredictMealOrdersOutputSchema>;

export async function predictMealOrders(input: PredictMealOrdersInput): Promise<PredictMealOrdersOutput> {
  return predictMealOrdersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMealOrdersPrompt',
  input: {schema: PredictMealOrdersInputSchema},
  output: {schema: PredictMealOrdersOutputSchema},
  prompt: `You are an AI assistant specialized in predicting meal orders for a school cafeteria.
  Based on the historical data of meal orders, the menu items available for the upcoming days, and the number of days to predict,
  you will predict the number of meal orders for each upcoming day, suggest popular meal items, and recommend meals to students based on their order history.

  Historical Data: {{{historicalData}}}
  Menu Items: {{{menuItems}}}
  Days to Predict: {{{daysToPredict}}}

  Please provide the predicted number of meal orders for each upcoming day, along with confidence intervals, suggested popular meal items, and recommended meals to students.
  Make sure to output in a JSON format, as described in the output schema. Be concise, but include all relevant information.
  `,
});

const predictMealOrdersFlow = ai.defineFlow(
  {
    name: 'predictMealOrdersFlow',
    inputSchema: PredictMealOrdersInputSchema,
    outputSchema: PredictMealOrdersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
