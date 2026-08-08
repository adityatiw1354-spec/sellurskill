"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookNowButtonProps {
  serviceId: string;
  amount: number;
}

export function BookNowButton({ serviceId, amount }: BookNowButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  async function handleBooking() {
    if (!bookingDate || !startTime || !endTime || !address || !phone) {
      setFeedback({ type: "error", text: "Please fill all required fields." });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          booking_date: bookingDate,
          start_time: startTime,
          end_time: endTime,
          address,
          phone,
          notes,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to create the booking.");
      }

      setFeedback({ type: "success", text: "Booking created successfully. You can view it from your bookings page." });
      setBookingDate("");
      setStartTime("");
      setEndTime("");
      setAddress("");
      setPhone("");
      setNotes("");
      router.refresh();
      router.push("/customer/bookings");
    } catch (error) {
      setFeedback({
        type: "error",
        text: error instanceof Error ? error.message : "Unable to create the booking.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Book This Service</h2>

      {feedback && (
        <div className={`rounded-xl border px-3 py-2 text-sm ${feedback.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          {feedback.text}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Booking Date</label>
          <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full rounded-xl border p-3" />
        </div>

        <div>
          <label className="mb-2 block font-medium">Phone</label>
          <input type="tel" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border p-3" />
        </div>

        <div>
          <label className="mb-2 block font-medium">Start Time</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl border p-3" />
        </div>

        <div>
          <label className="mb-2 block font-medium">End Time</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl border p-3" />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">Service Address</label>
        <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl border p-3" />
      </div>

      <div>
        <label className="mb-2 block font-medium">Special Instructions</label>
        <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything you want the provider to know..." className="w-full rounded-xl border p-3" />
      </div>

      <button onClick={handleBooking} disabled={loading} className="w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Booking..." : `Book Now • ₹${amount}`}
      </button>
    </div>
  );
}