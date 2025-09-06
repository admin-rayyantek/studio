import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { allUsers } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderHistoryChart } from '@/components/order-history-chart';
import { User, CircleUser } from 'lucide-react';

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const user = allUsers.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  const payNowDialog = (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Pay Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Payment</DialogTitle>
          <DialogDescription>
            Settle the outstanding balance for {user.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input id="amount" value={`$${user.balance < 0 ? Math.abs(user.balance).toFixed(2) : '0.00'}`} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment-type" className="text-right">
              Pay with
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="facts">FACTS</SelectItem>
                <SelectItem value="financial-aid">Financial Aid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button>Pay Now</Button>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="items-center">
            <Avatar className="h-24 w-24 mb-4">
               {user.gender === 'male' ? <User className="h-full w-full p-4 text-muted-foreground" /> : <CircleUser className="h-full w-full p-4 text-muted-foreground" />}
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Org ID</span>
              <span>{user.orgId || 'N/A'}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">User Type</span>
              <Badge variant="secondary" className="capitalize">{user.userType.replace('-', ' ')}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Joined</span>
              <span>{user.dateJoined}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Balance</span>
              <Badge variant={user.balance < 0 ? 'destructive' : 'outline'}>
                ${user.balance.toFixed(2)}
              </Badge>
            </div>
             <Separator />
            <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Outstanding Balance</span>
                {user.balance < 0 ? payNowDialog : <span>-</span>}
            </div>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>A list of recent orders placed by the user.</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderHistoryChart />
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Data Statistics</CardTitle>
              <CardDescription>Key statistics and insights about user activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Data statistics will be shown here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}