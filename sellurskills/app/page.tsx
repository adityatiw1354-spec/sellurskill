"use client";

import { useState } from "react";
import {
  Home as HomeIcon,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  Wrench,
  Paintbrush,
  Scissors,
  Laptop,
  Camera,
  Dumbbell,
  PenTool,
  ChevronRight,
  Menu,
  X,
  BadgeCheck,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Zap,
} from "lucide-react";

const categories = [
  { name: "Home Repair", icon: Wrench, jobs: "12.4k" },
  { name: "Painting", icon: Paintbrush, jobs: "8.1k" },
  { name: "Salon & Spa", icon: Scissors, jobs: "15.2k" },
  { name: "Tech Support", icon: Laptop, jobs: "6.7k" },
  { name: "Cleaning", icon: HomeIcon, jobs: "9.9k" },
  { name: "Photography", icon: Camera, jobs: "4.3k" },
  { name: "Fitness", icon: Dumbbell, jobs: "3.8k" },
  { name: "Design", icon: PenTool, jobs: "7.5k" },
];

const providers = [
  {
    name: "Ananya Sharma",
    role: "Interior Designer",
    rating: 4.9,
    reviews: 312,
    price: "₹2,499",
    tag: "Top Rated",
    initials: "AS",
  },
  {
    name: "Rohit Verma",
    role: "Electrician",
    rating: 4.8,
    reviews: 587,
    price: "₹499",
    tag: "Fast Response",
    initials: "RV",
  },
  {
    name: "Priya Nair",
    role: "Makeup Artist",
    rating: 5.0,
    reviews: 204,
    price: "₹1,899",
    tag: "New & Trending",
    initials: "PN",
  },
  {
    name: "Karan Mehta",
    role: "Web Developer",
    rating: 4.9,
    reviews: 441,
    price: "₹3,999",
    tag: "Top Rated",
    initials: "KM",
  },
];

const steps = [
  {
    icon: Search,
    title: "Tell us what you need",
    desc: "Describe your task or pick a category. Our AI understands context, not just keywords.",
  },
  {
    icon: Sparkles,
    title: "Get matched instantly",
    desc: "Our AI matching engine ranks verified providers based on skill, location, and reviews.",
  },
  {
    icon: MessageSquare,
    title: "Chat & confirm",
    desc: "Discuss scope, pricing, and timelines directly in-app before booking.",
  },
  {
    icon: CheckCircle2,
    title: "Get it done",
    desc: "Track progress, pay securely, and leave a review once you're satisfied.",
  },
];
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Sellur<span className="text-violet-600">Skills</span>
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
              Explore
            </a>
            <a href="#" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
              Categories
            </a>
            <a href="#" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
              How it works
            </a>
            <a href="#" className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
              Become a Provider
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="text-sm font-semibold text-neutral-700 transition hover:text-neutral-900">
              Sign in
            </button>
            <button className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-neutral-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-sm font-medium text-neutral-700">
                Explore
              </a>
              <a href="#" className="text-sm font-medium text-neutral-700">
                Categories
              </a>
              <a href="#" className="text-sm font-medium text-neutral-700">
                How it works
              </a>
              <a href="#" className="text-sm font-medium text-neutral-700">
                Become a Provider
              </a>
              <hr className="border-neutral-200" />
              <button className="text-left text-sm font-semibold text-neutral-700">
                Sign in
              </button>
              <button className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute top-40 -left-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
              <Sparkles className="h-4 w-4" />
              AI-Powered Skill Matching
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              Find trusted skills,
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                matched by AI
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">
              From home repairs to freelance design — book verified professionals
              in minutes. Smarter matching, faster booking, better results.
            </p>

            {/* SEARCH BAR */}
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-200/50 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                  <Search className="h-5 w-5 shrink-0 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Try 'plumber', 'logo design', 'yoga instructor'..."
                    className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                </div>
                <div className="hidden items-center gap-3 border-l border-neutral-200 px-4 py-2.5 sm:flex">
                  <MapPin className="h-5 w-5 shrink-0 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-28 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-500">
                <span>Popular:</span>
                {["Electrician", "Hair Stylist", "Logo Design", "House Cleaning"].map((t) => (
                  <button
                    key={t}
                    className="rounded-full border border-neutral-200 px-3 py-1 transition hover:border-violet-300 hover:text-violet-700"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-neutral-500">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium">50k+ Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium">4.8 Avg Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium">Verified & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Popular categories
            </h2>
            <p className="mt-2 text-neutral-500">
              Explore top skills trusted by thousands
            </p>
          </div>
          <button className="hidden items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 sm:flex">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 transition group-hover:bg-violet-600">
                  <Icon className="h-6 w-6 text-violet-600 transition group-hover:text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900">{cat.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{cat.jobs} jobs done</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROVIDERS */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                Featured providers
              </h2>
              <p className="mt-2 text-neutral-500">
                Hand-picked professionals with proven track records
              </p>
            </div>
            <button className="hidden items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 sm:flex">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-lg hover:shadow-neutral-200/60"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold text-white">
                    {p.initials}
                  </div>
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                    {p.tag}
                  </span>
                </div>

                <h3 className="flex items-center gap-1.5 font-semibold text-neutral-900">
                  {p.name}
                  <BadgeCheck className="h-4 w-4 text-violet-600" />
                </h3>
                <p className="text-sm text-neutral-500">{p.role}</p>

                <div className="mt-3 flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-neutral-900">{p.rating}</span>
                  <span className="text-sm text-neutral-400">({p.reviews})</span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div>
                    <p className="text-xs text-neutral-400">Starting at</p>
                    <p className="font-bold text-neutral-900">{p.price}</p>
                  </div>
                  <button className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI MATCHING SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
              <Sparkles className="h-4 w-4" />
              Powered by AI
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Matching that actually
              <br /> understands your needs
            </h2>
            <p className="mt-5 text-lg text-neutral-600">
              SellurSkills' AI engine analyzes thousands of signals — skill
              relevance, past performance, response time, and location — to
              connect you with the right provider in seconds, not hours.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  icon: TrendingUp,
                  title: "Smart ranking",
                  desc: "Providers ranked by real performance data, not just bids.",
                },
                {
                  icon: Clock,
                  title: "Instant results",
                  desc: "Get matched with top providers in under 10 seconds.",
                },
                {
                  icon: ShieldCheck,
                  title: "Verified quality",
                  desc: "Every match is background-checked and rating-verified.",
                },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                      <Icon className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{f.title}</h3>
                      <p className="text-sm text-neutral-500">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-200/50 to-indigo-200/50 blur-2xl" />
            <div className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl shadow-violet-100">
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-neutral-50 p-3">
                <Sparkles className="h-4 w-4 text-violet-600" />
                <span className="text-sm text-neutral-600">
                  Analyzing "urgent plumbing repair near me"...
                </span>
              </div>
              <div className="space-y-3">
                {providers.slice(0, 3).map((p, i) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between rounded-xl border border-neutral-100 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white">
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{p.name}</p>
                        <p className="text-xs text-neutral-500">{p.role}</p>
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

      {/* HOW IT WORKS */}
      <section className="bg-neutral-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-neutral-400">
              Four simple steps to get your task done by the right person
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="mb-2 block text-sm font-bold text-violet-400">
                    Step {i + 1}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-neutral-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Built on trust
          </h2>
          <p className="mt-4 text-neutral-500">
            Every provider is verified. Every payment is protected. Every job
            is guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShieldCheck,
              title: "Identity Verified",
              desc: "Background checks and ID verification on every provider.",
            },
            {
              icon: BadgeCheck,
              title: "Quality Guaranteed",
              desc: "Not satisfied? We'll make it right or refund you.",
            },
            {
              icon: Star,
              title: "Real Reviews",
              desc: "Only verified customers can leave ratings and reviews.",
            },
            {
              icon: Clock,
              title: "24/7 Support",
              desc: "Our support team is always here to help, day or night.",
            },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="rounded-2xl border border-neutral-200 p-6 text-center transition hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                  <Icon className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-neutral-900">{t.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{t.desc}</p>
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
            <button className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
              Find a Provider
            </button>
            <button className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Become a Provider
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Sellur<span className="text-violet-600">Skills</span>
                </span>
              </div>
              <p className="mt-4 text-sm text-neutral-500">
                Connecting skills with opportunity, powered by AI.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-900">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-violet-600">About</a></li>
                <li><a href="#" className="hover:text-violet-600">Careers</a></li>
                <li><a href="#" className="hover:text-violet-600">Press</a></li>
                <li><a href="#" className="hover:text-violet-600">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-900">
                For Customers
              </h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-violet-600">How it works</a></li>
                <li><a href="#" className="hover:text-violet-600">Categories</a></li>
                <li><a href="#" className="hover:text-violet-600">Safety</a></li>
                <li><a href="#" className="hover:text-violet-600">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-900">
                For Providers
              </h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-violet-600">Become a Provider</a></li>
                <li><a href="#" className="hover:text-violet-600">Resources</a></li>
                <li><a href="#" className="hover:text-violet-600">Success Stories</a></li>
                <li><a href="#" className="hover:text-violet-600">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-neutral-900">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-violet-600">Terms</a></li>
                <li><a href="#" className="hover:text-violet-600">Privacy</a></li>
                <li><a href="#" className="hover:text-violet-600">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} SellurSkills. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a href="#" className="hover:text-violet-600">Twitter</a>
              <a href="#" className="hover:text-violet-600">Instagram</a>
              <a href="#" className="hover:text-violet-600">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}