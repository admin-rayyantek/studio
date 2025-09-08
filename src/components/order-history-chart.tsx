'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { weeklyOrderData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const chartConfig = {
  male_kebab: { label: 'Male - Kebab', color: 'hsl(var(--chart-2))' },
  male_pide: { label: 'Male - Pide', color: 'hsl(var(--chart-3))' },
  female_kebab: { label: 'Female - Kebab', color: 'hsl(var(--chart-4))' },
  female_pide: { label: 'Female - Pide', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const maleKebab = payload.find((p: any) => p.dataKey === 'male_kebab')?.value || 0;
      const malePide = payload.find((p: any) => p.dataKey === 'male_pide')?.value || 0;
      const femaleKebab = payload.find((p: any) => p.dataKey === 'female_kebab')?.value || 0;
      const femalePide = payload.find((p: any) => p.dataKey === 'female_pide')?.value || 0;
      const maleTotal = maleKebab + malePide;
      const femaleTotal = femaleKebab + femalePide;
  
      return (
        <Card className="min-w-[200px]">
          <CardHeader className="p-3">
            <CardTitle className="text-base">{label}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs grid gap-2">
            <div className="font-semibold">Male Orders: {maleTotal}</div>
            <div className="flex justify-between items-center">
                <span>Chicken Kebab</span>
                <Badge variant="secondary">{maleKebab}</Badge>
            </div>
            <div className="flex justify-between items-center">
                <span>Cheese Pide</span>
                <Badge variant="secondary">{malePide}</Badge>
            </div>
             <div className="font-semibold pt-2">Female Orders: {femaleTotal}</div>
             <div className="flex justify-between items-center">
                <span>Chicken Kebab</span>
                <Badge variant="secondary">{femaleKebab}</Badge>
            </div>
            <div className="flex justify-between items-center">
                <span>Cheese Pide</span>
                <Badge variant="secondary">{femalePide}</Badge>
            </div>
          </CardContent>
        </Card>
      );
    }
  
    return null;
  };

export function OrderHistoryChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <BarChart accessibilityLayer data={weeklyOrderData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={4}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent))', radius: 4}} />
            <Bar dataKey="male_kebab" stackId="male" fill="var(--color-male_kebab)" radius={[4, 4, 0, 0]} barSize={30} >
                <LabelList dataKey="male_total" position="top" offset={10} className="fill-foreground text-xs" formatter={(value: number, props: any) => {
                    const entry = weeklyOrderData[props.index];
                    return entry.female_total > 0 ? '' : value;
                }} />
            </Bar>
            <Bar dataKey="male_pide" stackId="male" fill="var(--color-male_pide)" barSize={30} />
            
            <Bar dataKey="female_kebab" stackId="female" fill="var(--color-female_kebab)" radius={[4, 4, 0, 0]} barSize={30}>
                 <LabelList dataKey="female_total" position="top" offset={10} className="fill-foreground text-xs" />
            </Bar>
            <Bar dataKey="female_pide" stackId="female" fill="var(--color-female_pide)" barSize={30} />
          </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
