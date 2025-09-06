
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
import { Pencil, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as React from 'react';
import { allergens } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { VendorMenuItem } from '@/types';

const formSchema = z.object({
  name: z.string().min(1, 'Item name is required.'),
  description: z.string().min(1, 'Description is required.'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0.'),
  allergens: z.array(z.string()).optional(),
});

type EditMenuItemDialogProps = {
  vendorId: string;
  menuItem: VendorMenuItem;
  onMenuItemUpdated: (vendorId: string, updatedMenuItem: VendorMenuItem) => void;
  onMenuItemDeleted: (vendorId: string, menuItemId: string) => void;
};

export function EditMenuItemDialog({
  vendorId,
  menuItem,
  onMenuItemUpdated,
  onMenuItemDeleted
}: EditMenuItemDialogProps) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      allergens: menuItem.allergens || [],
    },
  });

  React.useEffect(() => {
    form.reset({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        allergens: menuItem.allergens || [],
    });
  }, [menuItem, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedMenuItem = {
      ...menuItem,
      ...values,
    };
    onMenuItemUpdated(vendorId, updatedMenuItem);
    setOpen(false);
  }

  function handleDelete() {
    onMenuItemDeleted(vendorId, menuItem.id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
          <DialogDescription>
            Update the details for this menu item.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pepperoni Pizza" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Classic pizza with pepperoni"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergens"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Allergens</FormLabel>
                    <FormDescription>
                      Select the allergens present in this menu item.
                    </FormDescription>
                  </div>
                  <ScrollArea className="h-40 w-full rounded-md border">
                    <div className="p-4 grid grid-cols-2 gap-4">
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
            <DialogFooter className="justify-between">
            <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" type="button">
                            <Trash2 className="mr-2" />
                            Delete Item
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the menu item.
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

