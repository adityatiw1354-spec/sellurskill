import { ServiceForm } from "@/components/provider/service-form";

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create New Service
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new service that customers can book.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}