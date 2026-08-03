import { DashboardShell } from "./dashboard-shell";

export function AdminDashboard() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-500">
          Manage platform users and services.
        </p>
      </div>
    </DashboardShell>
  );
}