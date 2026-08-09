import { createClient } from "@/lib/supabase/server";

/**
 * Resolves the provider's `providers.id` from the authenticated user id.
 *
 * Relationship contract:
 *  - profiles.id = auth user.id
 *  - providers.id is a separate UUID
 *  - providers.profile_id -> profiles.id
 *  - services.provider_id -> providers.id
 *  - bookings.provider_id -> providers.id
 *
 * Every provider-scoped operation on services.provider_id / bookings.provider_id
 * MUST use providers.id, never user.id.
 */
export async function getProviderId(
  userId: string
): Promise<string | null> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("providers")
    .select("id")
    .eq("profile_id", userId)
    .maybeSingle();

  return data?.id ?? null;
}
