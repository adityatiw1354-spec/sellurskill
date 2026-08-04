import { DashboardStats } from "./dashboard-stats";
import { QuickActions } from "./quick-actions";
import { RecentOrders } from "./recent-orders";

interface CustomerDashboardProps {
  stats: {
    totalOrders: number;
    activeBookings: number;
    completedJobs: number;
  };
  recentBookings: any[];
}

export function CustomerDashboard({
  stats,
  recentBookings,
}: CustomerDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Customer Dashboard
        </h1>

        <p className="text-slate-500">
          Manage your bookings and orders.
        </p>
      </div>

      <DashboardStats
        totalOrders={stats.totalOrders}
        activeBookings={stats.activeBookings}
        completedJobs={stats.completedJobs}
      />

      <QuickActions />

      <RecentOrders bookings={recentBookings} />
    </div>
  );
}