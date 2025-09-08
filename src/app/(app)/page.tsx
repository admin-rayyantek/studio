
'use client';
import { KpiCard } from '@/components/kpi-card';
import { OrderHistoryChart } from '@/components/order-history-chart';
import { RecentOrdersCard } from '@/components/recent-orders-card';
import {
  DollarSign,
  Package,
  Users,
  Utensils,
  AlertCircle,
  ShoppingCart,
  UserMinus,
  ShieldCheck,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { dashboardStats } from '@/lib/data';
import { TodaysMenuCard } from '@/components/todays-menu-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Hi, Samantha. Welcome back to Meal Planner!
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Today's Orders"
          value={dashboardStats.todaysOrders.toString()}
          description="Total orders placed today."
          Icon={ShoppingCart}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KpiCard
          title="Most Popular Item"
          value={dashboardStats.mostSellingItem}
          description="The top-selling item this month."
          Icon={Package}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
        <KpiCard
          title="Active Users"
          value={dashboardStats.totalActiveUsers.toString()}
          description="Total active students and staff."
          Icon={Users}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <KpiCard
          title="Outstanding Balance"
          value={`$${dashboardStats.outstandingBalances.toFixed(2)}`}
          description={`${dashboardStats.unpaidUsers} unpaid users.`}
          Icon={AlertCircle}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Orders</CardTitle>
            <CardDescription>
              Number of orders placed each day this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrderHistoryChart />
          </CardContent>
        </Card>
        <div className="lg:col-span-3">
          <TodaysMenuCard />
        </div>
      </div>
      <div className="grid gap-4">
        <RecentOrdersCard />
      </div>
    </div>
  );
}
