"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface CustomerBookingActionsProps {
  bookingId: string;
}

export function CustomerBookingActions({
  bookingId,
}: CustomerBookingActionsProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function cancelBooking() {
    if (loading) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to cancel the booking.");
      }

      setMessage({
        type: "success",
        text: "Booking cancelled.",
      });
      setConfirming(false);
      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Unable to cancel the booking.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 border-t pt-5">
      {message && (
        <div
          className={`mb-3 rounded-xl border px-3 py-2 text-sm ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {confirming ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-600">
            Are you sure you want to cancel this booking?
          </p>

          <div className="flex gap-3">
            <button
              disabled={loading}
              onClick={cancelBooking}
              className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Cancelling..." : "Yes, Cancel"}
            </button>

            <button
              disabled={loading}
              onClick={() => setConfirming(false)}
              className="rounded-xl bg-slate-200 px-5 py-2 text-slate-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Keep Booking
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-2 text-red-700 transition hover:bg-red-100"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
