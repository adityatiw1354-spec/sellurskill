interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;
  };
}

export function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-xl font-semibold">
        {service.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm text-slate-500">
        {service.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-violet-600">
          ₹{service.price}
        </span>

        <button className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700">
          View Details
        </button>
      </div>
    </div>
  );
}