'use client';

import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { orderHistoryData } from '@/lib/data';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-3))',
  },
  previous: {
    label: 'Previous',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const data = orderHistoryData.map(item => ({
    ...item,
    revenue: item.balance,
    previous: item.balance - Math.random() * 500,
}));


export function OrderHistoryChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer>
        <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
            />
             <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
                tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={3}
              dot={true}
            />
             <Line
              dataKey="previous"
              type="monotone"
              stroke="var(--color-previous)"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
