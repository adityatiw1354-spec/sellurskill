"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookingActionsProps {
  bookingId: string;
}

export function BookingActions({
  bookingId,
}: BookingActionsProps) {
  const router = useRouter();

  const [loading, setLoading] = useState<"accepted" | "rejected" | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function updateStatus(status: "accepted" | "rejected") {
    if (loading) return;

    setLoading(status);
    setMessage(null);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to update the booking.");
      }

      setMessage({
        type: "success",
        text: `Booking ${status === "accepted" ? "accepted" : "rejected"}.`,
      });
      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Unable to update the booking.",
      });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-6 space-y-3">
      {message && (
        <div
          className={`rounded-xl border px-3 py-2 text-sm ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          disabled={loading !== null}
          onClick={() => updateStatus("accepted")}
          className="rounded-xl bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading === "accepted" ? "Accepting..." : "Accept"}
        </button>

        <button
          disabled={loading !== null}
          onClick={() => updateStatus("rejected")}
          className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading === "rejected" ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
}