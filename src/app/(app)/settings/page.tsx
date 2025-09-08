
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const settingsSchema = z.object({
  cutInDays: z.coerce.number().min(0, 'Days must be non-negative.'),
  cutInTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM).'),
  cutOutDays: z.coerce.number().min(0, 'Days must be non-negative.'),
  cutOutTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM).'),
  maxMeals: z.coerce.number().min(1, 'Max meals must be at least 1.'),
});

export default function SettingsPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      cutInDays: 1,
      cutInTime: '08:00',
      cutOutDays: 1,
      cutOutTime: '10:30',
      maxMeals: 2,
    },
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    console.log(values);
    toast({
      title: 'Settings Saved',
      description: 'Your default meal order settings have been updated.',
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Default Meal Order Settings</CardTitle>
              <CardDescription>
                Set the default rules for when and how many meals can be ordered.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Order Cut-in</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cutInDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Days Before Order Date</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cutInTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time (24h format)</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Order Cut-out</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cutOutDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Days Before Order Date</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cutOutTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time (24h format)</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                 <h3 className="text-lg font-medium">Daily Limit</h3>
                <FormField
                  control={form.control}
                  name="maxMeals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Number of Meals Per Day</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="max-w-xs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
