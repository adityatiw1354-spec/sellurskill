import {
  Search,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Tell us what you need",
    desc: "Describe your task.",
  },
  {
    icon: Sparkles,
    title: "Get matched instantly",
    desc: "AI finds the best provider.",
  },
  {
    icon: MessageSquare,
    title: "Chat & confirm",
    desc: "Discuss details before booking.",
  },
  {
    icon: CheckCircle2,
    title: "Get it done",
    desc: "Track work and pay securely.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-neutral-900 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>

          <p className="mt-4 text-neutral-400">
            Four simple steps to complete any task
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title}>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <span className="mb-2 block text-sm font-bold text-violet-400">
                  Step {index + 1}
                </span>

                <h3 className="mb-2 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="text-sm text-neutral-400">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}