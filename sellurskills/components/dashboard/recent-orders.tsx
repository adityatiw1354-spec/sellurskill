interface RecentOrdersProps {
  bookings: any[];
}

export function RecentOrders({
  bookings,
}: RecentOrdersProps) {
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

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center text-slate-500">
          No bookings yet
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <p className="font-medium">
                  Booking
                </p>

                <p className="text-sm text-slate-500">
                  Amount: ₹{booking.amount}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium">
                  {booking.id.slice(0, 8)}
                </p>

                <span className="text-xs text-violet-600 capitalize">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}