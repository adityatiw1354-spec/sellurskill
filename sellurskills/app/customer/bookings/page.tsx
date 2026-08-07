import { redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function CustomerBookingsPage() {
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
      )
    `)
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Bookings
          </h1>

          <p className="text-slate-500">
            View all your booked services.
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

                  <p className="mt-1 text-slate-500">
                    Duration: {booking.services?.duration}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-violet-600">
                    ₹{booking.amount}
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {bookings?.length === 0 && (
            <div className="rounded-2xl border bg-white p-12 text-center">
              <h2 className="text-2xl font-semibold">
                No Bookings Yet
              </h2>

              <p className="mt-2 text-slate-500">
                Book your first service.
              </p>

              <Link
                href="/services"
                className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 text-white"
              >
                Browse Services
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}