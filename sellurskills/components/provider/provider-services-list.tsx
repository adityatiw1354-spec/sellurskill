"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
}

export default function ProviderServicesList() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadServices() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/services");
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to load services.");
      }

      setServices(result?.services || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load services.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchServices() {
      await loadServices();
    }

    void fetchServices();
  }, []);

  async function handleDelete(serviceId: string) {
    if (deletingId) return;
    setDeletingId(serviceId);
    setError(null);

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true || result?.service?.id !== serviceId) {
        throw new Error(result?.error || "Unable to delete the service.");
      }

      setServices((current) => current.filter((item) => item.id !== serviceId));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete the service.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Services</h1>
            <p className="text-slate-500">Manage all your services in one place.</p>
          </div>

          <Link
            href="/provider/services/new"
            className="rounded-xl bg-violet-600 px-5 py-3 text-center text-white hover:bg-violet-700"
          >
            + Add Service
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-slate-600">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">No Services Found</h2>
            <p className="mt-2 text-slate-500">Create your first service to start reaching customers.</p>
            <Link href="/provider/services/new" className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700">
              Create Service
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{service.title}</h2>
                    <p className="mt-3 line-clamp-3 text-slate-500">{service.description}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{service.duration}</span>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-violet-600">₹{service.price}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/provider/services/${service.id}/edit`}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(service.id)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {confirmDeleteId === service.id && (
                  <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                    <p>Are you sure you want to delete this service?</p>
                    <div className="mt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={() => void handleDelete(service.id)}
                        disabled={deletingId === service.id}
                        className="rounded-lg bg-rose-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {deletingId === service.id ? "Deleting..." : "Yes, delete"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-700 hover:bg-rose-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
