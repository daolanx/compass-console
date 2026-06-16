import { Search, Bell, PanelLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TopBarProps {
  onToggleSidebar: () => void
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-card px-6 sticky top-0 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={onToggleSidebar}
      >
        <PanelLeft />
      </Button>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" placeholder="Search..." />
        </div>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell />
          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-card bg-rose-500" />
        </Button>
      </div>
    </header>
  )
}
