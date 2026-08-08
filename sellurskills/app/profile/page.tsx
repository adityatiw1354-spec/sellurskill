import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, email")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-2 text-slate-500">Your account details are shown below.</p>

        <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-6">
          <div>
            <p className="text-sm font-medium text-slate-500">Name</p>
            <p className="text-lg font-semibold">{profile?.full_name || "User"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Role</p>
            <p className="text-lg font-semibold capitalize">{profile?.role || "customer"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="text-lg font-semibold">{profile?.email || user.email || "Not available"}</p>
          </div>
        </div>

        <Link href="/dashboard" className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
