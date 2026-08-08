'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RoleSelect } from '@/components/ui/role-select'

export function RegisterForm() {
  const router = useRouter()

  const supabase = React.useMemo(() => createClient(), [])

  const [isLoading, setIsLoading] = React.useState(false)
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<
    'confirmed' | 'needs-confirmation' | null
  >(null)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'customer',
    },
  })

  const passwordValue = watch('password')

  async function onSubmit(values: RegisterInput) {
    if (isLoading) return

    setIsLoading(true)
    setServerError(null)

    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            role: values.role,
          },
          emailRedirectTo: `${siteUrl}/auth/callback`,
        },
      })

      console.log("SIGNUP DATA:", data)
      console.log("SIGNUP ERROR:", error)

      if (error) {
        console.error('SIGNUP ERROR:', error)

        if (
          error.status === 429 ||
          error.code === 'over_email_send_rate_limit'
        ) {
          setServerError(
            'Please wait at least 25 seconds before requesting another verification email.'
          )
        } else if (error.message.toLowerCase().includes('already registered')) {
          setServerError(
            'An account with this email already exists. Please sign in.'
          )
        } else {
          setServerError(error.message)
        }

        return
      }

      if (data.session) {
        setSuccess('confirmed')
        router.push('/dashboard')
        router.refresh()
        return
      }

      setSuccess('needs-confirmation')
    } catch (error) {
      console.error('UNEXPECTED SIGNUP ERROR:', error)

      setServerError(
        'Something went wrong while creating your account. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (success === 'needs-confirmation') {
    return (
      <div className="space-y-4">
        <Alert variant="success">
          <CheckCircle2 />
          <AlertDescription>
            Account created successfully. Check your email and confirm your
            address before signing in.
          </AlertDescription>
        </Alert>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push('/login')}
        >
          Go to sign in
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {serverError && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Account type</Label>

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <RoleSelect
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {errors.role && (
          <p className="text-xs text-destructive">
            {errors.role.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>

        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jordan Lee"
          aria-invalid={!!errors.name}
          disabled={isLoading}
          {...register('name')}
        />

        {errors.name && (
          <p className="text-xs text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          disabled={isLoading}
          {...register('email')}
        />

        {errors.email && (
          <p className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="Create a password"
          showStrength
          aria-invalid={!!errors.password}
          disabled={isLoading}
          {...register('password')}
          value={passwordValue}
        />

        {errors.password && (
          <p className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm password
        </Label>

        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          aria-invalid={!!errors.confirmPassword}
          disabled={isLoading}
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Creating account…' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}