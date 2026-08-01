"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
            <Zap className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Sellur<span className="text-violet-600">Skills</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#categories" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Categories
          </a>

          <a href="#providers" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Providers
          </a>

          <a href="#how-it-works" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            How it Works
          </a>

          <a href="#trust" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Trust
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#categories">Categories</a>
            <a href="#providers">Providers</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#trust">Trust</a>

            <hr />

            <Link href="/login">Sign In</Link>

            <Link
              href="/register"
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-center text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}