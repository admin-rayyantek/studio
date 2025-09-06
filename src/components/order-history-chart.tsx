'use client';

import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { orderHistoryData } from '@/lib/data';

const chartConfig = {
  orders: {
    label: 'Orders',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;


export function OrderHistoryChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer>
        <LineChart
            accessibilityLayer
            data={orderHistoryData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
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
                tickCount={4}
            />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Line
              dataKey="orders"
              type="monotone"
              stroke="var(--color-orders)"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
