import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard";
import { ProviderDashboard } from "@/components/dashboard/provider-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

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
    .single();

  const role = profile?.role ?? "customer";

  return (
    <DashboardShell>
      {role === "customer" && <CustomerDashboard />}

      {role === "provider" && <ProviderDashboard />}

      {role === "admin" && <AdminDashboard />}
    </DashboardShell>
  );
}