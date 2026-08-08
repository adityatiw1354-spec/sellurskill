import { redirect } from "next/navigation";
import {
  getCustomerStats,
  getRecentBookings,
  getProviderStats,
  getProviderRecentBookings,
} from "@/lib/dashboard";
import { createClient } from "@/lib/supabase/server";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard";
import { ProviderDashboard } from "@/components/dashboard/provider-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

interface ProfileData {
  role?: string | null;
  full_name?: string | null;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle<ProfileData>();

  if (profile?.role === "provider") {
    const stats = await getProviderStats(user.id);
    const recentBookings = await getProviderRecentBookings(user.id);

    return (
      <DashboardShell profile={profile ?? null}>
        <ProviderDashboard stats={stats} recentBookings={recentBookings} />
      </DashboardShell>
    );
  }

  const stats = await getCustomerStats(user.id);
  const recentBookings = await getRecentBookings(user.id);

  return (
    <DashboardShell profile={profile ?? null}>
      {profile?.role === "customer" && (
        <CustomerDashboard stats={stats} recentBookings={recentBookings} />
      )}

      {profile?.role === "admin" && <AdminDashboard />}
    </DashboardShell>
  );
}