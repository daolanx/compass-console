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
  EllipsisVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"

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

interface SidebarProps {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-full  bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-2 border-b border-border">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "gap-3")}>
          <div className="size-8 shrink-0">
            <img
              src="/logo.webp"
              alt="CollabSpace logo"
              className="size-full object-cover"
            />
          </div>
          <div className={cn("min-w-0 overflow-hidden transition-all duration-300", collapsed ? "w-0" : "w-auto")}>
            <h1 className="text-[15px] font-semibold text-foreground tracking-tight leading-none mb-0.5 whitespace-nowrap">
              Compass Console
            </h1>
            <p className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-widest whitespace-nowrap">
              Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
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

      {/* User section */}
      <div className="  mx-2 py-2 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              title={collapsed ? "Mr. Chen" : undefined}
              className={cn(
                "flex w-full items-center rounded-lg py-2 text-left text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
                collapsed ? "justify-center px-0 gap-0" : "gap-3 px-3"
              )}
            >
              <Avatar className="size-8 shrink-0">
                <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=Chen" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div className={cn("min-w-0 flex-1 overflow-hidden transition-all duration-300", collapsed ? "w-0 flex-none" : "w-auto")}>
                <div className="leading-tight whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">Mr. Chen</div>
                  <div className="text-xs text-muted-foreground">Admin</div>
                </div>
              </div>
              <EllipsisVertical className={cn("size-4 shrink-0 text-muted-foreground/60 transition-all duration-300", collapsed ? "w-0 overflow-hidden" : "")} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className="w-full cursor-pointer">
                <LogOut className="mr-2" />
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
