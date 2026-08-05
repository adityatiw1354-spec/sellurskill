import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function MyServicesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Logged In User ID:", user?.id);

  if (!user) {
    redirect("/login");
  }

    const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", user.id)
    .order("created_at", { ascending: false });

    console.log("User ID:", user.id);
    console.log("Services:", services);
    console.log("Error:", error);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              My Services
            </h1>

            <p className="text-slate-500">
              Manage all your services
            </p>
          </div>

          <Link
            href="/provider/services/new"
            className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
          >
            + Add Service
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services?.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {service.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-slate-500">
                {service.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-bold text-violet-600">
                  ₹{service.price}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                  {service.duration}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
  href={`/provider/services/${service.id}/edit`}
  className="flex-1 rounded-lg border py-2 text-center hover:bg-slate-100"
>
  Edit
</Link>
                <button className="flex-1 rounded-lg bg-red-500 py-2 text-white hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}

          {services?.length === 0 && (
            <div className="col-span-full rounded-2xl border bg-white p-12 text-center">
              <h2 className="text-2xl font-semibold">
                No Services Found
              </h2>

              <p className="mt-2 text-slate-500">
                Create your first service to start selling.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}