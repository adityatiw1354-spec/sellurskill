import { redirect } from "next/navigation";

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
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Booking Requests
          </h1>

          <p className="text-slate-500">
            Manage all customer bookings.
          </p>
        </div>

        <div className="space-y-5">
          {bookings?.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {booking.services?.title}
                  </h2>

                 <div className="mt-3 space-y-2">
  <p>
    <span className="font-semibold">Customer:</span>{" "}
    {booking.profiles?.full_name}
  </p>

  <p>
    <span className="font-semibold">Email:</span>{" "}
    {booking.profiles?.email}
  </p>

  <p>
    <span className="font-semibold">Phone:</span>{" "}
    {booking.profiles?.phone}
  </p>

  <p>
    <span className="font-semibold">Booking Date:</span>{" "}
    {booking.booking_date}
  </p>

  <p>
    <span className="font-semibold">Time:</span>{" "}
    {booking.start_time} - {booking.end_time}
  </p>

  <p>
    <span className="font-semibold">Address:</span>{" "}
    {booking.address}
  </p>

  <p>
    <span className="font-semibold">Notes:</span>{" "}
    {booking.notes}
  </p>
</div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-violet-600">
                    ₹{booking.amount}
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-xl bg-green-600 px-5 py-2 text-white">
                  Accept
                </button>

                <button className="rounded-xl bg-red-600 px-5 py-2 text-white">
                  Reject
                </button>
              </div>
            </div>
          ))}

          {bookings?.length === 0 && (
            <div className="rounded-2xl border bg-white p-12 text-center">
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