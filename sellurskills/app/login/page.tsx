import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Log in — SellurSkills',
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Pick up right where you left off."
      subtitle="Sign in to manage your bookings, listings, and messages in one place."
    >
      <div className="mb-8 space-y-1.5">
        <h1 className="font-display text-2xl font-semibold text-foreground">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to access your account.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
  <LoginForm />
</Suspense>
    </AuthShell>
  )
}