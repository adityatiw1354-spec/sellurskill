import {
  ShoppingBag,
  Clock3,
  CheckCircle,
  Star,
} from "lucide-react";

type DashboardStatsProps = {
  totalOrders: number;
  activeBookings: number;
  completedJobs: number;
};

export function DashboardStats({
  totalOrders,
  activeBookings,
  completedJobs,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
    },
    {
      title: "Active Bookings",
      value: activeBookings,
      icon: Clock3,
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      icon: CheckCircle,
    },
    {
      title: "Reviews",
      value: "0",
      icon: Star,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {stat.value}
                </h3>
              </div>

              <div className="rounded-xl bg-violet-100 p-3">
                <Icon className="h-6 w-6 text-violet-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}