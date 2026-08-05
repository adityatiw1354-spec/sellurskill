"use client";

import { useState } from "react";

export function ServiceForm() {
  const [loading, setLoading] = useState(false);

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  const formElement = e.currentTarget;
  const formData = new FormData(formElement);

  setLoading(true);

  const response = await fetch("/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      duration: formData.get("duration"),
    }),
  });

  setLoading(false);

  if (response.ok) {
    alert("Service created successfully");
    formElement.reset();
  } else {
    alert("Something went wrong");
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
          required
          rows={5}
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
          placeholder="2 Days"
          required
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        disabled={loading}
        className="rounded-xl bg-violet-600 px-6 py-3 text-white"
      >
        {loading ? "Creating..." : "Create Service"}
      </button>
    </form>
  );
}