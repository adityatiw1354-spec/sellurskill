"use client";

import { useState } from "react";

interface BookNowButtonProps {
  serviceId: string;
  providerId: string;
  amount: number;
}

export function BookNowButton({
  serviceId,
  providerId,
  amount,
}: BookNowButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleBooking() {
    setLoading(true);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        provider_id: providerId,
        amount,
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Booking Created Successfully");
    } else {
      const error = await response.json();
      console.log(error);
      alert("Booking Failed");
    }
  }

  return (
    <button
      onClick={handleBooking}
      disabled={loading}
      className="mt-8 rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
    >
      {loading ? "Booking..." : "Book Now"}
    </button>
  );
}