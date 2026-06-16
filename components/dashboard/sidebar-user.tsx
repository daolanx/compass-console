"use client"

import Link from "next/link"
import { EllipsisVertical, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarUserProps {
  collapsed: boolean
}

export function SidebarUser({ collapsed }: SidebarUserProps) {
  return (
    <div className="mx-2 py-2">
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
  )
}
