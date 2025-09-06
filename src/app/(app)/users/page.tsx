
'use client';
import Link from 'next/link';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { allUsers, User } from '@/lib/data';
import { MoreHorizontal, ArrowRight, User as UserIcon, CircleUser, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AddUserDialog } from '@/components/add-user-dialog';
import { EditUserDialog } from '@/components/edit-user-dialog';

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>(allUsers);

  const handleUserAdded = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleUserDeleted = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };


  const PayNowDialog = ({ user }: { user: (typeof users)[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Pay Now</Button>
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
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Accounts</CardTitle>
            <CardDescription>
              Manage student and staff accounts.
            </CardDescription>
          </div>
          <AddUserDialog onUserAdded={handleUserAdded} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead className="hidden md:table-cell">Org ID</TableHead>
                <TableHead className="hidden sm:table-cell">User Type</TableHead>
                <TableHead className="hidden md:table-cell">Date Joined</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {user.gender === 'male' ? <UserIcon className="h-full w-full p-1.5 text-muted-foreground" /> : <CircleUser className="h-full w-full p-1.5 text-muted-foreground" />}
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.orgId || 'N/A'}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="capitalize">{user.userType.replace('-', ' ')}</Badge>
                  </TableCell>
                   <TableCell className="hidden md:table-cell">{user.dateJoined}</TableCell>
                   <TableCell className="hidden sm:table-cell">
                    <Switch checked={user.active} onCheckedChange={(checked) => handleUserUpdated({...user, active: checked})} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Badge
                        variant={user.balance < 0 ? 'destructive' : 'outline'}
                        >
                        ${user.balance.toFixed(2)}
                        </Badge>
                        {user.balance < 0 && <PayNowDialog user={user} />}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={`/users/${user.id}`} className="flex items-center">
                            View Details
                            <ArrowRight className="ml-auto h-4 w-4" />
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <EditUserDialog user={user} onUserUpdated={handleUserUpdated} onUserDeleted={handleUserDeleted} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
