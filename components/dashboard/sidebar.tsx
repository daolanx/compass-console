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
  ChevronsLeft,
  ChevronsRight,
  EllipsisVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"
import { useState } from "react"

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

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-full py-4 px-2 bg-card border-r border-border relative transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("px-2 mb-6", collapsed && "px-0")}>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
          <div className="w-9 h-9 ">
            <img
              src="/logo.webp"
              alt="CollabSpace logo"
              className="w-full h-full object-cover"
            />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-[15px] font-semibold text-foreground tracking-tight leading-none mb-0.5">
                Compass Console
              </h1>
              <p className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-widest">
                Workspace
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-3 top-10 w-6 h-6 rounded-full z-50 shadow-sm"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronsRight className="w-3 h-3" />
        ) : (
          <ChevronsLeft className="w-3 h-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((group, groupIndex) => (
          <div key={groupIndex}>
            {!collapsed && (
              <div className="my-2 border-t border-border" />
            )}
            <div className="space-y-1">
              {group.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer",
                      collapsed && "justify-center px-0",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="text-sm">{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="mt-auto pt-4 border-t border-border space-y-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-all",
                collapsed && "justify-center px-0"
              )}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=Chen" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <span className="text-sm flex-1">Mr. Chen</span>
                  <EllipsisVertical className="w-4 h-4 text-muted-foreground/60" />
                </>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className="w-full cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
