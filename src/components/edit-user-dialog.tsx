
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as React from 'react';
import { allergens } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { User } from '@/types';

const formSchema = z.object({
  name: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  orgId: z.string().optional(),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required.' }),
  userType: z.enum(
    ['student-tadris', 'student-tahfiz', 'student-tanwir', 'staff'],
    { required_error: 'User type is required.' }
  ),
  primaryPayment: z.enum(['cash', 'card', 'FACTS', 'financial-aid'], {
    required_error: 'Primary payment method is required.',
  }),
  allergies: z.array(z.string()).optional(),
});

type EditUserDialogProps = {
  user: User;
  onUserUpdated: (updatedUser: User) => void;
  onUserDeleted: (userId: string) => void;
};

export function EditUserDialog({ user, onUserUpdated, onUserDeleted }: EditUserDialogProps) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      orgId: user.orgId,
      gender: user.gender,
      userType: user.userType,
      primaryPayment: user.primaryPayment,
      allergies: user.allergies || [],
    },
  });

  React.useEffect(() => {
    form.reset({
      name: user.name,
      email: user.email,
      orgId: user.orgId,
      gender: user.gender,
      userType: user.userType,
      primaryPayment: user.primaryPayment,
      allergies: user.allergies || [],
    })
  }, [user, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedUser = {
      ...user,
      ...values,
    };
    onUserUpdated(updatedUser);
    setOpen(false);
  }

  function handleDelete() {
    onUserDeleted(user.id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
            <Edit className="h-4 w-4" />
            Edit User
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User Account</DialogTitle>
          <DialogDescription>
            Update the details for this user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
           <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-[70vh] overflow-y-auto pr-4 pl-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Abdullah Ahmed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., user@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="orgId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization ID (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., STF-0123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4 pt-2"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">Female</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student-tadris">Student - Tadris</SelectItem>
                          <SelectItem value="student-tahfiz">Student - Tahfiz</SelectItem>
                          <SelectItem value="student-tanwir">Student - Tanwir</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryPayment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Payment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="FACTS">FACTS</SelectItem>
                          <SelectItem value="financial-aid">Financial Aid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              control={form.control}
              name="allergens"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Allergies</FormLabel>
                    <FormDescription>
                      Select any allergies the user has.
                    </FormDescription>
                  </div>
                  <ScrollArea className="h-40 w-full rounded-md border">
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {allergens.map((allergen) => (
                        <FormField
                          key={allergen}
                          control={form.control}
                          name="allergens"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={allergen}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(allergen)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            allergen,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== allergen
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {allergen}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="justify-between pt-4">
              <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" type="button">
                            <Trash2 className="mr-2" />
                            Delete User
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
