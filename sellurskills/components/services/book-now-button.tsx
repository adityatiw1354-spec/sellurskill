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

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  async function handleBooking() {
    if (
      !bookingDate ||
      !startTime ||
      !endTime ||
      !address ||
      !phone
    ) {
      alert("Please fill all required fields");
      return;
    }

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

        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        address,
        phone,
        notes,
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Booking Created Successfully");

      setBookingDate("");
      setStartTime("");
      setEndTime("");
      setAddress("");
      setPhone("");
      setNotes("");
    } else {
      console.log(await response.json());
      alert("Booking Failed");
    }
  }

  return (
    <div className="mt-10 rounded-2xl border bg-white p-6 shadow-sm space-y-5">
      <h2 className="text-2xl font-bold">
        Book This Service
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Booking Date
          </label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) =>
              setBookingDate(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            type="tel"
            placeholder="9876543210"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Start Time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(e) =>
              setStartTime(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            End Time
          </label>

          <input
            type="time"
            value={endTime}
            onChange={(e) =>
              setEndTime(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Service Address
        </label>

        <textarea
          rows={3}
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Special Instructions
        </label>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Anything you want the provider to know..."
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        onClick={handleBooking}
        disabled={loading}
        className="w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold text-white hover:bg-violet-700"
      >
        {loading ? "Booking..." : `Book Now • ₹${amount}`}
      </button>
    </div>
  );
}