import Image from 'next/image';
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
import { vendors } from '@/lib/data';

export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
      <Card>
        <CardHeader>
          <CardTitle>Food Vendors</CardTitle>
          <CardDescription>
            Manage your food vendors and their menus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {vendors.map((vendor) => (
              <AccordionItem value={`item-${vendor.id}`} key={vendor.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4">
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Menu Item</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendor.menu.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">
                              ${item.price.toFixed(2)}
                            </Badge>
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
