import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="mt-2 text-slate-500">
          {profile?.full_name || "Your"} inbox is ready for future conversations.
        </p>

        <div className="mt-8 rounded-2xl border border-dashed p-8 text-center text-slate-600">
          <p className="text-lg font-semibold">No messages yet</p>
          <p className="mt-2 text-sm text-slate-500">
            Messaging is not live yet, but this page is now functional and ready for future integration.
          </p>
          <Link href="/dashboard" className="mt-5 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
