import { DashboardShell } from "./dashboard-shell";

export function ProviderDashboard() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-3xl font-bold">
          Provider Dashboard
        </h1>

        <p className="text-slate-500">
          Manage jobs, clients and earnings.
        </p>
      </div>
    </DashboardShell>
  );
}