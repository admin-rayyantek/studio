import { KpiCard } from '@/components/kpi-card';
import { OrderHistoryChart } from '@/components/order-history-chart';
import { RecentOrdersCard } from '@/components/recent-orders-card';
import { DollarSign, Package, PackageCheck, PackageX } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const pieChartData = [
    { name: 'Total Order', value: 81, fill: 'hsl(var(--chart-1))' },
    { name: 'Customer Growth', value: 22, fill: 'hsl(var(--chart-2))' },
    { name: 'Total Revenue', value: 62, fill: 'hsl(var(--chart-3))' },
];

const chartConfig: ChartConfig = {
    orders: {
        label: "Orders"
    }
}


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Hi, Samantha. Welcome back to Sedap Admin!</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Orders"
          value="75"
          description="+11.2% this week"
          Icon={Package}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <KpiCard
          title="Total Delivered"
          value="357"
          description="+5.8% this week"
          Icon={PackageCheck}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KpiCard
          title="Total Canceled"
          value="65"
          description="+2.1% this week"
          Icon={PackageX}
           iconBg="bg-red-100"
          iconColor="text-red-600"
        />
        <KpiCard
          title="Total Revenue"
          value="$128"
          description="+15% this week"
          Icon={DollarSign}
           iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                <OrderHistoryChart />
            </CardContent>
        </Card>
         <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie dataKey="value" data={pieChartData} startAngle={90} endAngle={450} innerRadius={60} outerRadius={80} paddingAngle={5}>
                             {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <Label content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                    <>
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                            <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                            >
                                            {pieChartData[0].value.toLocaleString()}%
                                            </tspan>
                                        </text>
                                        <text x={viewBox.cx} y={(viewBox.cy || 0) + 20} textAnchor="middle" dominantBaseline="middle">
                                            <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 20}
                                            className="fill-muted-foreground"
                                            >
                                            Total Order
                                            </tspan>
                                        </text>
                                    </>
                                    );
                                }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
