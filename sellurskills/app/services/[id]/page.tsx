import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BookNowButton } from "@/components/services/book-now-button";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id, title, description, price, duration, provider_id")
    .eq("id", id)
    .maybeSingle();

  if (serviceError) {
    console.error("SERVICE_DETAIL_ERROR", serviceError);
  }

  if (!service) {
    notFound();
  }

  const { data: providerProfile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", service.provider_id)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-4xl p-6 sm:p-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <Link href="/services" className="mb-6 inline-flex text-sm font-medium text-violet-600 hover:underline">
          ← Back to services
        </Link>

        <h1 className="text-3xl font-bold">{service.title}</h1>

        <p className="mt-4 text-slate-600">{service.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="text-2xl font-bold text-violet-600">₹{service.price}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
            {service.duration || "Duration not specified"}
          </span>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <h2 className="font-semibold text-slate-800">Provider</h2>
          <p className="mt-1 text-sm text-slate-600">
            {providerProfile?.full_name || "Provider details unavailable"}
          </p>
        </div>

        <BookNowButton serviceId={service.id} amount={service.price} />
      </div>
    </div>
  );
}