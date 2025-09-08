
'use client';

import { notFound } from 'next/navigation';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { allUsers, userOrderHistory, userPaymentHistory, User as UserType } from '@/lib/data';
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
import { MonthlyUserOrdersChart } from '@/components/monthly-user-orders-chart';
import { User, CircleUser } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { EditUserDialog } from '@/components/edit-user-dialog';


export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const [user, setUser] = React.useState(allUsers.find((u) => u.id === params.id));
  const { toast } = useToast();

  if (!user) {
    notFound();
  }

  const handleUserUpdated = (updatedUser: UserType) => {
    setUser(updatedUser);
    toast({
        title: 'User Updated',
        description: `${updatedUser.name}'s profile has been updated.`
    })
  };

  const handleUserDeleted = (userId: string) => {
    // In a real app, you'd redirect or show a "user deleted" message.
    // For this prototype, we'll just show a toast.
    console.log(`User ${userId} deleted`);
    toast({
        title: 'User Deleted',
        description: `The user has been removed from the system.`
    })
    // In a real app you would redirect, e.g., router.push('/users');
  };

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
        <EditUserDialog user={user} onUserUpdated={handleUserUpdated} onUserDeleted={handleUserDeleted} triggerType="button" />
      </div>
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
             <div className="py-2">
              <span className="text-muted-foreground">Allergies</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.allergies && user.allergies.length > 0 ? user.allergies.map(allergy => (
                  <Badge key={allergy} variant="outline">{allergy}</Badge>
                )) : <p className="text-muted-foreground">None</p>}
              </div>
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
             <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Account Status</span>
                <div className="flex items-center gap-2">
                    <Switch id="active-status" checked={user.active} onCheckedChange={(checked) => handleUserUpdated({...user, active: checked})} />
                    <Label htmlFor="active-status">{user.active ? 'Active' : 'Inactive'}</Label>
                </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Reset Password</span>
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Password Reset', description: `A password reset link has been sent to ${user.email}.`})}>Send Reset Link</Button>
            </div>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Order Totals</CardTitle>
              <CardDescription>A summary of the user's monthly order totals for the year.</CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyUserOrdersChart />
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>A detailed log of the user's orders and payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="orders">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                    <TabsTrigger value="payments">Payment History</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userOrderHistory.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono">{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.items.join(', ')}</TableCell>
                                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="payments">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Payment ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userPaymentHistory.map(payment => (
                                <TableRow key={payment.id}>
                                    <TableCell className="font-mono">{payment.id}</TableCell>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell className="capitalize">{payment.method}</TableCell>
                                    <TableCell>
                                        <Badge variant={payment.status === 'Paid' ? 'secondary' : 'destructive'} className="capitalize">{payment.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
