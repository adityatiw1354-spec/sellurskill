import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Create account — SellurSkills',
}

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join SellurSkills"
      title="Where customers find providers, and skills find work."
      subtitle="Create an account as a customer looking to hire, or a provider ready to offer your skills."
    >
      <div className="mb-8 space-y-1.5">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Get started in under a minute.
        </p>
      </div>
      <RegisterForm />
    </AuthShell>
  )
}