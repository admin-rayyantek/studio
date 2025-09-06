'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { predictMealOrders, PredictMealOrdersOutput } from '@/ai/flows/predict-meal-orders';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  historicalData: z.string().min(1, 'Historical data is required.'),
  menuItems: z.string().min(1, 'Menu items are required.'),
  daysToPredict: z.coerce.number().min(1, 'Must predict at least 1 day.').max(30, 'Cannot predict more than 30 days.'),
});

const defaultHistoricalData = `Last 5 days order counts:
- Monday: 150 orders (Spaghetti)
- Tuesday: 165 orders (Tacos)
- Wednesday: 160 orders (Chicken Sandwiches)
- Thursday: 155 orders (Pizza)
- Friday: 180 orders (Burgers)`;

const defaultMenuItems = `Next week's menu:
- Monday: Vegetable Lasagna
- Tuesday: Chicken Curry
- Wednesday: Fish and Chips
- Thursday: Beef Stir-fry
- Friday: Mac and Cheese`;

export function PredictionsForm() {
  const [prediction, setPrediction] = useState<PredictMealOrdersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalData: defaultHistoricalData,
      menuItems: defaultMenuItems,
      daysToPredict: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictMealOrders(values);
      setPrediction(result);
    } catch (error) {
        console.error("Prediction failed:", error);
        toast({
            variant: "destructive",
            title: "Prediction Failed",
            description: "There was an error generating the prediction. Please try again."
        })
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate Predictions</CardTitle>
          <CardDescription>
            Fill in the details below to predict future meal orders using AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Order Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Last 5 days order counts: Monday - 150, Tuesday - 165..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide past order data. More detail leads to better predictions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="menuItems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upcoming Menu Items</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Monday: Pizza, Tuesday: Tacos..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List the menu for the upcoming prediction period.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="daysToPredict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days to Predict</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Prediction
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
            <CardDescription>Results from the prediction model will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {isLoading && (
                <div className="flex flex-col items-center justify-center pt-10">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">The AI is thinking...</p>
                </div>
            )}
            {prediction ? (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Predicted Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{prediction.predictedOrders}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Suggested Popular Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{prediction.suggestedMenuItems}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Student Meal Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{prediction.recommendedMeals}</p>
                        </CardContent>
                    </Card>
                </>
            ) : !isLoading && (
                <div className="flex flex-col items-center justify-center pt-10 text-center">
                    <Wand2 className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Your prediction results will be displayed here once generated.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
