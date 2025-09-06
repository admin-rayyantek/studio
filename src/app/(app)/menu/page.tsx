
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { vendors, menuEvents as initialMenuEvents } from '@/lib/data';
import type { MenuEvent, VendorMenuItem } from '@/types';

export default function MenuPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date('2023-11-01'));
  const [menuEvents, setMenuEvents] = React.useState(initialMenuEvents);
  const [isAddMenuOpen, setAddMenuOpen] = React.useState(false);

  const allMenuItems = React.useMemo(() => {
    return vendors.flatMap((vendor) =>
      vendor.menu.map((item) => ({ ...item, vendorName: vendor.name }))
    );
  }, []);

  const modifiers = menuEvents.reduce((acc, event) => {
    if (event.menuItems.length > 0) {
      acc[event.date] = new Date(event.date);
    }
    return acc;
  }, {} as Record<string, Date>);

  const modifiersStyles = Object.keys(modifiers).reduce((acc, key) => {
    acc[key] = {
      border: '2px solid hsl(var(--primary))',
    };
    return acc;
  }, {} as any);

  const selectedEvent = date
    ? menuEvents.find(
        (e) => format(new Date(e.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : null;

  const handleAddMenuItem = (menuItem: VendorMenuItem) => {
    if (!date) return;

    const formattedDate = format(date, 'yyyy-MM-dd');
    const existingEventIndex = menuEvents.findIndex(
      (e) => e.date === formattedDate
    );

    if (existingEventIndex > -1) {
      const updatedMenuEvents = [...menuEvents];
      const existingEvent = updatedMenuEvents[existingEventIndex];
      if (!existingEvent.menuItems.some(item => item.id === menuItem.id)) {
        existingEvent.menuItems.push(menuItem);
        setMenuEvents(updatedMenuEvents);
      }
    } else {
      const newEvent: MenuEvent = {
        date: formattedDate,
        menuItems: [menuItem],
      };
      setMenuEvents([...menuEvents, newEvent]);
    }
    setAddMenuOpen(false);
  };
  
  const handleDeleteMenuItem = (menuItemId: string) => {
    if (!date) return;
    const formattedDate = format(date, 'yyyy-MM-dd');
    setMenuEvents(prevMenuEvents => {
      return prevMenuEvents.map(event => {
        if (event.date === formattedDate) {
          return {
            ...event,
            menuItems: event.menuItems.filter(item => item.id !== menuItemId),
          };
        }
        return event;
      }).filter(event => event.menuItems.length > 0);
    });
  };

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
              {selectedEvent && selectedEvent.menuItems.length > 0
                ? 'Menu items for the selected date.'
                : 'No menu planned for this date.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedEvent && selectedEvent.menuItems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedEvent.menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{(item as any).vendorName}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMenuItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a date to plan the menu.
              </p>
            )}
            {date && (
              <Dialog open={isAddMenuOpen} onOpenChange={setAddMenuOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <PlusCircle className="mr-2" />
                    Add Menu Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add item to menu</DialogTitle>
                    <DialogDescription>
                      Select a menu item to add for {format(date, 'PPP')}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Menu Item</TableHead>
                          <TableHead>Vendor</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allMenuItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.vendorName}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant="outline">
                                ${item.price.toFixed(2)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" onClick={() => handleAddMenuItem(item)}>Add</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

