"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditServiceFormProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
  };
}

export function EditServiceForm({ service }: EditServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const price = Number(form.get("price"));
    const duration = String(form.get("duration") || "").trim();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          duration,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to update the service.");
      }

      setSuccess(true);
      router.push("/provider/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update the service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-8 shadow-sm">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Service updated successfully.
        </div>
      )}

      <div>
        <label className="mb-2 block font-medium">Service Title</label>
        <input name="title" defaultValue={service.title} required className="w-full rounded-xl border p-3" />
      </div>

      <div>
        <label className="mb-2 block font-medium">Description</label>
        <textarea name="description" defaultValue={service.description} rows={5} required className="w-full rounded-xl border p-3" />
      </div>

      <div>
        <label className="mb-2 block font-medium">Price</label>
        <input type="number" name="price" defaultValue={service.price} min="0.01" step="0.01" required className="w-full rounded-xl border p-3" />
      </div>

      <div>
        <label className="mb-2 block font-medium">Duration</label>
        <input name="duration" defaultValue={service.duration} required className="w-full rounded-xl border p-3" />
      </div>

      <button disabled={loading} className="rounded-xl bg-violet-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Updating..." : "Update Service"}
      </button>
    </form>
  );
}