import { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

interface DashboardShellProps {
  children: ReactNode;
  profile: {
    role?: string | null;
    full_name?: string | null;
  } | null;
}

export function DashboardShell({ children, profile }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar role={profile?.role} />

      <div className="lg:pl-64">
        <DashboardHeader profile={profile} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}