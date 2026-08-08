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

  const [loading, setLoading] = useState(false);

  async function updateStatus(
    status: "accepted" | "rejected"
  ) {
    setLoading(true);

    const response = await fetch(
      `/api/bookings/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    setLoading(false);

    if (response.ok) {
      alert(`Booking ${status}`);
      router.refresh();
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div className="mt-6 flex gap-3">
      <button
        disabled={loading}
        onClick={() => updateStatus("accepted")}
        className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
      >
        Accept
      </button>

      <button
        disabled={loading}
        onClick={() => updateStatus("rejected")}
        className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        Reject
      </button>
    </div>
  );
}