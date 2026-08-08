import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProviderServicesList from "@/components/provider/provider-services-list";

export default async function ProviderServicesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "provider") {
    redirect("/dashboard");
  }

  return <ProviderServicesList />;
}
