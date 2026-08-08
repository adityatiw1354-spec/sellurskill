"use client";

import { Bell, Search } from "lucide-react";

interface DashboardHeaderProps {
  profile: {
    role?: string | null;
    full_name?: string | null;
  } | null;
}

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  const displayName = profile?.full_name?.trim() || "User";
  const roleLabel =
    profile?.role === "provider"
      ? "Provider"
      : profile?.role === "admin"
        ? "Admin"
        : "Customer";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex w-full max-w-md items-center gap-3 rounded-lg border px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
              {initials}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-slate-500">{roleLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}