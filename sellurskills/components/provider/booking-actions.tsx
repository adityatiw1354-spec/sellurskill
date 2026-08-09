"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BookingStatus = "pending" | "accepted" | "rejected" | "in_progress" | "completed" | "cancelled";

interface BookingActionsProps {
  bookingId: string;
  status: BookingStatus;
}

type ActionStatus = "accepted" | "rejected" | "in_progress" | "completed";

export function BookingActions({
  bookingId,
  status,
}: BookingActionsProps) {
  const router = useRouter();

  const [loading, setLoading] = useState<ActionStatus | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const actionLabels: Record<ActionStatus, string> = {
    accepted: "Accept",
    rejected: "Reject",
    in_progress: "Start Job",
    completed: "Mark Completed",
  };

  const loadingLabels: Record<ActionStatus, string> = {
    accepted: "Accepting...",
    rejected: "Rejecting...",
    in_progress: "Starting...",
    completed: "Completing...",
  };

  // Determine which actions are valid for the current status
  const availableActions: ActionStatus[] =
    status === "pending"
      ? ["accepted", "rejected"]
      : status === "accepted"
        ? ["in_progress"]
        : status === "in_progress"
          ? ["completed"]
          : [];

  async function updateStatus(target: ActionStatus) {
    if (loading) return;

    setLoading(target);
    setMessage(null);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: target }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to update the booking.");
      }

      setMessage({
        type: "success",
        text: `Booking ${actionLabels[target].toLowerCase()}d.`,
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

  if (availableActions.length === 0) {
    return null;
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
        {availableActions.map((action) => {
          const isAccept = action === "accepted";
          const isReject = action === "rejected";
          const isComplete = action === "completed";

          const baseClasses =
            "rounded-xl px-5 py-2 text-white transition disabled:cursor-not-allowed disabled:opacity-70";
          const colorClasses = isAccept
            ? "bg-emerald-600 hover:bg-emerald-700"
            : isReject
              ? "bg-red-600 hover:bg-red-700"
              : isComplete
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-sky-600 hover:bg-sky-700";

          return (
            <button
              key={action}
              disabled={loading !== null}
              onClick={() => updateStatus(action)}
              className={`${baseClasses} ${colorClasses}`}
            >
              {loading === action ? loadingLabels[action] : actionLabels[action]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
