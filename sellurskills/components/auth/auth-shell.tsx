import Link from 'next/link'

interface AuthShellProps {
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthShell({ eyebrow, title, subtitle, children }: AuthShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            SellurSkills
          </Link>
        </div>
        <div className="relative z-10 max-w-md space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/60">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight">{title}</h2>
          <p className="text-primary-foreground/70">{subtitle}</p>
        </div>
        <div className="relative z-10 flex gap-6 text-sm text-primary-foreground/60">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-customer" />
            Customers hire
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-provider" />
            Providers deliver
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="font-display text-xl font-semibold text-foreground">
              SellurSkills
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}