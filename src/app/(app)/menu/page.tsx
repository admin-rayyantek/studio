'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { menuEvents } from '@/lib/data';

export default function MenuPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date('2023-11-01'));

  const modifiers = menuEvents.reduce((acc, event) => {
    acc[event.title] = new Date(event.date);
    return acc;
  }, {} as Record<string, Date>);

  const modifiersStyles = {
    [Object.keys(modifiers)[0]]: {
      border: '2px solid hsl(var(--primary))',
    },
    [Object.keys(modifiers)[1]]: {
      border: '2px solid hsl(var(--primary))',
    },
    ...menuEvents.reduce((acc, event) => {
      acc[event.title] = {
        color: 'hsl(var(--accent-foreground))',
        backgroundColor: 'hsl(var(--accent))',
      };
      return acc;
    }, {} as any),
  };
  
  const selectedEvent = date ? menuEvents.find(e => format(new Date(e.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) : null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Menu Calendar</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date('2023-11-01')}
              className="w-full"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
                {date ? format(date, 'PPP') : 'Select a date'}
            </CardTitle>
            <CardDescription>
                {selectedEvent ? 'Menu items for the selected date.' : 'No menu planned for this date.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
                <div>
                    <h3 className="font-semibold">{selectedEvent.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
            ) : (
                 <p className="text-sm text-muted-foreground">Select a date with a planned menu to see details.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
