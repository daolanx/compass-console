"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { MobileNav } from "@/components/dashboard/mobile-nav"

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
        <TopBar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
