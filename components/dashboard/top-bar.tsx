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
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 bg-muted/50"
            placeholder="Search tasks, files or members..."
          />
        </div>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell />
          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-card bg-rose-500" />
        </Button>
      </div>
    </header>
  )
}
