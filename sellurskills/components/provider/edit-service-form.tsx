"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditServiceFormProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
  };
}

export function EditServiceForm({
  service,
}: EditServiceFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const response = await fetch(
      `/api/services/${service.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.get("title"),
          description: form.get("description"),
          price: Number(form.get("price")),
          duration: form.get("duration"),
        }),
      }
    );

    const result = await response.json();

console.log("Response:", JSON.stringify(result, null, 2));
    setLoading(false);

    if (response.ok) {
      alert("Service updated successfully");
      router.push("/provider/services");
      router.refresh();
    } else {
      alert("Failed to update service");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border bg-white p-8 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-medium">
          Service Title
        </label>

        <input
          name="title"
          defaultValue={service.title}
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          name="description"
          defaultValue={service.description}
          rows={5}
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Price
        </label>

        <input
          type="number"
          name="price"
          defaultValue={service.price}
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Duration
        </label>

        <input
          name="duration"
          defaultValue={service.duration}
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        disabled={loading}
        className="rounded-xl bg-violet-600 px-6 py-3 text-white"
      >
        {loading ? "Updating..." : "Update Service"}
      </button>
    </form>
  );
}