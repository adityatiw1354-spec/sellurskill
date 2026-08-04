import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Browse Services
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {service.title}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {service.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold">
                ₹{service.price}
              </span>

              <span className="text-sm text-slate-500">
                {service.duration}
              </span>
            </div>
          </div>
        ))}
      </div>

      {services?.length === 0 && (
        <div className="rounded-xl border border-dashed p-10 text-center text-slate-500">
          No services available
        </div>
      )}
    </div>
  );
}