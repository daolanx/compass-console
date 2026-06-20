"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  User,
  Settings,
  Palette,
  Bell,
} from "lucide-react"

const settingsNavItems = [
  {
    label: "Profile",
    items: [
      { name: "Profile", href: "/profile", icon: User },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Account settings", href: "/profile/account", icon: Settings },
      { name: "Appearance", href: "/profile/appearance", icon: Palette },
      { name: "Notifications", href: "/profile/notifications", icon: Bell },
    ],
  },
]

export function ProfileSettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6">
      {settingsNavItems.map((group) => (
        <div key={group.label}>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.label}
          </h3>
          <div className="flex flex-col gap-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
