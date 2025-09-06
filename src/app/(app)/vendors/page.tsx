
'use client';

import Image from 'next/image';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { vendors as initialVendors, Vendor } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Edit, Pencil } from 'lucide-react';
import { AddVendorDialog } from '@/components/add-vendor-dialog';
import { AddMenuItemDialog } from '@/components/add-menu-item-dialog';
import { EditVendorDialog } from '@/components/edit-vendor-dialog';
import type { VendorMenuItem } from '@/types';
import { EditMenuItemDialog } from '@/components/edit-menu-item-dialog';

export default function VendorsPage() {
  const [vendors, setVendors] = React.useState(initialVendors);

  const handleVendorAdded = (newVendor: Vendor) => {
    setVendors((prevVendors) => [...prevVendors, newVendor]);
  };

  const handleVendorUpdated = (updatedVendor: Vendor) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === updatedVendor.id ? updatedVendor : vendor
      )
    );
  };

  const handleVendorDeleted = (vendorId: string) => {
    setVendors((prevVendors) =>
      prevVendors.filter((vendor) => vendor.id !== vendorId)
    );
  };

  const handleMenuItemAdded = (vendorId: string, newMenuItem: VendorMenuItem) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) =>
        vendor.id === vendorId
          ? { ...vendor, menu: [...vendor.menu, newMenuItem] }
          : vendor
      )
    );
  };

  const handleMenuItemUpdated = (vendorId: string, updatedMenuItem: VendorMenuItem) => {
    setVendors(prevVendors => 
        prevVendors.map(vendor => 
            vendor.id === vendorId 
            ? { ...vendor, menu: vendor.menu.map(item => item.id === updatedMenuItem.id ? updatedMenuItem : item) } 
            : vendor
        )
    );
  };

  const handleMenuItemDeleted = (vendorId: string, menuItemId: string) => {
    setVendors(prevVendors => 
        prevVendors.map(vendor => 
            vendor.id === vendorId 
            ? { ...vendor, menu: vendor.menu.filter(item => item.id !== menuItemId) } 
            : vendor
        )
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Food Vendors</CardTitle>
            <CardDescription>
              Manage your food vendors and their menus.
            </CardDescription>
          </div>
          <AddVendorDialog onVendorAdded={handleVendorAdded} />
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {vendors.map((vendor) => (
              <AccordionItem value={`item-${vendor.id}`} key={vendor.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4 flex-1">
                    <Image
                      alt={`${vendor.name} logo`}
                      className="aspect-square rounded-full object-cover"
                      height="40"
                      src={vendor.logo}
                      width="40"
                      data-ai-hint="logo"
                    />
                    <div className="text-left">
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {vendor.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-end items-center mb-4 gap-2">
                    <EditVendorDialog
                      vendor={vendor}
                      onVendorUpdated={handleVendorUpdated}
                      onVendorDeleted={handleVendorDeleted}
                    />
                    <AddMenuItemDialog
                      vendorId={vendor.id}
                      onMenuItemAdded={handleMenuItemAdded}
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Menu Item</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Allergens</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendor.menu.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            {item.allergens && item.allergens.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {item.allergens.map((allergen) => (
                                  <Badge key={allergen} variant="secondary">
                                    {allergen}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              'None'
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">
                              ${item.price.toFixed(2)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <EditMenuItemDialog 
                                vendorId={vendor.id} 
                                menuItem={item} 
                                onMenuItemUpdated={handleMenuItemUpdated}
                                onMenuItemDeleted={handleMenuItemDeleted}
                             />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
