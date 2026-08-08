import { redirect } from "next/navigation";

import { BookingActions } from "@/components/provider/booking-actions";
import { createClient } from "@/lib/supabase/server";

export default async function ProviderBookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(`
      *,
      services (
        title,
        duration
      ),
      profiles!bookings_customer_id_fkey (
        full_name,
        email,
        phone
      )
    `)
    .eq("provider_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log("Provider Bookings Error:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Booking Requests
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all customer bookings.
          </p>
        </div>

        {/* Bookings */}
        <div className="space-y-5">

          {bookings?.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between gap-6">

                {/* Left Side */}
                <div className="min-w-0">

                  {/* Service */}
                  <h2 className="text-xl font-semibold">
                    {booking.services?.title || "Service"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Duration:{" "}
                    {booking.services?.duration || "Not specified"}
                  </p>

                  {/* Customer Details */}
                  <div className="mt-4 space-y-2 text-sm text-slate-600">

                    <p>
                      <strong>Customer:</strong>{" "}
                      {booking.profiles?.full_name || "Not available"}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {booking.profiles?.email || "Not available"}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {booking.profiles?.phone || "Not provided"}
                    </p>

                  </div>

                  {/* Booking Details */}
                  <div className="mt-5 rounded-xl bg-slate-50 p-4">

                    <h3 className="mb-3 font-semibold text-slate-800">
                      Booking Details
                    </h3>

                    <div className="space-y-2 text-sm text-slate-600">

                      <p>
                        <strong>Date:</strong>{" "}
                        {booking.booking_date || "Not specified"}
                      </p>

                      <p>
                        <strong>Time:</strong>{" "}
                        {booking.start_time || "--"}{" "}
                        -{" "}
                        {booking.end_time || "--"}
                      </p>

                      <p>
                        <strong>Address:</strong>{" "}
                        {booking.address || "Not provided"}
                      </p>

                      {booking.notes && (
                        <p>
                          <strong>Notes:</strong>{" "}
                          {booking.notes}
                        </p>
                      )}

                    </div>
                  </div>

                </div>

                {/* Right Side */}
                <div className="shrink-0 text-right">

                  {/* Amount */}
                  <p className="text-2xl font-bold text-violet-600">
                    ₹{booking.amount}
                  </p>

                  {/* Status */}
                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium text-white ${
                      booking.status === "pending"
                        ? "bg-yellow-500"
                        : booking.status === "accepted"
                        ? "bg-green-600"
                        : booking.status === "rejected"
                        ? "bg-red-600"
                        : booking.status === "in_progress"
                        ? "bg-blue-600"
                        : booking.status === "completed"
                        ? "bg-emerald-600"
                        : booking.status === "cancelled"
                        ? "bg-slate-600"
                        : "bg-slate-500"
                    }`}
                  >
                    {booking.status}
                  </span>

                </div>

              </div>

              {/* Actions */}
              <div className="mt-6 border-t pt-5">
                <BookingActions
                  bookingId={booking.id}
                />
              </div>

            </div>
          ))}

          {/* Empty State */}
          {bookings?.length === 0 && (
            <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

              <h2 className="text-2xl font-semibold">
                No Booking Requests
              </h2>

              <p className="mt-2 text-slate-500">
                Customer bookings will appear here.
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}