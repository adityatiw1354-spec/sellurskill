import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required." },
        { status: 400 }
      );
    }

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

    const status = (body as Record<string, unknown>).status;

    if (status !== "accepted" && status !== "rejected") {
      return NextResponse.json(
        { success: false, error: "Invalid booking status." },
        { status: 400 }
      );
    }

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, provider_id, status")
      .eq("id", id)
      .maybeSingle();

    if (bookingError) {
      console.error("BOOKING_FETCH_ERROR", bookingError);

      return NextResponse.json(
        { success: false, error: "Unable to load the booking." },
        { status: 500 }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found." },
        { status: 404 }
      );
    }

    if (booking.provider_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "You are not allowed to update this booking." },
        { status: 403 }
      );
    }

    if (booking.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          error: `Booking is already ${booking.status}.`,
        },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .eq("provider_id", user.id)
      .eq("status", "pending")
      .select("id, provider_id, customer_id, status")
      .single();

    if (error) {
      console.error("BOOKING_UPDATE_ERROR", error);

      return NextResponse.json(
        { success: false, error: "Unable to update the booking." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: data,
    });
  } catch (error) {
    console.error("BOOKING_UPDATE_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to update the booking.",
      },
      { status: 500 }
    );
  }
}