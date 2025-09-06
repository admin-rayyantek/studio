import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type KpiCardProps = {
  title: string;
  value: string;
  description: string;
  Icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
};

export function KpiCard({ title, value, description, Icon, iconBg, iconColor }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", iconBg)}>
                <Icon className={cn("h-6 w-6", iconColor)} />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
                 <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
