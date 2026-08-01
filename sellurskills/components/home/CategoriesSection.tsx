import { ChevronRight } from "lucide-react";
import { categories } from "./data";

export function CategoriesSection() {
  return (
    <section
      id="categories"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Popular categories
          </h2>

          <p className="mt-2 text-neutral-500">
            Explore top skills trusted by thousands
          </p>
        </div>

        <button className="hidden items-center gap-1 text-sm font-semibold text-violet-600 sm:flex">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.name}
              className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 group-hover:bg-violet-600">
                <Icon className="h-6 w-6 text-violet-600 group-hover:text-white" />
              </div>

              <h3 className="font-semibold">{cat.name}</h3>

              <p className="mt-1 text-sm text-neutral-500">
                {cat.jobs} jobs done
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}