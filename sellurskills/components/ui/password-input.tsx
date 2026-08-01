'use client'

import * as React from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PasswordInputProps
  extends React.ComponentProps<"input"> {
  showStrength?: boolean
}

const requirements = [
  { label: '8+ characters', test: (v: string) => v.length >= 8 },
  { label: 'Uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'Lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'Number', test: (v: string) => /[0-9]/.test(v) },
  { label: 'Special character', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength, value, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    const strVal = typeof value === 'string' ? value : ''
    const passed = requirements.filter((r) => r.test(strVal)).length

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            type={visible ? 'text' : 'password'}
            value={value}
            className={cn('pr-11', className)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={visible ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {showStrength && strVal.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {requirements.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors',
                    i < passed
                      ? passed <= 2
                        ? 'bg-destructive'
                        : passed <= 4
                          ? 'bg-accent'
                          : 'bg-emerald-500'
                      : 'bg-secondary'
                  )}
                />
              ))}
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {requirements.map((r) => {
                const ok = r.test(strVal)
                return (
                  <li
                    key={r.label}
                    className={cn(
                      'flex items-center gap-1.5 text-xs',
                      ok ? 'text-emerald-600' : 'text-muted-foreground'
                    )}
                  >
                    {ok ? (
                      <Check className="h-3 w-3 shrink-0" />
                    ) : (
                      <X className="h-3 w-3 shrink-0" />
                    )}
                    {r.label}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput } 