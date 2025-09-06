import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { recentOrders } from '@/lib/data';

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
        <div className="space-y-8">
          {recentOrders.map((order, index) => (
            <div className="flex items-center" key={index}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={order.avatar} alt="Avatar" data-ai-hint="muslim person"/>
                <AvatarFallback>{order.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{order.name}</p>
                <p className="text-sm text-muted-foreground">{order.email}</p>
              </div>
              <div className="ml-auto font-medium">{order.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
