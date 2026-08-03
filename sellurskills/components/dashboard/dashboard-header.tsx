"use client";

import { Bell, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-lg border px-3 py-2 w-full max-w-md">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white font-semibold">
              A
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Aditya</p>
              <p className="text-xs text-slate-500">
                Customer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}