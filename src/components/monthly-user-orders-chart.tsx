
'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList, LineChart, Line } from 'recharts';
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
            <LineChart data={monthlyUserOrdersData} accessibilityLayer margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
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
                <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} dot={false} />
                 <Area type="monotone" dataKey="total" fillOpacity={1} fill="url(#colorTotal)" stroke="none" />
            </LineChart>
        </ResponsiveContainer>
    </ChartContainer>
  )
}
