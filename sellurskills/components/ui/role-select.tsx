'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Briefcase, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/types'

interface RoleSelectProps {
  value: UserRole
  onChange: (value: UserRole) => void
  name?: string
}

const roles: {
  value: UserRole
  title: string
  description: string
  icon: typeof ShoppingBag
  accent: string
}[] = [
  {
    value: 'customer',
    title: 'Customer',
    description: 'I want to hire skills',
    icon: ShoppingBag,
    accent: 'customer',
  },
  {
    value: 'provider',
    title: 'Provider',
    description: 'I want to offer skills',
    icon: Briefcase,
    accent: 'provider',
  },
]

export function RoleSelect({ value, onChange, name = 'role' }: RoleSelectProps) {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={(v) => onChange(v as UserRole)}
      name={name}
      className="grid grid-cols-2 gap-3"
    >
      {roles.map((role) => {
        const Icon = role.icon
        const active = value === role.value
        return (
          <RadioGroupPrimitive.Item
            key={role.value}
            value={role.value}
            className={cn(
              'group relative flex flex-col items-start gap-2 rounded-lg border p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              active
                ? role.value === 'customer'
                  ? 'border-customer bg-customer/10'
                  : 'border-provider bg-provider/10'
                : 'border-input bg-card hover:bg-secondary'
            )}
          >
            <Icon
              className={cn(
                'h-5 w-5',
                active
                  ? role.value === 'customer'
                    ? 'text-customer'
                    : 'text-provider'
                  : 'text-muted-foreground'
              )}
            />
            <div>
              <p className="text-sm font-medium text-foreground">{role.title}</p>
              <p className="text-xs text-muted-foreground">{role.description}</p>
            </div>
          </RadioGroupPrimitive.Item>
        )
      })}
    </RadioGroupPrimitive.Root>
  )
}