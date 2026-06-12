"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderKanban, Users, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Projects", icon: FolderKanban, href: "/dashboard/projects" },
  { label: "Team", icon: Users, href: "/dashboard/team" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden flex justify-around items-center h-16 bg-card border-t border-border fixed bottom-0 w-full z-50">
      {navItems.map((item, i) => {
        const isActive = pathname === item.href
        // Insert FAB before the last item
        if (i === 1) {
          return (
            <div key="fab-group" className="contents">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-bold">{item.label}</span>
              </Link>
              <Button
                size="icon"
                className="w-11 h-11 rounded-full -mt-6 shadow-lg"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          )
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
