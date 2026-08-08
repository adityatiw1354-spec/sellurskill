import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-500">Account preferences and notifications will appear here.</p>

        <div className="mt-8 rounded-2xl border border-dashed p-8 text-center text-slate-600">
          <p className="text-lg font-semibold">Settings are coming soon</p>
          <p className="mt-2 text-sm text-slate-500">
            This page is now available and ready for future preference controls.
          </p>
          <Link href="/dashboard" className="mt-5 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
