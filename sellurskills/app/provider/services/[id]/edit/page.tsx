import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditServiceForm } from "@/components/provider/edit-service-form";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "provider") {
    return notFound();
  }

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .eq("provider_id", user.id)
    .single();

  if (!service) return notFound();

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Service
      </h1>

      <EditServiceForm service={service} />
    </div>
  );
}