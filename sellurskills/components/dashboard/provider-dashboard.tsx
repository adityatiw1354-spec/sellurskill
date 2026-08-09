interface ProviderDashboardProps {
  stats: {
    totalServices: number;
    pendingRequests: number;
    acceptedBookings: number;
    rejectedBookings: number;
    totalRevenue: number;
  };
  recentBookings: Array<{
    id: string;
    status: string;
    amount: number;
    booking_date: string | null;
    start_time: string | null;
    services?: { title?: string | null }[] | null;
    profiles?: { full_name?: string | null }[] | null;
  }>;
}

const statusClasses: Record<string, string> = {
  pending: "bg-amber-500",
  accepted: "bg-emerald-600",
  rejected: "bg-rose-600",
  in_progress: "bg-sky-600",
  completed: "bg-violet-600",
  cancelled: "bg-slate-600",
};

export function ProviderDashboard({ stats, recentBookings }: ProviderDashboardProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>
        <p className="mt-2 text-slate-500">Manage jobs, services, and customer requests.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Services</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalServices}</p>
        </div>
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Pending Requests</p>
          <p className="mt-4 text-3xl font-semibold text-amber-600">{stats.pendingRequests}</p>
        </div>
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Accepted Bookings</p>
          <p className="mt-4 text-3xl font-semibold text-emerald-600">{stats.acceptedBookings}</p>
        </div>
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Rejected Bookings</p>
          <p className="mt-4 text-3xl font-semibold text-rose-600">{stats.rejectedBookings}</p>
        </div>
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Revenue</p>
          <p className="mt-4 text-3xl font-semibold text-emerald-600">₹{stats.totalRevenue}</p>
        </div>
      </div>

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Recent Booking Requests</h2>
            <p className="mt-1 text-sm text-slate-500">Latest requests from customers for your services.</p>
          </div>
        </div>

        {recentBookings.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            No recent bookings yet. Customer requests will appear here once someone books your service.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{booking.services?.[0]?.title || "Untitled service"}</p>
                    <p className="text-sm text-slate-500">Customer: {booking.profiles?.[0]?.full_name || "Unknown"}</p>
                    <p className="text-sm text-slate-500">Date: {booking.booking_date || "Not set"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-sm font-medium text-white ${statusClasses[booking.status] || "bg-slate-500"}`}>
                      {booking.status}
                    </span>
                    <p className="text-lg font-semibold text-violet-600">₹{booking.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
