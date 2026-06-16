"use client"

import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SidebarLogo } from "./sidebar-logo"
import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"

interface SidebarToggleProps {
  onToggle: () => void
}

export function SidebarToggle({ onToggle }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      onClick={onToggle}
    >
      <PanelLeft />
    </Button>
  )
}

interface SidebarProps {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-full bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarLogo collapsed={collapsed} />
      <SidebarNav collapsed={collapsed} />
      <SidebarUser collapsed={collapsed} />
    </aside>
  )
}
