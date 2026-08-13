import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProviderId } from "@/lib/provider";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("SERVICE_LIST_PROFILE_ERROR", profileError);
      return NextResponse.json(
        { success: false, error: "Unable to load profile." },
        { status: 500 }
      );
    }

    if (profile?.role !== "provider") {
      return NextResponse.json(
        { success: false, error: "Only providers can view these services." },
        { status: 403 }
      );
    }

    const provider = await getProviderId(user.id);

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider profile not found." },
        { status: 403 }
      );
    }

    const { data: services, error } = await supabase
      .from("services")
      .select("id, title, description, price, duration")
      .eq("provider_id", provider)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SERVICE_LIST_ERROR", error);
      return NextResponse.json(
        { success: false, error: "Unable to load services." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, services: services ?? [] });
  } catch (error) {
    console.error("SERVICE_LIST_ERROR", error);

    return NextResponse.json(
      { success: false, error: "Unable to load services." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const typedBody = body as Record<string, unknown>;

    const title = typeof typedBody.title === "string" ? typedBody.title.trim() : "";
    const description =
      typeof typedBody.description === "string" ? typedBody.description.trim() : "";
    const duration =
      typeof typedBody.duration === "string" ? typedBody.duration.trim() : "";
    const price = Number(typedBody.price);

    if (!isNonEmptyString(title)) {
      return NextResponse.json(
        { success: false, error: "Title is required." },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(description)) {
      return NextResponse.json(
        { success: false, error: "Description is required." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { success: false, error: "Price must be a valid positive number." },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(duration)) {
      return NextResponse.json(
        { success: false, error: "Duration is required." },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("SERVICE_PROFILE_LOOKUP_ERROR", profileError);
      return NextResponse.json(
        { success: false, error: "Unable to load profile." },
        { status: 500 }
      );
    }

    if (profile?.role !== "provider") {
      return NextResponse.json(
        { success: false, error: "Only providers can create services." },
        { status: 403 }
      );
    }

    const provider = await getProviderId(user.id);

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider profile not found." },
        { status: 403 }
      );
    }

    const { error } = await supabase.from("services").insert({
      provider_id: provider,
      title,
      description,
      price,
      duration,
      status: "active",
    });

    if (error) {
      console.error("SERVICE_CREATE_ERROR", error);

      return NextResponse.json(
        { success: false, error: "Unable to create the service." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service created successfully.",
    });
  } catch (error) {
    console.error("SERVICE_CREATE_ERROR", error);

    return NextResponse.json(
      { success: false, error: "Unable to create the service." },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 }
      );
    }

    const { id: serviceId } = await params;

    if (!isNonEmptyString(serviceId)) {
      return NextResponse.json(
        { success: false, error: "Service ID is required." },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("SERVICE_DELETE_PROFILE_ERROR", profileError);

      return NextResponse.json(
        { success: false, error: "Unable to load profile." },
        { status: 500 }
      );
    }

    if (profile?.role !== "provider") {
      return NextResponse.json(
        { success: false, error: "Only providers can delete services." },
        { status: 403 }
      );
    }

    const provider = await getProviderId(user.id);

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider profile not found." },
        { status: 403 }
      );
    }

    // Make sure this service belongs to the current provider.
    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("id")
      .eq("id", serviceId)
      .eq("provider_id", provider)
      .maybeSingle();

    if (serviceError) {
      console.error("SERVICE_DELETE_LOOKUP_ERROR", serviceError);

      return NextResponse.json(
        { success: false, error: "Unable to load the service." },
        { status: 500 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    // Only bookings that are still active should block deletion.
    // Historical bookings do NOT block deletion.
    const { data: activeBookings, error: bookingError } = await supabase
      .from("bookings")
      .select("id")
      .eq("service_id", serviceId)
      .in("status", ["pending", "accepted", "in_progress"])
      .limit(1);

    if (bookingError) {
      console.error("SERVICE_DELETE_BOOKING_CHECK_ERROR", bookingError);

      return NextResponse.json(
        { success: false, error: "Unable to check service bookings." },
        { status: 500 }
      );
    }

    if (activeBookings && activeBookings.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This service cannot be deleted because it has an active booking.",
        },
        { status: 409 }
      );
    }

    const { error: deleteError } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceId)
      .eq("provider_id", provider);

    if (deleteError) {
      console.error("SERVICE_DELETE_ERROR", deleteError);

      return NextResponse.json(
        { success: false, error: "Unable to delete the service." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("SERVICE_DELETE_ERROR", error);

    return NextResponse.json(
      { success: false, error: "Unable to delete the service." },
      { status: 500 }
    );
  }
}