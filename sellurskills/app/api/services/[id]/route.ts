import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
      console.error("SERVICE_UPDATE_PROFILE_ERROR", profileError);
      return NextResponse.json(
        { success: false, error: "Unable to validate profile." },
        { status: 500 }
      );
    }

    if (profile?.role !== "provider") {
      return NextResponse.json(
        { success: false, error: "Only providers can manage services." },
        { status: 403 }
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

    const { data: existingService, error: fetchError } = await supabase
      .from("services")
      .select("id, provider_id")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      console.error("SERVICE_FETCH_ERROR", fetchError);

      return NextResponse.json(
        { success: false, error: "Unable to load the service." },
        { status: 500 }
      );
    }

    if (!existingService) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    if (existingService.provider_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "You do not have access to this service." },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("services")
      .update({
        title,
        description,
        price,
        duration,
      })
      .eq("id", id)
      .eq("provider_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("SERVICE_UPDATE_ERROR", error);

      return NextResponse.json(
        { success: false, error: "Unable to update the service." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("SERVICE_UPDATE_ERROR", error);

    return NextResponse.json(
      { success: false, error: "Unable to update the service." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
      console.error("SERVICE_DELETE_PROFILE_ERROR", profileError);
      return NextResponse.json(
        { success: false, error: "Unable to validate profile." },
        { status: 500 }
      );
    }

    if (profile?.role !== "provider") {
      return NextResponse.json(
        { success: false, error: "Only providers can delete services." },
        { status: 403 }
      );
    }

    const { data: provider, error: providerError } = await supabase
      .from("providers")
      .select("id")
      .eq("profile_id", user.id)
      .maybeSingle();

    if (providerError) {
      console.error("SERVICE_DELETE_PROVIDER_ERROR", providerError);
      return NextResponse.json(
        { success: false, error: "Unable to validate provider access." },
        { status: 500 }
      );
    }

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider record not found." },
        { status: 403 }
      );
    }

    const { data: existingService, error: fetchError } = await supabase
      .from("services")
      .select("id, provider_id")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      console.error("SERVICE_DELETE_FETCH_ERROR", fetchError);

      return NextResponse.json(
        { success: false, error: "Unable to load the service." },
        { status: 500 }
      );
    }

    if (!existingService) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    if (existingService.provider_id !== provider.id) {
      return NextResponse.json(
        { success: false, error: "You do not have access to this service." },
        { status: 403 }
      );
    }

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("id")
      .eq("service_id", id)
      .limit(1);

    if (bookingsError) {
      console.error("SERVICE_DELETE_BOOKINGS_ERROR", bookingsError);
      return NextResponse.json(
        { success: false, error: "Unable to check the service booking history." },
        { status: 500 }
      );
    }

    if (bookings?.length) {
      return NextResponse.json(
        {
          success: false,
          error: "This service has existing bookings and cannot be permanently deleted because it has booking history.",
        },
        { status: 409 }
      );
    }

    const { data: deletedService, error } = await supabase
      .from("services")
      .delete()
      .eq("id", id)
      .eq("provider_id", provider.id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("SERVICE_DELETE_ERROR", error);

      if (error.code === "23503") {
        return NextResponse.json(
          {
            success: false,
            error:
              "This service has existing bookings and cannot be permanently deleted because it has booking history.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, error: "Unable to delete the service." },
        { status: 500 }
      );
    }

    if (!deletedService) {
      return NextResponse.json(
        {
          success: false,
          error: "The service could not be deleted. Please refresh and try again.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      service: deletedService,
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
