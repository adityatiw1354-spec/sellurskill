"use client";

import { Search, MapPin, Sparkles, Users, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
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
            in minutes.
          </p>

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-200/50 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                <Search className="h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Try plumber, logo designer..."
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>

              <div className="hidden items-center gap-3 border-l border-neutral-200 px-4 py-2.5 sm:flex">
                <MapPin className="h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-28 bg-transparent text-sm focus:outline-none"
                />
              </div>

              <button className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700">
                Search
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-500">
              <span>Popular:</span>

              {[
                "Electrician",
                "Hair Stylist",
                "Logo Design",
                "House Cleaning",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-neutral-200 px-3 py-1 hover:border-violet-300 hover:text-violet-700"
                >
                  {item}
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

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}