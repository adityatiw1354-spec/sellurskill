import Link from "next/link";
import { Plus, Search, MessageSquare } from "lucide-react";

export function QuickActions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/services" className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-white hover:bg-violet-700">
          <Plus className="h-4 w-4" />
          Book Service
        </Link>

        <Link href="/services" className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 hover:bg-slate-50">
          <Search className="h-4 w-4" />
          Explore Skills
        </Link>

        <Link href="/customer/bookings" className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 hover:bg-slate-50">
          <MessageSquare className="h-4 w-4" />
          My Bookings
        </Link>
      </div>
    </div>
  );
}