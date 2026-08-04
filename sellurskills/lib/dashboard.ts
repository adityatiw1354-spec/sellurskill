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
          booking.status === "active"
      ).length ?? 0,

    completedJobs:
      bookings?.filter(
        (booking) => booking.status === "completed"
      ).length ?? 0,
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