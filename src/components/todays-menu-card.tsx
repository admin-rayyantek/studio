
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { todaysMenuData } from '@/lib/data';
import { ChevronDown, Utensils, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TodaysMenuCard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const visibleItems = todaysMenuData.slice(0, 5);
  const hiddenItems = todaysMenuData.slice(5);

  // For now, we'll assume a single status for the whole day.
  // In a real app, this would come from a settings/config object.
  const overallStatus = 'Taking Orders';
  const orderTime = '8:00 AM - 10:30 AM';
  
  const isTakingOrders = overallStatus === 'Taking Orders';

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            isTakingOrders ? "bg-green-100" : "bg-gray-100"
          )}>
            <Utensils className={cn(
              "h-6 w-6",
               isTakingOrders ? "text-green-600" : "text-gray-600"
            )} />
          </div>
          <div>
            <CardTitle>Today's Menu</CardTitle>
            <CardDescription>
              A list of items available for order today.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className={cn(
            "mb-4 flex items-center gap-2 rounded-lg border p-3",
            isTakingOrders ? "bg-green-50 border-green-200" : "bg-secondary"
        )}>
            {isTakingOrders ? (
                <Clock className="h-5 w-5 text-green-600" />
            ): (
                <XCircle className="h-5 w-5 text-muted-foreground" />
            )}
            
            <div>
                <p className={cn(
                    "text-sm font-medium",
                    isTakingOrders ? "text-green-700" : "text-muted-foreground"
                )}>{overallStatus}</p>
                <p className="text-xs text-muted-foreground">Cut-off time: {orderTime}</p>
            </div>
        </div>
        <ul className="space-y-3">
          {visibleItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span className="font-medium">{item.name}</span>
              <Badge variant="outline" className="font-mono">{item.ordered}</Badge>
            </li>
          ))}
        </ul>
        {hiddenItems.length > 0 && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent>
                <ul className="space-y-3 mt-3">
                    {hiddenItems.map((item, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                            <span className="font-medium">{item.name}</span>
                            <Badge variant="outline" className="font-mono">{item.ordered}</Badge>
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
            <CardFooter className="p-0 pt-4">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full">
                    {isOpen ? 'View Less' : `View ${hiddenItems.length} More`}
                    <ChevronDown
                        className={cn('ml-2 h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                    />
                    </Button>
                </CollapsibleTrigger>
            </CardFooter>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

