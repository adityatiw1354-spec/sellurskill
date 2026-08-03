import { CustomerDashboard } from "@/components/dashboard/customer-dashboard";
import { ProviderDashboard } from "@/components/dashboard/provider-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default function DashboardPage() {
  // Temporary role
  const role = "customer";

  if (role === "customer") {
    return <CustomerDashboard />;
  }

  if (role === "provider") {
    return <ProviderDashboard />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <div>No dashboard found</div>;
}