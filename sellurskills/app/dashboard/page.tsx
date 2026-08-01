import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from '@/components/auth/sign-out-button'
import type { Profile } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

 
 const { data: profile, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .single<Profile>();

console.log(profile);
console.log(error);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Dashboard</h1>
        <SignOutButton />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <p className="mt-1 text-lg font-medium text-foreground">
          {profile?.full_name ?? user.email}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="text-foreground">{profile?.email ?? user.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Account type</p>
            <p className="capitalize text-foreground">{profile?.role ?? '—'}</p>
          </div>
        </div>
      </div>
    </main>
  )
}