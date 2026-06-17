"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EllipsisVertical, User, LogOut, UserCircle } from "lucide-react"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { UserAvatar } from "@/components/user-avatar"
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
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  console.log('[user]', user);

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.display_name ||
    user?.email ||
    "User"

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null
  const avatarPath = user?.user_metadata?.avatar_path || null

  return (
    <div className="mx-2 py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            title={collapsed ? displayName : undefined}
            className={cn(
              "flex w-full items-center rounded-lg py-2 text-left text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
              collapsed ? "justify-center px-0 gap-0" : "gap-3 px-3"
            )}
          >
            {user ? (
              avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="size-8 shrink-0 rounded-full object-cover"
                />
              ) : (
                <UserAvatar user={user} avatarPath={avatarPath} size="sm" className="size-8" />
              )
            ) : (
              <div className="size-8 shrink-0 rounded-full bg-muted flex items-center justify-center">
                <UserCircle className="size-5 text-muted-foreground" />
              </div>
            )}
            <div className={cn("min-w-0 flex-1 overflow-hidden transition-all duration-300", collapsed ? "w-0 flex-none" : "w-auto")}>
              <div className="leading-tight whitespace-nowrap">
                <div className="text-sm font-medium text-foreground">{displayName}</div>
                <div className="text-xs text-muted-foreground">{user?.email || ""}</div>
              </div>
            </div>
            <EllipsisVertical className={cn("size-4 shrink-0 text-muted-foreground/60 transition-all duration-300", collapsed ? "w-0 overflow-hidden" : "")} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
