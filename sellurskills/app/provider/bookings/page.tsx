import { redirect } from "next/navigation";

import { BookingActions } from "@/components/provider/booking-actions";
import { createClient } from "@/lib/supabase/server";
import { getProviderId } from "@/lib/provider";

const statusClasses: Record<string, string> = {
  pending: "bg-amber-500",
  accepted: "bg-emerald-600",
  rejected: "bg-rose-600",
  in_progress: "bg-sky-600",
  completed: "bg-violet-600",
  cancelled: "bg-slate-600",
};

export default async function ProviderBookingsPage() {
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

if (profile?.role !== "provider") {
    redirect("/dashboard");
  }

  const provider = await getProviderId(user.id);

  if (!provider) {
    redirect("/dashboard");
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
    .eq("provider_id", provider)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("PROVIDER_BOOKINGS_ERROR", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Booking Requests</h1>
          <p className="mt-2 text-slate-500">Manage all customer bookings.</p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            We could not load your booking requests right now. Please try again shortly.
          </div>
        ) : bookings?.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">No Booking Requests</h2>
            <p className="mt-2 text-slate-500">Customer bookings will appear here.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings?.map((booking) => (
              <div key={booking.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold">{booking.services?.title || "Service"}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Duration: {booking.services?.duration || "Not specified"}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p>
                        <strong>Customer:</strong> {booking.profiles?.full_name || "Not available"}
                      </p>
                      <p>
                        <strong>Email:</strong> {booking.profiles?.email || "Not available"}
                      </p>
                      <p>
                        <strong>Phone:</strong> {booking.profiles?.phone || "Not provided"}
                      </p>
                    </div>

                    <div className="mt-5 rounded-xl bg-slate-50 p-4">
                      <h3 className="mb-3 font-semibold text-slate-800">Booking Details</h3>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p>
                          <strong>Date:</strong> {booking.booking_date || "Not specified"}
                        </p>
                        <p>
                          <strong>Time:</strong> {booking.start_time || "--"} - {booking.end_time || "--"}
                        </p>
                        <p>
                          <strong>Address:</strong> {booking.address || "Not provided"}
                        </p>
                        {booking.notes && (
                          <p>
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-left lg:text-right">
                    <p className="text-2xl font-bold text-violet-600">₹{booking.amount}</p>
                    <span className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium text-white ${statusClasses[booking.status as string] || "bg-slate-500"}`}>
                      {booking.status}
                    </span>
                  </div>
</div>

                {(booking.status === "pending" ||
                  booking.status === "accepted" ||
                  booking.status === "in_progress") && (
                  <div className="mt-6 border-t pt-5">
                    <BookingActions
                      bookingId={booking.id}
                      status={booking.status as "pending" | "accepted" | "in_progress"}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}