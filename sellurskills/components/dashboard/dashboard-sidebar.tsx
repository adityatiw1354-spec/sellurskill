"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Search,
  Briefcase,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Browse Services",
    href: "/services",
    icon: Search,
  },
  {
    title: "My Orders",
    href: "/orders",
    icon: Briefcase,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white lg:block">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-xl font-bold">
          Sellur<span className="text-violet-600">Skills</span>
        </h2>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-600"
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}