"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Activity,
  TrendingUp,
  Wallet,
  ClipboardList,
  UserCog,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  [
    { label: "Overview", icon: LayoutDashboard, href: "/overview" },
    { label: "Tasks", icon: ClipboardList, href: "/tasks" },
    { label: "Activities", icon: Activity, href: "/activities" },
    { label: "Members", icon: UserCog, href: "/members" },
  ],
  [
    { label: "Growth", icon: TrendingUp, href: "/growth" },
    { label: "Finance", icon: Wallet, href: "/finance" },
  ],
  [
    { label: "Settings", icon: Settings, href: "/settings" },
  ],
]

interface SidebarNavProps {
  collapsed: boolean
}

export function SidebarNav({ collapsed }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 flex flex-col gap-1 p-2">
      {navItems.map((group, groupIndex) => (
        <div key={groupIndex}>
          {groupIndex > 0 && (
            <div className={cn("my-2 border-t border-border transition-all duration-300", collapsed ? "mx-2" : "")} />
          )}
          <div className="flex flex-col gap-1">
            {group.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center rounded-lg py-2 transition-all cursor-pointer",
                    collapsed ? "justify-center px-0 gap-0" : "gap-3 px-3",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="size-5 shrink-0" />
                  <span className={cn("overflow-hidden text-sm whitespace-nowrap transition-all duration-300", collapsed ? "w-0" : "w-auto")}>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}
