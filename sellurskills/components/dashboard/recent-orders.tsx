const orders = [
  {
    id: "#1001",
    service: "Plumbing Repair",
    provider: "Rohit Verma",
    status: "Completed",
  },
  {
    id: "#1002",
    service: "House Cleaning",
    provider: "Ananya Sharma",
    status: "In Progress",
  },
  {
    id: "#1003",
    service: "Logo Design",
    provider: "Karan Mehta",
    status: "Pending",
  },
];

export function RecentOrders() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recent Orders
        </h2>

        <button className="text-sm font-medium text-violet-600 hover:text-violet-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-medium">
                {order.service}
              </p>

              <p className="text-sm text-slate-500">
                {order.provider}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">
                {order.id}
              </p>

              <span className="text-xs text-violet-600">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}