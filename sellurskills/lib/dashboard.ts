import { createClient } from "@/lib/supabase/server";

export async function getCustomerStats(userId: string) {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("customer_id", userId);

  return {
    totalOrders: bookings?.length ?? 0,
    activeBookings:
      bookings?.filter(
        (booking) =>
          booking.status === "pending" ||
          booking.status === "accepted" ||
          booking.status === "in_progress"
      ).length ?? 0,

    completedJobs:
      bookings?.filter((booking) => booking.status === "completed").length ?? 0,
  };
}

export async function getRecentBookings(userId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("customer_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  return data ?? [];
}

export async function getProviderStats(userId: string) {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("id")
    .eq("provider_id", userId);

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, status, amount")
    .eq("provider_id", userId);

  const totalServices = services?.length ?? 0;
  const pendingRequests = bookings?.filter((booking) => booking.status === "pending").length ?? 0;
  const acceptedBookings = bookings?.filter((booking) => booking.status === "accepted").length ?? 0;
  const rejectedBookings = bookings?.filter((booking) => booking.status === "rejected").length ?? 0;
  const totalRevenue = bookings
    ?.filter((booking) => booking.status === "accepted")
    .reduce((sum, booking) => sum + Number(booking.amount ?? 0), 0) ?? 0;

  return {
    totalServices,
    pendingRequests,
    acceptedBookings,
    rejectedBookings,
    totalRevenue,
  };
}

export async function getProviderRecentBookings(userId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("bookings")
    .select(`
      id,
      status,
      amount,
      booking_date,
      start_time,
      services (title),
      profiles!bookings_customer_id_fkey (full_name)
    `)
    .eq("provider_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  return data ?? [];
}