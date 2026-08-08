"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
}

export default function MyServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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
    const timeoutId = window.setTimeout(() => {
      void loadServices();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  async function handleDelete(serviceId: string) {
    if (!window.confirm("Delete this service?")) return;
    if (deletingId) return;

    setDeletingId(serviceId);
    setError(null);

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to delete the service.");
      }

      setServices((current) => current.filter((item) => item.id !== serviceId));
      router.refresh();
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
            <p className="text-slate-500">Manage all your services</p>
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
          <div className="rounded-2xl border bg-white p-12 text-center">
            <h2 className="text-2xl font-semibold">No Services Found</h2>
            <p className="mt-2 text-slate-500">Create your first service to start selling.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">{service.title}</h2>

                <p className="mt-2 line-clamp-3 text-slate-500">{service.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-bold text-violet-600">₹{service.price}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">{service.duration}</span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/provider/services/${service.id}/edit`}
                    className="flex-1 rounded-lg border py-2 text-center hover:bg-slate-100"
                  >
                    Edit
                  </Link>
                  <button
                    disabled={deletingId === service.id}
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 rounded-lg bg-red-500 py-2 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {deletingId === service.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}