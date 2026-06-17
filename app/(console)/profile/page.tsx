"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/hooks/use-user"
import { ProfileForm } from "@/components/profile-form"
import { AvatarUpload } from "@/components/avatar-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  CalendarDays,
  Shield,
  Mail,
  Loader2,
  ArrowLeft,
  Pencil,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const router = useRouter()
  const { user, isLoading, updateUserAsync } = useUser()

  const handleAvatarChange = async (path: string) => {
    await updateUserAsync({ avatar_path: path })
  }

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.display_name ||
    user.email ||
    "User"

  const username =
    user.user_metadata?.display_name ||
    user.email?.split("@")[0] ||
    "user"

  const bio = user.user_metadata?.bio || ""

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : ""

  const provider =
    user.app_metadata?.provider === "github"
      ? "GitHub"
      : user.app_metadata?.provider === "google"
        ? "Google"
        : "Email"

  const avatarPath = user.user_metadata?.avatar_path || null

  return (
    <div className="flex-1 w-full">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Back */}
        <Link
          href="/overview"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative">
            <div className="rounded-full border-4 border-background shadow-lg overflow-hidden">
              <AvatarUpload
                user={user}
                avatarPath={avatarPath}
                onUpload={handleAvatarChange}
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
            <p className="text-muted-foreground">@{username}</p>
            {bio && (
              <p className="text-sm text-muted-foreground mt-1">{bio}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing(!editing)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            {editing ? "Close Editor" : "Edit Profile"}
          </Button>
        </div>

        <Separator className="mb-6" />

        {/* Edit Form */}
        {editing && (
          <div className="mb-6">
            <ProfileForm
              user={user}
              onSaved={() => {
                setEditing(false)
              }}
            />
          </div>
        )}

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Account Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email</span>
                <span className="ml-auto font-medium">{user.email}</span>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Provider</span>
                <span className="ml-auto font-medium">{provider}</span>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined</span>
                <span className="ml-auto font-medium">{memberSince}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">52</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <div className="text-xs text-muted-foreground">Collaborators</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
