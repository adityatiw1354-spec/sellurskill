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

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">
        {service.title}
      </h1>

      <p className="mt-4 text-slate-600">
        {service.description}
      </p>

      <div className="mt-6 flex gap-6">
        <span className="text-2xl font-bold text-violet-600">
          ₹{service.price}
        </span>

        <span>{service.duration}</span>
      </div>

      <BookNowButton serviceId={service.id}providerId={service.provider_id}amount={service.price}/>
    </div>
  );
}