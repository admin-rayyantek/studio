import { KpiCard } from '@/components/kpi-card';
import { OrderHistoryChart } from '@/components/order-history-chart';
import { RecentOrdersCard } from '@/components/recent-orders-card';
import { DollarSign, Utensils, Users, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value="$45,231.89"
          description="+20.1% from last month"
          Icon={DollarSign}
        />
        <KpiCard
          title="Total Orders"
          value="+2350"
          description="+180.1% from last month"
          Icon={ShoppingCart}
        />
        <KpiCard
          title="Active Students"
          value="+573"
          description="+19% from last month"
          Icon={Users}
        />
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Menu</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Pizza Day</div>
                <p className="text-xs text-muted-foreground">Assorted pizzas from Pizza Palace</p>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <OrderHistoryChart />
        </div>
        <div className="lg:col-span-3">
          <RecentOrdersCard />
        </div>
      </div>
    </div>
  );
}
