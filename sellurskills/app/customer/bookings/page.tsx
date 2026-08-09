import { redirect } from "next/navigation";
import Link from "next/link";

import { CustomerBookingActions } from "@/components/customer/booking-actions";
import { createClient } from "@/lib/supabase/server";

interface BookingRow {
  id: string;
  amount: number;
  status: string;
  booking_date: string | null;
  start_time: string | null;
  end_time: string | null;
  address: string | null;
  phone: string | null;
  notes: string | null;
  services?: {
    title?: string | null;
    duration?: string | null;
  } | null;
  providers?: {
    business_name?: string | null;
    profiles?: {
      full_name?: string | null;
    } | null;
  } | null;
}

const statusClasses: Record<string, string> = {
  pending: "bg-amber-500",
  accepted: "bg-emerald-600",
  rejected: "bg-rose-600",
  in_progress: "bg-sky-600",
  completed: "bg-violet-600",
  cancelled: "bg-slate-600",
};

export default async function CustomerBookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role && profile.role !== "customer") {
    redirect("/dashboard");
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(`
      id,
      amount,
      status,
      booking_date,
      start_time,
      end_time,
      address,
      phone,
      notes,
      services (
        title,
        duration
      ),
      providers (
        business_name,
        profiles (
          full_name
        )
      )
    `)
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("CUSTOMER_BOOKINGS_ERROR", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-slate-500">View all your booked services.</p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            We could not load your bookings right now. Please try again shortly.
          </div>
        ) : bookings?.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">No Bookings Yet</h2>
            <p className="mt-2 text-slate-500">Book your first service to get started.</p>
            <Link href="/services" className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 text-white">
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {(bookings as BookingRow[] | null)?.map((booking) => (
              <div key={booking.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold">{booking.services?.title || "Service"}</h2>
                    <p className="mt-1 text-slate-500">
                      Provider: {booking.providers?.profiles?.full_name || booking.providers?.business_name || "Not available"}
                    </p>
                    <p className="mt-1 text-slate-500">
                      Duration: {booking.services?.duration || "Not specified"}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p>
                        <strong>Date:</strong> {booking.booking_date || "Not specified"}
                      </p>
                      <p>
                        <strong>Time:</strong> {booking.start_time || "--"} - {booking.end_time || "--"}
                      </p>
                      <p>
                        <strong>Address:</strong> {booking.address || "Not provided"}
                      </p>
                      <p>
                        <strong>Phone:</strong> {booking.phone || "Not provided"}
                      </p>
                      {booking.notes && (
                        <p>
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-left lg:text-right">
                    <p className="text-xl font-bold text-violet-600">₹{booking.amount}</p>
                    <span className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium text-white ${statusClasses[booking.status as string] || "bg-slate-500"}`}>
{booking.status || "pending"}
                    </span>
                  </div>
                </div>

                {(booking.status === "pending" || booking.status === "accepted") && (
                  <CustomerBookingActions bookingId={booking.id} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
