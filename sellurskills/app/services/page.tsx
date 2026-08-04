import { getServices } from "@/lib/actions/services";
import { ServiceCard } from "@/components/services/service-card";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Browse Services
        </h1>

        <p className="mt-2 text-slate-500">
          Find skilled professionals for your needs.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">
            No services available
          </h2>

          <p className="mt-2 text-slate-500">
            Providers have not added any services yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      )}
    </div>
  );
}