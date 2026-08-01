import {
  ShieldCheck,
  BadgeCheck,
  Star,
  Clock,
} from "lucide-react";

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Built on trust
        </h2>

        <p className="mt-4 text-neutral-500">
          Every provider is verified. Every payment is protected.
          Every job is guaranteed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: ShieldCheck,
            title: "Identity Verified",
            desc: "Background checks and ID verification.",
          },
          {
            icon: BadgeCheck,
            title: "Quality Guaranteed",
            desc: "Refund and dispute protection.",
          },
          {
            icon: Star,
            title: "Real Reviews",
            desc: "Only verified customers can review.",
          },
          {
            icon: Clock,
            title: "24/7 Support",
            desc: "Help whenever you need it.",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 p-6 text-center hover:border-violet-300 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                <Icon className="h-6 w-6 text-violet-600" />
              </div>

              <h3 className="font-semibold text-neutral-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-14 text-center">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to get your task done?
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-violet-100">
          Join thousands of happy customers who found the perfect
          professional on SellurSkills.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-violet-700">
            Find a Provider
          </button>

          <button className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white">
            Become a Provider
          </button>
        </div>
      </div>
    </section>
  );
}