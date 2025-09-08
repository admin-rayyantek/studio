
'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import {
  ChartContainer,
  type ChartConfig,
} from '@/components/ui/chart';
import { monthlyUserOrdersData } from '@/lib/data';

const chartConfig = {
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function MonthlyUserOrdersChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer>
            <BarChart data={monthlyUserOrdersData} accessibilityLayer margin={{ top: 20 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                    cursor={{fill: 'hsl(var(--accent))', radius: 4}}
                    contentStyle={{borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))'}}
                    formatter={(value) => [`$${(value as number).toFixed(2)}`, 'Total']}
                />
                <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]}>
                    <LabelList 
                        dataKey="total" 
                        position="top" 
                        offset={10} 
                        className="fill-foreground text-xs"
                        formatter={(value: number) => value > 0 ? `$${value.toFixed(2)}` : ''}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  )
}
