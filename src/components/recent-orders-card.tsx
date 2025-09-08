import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { allUsers, recentOrders } from '@/lib/data';
import { User, CircleUser } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';

export function RecentOrdersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          A list of the most recent meal orders from students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
            {recentOrders.map((order) => {
                const user = allUsers.find(u => u.id === order.studentId);
                return (
                    <AccordionItem value={`item-${order.id}`} key={order.id}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-4 flex-1 pr-4">
                                <Avatar className="h-9 w-9">
                                    {user?.gender === 'male' ? <User className="h-full w-full p-2 text-muted-foreground" /> : <CircleUser className="h-full w-full p-2 text-muted-foreground" />}
                                    <AvatarFallback>{order.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1 text-left">
                                    <p className="text-sm font-medium leading-none">{order.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.email}</p>
                                </div>
                                <div className="ml-auto font-medium text-right">
                                    <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">{order.date}</p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Meal</TableHead>
                                        <TableHead className="text-center">Quantity</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order.items.map(item => (
                                        <TableRow key={item.name}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell className="text-center">{item.quantity}</TableCell>
                                            <TableCell className="text-right"><Badge variant="outline">${item.price.toFixed(2)}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                           </Table>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
