import {
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { providers } from "./data";

export function AiMatchingSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
            <Sparkles className="h-4 w-4" />
            Powered by AI
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Matching that actually understands your needs
          </h2>

          <p className="mt-5 text-lg text-neutral-600">
            Our AI analyzes thousands of signals and connects users
            with the best service providers instantly.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                icon: TrendingUp,
                title: "Smart ranking",
                desc: "Providers ranked by performance.",
              },
              {
                icon: Clock,
                title: "Instant results",
                desc: "Top matches in seconds.",
              },
              {
                icon: ShieldCheck,
                title: "Verified quality",
                desc: "Background checked providers.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                    <Icon className="h-5 w-5 text-violet-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-neutral-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-200/50 to-indigo-200/50 blur-2xl" />

          <div className="relative rounded-3xl border bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-neutral-50 p-3">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-sm text-neutral-600">
                Analyzing request...
              </span>
            </div>

            <div className="space-y-3">
              {providers.slice(0, 3).map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white">
                      {p.initials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-neutral-500">
                        {p.role}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                    {98 - i * 3}% match
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}