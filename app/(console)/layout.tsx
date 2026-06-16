"use client"

import { useState } from "react"
import { Search, Bell } from "lucide-react"
import { Sidebar, SidebarToggle } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 w-full items-center justify-between border-b border-border bg-card px-6 sticky top-0 z-50">
          <SidebarToggle onToggle={() => setCollapsed(!collapsed)} />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input className="h-auto border-0 bg-transparent p-0 w-[300] shadow-none focus-visible:ring-0" placeholder="Search..." />
            </div>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-card bg-rose-500" />
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
