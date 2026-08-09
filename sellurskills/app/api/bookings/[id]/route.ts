import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProviderId } from "@/lib/provider";

type BookingStatus = "pending" | "accepted" | "rejected" | "in_progress" | "completed" | "cancelled";

/**
 * Allowed provider transitions: { currentStatus -> [allowedTargets] }
 */
const PROVIDER_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["accepted", "rejected"],
  accepted: ["in_progress"],
  in_progress: ["completed"],
  completed: [],
  rejected: [],
  cancelled: [],
};

/**
 * Allowed customer transitions: { currentStatus -> [allowedTargets] }
 */
const CUSTOMER_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["cancelled"],
  accepted: ["cancelled"],
  in_progress: [],
  completed: [],
  rejected: [],
  cancelled: [],
};

const VALID_STATUSES = new Set<string>(Object.keys(PROVIDER_TRANSITIONS));

function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && VALID_STATUSES.has(value);
}

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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("BOOKING_UPDATE_PROFILE_ERROR", profileError);
      return NextResponse.json(
        { success: false, error: "Unable to validate profile." },
        { status: 500 }
      );
    }

    if (!profile?.role || (profile.role !== "provider" && profile.role !== "customer")) {
      return NextResponse.json(
        { success: false, error: "Only providers and customers can update bookings." },
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

    const rawStatus = (body as Record<string, unknown>).status;

    if (!isBookingStatus(rawStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid booking status." },
        { status: 400 }
      );
    }

    const targetStatus: BookingStatus = rawStatus;

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, provider_id, customer_id, status")
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

    const currentStatus = booking.status as BookingStatus;

// --- Role-based authorization ---
    if (profile.role === "provider") {
      const provider = await getProviderId(user.id);

      if (!provider) {
        return NextResponse.json(
          { success: false, error: "Provider profile not found." },
          { status: 403 }
        );
      }

      // Provider must own this booking
      if (booking.provider_id !== provider) {
        return NextResponse.json(
          { success: false, error: "You are not allowed to update this booking." },
          { status: 403 }
        );
      }

      // Provider-only transitions
      const allowed = PROVIDER_TRANSITIONS[currentStatus] ?? [];
      if (!allowed.includes(targetStatus)) {
        return NextResponse.json(
          {
            success: false,
            error: `Cannot transition booking from "${currentStatus}" to "${targetStatus}".`,
          },
          { status: 400 }
        );
      }
    } else {
      // Customer role — must be the booking's customer
      if (booking.customer_id !== user.id) {
        return NextResponse.json(
          { success: false, error: "You are not allowed to update this booking." },
          { status: 403 }
        );
      }

      // Customer-only transitions
      const allowed = CUSTOMER_TRANSITIONS[currentStatus] ?? [];
      if (!allowed.includes(targetStatus)) {
        return NextResponse.json(
          {
            success: false,
            error: `Cannot cancel a booking that is "${currentStatus}".`,
          },
          { status: 400 }
        );
      }
    }

    // --- Perform the update atomically with optimistic concurrency ---
    const { data: updatedBooking, error: updateError } = await supabase
      .from("bookings")
      .update({ status: targetStatus })
      .eq("id", id)
      .eq("status", currentStatus) // protect against concurrent modifications
      .select("id, provider_id, customer_id, status")
      .single();

    if (updateError) {
      console.error("BOOKING_UPDATE_ERROR", updateError);

      return NextResponse.json(
        { success: false, error: "Unable to update the booking." },
        { status: 500 }
      );
    }

    if (!updatedBooking) {
      // The status changed between our read and write — likely a race condition
      return NextResponse.json(
        {
          success: false,
          error: `Booking status has changed. It is no longer "${currentStatus}".`,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
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
