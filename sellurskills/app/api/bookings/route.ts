import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
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

    const requiredFields = [
      [typedBody.provider_id, "provider_id"],
      [typedBody.service_id, "service_id"],
      [typedBody.booking_date, "booking_date"],
      [typedBody.start_time, "start_time"],
      [typedBody.end_time, "end_time"],
      [typedBody.address, "address"],
      [typedBody.phone, "phone"],
    ] as const;

    const missingField = requiredFields.find(([value]) => !isNonEmptyString(value));

    if (missingField) {
      return NextResponse.json(
        { success: false, error: `${missingField[1]} is required.` },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("BOOKING_PROFILE_LOOKUP_ERROR", profileError);
    }

    if (profile?.role && profile.role !== "customer") {
      return NextResponse.json(
        { success: false, error: "Only customers can create bookings." },
        { status: 403 }
      );
    }

    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("id, provider_id, price, status")
      .eq("id", typedBody.service_id)
      .maybeSingle();

    if (serviceError) {
      console.error("BOOKING_SERVICE_LOOKUP_ERROR", serviceError);

      return NextResponse.json(
        { success: false, error: "Unable to load the selected service." },
        { status: 500 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    if (service.provider_id !== typedBody.provider_id) {
      return NextResponse.json(
        { success: false, error: "Service provider not found." },
        { status: 404 }
      );
    }

    if (service.status && service.status !== "active") {
      return NextResponse.json(
        { success: false, error: "This service is not available right now." },
        { status: 400 }
      );
    }

    const amount = Number(service.price);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "The selected service has an invalid price." },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      customer_id: user.id,
      provider_id: service.provider_id,
      service_id: service.id,
      amount,
      status: "pending",
      booking_date: typedBody.booking_date,
      start_time: typedBody.start_time,
      end_time: typedBody.end_time,
      address: typedBody.address,
      phone: typedBody.phone,
      notes: typedBody.notes ?? null,
    });

    if (insertError) {
      console.error("BOOKING_INSERT_ERROR", insertError);

      return NextResponse.json(
        { success: false, error: "Unable to create the booking." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking created successfully.",
    });
  } catch (error) {
    console.error("BOOKING_CREATE_ERROR", error);

    return NextResponse.json(
      { success: false, error: "Unable to create the booking." },
      { status: 500 }
    );
  }
}