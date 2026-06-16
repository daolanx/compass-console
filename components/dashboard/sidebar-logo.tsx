import { cn } from "@/lib/utils"

interface SidebarLogoProps {
  collapsed: boolean
}

export function SidebarLogo({ collapsed }: SidebarLogoProps) {
  return (
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
  )
}
