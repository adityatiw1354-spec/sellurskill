import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
                <Zap className="h-5 w-5 text-white" />
              </div>

              <span className="text-lg font-bold">
                Sellur<span className="text-violet-600">Skills</span>
              </span>
            </div>

            <p className="mt-4 text-sm text-neutral-500">
              Connecting skills with opportunity, powered by AI.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>

            <ul className="space-y-3 text-sm text-neutral-500">
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">
              Customers
            </h4>

            <ul className="space-y-3 text-sm text-neutral-500">
              <li>How it works</li>
              <li>Categories</li>
              <li>Safety</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">
              Providers
            </h4>

            <ul className="space-y-3 text-sm text-neutral-500">
              <li>Become a Provider</li>
              <li>Resources</li>
              <li>Success Stories</li>
              <li>Community</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">
              Legal
            </h4>

            <ul className="space-y-3 text-sm text-neutral-500">
              <li>Terms</li>
              <li>Privacy</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} SellurSkills.
          </p>

          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}