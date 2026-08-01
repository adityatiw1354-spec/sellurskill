import { Star, BadgeCheck, ChevronRight } from "lucide-react";
import { providers } from "./data";

export function ProvidersSection() {
  return (
    <section id="providers" className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured providers
            </h2>

            <p className="mt-2 text-neutral-500">
              Hand-picked professionals with proven track records
            </p>
          </div>

          <button className="hidden items-center gap-1 text-sm font-semibold text-violet-600 sm:flex">
            View all
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {providers.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold text-white">
                  {p.initials}
                </div>

                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                  {p.tag}
                </span>
              </div>

              <h3 className="flex items-center gap-1.5 font-semibold">
                {p.name}
                <BadgeCheck className="h-4 w-4 text-violet-600" />
              </h3>

              <p className="text-sm text-neutral-500">{p.role}</p>

              <div className="mt-3 flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{p.rating}</span>
                <span className="text-sm text-neutral-400">
                  ({p.reviews})
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-xs text-neutral-400">Starting at</p>
                  <p className="font-bold">{p.price}</p>
                </div>

                <button className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}