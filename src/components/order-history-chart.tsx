'use client';

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { orderHistoryData } from '@/lib/data';

const chartConfig = {
  orders: {
    label: 'Orders',
    color: 'hsl(var(--accent))',
  },
  balance: {
    label: 'Balance',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function OrderHistoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Overview</CardTitle>
        <CardDescription>A summary of orders and balances over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={orderHistoryData}
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
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            />
            <YAxis
                yAxisId="orders"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
            />
            <YAxis
                yAxisId="balance"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
                tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line
              dataKey="orders"
              yAxisId="orders"
              type="natural"
              stroke="var(--color-orders)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="balance"
              yAxisId="balance"
              type="natural"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
