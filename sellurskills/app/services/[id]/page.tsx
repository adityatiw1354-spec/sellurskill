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
    .select(
      `
        id,
        title,
        description,
        price,
        duration,
        provider_id,
        providers (
          business_name,
          bio,
          experience_years,
          verification_status,
          rating,
          total_reviews,
          total_jobs
        )
      `,
    )
    .eq("id", id)
    .eq("status", "active")
    .maybeSingle();

  if (serviceError) {
    console.error("SERVICE_DETAIL_ERROR", serviceError);
  }

  if (!service) {
    notFound();
  }

  const provider = Array.isArray(service.providers)
    ? service.providers[0]
    : service.providers;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/services"
          className="inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-violet-600"
        >
          ← Back to services
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {service.title}
          </h1>

          <p className="mt-4 text-slate-600">
            {service.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-2xl font-bold text-violet-600">
              ₹{service.price}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              {service.duration || "Duration not specified"}
            </span>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <h2 className="font-semibold text-slate-800">
              Provider
            </h2>

            {provider ? (
              <div className="mt-2 space-y-3 text-sm text-slate-600">
                <p className="font-medium text-slate-800">
                  {provider.business_name ||
                    "Provider profile information is not yet available."}
                </p>

                {provider.bio && <p>{provider.bio}</p>}

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {typeof provider.experience_years === "number" && (
                    <span>
                      {provider.experience_years} years experience
                    </span>
                  )}

                  {typeof provider.rating === "number" && (
                    <span>
                      Rating: {provider.rating}
                    </span>
                  )}

                  {typeof provider.total_reviews === "number" && (
                    <span>
                      {provider.total_reviews} reviews
                    </span>
                  )}

                  {typeof provider.total_jobs === "number" && (
                    <span>
                      {provider.total_jobs} jobs completed
                    </span>
                  )}

                  {provider.verification_status && (
                    <span className="capitalize">
                      Verification: {provider.verification_status}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                Provider details unavailable
              </p>
            )}
          </div>

          <div className="mt-8">
            <BookNowButton
              serviceId={service.id}
              amount={service.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}